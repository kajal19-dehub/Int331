import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OpportunityService {

  private apiUrl = 'https://wastezero-u0si.onrender.com/api';

  constructor(private http: HttpClient) {}

  getHeaders() {
    const token = localStorage.getItem('token');

    return {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`
      })
    };
  }

  // Create Opportunity (Admin)
  createOpportunity(data: any) {
    return this.http.post(`${this.apiUrl}/opportunities`, data, this.getHeaders());
  }

  // Get Opportunities
  getOpportunities() {
    return this.http.get(`${this.apiUrl}/opportunities`, this.getHeaders());
  }

  // Update Opportunity
  updateOpportunity(id: string, data: any) {
    return this.http.put(`${this.apiUrl}/opportunities/${id}`, data, this.getHeaders());
  }

  // Delete Opportunity
  deleteOpportunity(id: string) {
    return this.http.delete(`${this.apiUrl}/opportunities/${id}`, this.getHeaders());
  }

  // Apply Opportunity (Volunteer)
  applyOpportunity(opportunity_id: string) {
    return this.http.post(
      `${this.apiUrl}/applications/apply`,
      { opportunity_id },
      this.getHeaders()
    );
  }

  // Get Applications (Admin)
  getApplications() {
    return this.http.get(`${this.apiUrl}/applications`, this.getHeaders());
  }

  // Accept / Reject Application
  updateApplicationStatus(id: string, status: string) {
    return this.http.put(
      `${this.apiUrl}/applications/${id}`,
      { status },
      this.getHeaders()
    );
  }

}