import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8005/auth'; // Your backend URL
 
  constructor(private http: HttpClient) {}

  register(user: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, user);
  }

  login(credentials: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credentials).pipe(
      tap((response: any) => {
        localStorage.setItem('token', response.token);
        localStorage.setItem('userData', response.userName);
      })
    );
  }

  logout() {
    localStorage.removeItem('token');
  }
  getUserData(){
    return localStorage.getItem('userData');
  }
  getToken() {
    return localStorage.getItem('token');
  }

  isAuthenticated(): boolean {
    const token = this.getToken();
    return !!token;
  }
  setCartData(getDataValue:any){
    localStorage.setItem('cartData',JSON.stringify(getDataValue));
  }
  getCartData():any{
    return localStorage.getItem('cartData');
  }
  postCreateOrder(Data:any):any{
    return this.http.post('http://localhost:8005/orders', Data);
  }
  getAllOrders():any{
    return this.http.get('http://localhost:8005/orders');
  }
  getOrdersById(id:any):any{
    return this.http.get('http://localhost:8005/orderItem/'+id);
  }
}