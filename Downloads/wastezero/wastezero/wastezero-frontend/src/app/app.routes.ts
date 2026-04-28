import { Routes } from '@angular/router';
import { authGuard } from './guards/auth-guard';
export const routes: Routes = [

  // { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
  path: '',
  loadComponent: () =>
    import('./landing/landing').then(m => m.Landing)
},

  // PUBLIC ROUTES
  {
    path: 'login',
    loadComponent: () =>
      import('./auth/login/login').then(m => m.Login)
  },

  {
    path: 'register',
    loadComponent: () =>
      import('./auth/register/register').then(m => m.Register)
  },

  // USER ROUTES (Protected)
  {
    path: 'dashboard-user',
    loadComponent: () =>
      import('./dashboards/user-dashboard/user-dashboard').then(m => m.UserDashboard),
    canActivate: [authGuard]
  },

  {
    path: 'schedule-pickup',
    loadComponent: () =>
      import('./user/schedule-pickup/schedule-pickup').then(m => m.SchedulePickup),
    canActivate: [authGuard]
  },

  // VOLUNTEER ROUTES (Protected)
  {
    path: 'dashboard-volunteer',
    loadComponent: () =>
      import('./dashboards/volunteer-dashboard/volunteer-dashboard').then(m => m.VolunteerDashboard),
    canActivate: [authGuard]
  },

  {
    path: 'opportunities',
    loadComponent: () =>
      import('./volunteer/opportunities/opportunities').then(m => m.Opportunities),
    canActivate: [authGuard]
  },

  // ADMIN ROUTES (Protected)
  {
    path: 'dashboard-admin',
    loadComponent: () =>
      import('./dashboards/admin-dashboard/admin-dashboard').then(m => m.AdminDashboard),
    canActivate: [authGuard]
  },
  
  {
  path: 'admin/applications',
  loadComponent: () =>
    import('./admin/applications/applications').then(m => m.Applications),
  canActivate: [authGuard]
},
  {
    path: 'admin',
    loadComponent: () =>
      import('./admin/admin-panel/admin-panel').then(m => m.AdminPanel),
    canActivate: [authGuard]
  },

  // COMMON ROUTES (Protected)
  {
    path: 'messages',
    loadComponent: () =>
      import('./messages/messages').then(m => m.Messages),
    canActivate: [authGuard]
  },

  {
    path: 'profile',
    loadComponent: () =>
      import('./profile/profile').then(m => m.Profile),
    canActivate: [authGuard]
  },

  // FALLBACK
  { path: '**', redirectTo: 'login' }

];