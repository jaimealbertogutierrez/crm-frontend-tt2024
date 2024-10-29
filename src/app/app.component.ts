import { Component } from '@angular/core';
import {Router, RouterLink, RouterOutlet} from '@angular/router';


@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  imports: [
    RouterLink,
    RouterOutlet
  ],
  styleUrls: ['./app.component.css'] // Corrige "styleUrl" a "styleUrls"
})
export class AppComponent {
  title = 'crm-frontend';
  constructor(private router: Router) {}

  navigateTo(route: string) {
    this.router.navigate([route]);
  }

}
