import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/home.component').then((m) => m.HomeComponent),
    title: 'Начало',
  },
  {
    path: 'tours',
    loadComponent: () =>
      import('./pages/tours.component').then((m) => m.ToursComponent),
    title: 'Турове',
  },
  {
    path: 'sightseeing',
    loadComponent: () =>
      import('./pages/sightseeing.component').then(
        (m) => m.SightseeingComponent,
      ),
    title: 'Забележителности',
  },
  {
    path: 'hotels',
    loadComponent: () =>
      import('./pages/hotels.component').then((m) => m.HotelsComponent),
    title: 'Хотели',
  },
  {
    path: 'transportation',
    loadComponent: () =>
      import('./pages/transportation.component').then(
        (m) => m.TransportationComponent,
      ),
    title: 'Транспорт',
  },
  {
    path: 'contacts',
    loadComponent: () =>
      import('./pages/contacts.component').then((m) => m.ContactsComponent),
    title: 'Контакти',
  },
  {
    path: 'admin',
    loadComponent: () =>
      import('./pages/admin.component').then((m) => m.AdminComponent),
    title: 'Администрация',
  },
  { path: '**', redirectTo: '' },
];
