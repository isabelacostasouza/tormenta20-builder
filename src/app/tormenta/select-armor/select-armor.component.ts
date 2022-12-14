import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { SubjectizeProps } from 'subjectize';

import armors_database from '../../../assets/tormenta/armor.json';

@Component({
  selector: 'select-armor',
  templateUrl: './select-armor.component.html',
  styleUrls: ['./select-armor.component.scss']
})
export class SelectArmorComponent implements OnInit {

  @Input('proeficiencies') char_proeficiencies: any;
  @Input('chosen_armor_import') chosen_armor_import: any;

  @Output() chosen_armor_output = new EventEmitter<Object>();

  @SubjectizeProps(["char_proeficiencies", "chosen_armor_import"])
  propAB$ = new ReplaySubject(1);

  armor_list = armors_database["armaduras"];

  protection:any[] = []; chosen_armor:any[] = [];
  light_armor:any[] = []; heavy_armor:any[] = [];

  constructor() { }

  ngOnInit(): void {
    this.sort_armor();
    this.filter_armor();

    this.propAB$.subscribe((change: any) => {
      setTimeout(() => {
        this.chosen_armor = [];
        this.filter_armor();

        if(change[0] == "chosen_armor_import" && this.chosen_armor_import[0]) {
          let armor_index = this.armor_list.findIndex((element: any) => element.nome == this.chosen_armor_import[0].nome);
          this.choose_armor(armor_index);
        }

        this.chosen_armor_output.emit(this.chosen_armor);
      }, 5);
    });
  }

  sort_armor() {
    this.light_armor = this.armor_list.filter(function (weapon: any) {
      return weapon.tipo == 'leve'
    });
    this.heavy_armor = this.armor_list.filter(function (weapon: any) {
      return weapon.tipo == 'pesada'
    });
  }

  filter_armor() {
    this.protection = this.light_armor;
    
    if(this.char_proeficiencies && (this.char_proeficiencies.indexOf("Armaduras pesadas") > -1)) this.protection = this.protection.concat(this.heavy_armor);
  }

  remove_armor(index:any) {
    this.protection.push(this.chosen_armor[index]);
    this.chosen_armor.splice(index, 1);
    
    let armor_tr = document.getElementsByClassName('armor-tr');
    for(let i = 0; i < armor_tr.length; i++) {
      armor_tr[i].getElementsByTagName('button')[0].disabled = false;
      armor_tr[i].getElementsByTagName('button')[0].classList.remove('add-button-disabled')
    }

    this.chosen_armor_output.emit(this.chosen_armor);
  }

  choose_armor(index:any) {
    this.chosen_armor.push(this.protection[index]);
    this.protection.splice(index, 1);

    let armor_tr = document.getElementsByClassName('armor-tr');
    for(let i = 0; i < armor_tr.length; i++) {
      armor_tr[i].getElementsByTagName('button')[0].disabled = true;
      armor_tr[i].getElementsByTagName('button')[0].classList.add('add-button-disabled')
    }
    
    this.chosen_armor_output.emit(this.chosen_armor);
  }

}
