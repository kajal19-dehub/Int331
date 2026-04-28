import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-volunteer-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './volunteer-dashboard.html',
})
export class VolunteerDashboard implements OnInit {

  available = 0;
  accepted = 0;
  completed = 0;

  ngOnInit() {
    this.animateCounter('available', 15, 1000);
    this.animateCounter('accepted', 6, 1000);
    this.animateCounter('completed', 9, 1000);
  }

  animateCounter(property: 'available' | 'accepted' | 'completed', target: number, duration: number) {
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