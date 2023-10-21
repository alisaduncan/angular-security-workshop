import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

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
    MembersComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AuthConfigModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
