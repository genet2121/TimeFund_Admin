import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-dashborardcard',
  standalone: true,
  imports: [],
  templateUrl: './dashborardcard.component.html',
  styleUrl: './dashborardcard.component.css',
})
export class DashborardcardComponent {
  @Input() title: string = '';
  @Input() amount: string = '0';
  @Input() icon: string = '';
}
