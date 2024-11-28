import { Component, HostBinding, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit {
  hasHamburger: boolean;
  active: boolean;

  constructor() {
    this.hasHamburger = true;
    this.active = true;
  }

  ngOnInit() {
    this.active = !this.active;
  }
  // adds padding to the top of the document, so the content is below the header
  @HostBinding('class.bx--header') headerClass = true;
}
