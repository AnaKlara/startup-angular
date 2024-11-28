import { Component, ContentChild, Input, OnInit, TemplateRef } from '@angular/core';

@Component({
  selector: 'panel',
  templateUrl: './panel.component.html',
  styleUrl: './panel.component.scss',
})
export class PanelComponent implements OnInit {
  @Input({ required: true }) title: string;
  @Input({ required: true }) subtitle: string;
  @ContentChild('buttons') buttonsTemplate: TemplateRef<any>;
  @ContentChild('content') contentTemplate: TemplateRef<any>;

  ngOnInit() {
    if (!this.title || !this.subtitle) {
      throw new Error('Title and Subtitle is required');
    }
  }
}
