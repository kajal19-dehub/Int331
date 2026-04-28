import { Component, OnInit } from '@angular/core';
import { CommonModule, TitleCasePipe } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, TitleCasePipe],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar implements OnInit {

  role: string | null = null;

  ngOnInit(): void {
    this.role = localStorage.getItem('role');
  }

  toggleDarkMode(): void {
  document.documentElement.classList.toggle('dark');
}
  logout(): void {
    localStorage.clear();
    window.location.href = '/login';
  }
}