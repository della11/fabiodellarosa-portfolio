import { FirebaseService } from '../../../services/firebase.service';
import { Education } from './../../../models/education';
import { Component, inject, Input, OnInit } from '@angular/core';

@Component({
  selector: 'fdr11-education',
  standalone: true,
  imports: [],
  templateUrl: './education.component.html',
  styleUrl: './education.component.scss',
})
export class EducationComponent implements OnInit {
  educations: Education[] = [];

  private readonly firebase = inject(FirebaseService);

  ngOnInit() {
    this.firebase.getCollection('education').subscribe((data: Education[]) => {
      this.educations = data;
      console.log(data);
    });
  }
}
