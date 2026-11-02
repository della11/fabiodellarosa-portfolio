import { Component } from '@angular/core';
import { EducationComponent } from './education/education.component';
import { ExperienceComponent } from './experience/experience.component';
import { SkillComponent } from './skill/skill.component';
import { CertificationsComponent } from './certifications/certifications.component';

@Component({
  selector: 'fdr11-resume',
  standalone: true,
  imports: [
    EducationComponent,
    ExperienceComponent,
    SkillComponent,
    CertificationsComponent,
  ],
  templateUrl: './resume.component.html',
  styleUrl: './resume.component.scss',
})
export class ResumeComponent {}
