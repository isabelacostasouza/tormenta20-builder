import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { SubjectizeProps } from 'subjectize';
import armors_database from '../../../assets/tormenta/armor.json';

@Component({
  selector: 'select-shield',
  templateUrl: './select-shield.component.html',
  styleUrls: ['./select-shield.component.scss']
})
export class SelectShieldComponent implements OnInit {

  @Input('chosen_shield_import') chosen_shield_import: any;

  @Output() chosen_shield_output = new EventEmitter<Object>();

  @SubjectizeProps(["chosen_shield_import"])
  propAB$ = new ReplaySubject(1);

  shield_list = armors_database["escudos"];

  chosen_shield:any[] = [];

  constructor() { }

  ngOnInit(): void {
    this.chosen_shield = [];

    this.propAB$.subscribe((change: any) => {
      setTimeout(() => {
        if(this.chosen_shield.length > 0) this.remove_shield(0);

        if(this.chosen_shield_import && this.chosen_shield_import.length > 0) {
          let shield_index = this.shield_list.findIndex((element: any) => element.nome == this.chosen_shield_import[0].nome);
          this.choose_shield(shield_index);
        }
      }, 5);
    });
  }

  remove_shield(index:any) {
    this.shield_list.push(this.chosen_shield[index]);
    this.chosen_shield.splice(index, 1);
    
    let armor_tr = document.getElementsByClassName('shield-tr');
    for(let i = 0; i < armor_tr.length; i++) {
      armor_tr[i].getElementsByTagName('button')[0].disabled = false;
      armor_tr[i].getElementsByTagName('button')[0].classList.remove('add-button-disabled')
    }

    this.chosen_shield_output.emit(this.chosen_shield);
  }

  choose_shield(index:any) {
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
