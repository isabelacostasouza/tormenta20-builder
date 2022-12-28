import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

import armors_database from '../../../assets/tormenta/armor.json';

@Component({
  selector: 'shield-selection',
  templateUrl: './shield-selection.component.html',
  styleUrls: ['./shield-selection.component.scss']
})
export class ShieldSelectionComponent implements OnInit {

  @Output() chosen_shield_output = new EventEmitter<Object>();

  shield_list = armors_database["escudos"];

  chosen_shield:any[] = [];

  constructor() { }

  ngOnInit(): void {}

  choose_shield(index:any) {
    this.shield_list.push(this.chosen_shield[index]);
    this.chosen_shield.splice(index, 1);
    
    let armor_tr = document.getElementsByClassName('shield-tr');
    for(let i = 0; i < armor_tr.length; i++) {
      armor_tr[i].getElementsByTagName('button')[0].disabled = false;
      armor_tr[i].getElementsByTagName('button')[0].classList.remove('add-button-disabled')
    }

    this.chosen_shield_output.emit(this.chosen_shield);
  }

  remove_shield(index:any) {
    this.chosen_shield.push(this.shield_list[index]);
    this.shield_list.splice(index, 1);

    let armor_tr = document.getElementsByClassName('shield-tr');
    for(let i = 0; i < armor_tr.length; i++) {
      armor_tr[i].getElementsByTagName('button')[0].disabled = true;
      armor_tr[i].getElementsByTagName('button')[0].classList.add('add-button-disabled')
    }
    
    this.chosen_shield_output.emit(this.chosen_shield);
  }

}
