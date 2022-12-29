import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { SubjectizeProps } from 'subjectize';
import { ReplaySubject } from 'rxjs';

import database from '../../../assets/tormenta/database.json';
import attributes from '../../../assets/tormenta/attributes.json';

@Component({
  selector: 'base-attributes',
  templateUrl: './base-attributes.component.html',
  styleUrls: ['./base-attributes.component.scss']
})
export class BaseAttributesComponent implements OnInit {

  @Input('level') char_level: any;
  @Input('class') char_class = '';
  @Input('origin') char_origin = '';
  @Input('race') char_race = '';
  @Input('god') char_god = '';
  @Input('extra_attributes') extra_outputs_import: any;
  @Input('modifiers_import') modifiers_import: any;

  @SubjectizeProps(["char_class", "char_race", "char_level", "extra_outputs_import", "modifiers_import"])
  propAB$ = new ReplaySubject(1);

  @Output() total_expertises_output = new EventEmitter<number>();
  @Output() life_points_output = new EventEmitter<number>();
  @Output() mana_points_output = new EventEmitter<number>();
  @Output() attributes_modifiers_output = new EventEmitter<number[]>();
  @Output() attributes_values_output = new EventEmitter<number[]>();
  @Output() extra_output_indexes = new EventEmitter<number[]>();

  classes = database["classe"];
  races = database["raça"];

  life_points = 0;
  mana_points = 0;
  total_expertises = 0;
  extra_attributes = 0;
  free_attributes_cost = 0;
  extra_attributes_list:any[] = [];

  attributes_modifiers = [2, 2, 1, 1, 1, 1];  
  attributes_values = [14, 14, 13, 13, 13, 13];

  attributes_values_cost = attributes["custo"];
  attributes_modifiers_cost = attributes["modificador"];

  class_element: any;
  race_element: any;

  constructor() { }

  ngOnInit(): void {

    this.propAB$.subscribe((changes: any) => {
      setTimeout(() => {
        if(changes[0] == "char_race") {
          this.reset_attributes();
    
          this.race_element = this.races.reduce((next: any, element: any) => {
              if (element["nome"] == changes[1]) return element;
              return next;
            });
    
          this.add_race_attributes();
          this.update_basic_stats();
        }
        if(changes[0] == "char_class") {
          this.total_expertises = 0;
          this.life_points = 0;
          this.mana_points = 0;
          
          this.class_element = this.classes.reduce((next: any, element: any) => {
            if (element["nome"] == changes[1]) return element;
            return next;
          });
          
          this.update_basic_stats();
        }
        if(changes[0] == "char_level") {
          this.update_basic_stats();
        }
        if(changes[0] == "extra_outputs_import") {
          this.reset_attributes();

          if(this.extra_outputs_import) for(let i = 0; i < this.extra_outputs_import.length; i++) {
            document.getElementById("extra_attributes")!.getElementsByTagName("input")[this.extra_outputs_import[i]].checked = true;   

            this.select_extra_attribute( { target: { className: (this.extra_outputs_import[i]+" "), checked: true } } );
          }
        }
        if(changes[0] == "modifiers_import") {
          setTimeout(() => {
            if(this.modifiers_import) {
              for(let i = 0; i < 6; i++)
                while(this.modifiers_import[1][i] < this.attributes_values[i])
                  this.downgrade_attribute(i);
              for(let i = 0; i < 6; i++)
                  while(this.modifiers_import[1][i] > this.attributes_values[i])
                    this.upgrade_attribute(i);
            }
          }, 10);
        }
      }, 100);
    });

    setTimeout(() => {
      this.set_elements();      
      this.add_default_attributes();
    }, 5);
  }

  reset_attributes() {
    this.total_expertises = 0;
    this.life_points = 0;
    this.mana_points = 0;
    this.attributes_modifiers = [2, 2, 1, 1, 1, 1];  
    this.attributes_values = [14, 14, 13, 13, 13, 13];
    this.free_attributes_cost = 0;
    this.extra_attributes = 0;

    if(document.getElementById("extra_attributes")) for(let i = 0; i < 6; i++) {
      let element = document.getElementById("extra_attributes")!.getElementsByTagName("input")[i];
      if(element && element.checked) {
        element.checked = false;
        this.select_extra_attribute( { target: { className: (i+" "), checked: false } } ); 
      }
    }
  }

  set_elements() {
    this.class_element = this.classes.reduce((next: any, element: any) => {
      if (element["nome"] == this.char_class) return element;
      return next;
    });
  
    this.race_element = this.races.reduce((next: any, element: any) => {
      if (element["nome"] == this.char_race) return element;
      return next;
    });
    this.add_default_attributes();
  }

