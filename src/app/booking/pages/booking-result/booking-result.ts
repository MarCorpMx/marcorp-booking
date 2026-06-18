import { Component, OnInit, inject, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { finalize } from 'rxjs/operators';
import { LucideAngularModule, CheckCircle, XCircle, AlertTriangle, AlertCircle } from 'lucide-angular';

import { OrganizationService } from '../../../core/services/organization.service';
import { OrganizationModel } from '../../../core/models/organization.model';
import { BrandingService } from '../../../core/services/branding.service';
import { NotificationService } from '../../../core/services/notification.service';
import { BookingService, AppointmentActionResponse } from '../../../core/services/booking.service';

type BackendStatus =
  | 'confirmed'
  | 'cancelled'
  | 'expired'
  | 'already_used'
  | 'already_confirmed'
  | 'already_cancelled'
  | 'invalid_token'
  | 'already_completed'
  | 'already_no_show';

type StatusType =
  | 'confirmed'
  | 'cancelled'
  | 'expired'
  | 'invalid'
  | 'info'
  | 'rescheduled'
  | 'completed'
  | 'no_show';

@Component({
  selector: 'app-booking-result',
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './booking-result.html',
  styleUrl: './booking-result.css',
})

export class BookingResult implements OnInit {
  readonly CheckCircle = CheckCircle;
  readonly XCircle = XCircle;
  readonly AlertTriangle = AlertTriangle;
  readonly AlertCircle = AlertCircle;

  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private orgService = inject(OrganizationService);
  private branding = inject(BrandingService);
  private notify = inject(NotificationService);
  private bookingService = inject(BookingService);

  showManualCloseMessage = false;
  isLoading = true;

  organizationSlug!: string;
  organization?: OrganizationModel;

  @Input() statusInput?: StatusType; // Llega desde booking-manage
  status: StatusType = 'invalid'; // Llega desde Url (token)
  isToken = true;

  response?: AppointmentActionResponse;

  config!: {
    title: string;
    message: string;
    icon: any;
    color: string;
  };

  private statusMessages: Record<StatusType, string> = {
    confirmed: 'Todo está listo. Tu cita ha sido confirmada correctamente.',
    cancelled: 'La cita fue cancelada correctamente.',
    expired: 'Este enlace ya no está disponible.',
    invalid: 'No se pudo procesar la acción.',
    rescheduled: 'Tu cita ha sido reagendada correctamente.',
    info: 'Esta acción ya había sido realizada previamente.',
    completed: 'Esta cita ya fue atendida.',
    no_show: 'La cita fue marcada como no asistida.'
  };

  ngOnInit(): void {
    this.organizationSlug = this.route.snapshot.paramMap.get('slug')!;

    // Cargar organization + branding
    this.orgService.loadOrganization(this.organizationSlug)
      .subscribe({
        next: (org) => {
          this.organization = org;
         
          //this.branding.apply(org); FALTA HACER LA PETICION CHINGONA PARA CARGAR CHINGON EL BRANDING CARBON
        },
        error: () => {
          this.notify.error('Ocurrió un error al procesar la solcitud.');
          this.branding.reset();
          this.goHome();
        }
      });

    // MODO DIRECTO (sin token)
    if (this.statusInput) {
      this.status = this.statusInput;

      console.log(this.status);
      this.isToken = false;
      this.setConfig();
      this.isLoading = false;

      return;
    }

    // TOKEN FLOW (con token)
    this.route.queryParamMap.subscribe(params => {
      const token = params.get('token');

      if (!token) {
        this.status = 'invalid';
        this.isLoading = false;
        this.setConfig();
        return;
      }

      this.processToken(token);
    });
  }

  processToken(token: string) {
    this.isLoading = true;

    this.bookingService
      .processAppointmentAction(token)
      .pipe(
        finalize(() => this.isLoading = false)
      )
      .subscribe({
        next: (res: AppointmentActionResponse) => {
          //console.log(res);

          this.response = res;
          this.status = this.mapBackendStatus(res.status);
          this.setConfig(res);
        },
        error: (err) => {
          this.status = this.mapErrorStatus(err);
          this.setConfig();
        }
      });
  }

  mapBackendStatus(status: BackendStatus): StatusType {
    const map: Record<BackendStatus, StatusType> = {
      confirmed: 'confirmed',
      cancelled: 'cancelled',
      expired: 'expired',
      invalid_token: 'invalid',

      already_used: 'info',
      already_confirmed: 'confirmed',
      already_cancelled: 'cancelled',

      already_completed: 'completed',
      already_no_show: 'no_show',
    };

    return map[status] || 'invalid';
  }

  mapErrorStatus(err: any): StatusType {
    if (err.status === 410) return 'expired';
    return 'invalid';
  }

  setConfig(res?: AppointmentActionResponse) {

    //const backendStatus = res?.status;
    const map = {
      confirmed: {
        title: 'Cita confirmada',
        icon: CheckCircle,
        color: 'text-green-500'
      },
      cancelled: {
        title: 'Cita cancelada',
        icon: XCircle,
        color: 'text-gray-400'
      },
      rescheduled: {
        title: 'Cita reagendada',
        icon: CheckCircle,
        color: 'text-blue-500'
      },
      completed: {
        title: 'Cita finalizada',
        icon: CheckCircle,
        color: 'text-green-500'
      },
      no_show: {
        title: 'No asistió',
        icon: AlertTriangle,
        color: 'text-yellow-500'
      },
      expired: {
        title: 'Enlace expirado',
        icon: AlertTriangle,
        color: 'text-yellow-500'
      },
      info: {
        title: 'Información',
        icon: AlertCircle,
        color: 'text-blue-500'
      },
      invalid: {
        title: 'Enlace no válido',
        icon: AlertCircle,
        color: 'text-red-400'
      }
    };

    const base = map[this.status] || map.invalid;

    let message = '';

    // PRIORIDAD 1: backend (token flow)
    if (res?.message) {
      message = res.message;
    }

    // PRIORIDAD 2: backend fallback (cuando hay token pero no message)
    else if (this.isToken && res?.status) {
      message = this.getFallbackMessage(res.status);
    }

    // PRIORIDAD 3: frontend (booking-manage)
    else {
      message = this.statusMessages[this.status];
    }

    this.config = {
      ...base,
      message
    };

    /*this.config = {
      ...base,
      message: res?.message || this.getFallbackMessage(backendStatus)
    };*/
  }


  getFallbackMessage(status?: BackendStatus): string {
    const messages: Record<BackendStatus, string> = {
      confirmed: 'Todo está listo. Tu cita ha sido confirmada correctamente.',
      cancelled: 'La cita fue cancelada correctamente.',
      expired: 'Este enlace ya no está disponible.',
      invalid_token: 'No se pudo procesar la acción.',

      already_used: 'Este enlace ya fue utilizado.',
      already_confirmed: 'Esta cita ya había sido confirmada anteriormente.',
      already_cancelled: 'Esta cita ya había sido cancelada previamente.',

      already_completed: 'Esta cita ya fue atendida.',
      already_no_show: 'Esta cita fue marcada como no asistida.',
    };

    if (!status) return 'Ocurrió un problema.';
    return messages[status] || 'Ocurrió un problema.';
  }

  handleClose() {
    // intento cerrar
    window.close();

    // fallback elegante
    setTimeout(() => {
      this.showManualCloseMessage = true;
    }, 300);
  }

  goHome() {
    this.router.navigate([`/${this.organizationSlug}`]);
  }
}
