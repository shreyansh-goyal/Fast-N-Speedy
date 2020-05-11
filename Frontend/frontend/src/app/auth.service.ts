import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }
  loggedIn()
  {
    return !!localStorage.getItem('admin');
  }
}
