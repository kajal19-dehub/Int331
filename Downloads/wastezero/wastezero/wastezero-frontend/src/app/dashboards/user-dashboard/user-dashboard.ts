import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-dashboard.html',
})
export class UserDashboard implements OnInit {

  totalPickups = 0;
  completed = 0;
  pending = 0;

  ngOnInit() {
    this.animateCounter('totalPickups', 12, 1000);
    this.animateCounter('completed', 8, 1000);
    this.animateCounter('pending', 4, 1000);
  }

  animateCounter(property: 'totalPickups' | 'completed' | 'pending', target: number, duration: number) {
    let start = 0;
    const increment = target / (duration / 16);

    const interval = setInterval(() => {
      start += increment;
      if (start >= target) {
        (this as any)[property] = target;
        clearInterval(interval);
      } else {
        (this as any)[property] = Math.floor(start);
      }
    }, 16);
  }

}