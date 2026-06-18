import { Component, OnInit, inject, HostListener } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators, FormControl, FormsModule } from '@angular/forms';

import {
  LucideAngularModule,
  Scissors,
  Sparkles,
  HeartPulse,
  ExternalLink,
  Menu, Dumbbell, GraduationCap, PawPrint,
  Calendar, Bell, UsersRound, UserRound, QrCode, MapPin, Palette, Briefcase, Clock, Globe,
  CalendarDays, MailCheck, RefreshCcw, MapPinned, Share2,
  Play, X, MessageCircle, Mail, Presentation, Check
} from 'lucide-angular';

import { DecimalPipe } from '@angular/common';

import { BookingContextService } from '../../../core/services/booking-context.service';
import { BrandingService } from '../../../core/services/branding.service';
import { environment } from '../../../../environments/environment';
import { SubscriptionService } from '../../../core/services/subscription.service';
import { ErrorHandlerService } from '../../../core/services/error-handler.service';
import { NotificationService } from '../../../core/services/notification.service';
import { BusinessCatalogService } from '../../../core/services/business-catalog.service';
import { ContactService } from '../../../core/services/contact.service';


@Component({
  selector: 'app-home',
  imports: [RouterModule, LucideAngularModule, DecimalPipe, ReactiveFormsModule, FormsModule],
  templateUrl: './home.html',
  styleUrl: './home.css',
})

export class Home implements OnInit {

  readonly Scissors = Scissors;
  readonly Sparkles = Sparkles;
  readonly HeartPulse = HeartPulse;
  readonly ExternalLink = ExternalLink;
  readonly Menu = Menu;
  readonly Calendar = Calendar;
  readonly Bell = Bell;
  readonly UsersRound = UsersRound;
  readonly UserRound = UserRound;
  readonly QrCode = QrCode;
  readonly MapPin = MapPin;
  readonly Palette = Palette;
  readonly Briefcase = Briefcase;
  readonly Clock = Clock;
  readonly Globe = Globe;
  readonly CalendarDays = CalendarDays;
  readonly MailCheck = MailCheck;
  readonly RefreshCcw = RefreshCcw;
  readonly MapPinned = MapPinned;
  readonly Share2 = Share2;
  readonly Dumbbell = Dumbbell;
  readonly GraduationCap = GraduationCap;
  readonly PawPrint = PawPrint;
  readonly Play = Play;
  readonly X = X;
  readonly MessageCircle = MessageCircle;
  readonly Mail = Mail;
  readonly Presentation = Presentation;
  readonly Check = Check;


  private bookingContext = inject(BookingContextService);
  private brandingService = inject(BrandingService);
  private subscriptionService = inject(SubscriptionService);
  private errorHandler = inject(ErrorHandlerService);
  private notify = inject(NotificationService);
  private fb = inject(FormBuilder);
  private businessCatalogService = inject(BusinessCatalogService);
  private contactService = inject(ContactService);

  private appRombiURL = environment.appRombiURL;
  private supportWhatsapp = environment.supportWhatsapp;
  private bookingRombiURL = `${environment.bookingBaseUrl}/${environment.organizationRombi}`;

  loading = true;
  menuOpen = false;
  isScrolled = false;
  showDemo = false;
  showContactModal = false;
  showMessageReceived = false;

  form!: FormGroup;
  submitted = false;

  // Catálogos
  niches = this.businessCatalogService.getNiches();

  generalNiches = [
    {
      key: 'beauty',
      name: 'Belleza y cuidado personal',
      description: 'Barberías, salones, uñas, spa, tatuajes y más. Organiza citas, servicios y colaboradores desde un solo lugar.',
      icon: Sparkles,
    },

    {
      key: 'health',
      name: 'Salud y bienestar',
      description: 'Psicólogos, dentistas, nutriólogos, médicos, terapeutas y especialistas que necesitan una agenda profesional.',
      icon: HeartPulse,
    },

    {
      key: 'pets',
      name: 'Veterinarias y cuidado animal',
      description: 'Gestiona consultas, servicios y citas para mascotas desde un solo lugar.',
      icon: PawPrint,
    },

    {
      key: 'education',
      name: 'Educación y consultoría',
      description: 'Profesores, asesores y consultores que necesitan gestionar reuniones y sesiones.',
      icon: GraduationCap,
    },

    {
      key: 'fitness',
      name: 'Fitness y entrenamiento',
      description: 'Entrenadores personales, coaches y profesionales que trabajan por sesiones o citas.',
      icon: Dumbbell,
    },

  ];

