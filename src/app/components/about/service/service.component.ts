import { Component } from '@angular/core';
import { TitlecasePipe } from '../../../pipes/titlecase.pipe';

@Component({
  selector: 'fdr11-service',
  standalone: true,
  imports: [TitlecasePipe],
  templateUrl: './service.component.html',
  styleUrl: './service.component.scss',
})
export class ServiceComponent {
  //TODO -  USE FIREBASE data
  services = [
    {
      title: 'web development',
      description:
        ' High-quality development of sites at the professional level.',
      source: './assets/images/icon-dev.svg',
    },
  ];
}
