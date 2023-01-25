import { Component, OnInit,} from '@angular/core';
import { Observable } from 'rxjs';
import { PaginationSetting, PostPaginationService } from './data-access/post-pagination.service';
import { Post, PostService } from './data-access/post.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {
  vm$!: Observable<{ posts: Post[]; pagination: PaginationSetting }>;
  
  constructor(private postService: PostService, private postPaginationService: PostPaginationService) {}
  
  ngOnInit() {
    this.postService.init();
    this.postPaginationService.setData(this.postService.getAllPosts());
    this.vm$ = this.postPaginationService.paginatedData$;
  }

  updateSearch = (searchTerm: string) =>
    this.postPaginationService.setSearchText(searchTerm);
  
  nextPage = async() => 
    this.postPaginationService.nextPage();

  previousPage = async () =>
    this.postPaginationService.previousPage();
  

}

