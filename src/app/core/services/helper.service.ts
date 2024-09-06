import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import admin from '../model/admin.model';

@Injectable({
  providedIn: 'root',
})
export class HelperService {
  private user!: admin;

  constructor() {
    this.user = JSON.parse(localStorage.getItem('user')!);
  }

  public get getLogInUser() {
    return this.user;
  }

  public set setLogInUser(user: admin) {
    this.user = user;
    localStorage.setItem('user', JSON.stringify(user));
  }

  isUserLoggedIn() {
    return this.user === null ? false : true;
  }

  getUserToken(): HttpHeaders {
    const token = this.user?.token || '';
    if (token) {
      return new HttpHeaders({
        Authorization: `Bearer ${token}`,
      });
    } else {
      console.error('Token not found in localStorage.');
      return new HttpHeaders();
    }
  }

  // getRole(): number[] {
  //   if (this.user && this.user.role_id) {
  //     if (Array.isArray(this.user.role_id)) {
  //       return this.user.role_id; // Return the array if it's already an array
  //     } else {
  //       return [this.user.role_id]; // Wrap the single role_id in an array
  //     }
  //   }
  //   return []; // Return an empty array if role_id is not available
  // }
  getUserGroup(): number[] {
    if (this.user && this.user.user_group_id) {
      return [this.user.user_group_id]; // Wrap the single user_group_id in an array
    }
    return []; // Return an empty array if user_group_id is not available
  }
  logoutUser(){
    localStorage.clear();
    window.location.href = "/auth/login";
  }

  getemail(): string {
    return this.user.email!;
  }
  isTokenExpired(): boolean {
    const token = this.user?.token;
    if (!token) return true; //  means it's expired

    // Decode the token to get the expiration time
    const tokenParts = token.split('.');
    if (tokenParts.length !== 3) return true; // Invalid token format

    const payload = JSON.parse(atob(tokenParts[1]));
    const now = Date.now() / 1000;
    return payload.exp < now; // Expiration time is in seconds
  }
}
