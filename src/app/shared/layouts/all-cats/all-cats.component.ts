import {Component, OnDestroy, OnInit} from '@angular/core';
import {TheCatApiService} from "../../../services/the-cat-api.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-all-cats',
  templateUrl: './all-cats.component.html',
  styleUrls: ['./all-cats.component.scss']
})
export class AllCatsComponent implements OnInit, OnDestroy {
  subsGetCat: Subscription
  catObject: any

  constructor(private catApiService: TheCatApiService) {
    this.subsGetCat = this.catApiService.catsApiObservable$.subscribe(response => {
      this.catObject = response
    })
  }

  ngOnInit(): void {
    this.getCat()
  }

  getCat() {
    this.catApiService.getCats()
  }

  pushLike(id: any, index: number) {
    this.catApiService.addToFavourite(id, this.catObject[index])
    const classId = document.getElementById(`like_${id}`)
    if (classId?.classList.contains('liked')) {
      classId.classList.remove("liked");
      this.catApiService.deleteFromFavourite(id)
    } else {
      classId?.classList.add("liked");
    }
  }

  ngOnDestroy() {
    if (this.subsGetCat) {
      this.subsGetCat.unsubscribe()
    }
  }
}
