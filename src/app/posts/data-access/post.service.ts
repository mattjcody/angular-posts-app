import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest, map, Observable } from 'rxjs';
import { ApiService, PostApiData, UserApiData } from './api.service';

export interface Post {
  userId: number;
  userName: string;
  id: number;
  title: string;
  body: string;
}

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private posts$ = new BehaviorSubject<PostApiData[]>([]);
  private users$ = new BehaviorSubject<UserApiData[]>([]);

  constructor(private apiService: ApiService) { }

  init(): void{
    this.apiService
      .getPosts()
      .subscribe((posts) => {
        this.posts$.next(posts);
      });

    this.apiService
      .getUsers()
      .subscribe((users) => {
        this.users$.next(users);
      });
  }

  getAllPosts(): Observable<Post[]>{
    return combineLatest({
      posts: this.posts$,
      users: this.users$
    }).pipe(
      map(({posts, users}) => this.mapToPost(posts, users))
    );
  }

  private mapToPost(posts: PostApiData[], users: UserApiData[]): Post[] {
    return posts.map(post => {
      const user = users.find(user => user.id === post.userId);
      return {
        userId: post.userId,
        userName: user ? user.username : "Unknown User",  // assume a name if a match isn't found
        id: post.id,
        title: post.title,
        body: post.body
      } as Post;
    });
  }

}
