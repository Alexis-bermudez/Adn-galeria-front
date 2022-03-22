import { Component, OnInit, Input } from '@angular/core';
import { MenuItem } from '@core/modelo/menu-item';

@Component({
  selector: 'app-navbar',
  templateUrl: 'navbar.component.html',
  styles: [],
})
export class NavbarComponent implements OnInit {

  @Input()
  navItems: MenuItem[];

  constructor() { }

  ngOnInit() {
  }

}
