import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AsideComponent } from './components/aside/aside.component';
import { NavbarComponent } from './components/navbar/navbar.component';

@Component({
  selector: 'fdr11-root',
  standalone: true,
  imports: [RouterOutlet, AsideComponent, NavbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'fabiodellarosa-portfolio';
}
