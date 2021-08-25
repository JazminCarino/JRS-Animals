import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Animal } from './models/animal.model';

const baseUrl = 'http://localhost:8080/api';

@Injectable({
  providedIn: 'root',
})
export class AnimalsService {
  constructor(private http: HttpClient) {}

  getAnimals(): Observable<any> {
    console.log('getting animals');
    return this.http.get(`${baseUrl}/animals`);
  }

  createAnimal(animal: Animal): Observable<any> {
    return this.http.post(`${baseUrl}/animal`, animal);
  }

  delete(animal: Animal): Observable<any> {
    return this.http.delete(`${baseUrl}/animal/${animal.id}`);
  }

  update(id: any, data: any): Observable<any> {
    return this.http.put(`${baseUrl}/animal/update/${id}`, data);
  }

  login(username: string, password: string): Observable<any> {
    return this.http.post(`${baseUrl}/user/login`, { username: username, password: password })
  }
      
  createUser(username: string, password: string): Observable<any> {
    return this.http
      .post(`${baseUrl}/user/create`, {
        username: username,
        password: password,
      })
    }
      
}
