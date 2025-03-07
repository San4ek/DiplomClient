import { Component, Input, Output, EventEmitter } from '@angular/core';
import {RouterLink, RouterLinkActive} from '@angular/router';
import {MatIcon} from '@angular/material/icon';

@Component({
  selector: 'app-nav-item',
  templateUrl: './nav-item.component.html',
  imports: [
    RouterLink,
    RouterLinkActive,
    MatIcon
  ],
  styleUrls: ['./nav-item.component.scss']
})
export class NavItemComponent {
  @Input() icon: string = '';
  @Input() label: string = '';
  @Input() link: string = '';
  @Output() itemClick = new EventEmitter<void>();

  onClick(): void {
    this.itemClick.emit();
  }
}
