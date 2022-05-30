import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class TheCatApiService {
  constructor(private http: HttpClient) {

  }

  apiUrl = 'https://api.thecatapi.com/v1/images/search?limit=15'

  favouriteList: any[] = JSON.parse(localStorage.getItem('cats') || '[]')

  public catsApiObservable$ = new Subject()

  getCats() {
    return this.http.get(this.apiUrl).subscribe((response) => {
      this.catsApiObservable$.next(response)
    })
  }

  addToFavourite(id: number, catObj: any) {

    if (!this.favouriteList.find(item => item.id == id)) {
      this.favouriteList.push(catObj)
    }

    localStorage.setItem('cats', JSON.stringify(this.favouriteList))
  }

  deleteFromFavourite(id: number) {
    let index = this.favouriteList.findIndex(item => item.id == id)
    this.favouriteList.splice(index, 1)
    localStorage.setItem('cats', JSON.stringify(this.favouriteList))
  }
}

