import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { LucideAngularModule } from 'lucide-angular';
import { Check, User, Calendar, ClipboardList, CreditCard } from 'lucide-angular';

type StepIcon = 'ClipboardList' | 'Calendar' | 'User' | 'CreditCard';

@Component({
  selector: 'app-stepper-indicator',
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './stepper-indicator.html',
  styleUrl: './stepper-indicator.css',
})
export class StepperIndicator {
  @Input() currentStep = 1;

  icons = {
    Check,
    User,
    Calendar,
    ClipboardList,
    CreditCard
  };

  steps: { id: number; name: string; icon: StepIcon }[] = [
    { id: 1, name: 'Servicio', icon: 'ClipboardList' },
    { id: 2, name: 'Fecha y hora', icon: 'Calendar' },
    { id: 3, name: 'Tus datos', icon: 'User' },
    { id: 4, name: 'Confirmar', icon: 'CreditCard' }
  ];
}
