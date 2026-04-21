import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Tour {
  id: number;
  name: string;
  region: string;
  duration_days: number;
  price_bgn: number;
  description: string;
  image_url: string | null;
}

export interface Sight {
  id: number;
  name: string;
  location: string;
  description: string;
  image_url: string | null;
}

export interface Hotel {
  id: number;
  name: string;
  city: string;
  stars: number;
  price_per_night_bgn: number;
  description: string;
  image_url: string | null;
}

export interface Transport {
  id: number;
  type: string;
  route: string;
  price_bgn: number;
  description: string;
}

export interface TeamMember {
  id: number;
  full_name: string;
  role: string;
  email: string | null;
  phone: string | null;
  bio: string | null;
  photo_url: string | null;
}

@Injectable({ providedIn: 'root' })
export class ApiService {
  private readonly http = inject(HttpClient);

  tours(): Observable<Tour[]> {
    return this.http.get<Tour[]>('assets/data/tours.json');
  }

  sightseeing(): Observable<Sight[]> {
    return this.http.get<Sight[]>('assets/data/sightseeing.json');
  }

  hotels(): Observable<Hotel[]> {
    return this.http.get<Hotel[]>('assets/data/hotels.json');
  }

  transportation(): Observable<Transport[]> {
    return this.http.get<Transport[]>('assets/data/transportation.json');
  }

  team(): Observable<TeamMember[]> {
    return this.http.get<TeamMember[]>('assets/data/team.json');
  }
}
