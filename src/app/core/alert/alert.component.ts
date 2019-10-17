import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent implements OnInit {

  @Input() type: string = null;
  @Input() message: string = null;
  hidden: boolean = true;
  constructor() { }

  ngOnInit() {

    if (this.message) {
      setTimeout(() => {
        this.hidden = false;
      }, 5000);
    }
  }

}
