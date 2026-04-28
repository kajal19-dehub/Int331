import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OpportunityService } from '../../services/opportunity.service';

@Component({
  selector: 'app-applications',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './applications.html',
  styleUrl: './applications.css'
})
export class Applications implements OnInit {

  applications: any[] = [];

  constructor(private opportunityService: OpportunityService) {}

  ngOnInit(): void {
    this.loadApplications();
  }

  loadApplications() {

    this.opportunityService.getApplications()
    .subscribe({
      next: (res: any) => {
        this.applications = res;
      },
      error: (err) => {
        console.error(err);
      }
    });

  }

  updateStatus(id: string, status: string) {

    this.opportunityService.updateApplicationStatus(id, status)
    .subscribe({
      next: () => {
        alert("Application updated");
        this.loadApplications();
      },
      error: (err) => {
        console.error(err);
      }
    });

  }

}