import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

import pericias from '../../assets/pericias.json';
import database from '../../assets/database.json';

@Component({
  selector: 'expertise-table',
  templateUrl: './expertise-table.component.html',
  styleUrls: ['./expertise-table.component.scss']
})
export class ExpertiseTableComponent implements OnInit {

  @Input('level') char_level = 0;
  @Input('half_level') half_level = 0;
  @Input('total_expertises') total_expertises = 0;
  @Input('class') char_class = '';
  @Input('origin') char_origin = '';
  @Input('modifiers') modifiers = [0];

  @Output() expertises_table_output = new EventEmitter<Object>();

  used_expertises = 0;

  expertises = pericias["pericias"];
  classes = database["classe"];
  origins = database["origem"];

  train = Array.from({length: 30}, (_) => 0);
  others = Array.from({length: 30}, (_) => 0);
  expertises_indexes = Array.from({length: 30}, (_, i) => i);

  class_element: any;
  origin_element: any;

  constructor() { }

  ngOnInit(): void {
    if(screen.width < 1200) {
      document.getElementsByTagName("table")[0].classList.add("larger-table");
    }

    setTimeout(() => {
      this.set_elements();
      this.check_default_expertises();
    }, 5);
  }

  set_elements() {
    this.class_element = this.classes.reduce((next: any, element: any) => {
      if (element["nome"] == this.char_class)
        return element;
      return next;
    });
  
    this.origin_element = this.origins.reduce((next: any, element: any) => {
      if (element["nome"] == this.char_origin)
        return element;
      return next;
    });
  }

  check_default_expertises() {
    let checkboxes = document.getElementsByClassName('checkbox');
    let pericias_classe = this.class_element.pericia.concat(this.origin_element.pericia);
    for(let i = 0; i < pericias_classe.length; i++) {
      let stats_pericia = this.expertises.reduce((next: any, element: any) => {
        if (element["nome"] == pericias_classe[i])
            return element;
        return next;
      });
      let element = (checkboxes.item(stats_pericia.index) as HTMLInputElement);
      element.checked = true;
      element.disabled = true;
      element.classList.add("default_expertise");
      if(this.char_level < 7) {
        this.train[stats_pericia.index] = 2;
      } else if(this.char_level < 15) {
        this.train[stats_pericia.index] = 4;
      } else {
        this.train[stats_pericia.index] = 6;
      }
    }
    this.expertises_table_output.emit(this.set_expertises_object());
  }

  select_expertise(event: any) {
    var index = event.target.className.split(" ")[0];
    let checkboxes = document.getElementsByClassName('checkbox');
  
    if(event.target.checked && this.used_expertises <= this.total_expertises) {
      this.used_expertises += 1;
      if(this.char_level < 7) {
        this.train[index] = 2;
      } else if(this.char_level < 15) {
        this.train[index] = 4;
      } else {
        this.train[index] = 6;
      }

      if(this.used_expertises == this.total_expertises) {
        for(let i = 0; i < checkboxes.length; i++) {
          let element = (checkboxes.item(i) as HTMLInputElement);
          if(!element.classList.contains("default_expertise") && !(element.checked)) {
            element.disabled = true;
          }
        }
      }
    } else if(!event.target.checked) {
      if(this.used_expertises == this.total_expertises) {
        for(let i = 0; i < checkboxes.length; i++) {
          let element = (checkboxes.item(i) as HTMLInputElement);
          if(!element.classList.contains("default_expertise") && !(element.checked)) {
            element.disabled = false;
          }
        }
      }
      this.train[index] = 0;
      this.used_expertises -= 1;
    }
    this.expertises_table_output.emit(this.set_expertises_object());
  }

  change_other_expertises(event: any) {
    var index = event.target.className.split(" ")[0];
    this.others[index] = parseInt(event.target.value);
    this.expertises_table_output.emit(this.set_expertises_object());
  }

  set_expertises_object() {
    return {
      "train": this.train,
      "others": this.others,
    };
  }

}