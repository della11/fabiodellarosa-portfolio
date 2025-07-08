import { Component, inject, OnInit } from '@angular/core';
import { Experience } from '../../../models/experience';
import { FirebaseService } from '../../../services/firebase.service';

@Component({
  selector: 'fdr11-experience',
  standalone: true,
  imports: [],
  templateUrl: './experience.component.html',
  styleUrl: './experience.component.scss',
})
export class ExperienceComponent implements OnInit {
  experiences: Experience[] = [];

  private readonly firebase = inject(FirebaseService);

  parseRange = (value: string): [number, number | null] => {
    let r = value.split('-');
    let start = parseInt(r[0]);
    console.log(r[1]);
    let end = r[1].trim() === 'Present' ? null : parseInt(r[1]);
    return [start, end];
  };

  ngOnInit() {
    this.firebase
      .getCollection('experience')
      .subscribe((data: Experience[]) => {
        console.log('dt', data);
        this.experiences = data.sort((a, b) => {
          const [startA, endA] = this.parseRange(a.date);
          const [startB, endB] = this.parseRange(b.date);

          // Ordinare per "end" in ordine decrescente (null > numero)
          if (endA === null && endB !== null) return -1; // "Present" viene prima
          if (endA !== null && endB === null) return 1; // "Present" viene prima
          if (endA !== endB) return (endB ?? Infinity) - (endA ?? Infinity);
          // Ordinare per "start" in ordine decrescente come criterio secondario
          return startB - startA;
        });
        console.log(data);
      });
  }
}
