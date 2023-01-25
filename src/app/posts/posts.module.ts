import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { PostsComponent } from './posts.component';
import { PostDetailsComponent } from './pages/post-details/post-details.component';
import { PostsRoutingModule } from './posts-routing.module';
import { PostPaginationComponent } from './ui/post-pagination/post-pagination.component';
import { PostResultCardComponent } from './ui/post-result-card/post-result-card.component';

@NgModule({
  declarations: [
    PostsComponent,
    PostPaginationComponent,
    PostDetailsComponent,
    PostResultCardComponent,
  ],
  imports: [CommonModule, PostsRoutingModule, FormsModule, RouterModule],
})
export class PostsModule {}
