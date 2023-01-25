import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-post-pagination',
  templateUrl: './post-pagination.component.html',
  styleUrls: ['./post-pagination.component.scss']
})
export class PostPaginationComponent {
  @Output() backEvent = new EventEmitter();
  @Output() forwardEvent = new EventEmitter();
  @Input() pageNumber: number = 1;
  @Input() maxPages: number = 1;
  @Input() totalItems: number =0;

  back = () => this.backEvent.emit();
  forward = () => this.forwardEvent.emit();

  get isLastPage():Boolean{
    return this.pageNumber === this.maxPages;
  }

  get isFirstPage():Boolean{ 
    return this.pageNumber === 1;
  }
  
}
