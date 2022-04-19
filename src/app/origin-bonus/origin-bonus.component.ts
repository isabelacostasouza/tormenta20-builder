import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { SubjectizeProps } from 'subjectize';

import database from '../../assets/database.json';

@Component({
  selector: 'origin-bonus',
  templateUrl: './origin-bonus.component.html',
  styleUrls: ['./origin-bonus.component.scss']
})
export class OriginBonusComponent implements OnInit {

  @Input('origin') char_origin = '';

  @Output() origin_bonus = new EventEmitter<number>();

  @SubjectizeProps(["char_origin"])
  propAB$ = new ReplaySubject(1);

  origins = database["origem"];
  origin_items: any;

  constructor() { }

  ngOnInit(): void {
    this.propAB$.subscribe(() => {
      setTimeout(() => {
        this.init();
      }, 5);
    });

    setTimeout(() => {
      this.init();
    }, 5);
  }

  init() {
    let origin_element = this.origins.reduce((next: any, element: any) => {
      if (element["nome"] == this.char_origin)
        return element;
      return next;
    });

    this.origin_items = origin_element.items;
    this.origin_bonus.emit(this.origin_items);
  }

}
