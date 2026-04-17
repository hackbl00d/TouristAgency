import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Tour {
  id: number;
  name: string;
  region: string;
  duration_days: number;
  price_bgn: string | number;
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
  price_per_night_bgn: string | number;
  description: string;
  image_url: string | null;
}

export interface Transport {
  id: number;
  type: string;
  route: string;
  price_bgn: string | number;
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

export interface ContactMessage {
  id: number;
  name: string;
  email: string;
  subject: string | null;
  message: string;
  created_at: string;
}

export interface ContactPayload {
  name: string;
  email: string;
  subject?: string;
  message: string;
}

@Injectable({ providedIn: 'root' })
export class ApiService {
  private readonly http = inject(HttpClient);

  // ── Public reads ───────────────────────────────────────────

  tours(): Observable<Tour[]> {
    return this.http.get<Tour[]>('/api/tours');
  }

  sightseeing(): Observable<Sight[]> {
    return this.http.get<Sight[]>('/api/sightseeing');
  }

  hotels(): Observable<Hotel[]> {
    return this.http.get<Hotel[]>('/api/hotels');
  }

  transportation(): Observable<Transport[]> {
    return this.http.get<Transport[]>('/api/transportation');
  }

  team(): Observable<TeamMember[]> {
    return this.http.get<TeamMember[]>('/api/team');
  }

  // ── Public writes ──────────────────────────────────────────

  submitContact(body: ContactPayload): Observable<{ ok: boolean }> {
    return this.http.post<{ ok: boolean }>('/api/contact', body);
  }

  // ── Admin (token-protected) ────────────────────────────────

  messages(token: string): Observable<ContactMessage[]> {
    return this.http.get<ContactMessage[]>('/api/contact', this.auth(token));
  }

  createTour(token: string, body: Partial<Tour>): Observable<Tour> {
    return this.http.post<Tour>('/api/tours', body, this.auth(token));
  }

  deleteTour(token: string, id: number): Observable<void> {
    return this.http.delete<void>(`/api/tours/${id}`, this.auth(token));
  }

  createHotel(token: string, body: Partial<Hotel>): Observable<Hotel> {
    return this.http.post<Hotel>('/api/hotels', body, this.auth(token));
  }

  deleteHotel(token: string, id: number): Observable<void> {
    return this.http.delete<void>(`/api/hotels/${id}`, this.auth(token));
  }

  createSight(token: string, body: Partial<Sight>): Observable<Sight> {
    return this.http.post<Sight>('/api/sightseeing', body, this.auth(token));
  }

  deleteSight(token: string, id: number): Observable<void> {
    return this.http.delete<void>(`/api/sightseeing/${id}`, this.auth(token));
  }

  createTransport(
    token: string,
    body: Partial<Transport>,
  ): Observable<Transport> {
    return this.http.post<Transport>(
      '/api/transportation',
      body,
      this.auth(token),
    );
  }

  deleteTransport(token: string, id: number): Observable<void> {
    return this.http.delete<void>(
      `/api/transportation/${id}`,
      this.auth(token),
    );
  }

  private auth(token: string): { headers: HttpHeaders } {
    return {
      headers: new HttpHeaders({ Authorization: `Bearer ${token}` }),
    };
  }
}
