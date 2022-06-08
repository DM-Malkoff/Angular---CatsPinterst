import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {FavouriteCatsComponent} from "./shared/layouts/favourite-cats/favourite-cats.component";
import {AppComponent} from "./app.component";
import {AllCatsComponent} from "./shared/layouts/all-cats/all-cats.component";

const routes: Routes = [

  // {path: '', redirectTo: 'all-kotiki', pathMatch: 'full'},
  {path: '', component: AllCatsComponent, pathMatch:'full'},
  {path: 'favourite-kotiki', component: FavouriteCatsComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
