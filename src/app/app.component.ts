import {Component, OnInit} from '@angular/core';
import {TheCatApiService} from "./services/the-cat-api.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'cats-pinterest';
  countArr = 0
  constructor(private catApiService:TheCatApiService) {

  }
  ngOnInit() {
    this.countArr = this.catApiService.favouriteList.length
    this.getCountFavouriteCats()
  }
  getCountFavouriteCats(){
    this.catApiService.countFavoriteCats$.subscribe(response =>{
      this.countArr = response
    })
  }

}
