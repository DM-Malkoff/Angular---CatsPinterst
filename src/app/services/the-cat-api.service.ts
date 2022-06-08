import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable, Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class TheCatApiService {
  constructor(private http: HttpClient) {

  }

  apiUrl = ''
  count = []
  countArr = 0

  favouriteList: any[] = JSON.parse(localStorage.getItem('cats') || '[]')

  public countFavoriteCats$ = new Subject<number>()

  getCats(page: number) {
    return this.http
      .get(`https://api.thecatapi.com/v1/images/search?page=${page}&limit=25`)
  }

  addToFavourite(id: number, catObj: any) {
    if (!this.favouriteList.find(item => item.id == id)) {
      this.favouriteList.push(catObj)
    }
    localStorage.setItem('cats', JSON.stringify(this.favouriteList))
    this.countFavoriteCats$.next(this.favouriteList.length)
  }

  deleteFromFavourite(id: number) {
    let index = this.favouriteList.findIndex(item => item.id == id)
    this.favouriteList.splice(index, 1)
    localStorage.setItem('cats', JSON.stringify(this.favouriteList))
    this.countFavoriteCats$.next(this.favouriteList.length)
  }
}

