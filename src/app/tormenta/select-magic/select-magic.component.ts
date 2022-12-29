import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { SubjectizeProps } from 'subjectize';

import database from '../../../assets/tormenta/database.json';
import magic_database from '../../../assets/tormenta/magics.json';

@Component({
  selector: 'select-magic',
  templateUrl: './select-magic.component.html',
  styleUrls: ['./select-magic.component.scss']
})
export class SelectMagicComponent implements OnInit {

  @Input('level') char_level: any;
  @Input('class') char_class = '';
  @Input('chosen_magic_import') chosen_magic_import: any;
  @Input('chosen_magic_schools_import') chosen_magic_schools_import: any;

  @Output() chosen_magic_output = new EventEmitter<Object>();
  @Output() chosen_magic_school_output = new EventEmitter<Object>();

  @SubjectizeProps(["char_class", "char_level", "chosen_magic_import", "chosen_magic_schools_import"])
  propAB$ = new ReplaySubject(1);

  classes = database["classe"];
  magics = magic_database["magias"];
  magic_schools_1 = magic_database["escolas"].splice(0, 4);
  magic_schools_2 = magic_database["escolas"].splice(-4);
  magic_schools = this.magic_schools_1.concat(this.magic_schools_2);

  number_chosen_magic_schools = 0;
  number_chosen_magics = [0, 0, 0, 0, 0];
  magics_list: any;
  chosen_magic_schools = [""];
  chosen_magics: any;

  magic_type: any;
  class_element: any;
  elements_description: any;
  available_magics = [0, 0, 0, 0, 0];

  all_schools_chosen = true;
  has_magic_school = false;

  constructor() { }

  ngOnInit(): void {
    this.char_level = 1;
    this.char_class = "Arcanista";
    this.chosen_magics = [];
    this.chosen_magics.pop();
    this.chosen_magic_schools.pop();

    if(screen.width < 500) {
      this.magic_schools_1 = this.magic_schools_1.map((element: any) => { return element.substring(0, 4); });
      this.magic_schools_2 = this.magic_schools_2.map((element: any) => { return element.substring(0, 4); });
    }

    setTimeout(() => {
      this.get_magic_number();
      this.get_available_magics();
      this.disable_unavailable_magics();      
    }, 5);

    this.propAB$.subscribe((change: any) => {
      setTimeout(() => {
        this.number_chosen_magics = [0, 0, 0, 0, 0];
        this.available_magics = [0, 0, 0, 0, 0];
        this.number_chosen_magic_schools = 0;
        this.chosen_magic_schools = [];
        this.chosen_magics = [];

        this.reset_magic_schools();
        this.get_magic_number();
        this.get_available_magics();

        if(change[0] == "chosen_magic_import" && this.chosen_magic_import) {
          setTimeout(() => {
            this.chosen_magic_import.forEach(async (magic: any) => {
              let magic_index = this.magics_list.findIndex((element: any) => element.nome == magic.nome);
              this.choose_magic_index(magic_index);
            });
          }, 10);
        }
        
        if(change[0] == "chosen_magic_schools_import" && this.chosen_magic_schools_import) {
          let schools_checkbox = document.getElementsByClassName('magic-schools-checkbox');

          this.chosen_magic_schools_import.forEach(async (school: any) => {
            let school_index = this.magic_schools.findIndex((element: any) => element == school);
            
            (schools_checkbox[school_index] as HTMLInputElement).checked = true;
            this.select_magic_school({ target: { id: school_index, checked: true } });
          });
        }
      }, 5);
    });
  }

  reset_magic_schools() {
    let checkboxes = document.getElementsByClassName("magic-schools-checkbox");

    for(let i = 0; i < checkboxes.length; i++) {
      (checkboxes[i] as any).checked = false;
    }
  }

  check_magic_status() {
    if(this.char_class == "Bardo" || this.char_class == "Druida") {
      this.has_magic_school = true;
      this.all_schools_chosen = false;
    } else if(this.char_class == "Clérigo" || this.char_class == "Arcanista") {
      this.has_magic_school = false;
      this.all_schools_chosen = true;
    } else {
      this.all_schools_chosen = false; 
    }

    if(this.char_class == "Bardo" || this.char_class == "Arcanista") {
      this.magic_type = "arc";
    } else {
      this.magic_type = "div";
    }
  }

