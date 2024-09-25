import { Routes } from '@angular/router';
import { DashboardPageComponent } from './Pages/dashboard-page/dashboard-page.component';
import { MapPageComponent } from './Pages/map-page/map-page.component';

export const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardPageComponent },
  { path: 'map', component: MapPageComponent },
];
