import { Component, Input } from '@angular/core';

@Component({
  selector: 'tooltip',
  templateUrl: './tooltip.component.html',
  styleUrl: './tooltip.component.scss',
})
export class TooltipComponent {
  @Input() text = '';
  @Input() left = 0;
  @Input() top = 0;
}
