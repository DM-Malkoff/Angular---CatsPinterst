import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  QueryList,
  ViewChildren
} from '@angular/core';
import {TheCatApiService} from "../../../services/the-cat-api.service";
import {Subscription} from "rxjs";
import {LoaderService} from "../../../services/loader/loader.service";

@Component({
  selector: 'app-all-cats',
  templateUrl: './all-cats.component.html',
  styleUrls: ['./all-cats.component.scss']
})
export class AllCatsComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChildren('theLastList', {read: ElementRef})
  theLastList?: QueryList<ElementRef>

  subsGetCat?: Subscription
  catObject: any = []
  catObject2: any = []
  currentPage = 0
  observer: any

  constructor(
    private catApiService: TheCatApiService,
    public loaderService: LoaderService
  ) {

  }

  ngOnInit(): void {
    this.getCat()
    this.intersectionObserver()
  }

  ngAfterViewInit() {
    this.theLastList?.changes.subscribe((d) => {
      if (d.last) this.observer.observe(d.last.nativeElement)
    })
  }

  getCat() {
    this.subsGetCat = this.catApiService.getCats(this.currentPage).subscribe((response) => {
      if (this.currentPage == 0) {
        this.catObject = response
      } else {
        this.catObject = this.catObject.concat(response)
      }
    })
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

  intersectionObserver() {
    let options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    }

    this.observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        this.currentPage++
        console.log('Страница: ', this.currentPage)
        this.getCat()
      }
    }, options)
  }

  ngOnDestroy() {
    if (this.subsGetCat) {
      this.subsGetCat.unsubscribe()
    }
  }
}
