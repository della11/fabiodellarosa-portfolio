import { Component } from '@angular/core';
import { TitlecasePipe } from '../../../pipes/titlecase.pipe';
import { Service } from '../../../models/service';

@Component({
  selector: 'fdr11-service',
  standalone: true,
  imports: [TitlecasePipe],
  templateUrl: './service.component.html',
  styleUrl: './service.component.scss',
})
export class ServiceComponent {
  //TODO -  USE FIREBASE data
  services: Service[] = [
    {
      title: 'web development',
      description:
        ' High-quality development of sites at the professional level.',
      img: './assets/images/icon-dev.svg',
    },
  ];
}