  get_magic_number() {
    this.check_magic_status();
    this.class_element = this.classes.reduce((next: any, element: any) => {
      if (element["nome"] == this.char_class) return element;
      return next;
    });

    for(let i = 0; i < this.char_level; i++) {
      let level_class = this.class_element.niveis[i];
      if(level_class.magias_1) { this.available_magics[0] += parseInt(level_class.magias_1) }
      if(level_class.magias_2) { this.available_magics[1] += parseInt(level_class.magias_2) }
      if(level_class.magias_3) { this.available_magics[2] += parseInt(level_class.magias_3) }
      if(level_class.magias_4) { this.available_magics[3] += parseInt(level_class.magias_4) }
      if(level_class.magias_5) { this.available_magics[4] += parseInt(level_class.magias_5) }
    }

    this.disable_unavailable_magics();
  }

  get_available_magics() {
    if(this.has_magic_school) {
      this.magics_list = this.magics.filter((element: any) => {
        if (element.informacao.tipo == this.magic_type && this.chosen_magic_schools.includes(element.informacao.escola)) return element;
      });
    } else {
      this.magics_list = this.magics.filter((element: any) => {
        if (element.informacao.tipo == this.magic_type) return element;
      });
    }

    this.magics_list.sort(function(a: any, b: any) {
      return a.informacao.circulo - b.informacao.circulo;
    });

    setTimeout(() => {
      this.disable_unavailable_magics();      
    }, 5);
  }

  select_magic_school(event: any) {
    var index = parseInt(event.target.id);
    let checkboxes = document.getElementsByClassName('magic-schools-checkbox');

    if(this.chosen_magic_schools.length < 3) {
      if(event.target.checked) {
        this.chosen_magic_schools.push(this.magic_schools[index]);
        
        this.all_schools_chosen = true;
        if(this.chosen_magic_schools.length == 3) {
          for(let i = 0; i < checkboxes.length; i++) {
            let checkbox = checkboxes[i] as HTMLInputElement;
            if(!checkbox.checked) { checkbox.disabled = true; }
          }
        }
      } else {
        this.chosen_magic_schools = this.chosen_magic_schools.filter((item: any) => item !== this.magic_schools[index]);
      }
    } else if(!event.target.checked) {
        this.chosen_magic_schools = this.chosen_magic_schools.filter((item: any) => item !== this.magic_schools[index]);
        if(this.chosen_magic_schools.length == 2) {
          for(let i = 0; i < checkboxes.length; i++) {
            let checkbox = checkboxes[i] as HTMLInputElement;
            if(!checkbox.checked) { checkbox.disabled = false; }
          }
        }
    }
    if(this.chosen_magic_schools.length == 0) { this.all_schools_chosen = false; }

    this.chosen_magic_school_output.emit(this.chosen_magic_schools);

    this.get_available_magics();
  }

  choose_magic(event: any) {
    let index = event.path[0].parentElement.parentElement.getElementsByClassName("panel-group")[0].id.split("accordionMagic2_")[1];
    this.choose_magic_index(index);
  }

  choose_magic_index(index: any) {
    let new_magic = this.magics_list[index];
    let circle_index = parseInt(new_magic.informacao.circulo) - 1;

    if(this.available_magics[circle_index] > this.number_chosen_magics[circle_index]) {
      this.number_chosen_magics[parseInt(new_magic.informacao.circulo) - 1] += 1;
      this.chosen_magics.push(new_magic);
      this.magics_list.splice(index, 1);
    }

    this.disable_unavailable_magics();
    this.chosen_magic_output.emit(this.chosen_magics);
  }

  remove_magic(event: any) {
    let index = event.path[0].parentElement.parentElement.getElementsByClassName("panel-group")[0].id.split("accordionMagic1_")[1];
    let new_magic = this.chosen_magics[index];

    this.number_chosen_magics[parseInt(new_magic.informacao.circulo) - 1] -= 1;
    this.magics_list.push(new_magic);
    this.chosen_magics.splice(index, 1);

    this.disable_unavailable_magics();
    this.chosen_magic_output.emit(this.chosen_magics);
  }

  disable_unavailable_magics() {
    let add_buttons = document.getElementsByClassName("add-magic");

    for(let i = 0; i < add_buttons.length; i++) {
      let element_circle = add_buttons[i].parentElement?.parentElement?.getElementsByTagName("h4")[0].outerText[1];
      if(!element_circle) element_circle = "1";

      if(this.available_magics[parseInt(element_circle) - 1] - this.number_chosen_magics[parseInt(element_circle) - 1] > 0) {
        add_buttons[i].classList.remove("disabled");
        (add_buttons[i] as any).disabled = false;
      } else {
        add_buttons[i].classList.add("disabled");
        (add_buttons[i] as any).disabled = true;
      }
    }
  }

}
