import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { SubjectizeProps } from 'subjectize';

import database from '../../assets/database.json';

@Component({
  selector: 'default-proficiencies',
  templateUrl: './default-proficiencies.component.html',
  styleUrls: ['./default-proficiencies.component.scss']
})
export class DefaultProficienciesComponent implements OnInit {

  @Input('class') char_class = '';

  @Output() proficiencies_output = new EventEmitter<number>();

  classes = database["classe"];

  @SubjectizeProps(["char_class"])
  propAB$ = new ReplaySubject(1);

  class_element: any;
  proficiencies_list: any;
  proficiencies_string = "";

  constructor() { }

  ngOnInit(): void {
    this.propAB$.subscribe(() => {
      setTimeout(() => {
        this.update_proediciencies();
      }, 5);
    });

    setTimeout(() => {
      this.update_proediciencies();
    }, 5);
  }

  update_proediciencies() {
    this.class_element = this.classes.reduce((next: any, element: any) => {
      if (element["nome"] == this.char_class)
        return element;
      return next;
    });

    this.proficiencies_list = this.class_element.proeficiencias;
    if(this.proficiencies_list) {
      for(let i = 0; i < this.proficiencies_list.length; i++) {
        this.proficiencies_string += "<td>" + this.proficiencies_list[i] + "</td>";
      }
    }
    this.proficiencies_output.emit(this.proficiencies_list);
  }

}
