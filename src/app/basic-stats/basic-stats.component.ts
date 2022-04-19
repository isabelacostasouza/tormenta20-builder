import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'basic-stats',
  templateUrl: './basic-stats.component.html',
  styleUrls: ['./basic-stats.component.scss']
})
export class BasicStatsComponent implements OnInit {

  @Input('level') char_level = 0;
  @Input('life_points') life_points = 0;
  @Input('mana_points') mana_points = 0;

  @Input('class') char_class = '';
  @Input('origin') char_origin = '';
  @Input('race') char_race = '';
  @Input('god') char_god = '';
  
  constructor() { }

  ngOnInit(): void {}

}
