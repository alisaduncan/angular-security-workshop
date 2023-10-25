import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule, HttpClientXsrfModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SearchComponent } from './home/search.component';
import { AdminComponent } from './admin/admin.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { BannerComponent } from './home/banner.component';
import { DealsComponent } from './home/deals.component';
import { HomeComponent } from './home/home.component';
import { ShopComponent } from './shop/shop.component';
import { CoffeePromoComponent } from './home/coffee-promo.component';
import { ResultsComponent } from './results/results.component';
import { FeaturedComponent } from './home/featured.component';
import { MembersComponent } from './members/members.component';
import { AuthConfigModule } from './auth/auth-config.module';
import { AuthInterceptor } from './auth.interceptor';
import { Observable } from 'rxjs';
import { UserTypeDirective } from './user-type.directive';

function xsrfTokenFactory(http: HttpClient): () => Observable<any> {
  return () => http.get('/api/xsrfEndpoint');
}

@NgModule({
  declarations: [
    AppComponent,
    SearchComponent,
    AdminComponent,
    FooterComponent,
    HeaderComponent,
    BannerComponent,
    DealsComponent,
    HomeComponent,
    ShopComponent,
    CoffeePromoComponent,
    ResultsComponent,
    FeaturedComponent,
    MembersComponent,
    UserTypeDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AuthConfigModule,
    HttpClientXsrfModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: APP_INITIALIZER, useFactory: xsrfTokenFactory, deps: [HttpClient], multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
