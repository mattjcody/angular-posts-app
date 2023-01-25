import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-post-result-card',
  templateUrl: './post-result-card.component.html',
  styleUrls: ['./post-result-card.component.scss']
})
export class PostResultCardComponent {
  @Input() id: number = 1;
  @Input() title: string = '';
  @Input() body: string = '';
  @Input() userName: string= ''; 
}

