import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServiceModel } from '../../../core/models/service.model';

@Component({
  selector: 'app-service-selector',
  imports: [CommonModule],
  templateUrl: './service-selector.html',
  styleUrl: './service-selector.css',
})
export class ServiceSelector {
  @Output() variantSelected = new EventEmitter<any>();
  @Input() services: ServiceModel[] = [];

  expandedIndex: number | null = null;

  selectedService: any = null;
  selectedVariant: any = null;
  selectedVariantId: number | null = null;

  

  selectVariant(service: any, variant: any) {
    this.selectedVariantId = variant.id;

    this.variantSelected.emit({
      service,
      variant
    });

  }


  /*toggleService(index: number) {
    this.expandedIndex = this.expandedIndex === index ? null : index;
  }*/

  toggleService(serviceId: number) {
    if (this.expandedIndex === serviceId) {
      this.expandedIndex = null;
      return;
    }

    this.expandedIndex = serviceId;

    const service = this.services.find(s => s.id === serviceId);

    if (service?.variants?.length === 1) {
      this.selectVariant(service, service.variants[0]);
    }

  }

}
