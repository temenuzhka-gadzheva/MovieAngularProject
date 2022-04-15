import { Injectable } from '@angular/core';
import { HttpClient, JsonpClientBackend } from '@angular/common/http';
import { Login } from '../models/login.model';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) {
  }

  login$(data: Login): Observable<User | null> {
    return this.http.get<User[]>(`${environment.baseUrl}/users`).pipe(
      map((response: User[] ) => {
        const user = response.find(u => u.username === data.username && u.password === data.password);

        if (user) {
          return user;
        }

        return null;
      })
    );
  }
 
  logout(): void {
    localStorage.removeItem('loggedUser');
  }

  storeUserData(user: User): void {
    delete user.password;
    localStorage.setItem('loggedUser', JSON.stringify(user));

  }

  getUserFromStorage(): User {
  let user = localStorage.getItem('loggedUser') === null
  ? undefined 
  : JSON.parse(localStorage.getItem('loggedUser') || '{}');
  return user;
   
   
  }
}
