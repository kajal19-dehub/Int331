import { Component } from '@angular/core';
import { RouterOutlet, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

import { Sidebar } from './shared/sidebar/sidebar';
import { Navbar } from './shared/navbar/navbar';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, Sidebar, Navbar],
  templateUrl: './app.html',
})
export class App {

  constructor(public router: Router) {}

  // 🔥 Hide layout on Landing + Login + Register
  isAuthPage(): boolean {
    const publicRoutes = ['/', '/login', '/register'];
    return publicRoutes.includes(this.router.url);
  }
}