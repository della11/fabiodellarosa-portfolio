import { Component, inject, OnInit } from '@angular/core';
import { FirebaseService } from '../../../services/firebase.service';
import { Skill } from '../../../models/skill';
import { NgStyle } from '@angular/common';

@Component({
  selector: 'fdr11-skill',
  standalone: true,
  imports: [NgStyle],
  templateUrl: './skill.component.html',
  styleUrl: './skill.component.scss',
})
export class SkillComponent implements OnInit {
  getPerc(v: number): string {
    return v + '%';
  }
  skills: Skill[] = [];
  private readonly firebase = inject(FirebaseService);

  ngOnInit() {
    this.firebase.getCollection('skill').subscribe((data: Skill[]) => {
      console.log('dt', data);
      this.skills = data.sort((a, b) => b.value - a.value);
    });
  }
}