  features = [

    {
      key: 'agenda',
      name: 'Más citas, menos mensajes',
      description: 'Permite que tus clientes reserven por internet sin llamadas, mensajes o seguimiento manual. ¡¡Incluso cuando estás descansando!!',
      icon: Calendar,
    },

    {
      key: 'booking',
      name: 'Página pública profesional',
      description: 'Obtén una página lista para recibir reservas sin necesidad de crear un sitio web.',
      icon: Globe,
    },

    {
      key: 'self-service',
      name: 'Autogestión para clientes',
      description: 'Tus clientes pueden reagendar o cancelar sus citas sin necesidad de escribirte.',
      icon: RefreshCcw,
    },

    {
      key: 'appointments',
      name: 'Agenda centralizada',
      description: 'Visualiza todas tus reservas en un solo lugar y mantén el control de tu operación diaria.',
      icon: CalendarDays,
    },

    {
      key: 'schedule',
      name: 'Disponibilidad inteligente',
      description: 'Configura horarios, descansos, días libres y quién atiende cada servicio.',
      icon: Clock,
    },

    {
      key: 'services',
      name: 'Catálogo profesional de servicios',
      description: 'Muestra tus servicios, variantes, precios e imágenes para convertir más visitas en reservas.',
      icon: Briefcase,
    },

    {
      key: 'reminders',
      name: 'Notificaciones inteligentes',
      description: 'Mantén informados a tus clientes y a tu equipo con correos automáticos antes y después de cada cita.',
      icon: Bell,
    },

    {
      key: 'actions',
      name: 'Acciones desde el correo',
      description: 'Aprueba, cancela o gestiona citas directamente desde tus notificaciones.',
      icon: MailCheck,
    },

    {
      key: 'clients',
      name: 'Conoce mejor a cada cliente',
      description: 'Consulta información, reservas anteriores y mantén un mejor seguimiento de cada cliente.',
      icon: UserRound,
    },

    {
      key: 'team',
      name: 'Coordina a todo tu equipo desde un solo lugar',
      description: 'Administra colaboradores, asigna permisos y controla quién atiende cada cita.',
      icon: UsersRound,
    },

    {
      key: 'branches',
      name: 'Controla una o varias sucursales sin complicaciones',
      description: 'Administra una o varias sucursales desde un solo lugar.',
      icon: MapPin,
    },

    {
      key: 'maps',
      name: 'Ubicación integrada',
      description: 'Ayuda a tus clientes a encontrarte fácilmente con acceso directo a Google Maps.',
      icon: MapPinned,
    },

    {
      key: 'social',
      name: 'Impulsa tus redes sociales',
      description: 'Conecta Instagram, Facebook y otros canales para atraer más clientes a tu negocio.',
      icon: Share2,
    },

    {
      key: 'qr',
      name: 'Código QR para reservas',
      description: 'Comparte tu agenda con un simple escaneo desde tarjetas, mostradores o redes sociales.',
      icon: QrCode,
    },

    {
      key: 'branding',
      name: 'Marca personalizada',
      description: 'Personaliza colores, imagen y experiencia para que tu negocio luzca profesional.',
      icon: Palette,
    },

  ];

  plans: any[] = [];

  anioActual: number;
  fechaCompleta: Date;

  constructor() {
    this.fechaCompleta = new Date();
    this.anioActual = this.fechaCompleta.getFullYear();
  }

  @HostListener('window:scroll')
  onScroll() {
    this.isScrolled = window.scrollY > 20;
  }

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  closeMenu() {
    this.menuOpen = false;
  }

  ngOnInit() {

    this.loading = true;
    // Eliminamos todo el contexto y branding de otras organizaciones
    this.bookingContext.clear();
    this.brandingService.reset();

    this.initForm();
    this.getPlans();
  }

