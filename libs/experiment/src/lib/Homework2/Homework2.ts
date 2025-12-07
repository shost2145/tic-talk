import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'lib-homework2',
  imports: [],
  templateUrl: './Homework2.html',
  styleUrl: './Homework2.css',
})
export class Homework2 implements OnInit {

  ngOnInit() {
    document.querySelectorAll('.faq1').forEach(element => {
      element.addEventListener('click', (e) => {
        const target = e.currentTarget as HTMLElement;
        target.classList.toggle('open');
      });
    });
  }
}
