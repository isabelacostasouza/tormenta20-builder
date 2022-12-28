import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { SubjectizeProps } from 'subjectize';

import weapons_database from '../../../assets/tormenta/weapons.json';

@Component({
  selector: 'weapon-selection',
  templateUrl: './weapon-selection.component.html',
  styleUrls: ['./weapon-selection.component.scss']
})
export class WeaponSelectionComponent implements OnInit {

  @Input('proeficiencies') char_proeficiencies: any;

  @Output() chosen_weapons_output = new EventEmitter<Object>();

  @SubjectizeProps(["char_proeficiencies"])
  propAB$ = new ReplaySubject(1);

  weapons_list = weapons_database["armas"];

  weapons:any[] = []; chosen_weapons:any[] = [];
  simple_weapons:any[] = []; martial_weapons:any[] = []; exotic_weapons:any[] = []; fire_weapons:any[] = [];
  
  constructor() { }

  ngOnInit(): void {
    this.sort_weapons();
    this.filter_weapons();

    this.propAB$.subscribe((change: any) => {
      setTimeout(() => {
        this.filter_weapons();
      }, 5);
    });
  }

  sort_weapons() {
    this.simple_weapons = this.weapons_list.filter(function (weapon: any) {
      return weapon.tipo == 'simples'
    });
    this.martial_weapons = this.weapons_list.filter(function (weapon: any) {
      return weapon.tipo == 'marcial'
    });
    this.exotic_weapons = this.weapons_list.filter(function (weapon: any) {
      return weapon.tipo == 'exótica'
    });
    this.fire_weapons = this.weapons_list.filter(function (weapon: any) {
      return weapon.tipo == 'fogo'
    });
  }

  filter_weapons() {
    this.weapons = this.simple_weapons;

    if(this.char_proeficiencies && (this.char_proeficiencies.indexOf("Armas de fogo") > -1)) this.weapons = this.weapons.concat(this.fire_weapons);
    if(this.char_proeficiencies && (this.char_proeficiencies.indexOf("Armas exóticas") > -1)) this.weapons = this.weapons.concat(this.exotic_weapons);
    if(this.char_proeficiencies && (this.char_proeficiencies.indexOf("Armas marciais") > -1)) this.weapons = this.weapons.concat(this.martial_weapons);
  }

  choose_weapon(index:any) {
    this.weapons.push(this.chosen_weapons[index]);
    this.chosen_weapons.splice(index, 1);

    let armor_tr = document.getElementsByClassName('weapon-tr');
    for(let i = 0; i < armor_tr.length; i++) {
      armor_tr[i].getElementsByTagName('button')[0].disabled = false;
      armor_tr[i].getElementsByTagName('button')[0].classList.remove('add-button-disabled')
    }

    
    this.chosen_weapons_output.emit(this.chosen_weapons);
  }

  remove_weapon(index:any) {
    this.chosen_weapons.push(this.weapons[index]);
    this.weapons.splice(index, 1);

    if(this.chosen_weapons.length == 3) {
      let armor_tr = document.getElementsByClassName('weapon-tr');
      for(let i = 0; i < armor_tr.length; i++) {
        armor_tr[i].getElementsByTagName('button')[0].disabled = true;
        armor_tr[i].getElementsByTagName('button')[0].classList.add('add-button-disabled')
      }
    }
    
    this.chosen_weapons_output.emit(this.chosen_weapons);
  }

}