  add_race_attributes() {
    let attributes = this.race_element.atributos;

    if(attributes["força"]) {
      this.attributes_values[0] += attributes["força"];
      this.attributes_modifiers[0] = this.attributes_modifiers_cost[this.attributes_values[0]];
    }
    if(attributes["destreza"]) {
      this.attributes_values[1] += attributes["destreza"];
      this.attributes_modifiers[1] = this.attributes_modifiers_cost[this.attributes_values[1]];
    }
    if(attributes["constituição"]) {
      this.attributes_values[2] += attributes["constituição"];
      this.attributes_modifiers[2] = this.attributes_modifiers_cost[this.attributes_values[2]];
    }
    if(attributes["inteligência"]) {
      this.attributes_values[3] += attributes["inteligência"];
      this.attributes_modifiers[3] = this.attributes_modifiers_cost[this.attributes_values[3]];
    }
    if(attributes["sabedoria"]) {
      this.attributes_values[4] += attributes["sabedoria"];
      this.attributes_modifiers[4] = this.attributes_modifiers_cost[this.attributes_values[4]];
    }
    if(attributes["carisma"]) {
      this.attributes_values[5] += attributes["carisma"];
      this.attributes_modifiers[5] = this.attributes_modifiers_cost[this.attributes_values[5]];
    }

    this.attributes_modifiers_output.emit(this.attributes_modifiers);
    this.attributes_values_output.emit(this.attributes_values);
  }

  add_default_attributes() {
    this.reset_attributes();
    this.update_basic_stats();
    this.add_race_attributes();
  }

  select_extra_attribute(event: any) {
    var index = event.target.className.split(" ")[0];

    this.extra_attributes_list.push(index);
    this.extra_output_indexes.emit(this.extra_attributes_list);

    if(this.extra_attributes < 3) {
      if(event.target.checked) {
        this.extra_attributes += 1;
        this.attributes_values[index] += 2;
        this.attributes_modifiers[index] = this.attributes_modifiers_cost[this.attributes_values[index] - 1];

        if(this.extra_attributes == 3) {
          let checkboxes = document.getElementsByClassName('extra-expertise-checkbox');
          for(let i = 0; i < checkboxes.length; i++) {
            let checkbox = checkboxes[i] as HTMLInputElement;
            if(!checkbox.checked) { checkbox.disabled = true; }
          }
        }
      } else {
        this.extra_attributes -= 1;
        this.attributes_values[index] -= 2;
        this.attributes_modifiers[index] = this.attributes_modifiers_cost[this.attributes_values[index] - 1];
      }
    } else if(!event.target.checked) {
      this.extra_attributes -= 1;
      this.attributes_values[index] -= 2;
      this.attributes_modifiers[index] = this.attributes_modifiers_cost[this.attributes_values[index] - 1];

      let checkboxes = document.getElementsByClassName('extra-expertise-checkbox');
      for(let i = 0; i < checkboxes.length; i++) {
        let checkbox = checkboxes[i] as HTMLInputElement;
        checkbox.disabled = false;
      }
    }

    this.update_basic_stats();
  }

  downgrade_attribute(downgrade_number: number) {
    var value = this.attributes_values[downgrade_number];
    if(value > 8) {
      this.attributes_values[downgrade_number] = value - 1;
      this.attributes_modifiers[downgrade_number] = this.attributes_modifiers_cost[value - 2];

      this.free_attributes_cost += this.attributes_values_cost[value - 8];
      this.free_attributes_cost -= this.attributes_values_cost[value - 9];
      this.enable_updates_attributes();
    }
    this.update_basic_stats();
  }

  upgrade_attribute(upgrade_number: number) {
    var value = this.attributes_values[upgrade_number];
    var new_free_attributes_cost = this.free_attributes_cost + this.attributes_values_cost[value - 8] - this.attributes_values_cost[value - 7];
    if(this.free_attributes_cost > 0 && new_free_attributes_cost >= 0) {
      this.attributes_values[upgrade_number] = value + 1;
      this.attributes_modifiers[upgrade_number] = this.attributes_modifiers_cost[value];

      this.free_attributes_cost = new_free_attributes_cost;
      this.enable_updates_attributes();
    }
    this.update_basic_stats();
  }

  enable_updates_attributes() {
    let plus_buttons = document.getElementsByClassName('btn-success');

    for(let i = 0; i < plus_buttons.length; i++) {
      var value = this.attributes_values[i];
      var new_free_attributes_cost = this.free_attributes_cost + this.attributes_values_cost[value - 8] - this.attributes_values_cost[value - 7];

      if(new_free_attributes_cost >= 0) {
        plus_buttons[i].classList.remove("disabled");
      } else {
        plus_buttons[i].classList.add("disabled");
      }
    }
  }

  update_basic_stats() {
    if(this.class_element) {
      this.mana_points = this.class_element.atributos.mana + parseInt(this.char_level) + this.attributes_modifiers[3];
      this.life_points = this.class_element.atributos.vida + (parseInt(this.char_level) * this.class_element.atributos.vida_por_nivel) + this.attributes_modifiers[2];
      this.total_expertises = this.attributes_modifiers[4] + this.class_element.pericias_opcionais;

      this.mana_points_output.emit(this.mana_points);
      this.life_points_output.emit(this.life_points);
      this.total_expertises_output.emit(this.total_expertises);
      this.attributes_modifiers_output.emit(this.attributes_modifiers);
      this.attributes_values_output.emit(this.attributes_values);
    }
  }

}
