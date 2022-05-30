import {AfterContentInit, Component, OnInit} from '@angular/core';
import {TheCatApiService} from "../../../services/the-cat-api.service";

@Component({
  selector: 'app-favourite-cats',
  templateUrl: './favourite-cats.component.html',
  styleUrls: ['./favourite-cats.component.scss']
})
export class FavouriteCatsComponent implements OnInit {

  constructor(private catApiService: TheCatApiService) {

  }

  catObject: any
  noPic = false

  ngOnInit(): void {
    this.catObject = localStorage.getItem('cats')
    this.catObject = JSON.parse(this.catObject)
    this.noPic = this.catObject.length == 0 ? true : false
  }

  deleteLike(id: number, index: number) {
    const classId = document.getElementById(`like_${id}`)
    classId?.classList.remove("liked");
    classId?.remove()
    this.catApiService.deleteFromFavourite(id)
    document.getElementById(`cat_${id}`)?.remove()
    this.ngOnInit()
  }

}
