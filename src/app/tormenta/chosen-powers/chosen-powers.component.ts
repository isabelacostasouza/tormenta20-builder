import { Component, Input, OnInit, Output,EventEmitter } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { SubjectizeProps } from 'subjectize';

import database from '../../../assets/tormenta/database.json';

@Component({
  selector: 'chosen-powers',
  templateUrl: './chosen-powers.component.html',
  styleUrls: ['./chosen-powers.component.scss']
})
export class ChosenPowersComponent implements OnInit {

  @Input('level') char_level = 0;
  @Input('class') char_class = '';
  @Input('attributes_modifiers') char_modifiers = [0];

  @Output() chosen_powers_output = new EventEmitter<Object>();

  @SubjectizeProps(["char_level", "char_class", "char_modifiers"])
  propAB$ = new ReplaySubject(1);

  constructor() { }

  number_chosen_powers = 0;
  has_chosen_powers = false;
  powers_list = [""];
  powers_description = [""];
  chosen_powers = [""];
  chosen_powers_description = [""];

  classes = database["classe"];
  powers = database["poder"];

  class_element: any;
  elements_description: any;
  available_powers: any;

  ngOnInit(): void {
    this.char_level = 1;
    this.available_powers = 0;
    this.chosen_powers.pop();
    this.chosen_powers_description.pop();

    this.propAB$.subscribe((change: any) => {
      setTimeout(() => {
        this.getNumberAvailablePowers();
        this.getAvailablePowers();
        this.enable_powers();
      }, 5);
    });

    setTimeout(() => {
      this.getNumberAvailablePowers();
      this.getAvailablePowers();
      this.chosen_powers.pop();
      this.chosen_powers_description.pop();
    }, 5);
  }

  getAvailablePowers() {
    let basic_powers = this.powers.filter((element: any) => {
      if (element["tipo"] == "Geral" || element["subtipo"] == this.char_class) return element;
    });

    let temp_dict = {
      "Geral": "  (Poder geral)",
      "Classe": "  (Poder de classe)"
    }

    this.powers_list = basic_powers.map((element: any) => element.nome + temp_dict[element.tipo]);
    this.powers_description = basic_powers.map((element: any) => {
      if(element.requisito) {
        return "Requisitos: " + JSON.stringify(element.requisito) + "\n" + element.descricao
      } else { return element.descricao }
    });
  }

  getNumberAvailablePowers() {
    this.available_powers = 0;
    this.number_chosen_powers = 0;
    this.has_chosen_powers = false;
    this.chosen_powers = [];

    this.class_element = this.classes.reduce((next: any, element: any) => {
      if (element["nome"] == this.char_class) return element;
      return next;
    });

    for(let i = 0; i < this.char_level; i++) {
      let level_class = this.class_element.niveis[i];
      if(level_class.poderes) { this.available_powers += 1 }
    }
  }

  choose_power(event: any) {
    if(this.available_powers > this.number_chosen_powers) {
      let power_index = parseInt(event.path[0].parentElement.parentElement.getElementsByClassName("panel-group")[0].id.split("accordion3_")[1]);
      this.chosen_powers.push(this.powers_list[power_index]);
      this.chosen_powers_description.push(this.powers_description[power_index]);
      this.powers_list.splice(power_index, 1);
      this.powers_description.splice(power_index, 1);

      this.has_chosen_powers = true;
      this.number_chosen_powers += 1;

      if(this.available_powers == this.number_chosen_powers) {
        this.disable_powers();
      }
    }
    this.chosen_powers_output.emit(this.chosen_powers);
  }

  remove_power(event: any) {
    if(this.available_powers == this.number_chosen_powers) {
      this.enable_powers();
    }

    let power_index = parseInt(event.path[0].parentElement.parentElement.getElementsByClassName("panel-group")[0].id.split("accordion2_")[1]);
    this.powers_list.push(this.chosen_powers[power_index]);
    this.powers_description.push(this.chosen_powers_description[power_index]);
    this.chosen_powers.splice(power_index, 1);
    this.chosen_powers_description.splice(power_index, 1);

    this.number_chosen_powers -= 1;
    if(this.number_chosen_powers == 0) { this.has_chosen_powers = false; }
    this.chosen_powers_output.emit(this.chosen_powers);
  }

  enable_powers() {
    let add_buttons = document.getElementsByClassName("add-power");

    for(let i = 0; i < add_buttons.length; i++) {
      add_buttons[i].classList.remove("disabled");
      (add_buttons[i] as any).disabled = false;
    }
  }

  disable_powers() {
    let add_buttons = document.getElementsByClassName("add-power");

    for(let i = 0; i < add_buttons.length; i++) {
      add_buttons[i].classList.add("disabled");
      (add_buttons[i] as any).disabled = true;
    }
  }

}
