import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { SubjectizeProps } from 'subjectize';

import database from '../../../assets/tormenta/database.json';

@Component({
  selector: 'default-powers',
  templateUrl: './default-powers.component.html',
  styleUrls: ['./default-powers.component.scss']
})
export class DefaultPowersComponent implements OnInit{

  @Input('level') char_level = 0;
  @Input('race') char_race = 0;
  @Input('class') char_class = '';
  @Input('god') char_god = '';
  @Input('origin') char_origin = '';

  @Output() default_powers = new EventEmitter<number>();

  @SubjectizeProps(["char_level", "char_race", "char_class", "char_god", "char_origin"])
  propAB$ = new ReplaySubject(1);

  races = database["raça"];
  classes = database["classe"];
  origins = database["origem"];
  powers = database["poder"];
  gods = database["deus"];

  given_powers: any;
  race_element: any;
  class_element: any;
  origin_element: any;
  god_element: any;
  elements_description: any;
  available_magic: any;
  available_powers: any;

  ngOnInit(): void {
    this.init();

    this.propAB$.subscribe(() => {
      setTimeout(() => {
        this.init();
      }, 5);
    });
  }

  init() {
    this.available_powers = 0;
    this.elements_description = [""];
    this.available_magic = [0, 0, 0, 0, 0];

    this.race_element = this.races.reduce((next: any, element: any) => {
      if (element["nome"] == this.char_race) return element; return next;
    });

    this.class_element = this.classes.reduce((next: any, element: any) => {
      if (element["nome"] == this.char_class) return element;
      return next;
    });

    this.origin_element = this.origins.reduce((next: any, element: any) => {
      if (element["nome"] == this.char_origin) return element;
      return next;
    });
  
    this.god_element = this.gods.reduce((next: any, element: any) => {
      if (element["nome"] == this.char_god) return element;
      return next;
    });

    this.given_powers = this.race_element.habilidades.concat(this.origin_element.poderes).concat(this.god_element.poderes);

    for(let i = 0; i < this.char_level; i++) {
      let level_class = this.class_element.niveis[i];
      if(level_class.habilidades) { this.given_powers = this.given_powers.concat(level_class.habilidades); }
      if(level_class.poderes) { this.available_powers += 1 }
    }

    this.elements_description.pop();
    for(let i = 0; i < this.given_powers.length; i++) {
      let element = this.powers.reduce((next: any, element: any) => {
        if (element["nome"] == this.given_powers[i])
            return element;
        return next;
      });
      this.elements_description.push(element.descricao);
    }

    this.default_powers.emit(this.given_powers);
  }

}
