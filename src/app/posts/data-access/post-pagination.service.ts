import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest, distinctUntilChanged, firstValueFrom, map, Observable, of, shareReplay, startWith, switchMap, tap } from 'rxjs';
import { Post } from './post.service';

@Injectable({
  providedIn: 'root'
})
export class PostPaginationService {
  private readonly itemsPerPage = 10;
  private readonly searchText$ = new BehaviorSubject<string>('');
  private readonly pageNumber$ = new BehaviorSubject<number>(1);

  data$!: Observable<Post[]>;

  paginatedData$ = this.searchText$.pipe(
      startWith(""),
      tap(_=> this.pageNumber$.next(1)),
      distinctUntilChanged(),
      shareReplay(1),
       // whenever a new search term is updated, reset the pagination.
      switchMap(searchText => 
        combineLatest([
            this.data$,
            this.pageNumber$,
            of(this.itemsPerPage)
        ]).pipe(
          //TO DO: Abstract this into a method (eg search?)
          map(([posts, pageNumber, itemsPerPage]) => {
              return {
                  posts: posts.filter(post => post.userName.toLowerCase().includes(searchText.toLowerCase())),
                  pageNumber: pageNumber,
                  itemsPerPage: itemsPerPage
              }
          }),
          //TO DO: Abstract this into a method (eg update pagination?)
          map(({ posts, pageNumber, itemsPerPage }) => {
              return {
                  posts: posts.slice((pageNumber - 1) * itemsPerPage, pageNumber * itemsPerPage),
                  pagination:{
                    currentPage: this.pageNumber$.value,
                    totalPages: posts.length / this.itemsPerPage,
                    totalItems: posts.length
                  }
              }
          })
        )
      )
    );
  
  constructor() {}

  setData(data$: Observable<Post[]>) {
    this.data$ = data$;
  }

  async nextPage() {
    if (this.pageNumber$.value >= (await firstValueFrom(this.paginatedData$)).pagination.totalPages) return;
    this.pageNumber$.next(this.pageNumber$.value + 1);
  }

  async previousPage() {
    if (this.pageNumber$.value === 1) return;
    this.pageNumber$.next(this.pageNumber$.value - 1);
  }

  setSearchText(searchText: string) {
    this.searchText$.next(searchText);
    //this.pageNumber$.next(1);
  }

  get currentPageNumber$(): Observable<number> {
    return this.pageNumber$.asObservable();
  }

}

export interface PaginationSetting {
  currentPage: number;
  totalPages: number;
  totalItems: number;
}
