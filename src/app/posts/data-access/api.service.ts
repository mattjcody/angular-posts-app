import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private apiUrl = 'https://jsonplaceholder.typicode.com';

  constructor(private http: HttpClient) {}

  getUsers = (): Observable<UserApiData[]> =>
    this.http.get<UserApiData[]>(`${this.apiUrl}/users`);

  getPosts = (): Observable<PostApiData[]> =>
    this.http.get<PostApiData[]>(`${this.apiUrl}/posts`);

  getPostById = (id: number): Observable<PostApiData> =>
    this.http.get<PostApiData>(`${this.apiUrl}/posts/${id}`);
}

export interface UserApiData {
  id: number;
  username: string;
}

export interface PostApiData {
  userId: number;
  id: number;
  title: string;
  body: string;
}
