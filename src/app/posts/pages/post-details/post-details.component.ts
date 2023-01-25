import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { ApiService, PostApiData } from '../../data-access/api.service';

@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.component.html',
  styleUrls: ['./post-details.component.scss'],
})
export class PostDetailsComponent implements OnInit {
  postDetails$!: Observable<PostApiData>;

  constructor(
    private activatedroute: ActivatedRoute,
    private apiService: ApiService,
    private location: Location
  ) {}

  ngOnInit(): void {
    let paramMap = this.activatedroute.snapshot.paramMap;
    let id = +(paramMap.get('id') || '');

    this.postDetails$ = this.apiService.getPostById(id);
  }

  back = () => this.location.back();
}