  initForm() {
    this.form = this.fb.group({
      first_name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(250)]],
      email: ['', [Validators.required, Validators.email]],
      business_niche: ['', Validators.required],
      business_name: ['', [Validators.maxLength(150)]],
      message: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(500)]],

    });
  }

  getPlans() {

    this.loading = true;

    this.subscriptionService.getPlans('citas')
      .subscribe({
        next: (res) => {

          //console.log('dataBackend :', JSON.stringify(res, null, 2));

          this.plans = res.map((plan: any) => ({

            ...plan,

            highlight: plan.key === 'pro',

            founder: plan.plan_type === 'founder',

            enterprise: plan.metadata?.contact_sales,

            hasTrial: plan.trial_days > 0,

            hasDiscount:
              plan.original_price &&
              Number(plan.original_price) > Number(plan.price),

            savings:
              plan.original_price
                ? Number(plan.original_price) - Number(plan.price)
                : 0,

            expanded: false,

            featuresVisible: plan.features.slice(0, 9) //

          }));

          this.loading = false;;

        },
        error: (err) => {
          this.errorHandler.handle(err);

        }

      });

  }

  openDemoModal() {
    this.showDemo = true;
  }

  openContactModal() {
    this.showContactModal = true;
  }

  closeContactModal() {
    this.showContactModal = false;

    this.form.reset({
      first_name: '',
      email: '',
      business_niche: '',
      business_name: '',
      message: ''
    });
  }

  closeMessageReceived() {
    this.showMessageReceived = false;
  }

  openMessageReceived() {
    this.showMessageReceived = true;
  }

  scrollTo(sectionId: string) {

    this.closeMenu();

    const element = document.getElementById(sectionId);

    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  }

  openPlan(plan: any) {

    if (plan.key === 'free') {
      this.goToRombi();
      return;
    }

    let message = '';

    switch (plan.key) {

      case 'basic':
        message =
          `Hola.%0A%0A` +
          `Estoy interesado en contratar ROMBI en el plan Emprendedor.%0A%0A` +
          `¿Podrían compartirme información sobre el proceso de contratación?%0A%0A` +
          `Gracias.`;
        break;

      case 'pro':
        message =
          `Hola.%0A%0A` +
          `Estoy interesado en contratar ROMBI en el plan Profesional.%0A%0A` +
          `¿Podrían compartirme información sobre el proceso de contratación?%0A%0A` +
          `Gracias.`;
        break;

      case 'premium':
        message =
          `Hola.%0A%0A` +
          `Me interesa una implementación empresarial de ROMBI.%0A%0A` +
          `Actualmente operamos varias sucursales y me gustaría recibir una propuesta personalizada.%0A%0A` +
          `Gracias.`;
        break;

      case 'founder':
        message =
          `Hola.%0A%0A` +
          `Estoy interesado en reservar un lugar del programa Founder de ROMBI.%0A%0A` +
          `¿Aún cuentan con espacios disponibles?%0A%0A` +
          `Vi la información en el sitio web.%0A%0A` +
          `Gracias.`;
        break;
    }

    this.openWa(message, 'plans');

  }

  openWa(message: string, section: string) {
    if (section === 'contact') {
      message =
        `Hola.%0A%0A` +
        `Me interesa implementar ROMBI.%0A%0A` +
        `Tipo de negocio:%0A____________________%0A%0A` +
        `Número aproximado de colaboradores:%0A____________________%0A%0A` +
        `Gracias.`;

    }

    if (section === 'footer') {
      message =
        `Hola.%0A%0A` +
        `me interesa conocer más sobre ROMBI y saber si puede funcionar para mi negocio.%0A%0A` +
        `Gracias.`;
    }

    window.open(
      `https://wa.me/${this.supportWhatsapp}?text=${message}`,
      '_blank'
    );
  }

  openDemoBooking() {
    window.open(
      this.bookingRombiURL,
      '_blank'
    );
  }

  goToRombi(): void {
    window.open(
      `${this.appRombiURL}/registrarse`,
      '_blank',
      'noopener,noreferrer'
    );
  }

  sendMessage() {

    if (this.submitted) {
      return; // Si ya se está enviando, no hacer nada
    }

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.notify.error('Completa los campos obligatorios');
      return;
    }

    this.submitted = true;

    const payload = {
      organization_slug: 'rombi',
      source: 'landing',

      first_name: this.form.value.first_name ?? undefined,
      email: this.form.value.email ?? undefined,
      business_name: this.form.value.business_name ?? undefined,
      message: this.form.value.message ?? undefined,

      custom_fields: {
        business_niche: this.form.value.business_niche ?? null
      }
    };

    this.contactService.sendMessage(payload)
      .subscribe({
        next: (res) => {

          //const message = res.message

          // this.notify.success(
          //   'Hemos recibido tu mensaje. Te responderemos pronto.'
          // );


          this.submitted = false;

          this.closeContactModal();

          this.openMessageReceived();

        },
        error: (err) => {
          this.submitted = false;

          this.errorHandler.handle(err);
        }

      });

  }

  getError(controlName: string): string | null {
    const control = this.form.get(controlName);

    if (!control || !control.touched || !control.errors) return null;

    if (control.errors['required']) return 'Este campo es obligatorio';
    if (control.errors['email']) return 'Correo inválido';
    if (control.errors['minlength']) return 'Muy corto';
    if (control.errors['maxlength']) return 'Muy largo';

    return null;
  }

}
