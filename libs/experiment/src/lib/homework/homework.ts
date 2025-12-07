import {Component,inject, Renderer2} from '@angular/core';

@Component({
  selector: 'lib-homework',
  templateUrl: './homework.html',
  styleUrls: ['./homework.css'],
  standalone: true,
})
export class Homework {
  r2 = inject(Renderer2);

  toggleContent(): void {
    const tab2Divs = document.getElementsByClassName('tab2');
    this.r2.setStyle(tab2Divs[0], 'display', 'none');

  }
}
