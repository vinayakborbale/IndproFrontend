import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductListComponent } from './product-list/product-list.component';
import { CartComponent } from './cart/cart.component';
import { RegisterComponent } from './auth/register/register.component';
import { LoginComponent } from './auth/login/login.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthService } from 'src/auth.service';
import { CartService } from 'src/cart.service';
import { ProductService } from 'src/product.service';
import { TokenInterceptor } from './interceptor/token.interceptor';
import { SearchFilterPipe } from './util/search-filter.pipe';
import { NavBarComponent } from './nav-bar/nav-bar.component';


@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent,
    CartComponent,
    RegisterComponent,
    LoginComponent,
    SearchFilterPipe,
    NavBarComponent
   
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [
    AuthService,
    ProductService,
    CartService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}