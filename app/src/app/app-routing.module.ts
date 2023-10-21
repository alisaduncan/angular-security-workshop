import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ShopComponent } from './shop/shop.component';
import { ResultsComponent } from './results/results.component';
import { MembersComponent } from './members/members.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'shop', component: ShopComponent },
  { path: 'results', component: ResultsComponent },
  { path: 'members', component: MembersComponent },
  { path: 'admin', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule)},
  { path: '', redirectTo: '/home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { bindToComponentInputs: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
