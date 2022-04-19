import { Component, OnInit } from '@angular/core';

import database from '../assets/database.json';
import pericias from '../assets/pericias.json';

import { PDFDocument } from 'pdf-lib';
import * as download from "downloadjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
  title = 'tormenta20-builder';
  
  races = database["raça"];
  classes = database["classe"];
  origins = database["origem"];
  powers = database["poder"];
  gods = database["deus"];

  expertises = pericias["pericias"];

  levels = Array.from({length: 20}, (_, i) => i+1);

  race: any;class: any; origin: any; god: any; level: any; half_level: any;
  expertises_table: any; proeficiencies: any; origin_bonus: any; default_powers: any; chosen_powers: any; chosen_magic: any;

  total_expertises = 0; life_points = 0; mana_points = 0;
  attributes_modifiers = [0]; attributes_values = [0];

  async ngOnInit() {
    if(screen.width < 1200) {
      let main_element = document.getElementsByClassName("col-sm-7")[0];
      let main_table = document.getElementsByClassName("col-sm-5")[0];

      main_element.classList.remove("col-sm-7");
      main_table.classList.remove("col-sm-7");
      main_element.classList.add("col-sm-12");
      main_table.classList.add("col-sm-12");
    }

    setTimeout(() => {
      this.level = 1;
      this.half_level = 1;
      this.race = this.races[0].nome;
      this.class = this.classes[0].nome;
      this.origin = this.origins[0].nome;
      this.god = this.gods[0].nome;
    }, 5);
  }

  async download_sheet() {
    const formUrl = '../assets/ficha_editavel.pdf'
    const formPdfBytes = await fetch(formUrl).then(res => res.arrayBuffer())
    const editable_sheet = await PDFDocument.load(formPdfBytes)

    const form = editable_sheet.getForm()

    form.getTextField('RAÇA').setText(this.race);
    form.getTextField('ORIGEM').setText(this.origin);
    form.getTextField('CLASSE').setText(this.class);
    form.getTextField('NÍVEL').setText(this.level.toString());

    form.getTextField('Bôn.For').setText(this.attributes_modifiers[0].toString());
    form.getTextField('Bôn.Des').setText(this.attributes_modifiers[1].toString());
    form.getTextField('Bôn.Con').setText(this.attributes_modifiers[2].toString());
    form.getTextField('Bôn.Int').setText(this.attributes_modifiers[3].toString());
    form.getTextField('Bôn.Sab').setText(this.attributes_modifiers[4].toString());
    form.getTextField('Bôn.Car').setText(this.attributes_modifiers[5].toString());

    form.getTextField('For').setText(this.attributes_values[0].toString());
    form.getTextField('Des').setText(this.attributes_values[1].toString());
    form.getTextField('Con').setText(this.attributes_values[2].toString());
    form.getTextField('Int').setText(this.attributes_values[3].toString());
    form.getTextField('Sab').setText(this.attributes_values[4].toString());
    form.getTextField('Car').setText(this.attributes_values[5].toString());

    form.getTextField('PVs Totais').setText(this.life_points.toString());
    form.getTextField('PVs Atuais').setText(this.life_points.toString());
    
    form.getTextField('PMs Totais').setText(this.mana_points.toString());
    form.getTextField('PMs Atuais').setText(this.mana_points.toString());

    for(let i = 0; i < 30; i++) {
      let table_index = ("0" + (i + 1).toString()).slice(-2);
      let sum = this.half_level + this.attributes_modifiers[this.expertises[i].num_atributo] + this.expertises_table.train[i] + this.expertises_table.others[i];

      form.getTextField(table_index + "0").setText(sum.toString());
      form.getTextField(table_index + "1").setText(this.half_level.toString());
      form.getTextField(table_index + "2").setText(this.attributes_modifiers[this.expertises[i].num_atributo].toString());
      form.getTextField(table_index + "3").setText(this.expertises_table.train[i].toString());
      form.getTextField(table_index + "4").setText(this.expertises_table.others[i].toString());
    }

    let extras_string = "";
    if(this.proeficiencies) {
      extras_string += "\nProeficiencias: " + JSON.stringify(this.proeficiencies).split('"').join("").split(',').join(", ").replace("[", "").replace("]", "");
    }
    form.getTextField('Outras Características').setText(extras_string);

    for(let i = 0; i < this.origin_bonus.length; i++) {
      form.getTextField("undefined_14" + (i + 5).toString()).setText(this.origin_bonus[i]);
    }

    for(let i = 0; i < this.default_powers.length; i++) {
      form.getTextField("undefined_" + (i + 30).toString()).setText(this.default_powers[i] + " (poder)");
    }

    if(this.chosen_powers) {
      for(let i = 0; i < this.chosen_powers.length; i++) {
        form.getTextField("undefined_" + (i + 30 + this.default_powers.length).toString()).setText(this.chosen_powers[i]);
      }
    }

    if(this.chosen_magic) {
      for(let i = 0; i < this.chosen_magic.length; i++) {
        form.getTextField("undefined_" + (i + 30 + this.default_powers.length + this.chosen_powers.length).toString()).setText(this.chosen_magic[i].nome + " (magia)");
      }
    }

    let pdfBytes = await editable_sheet.save();

    download(pdfBytes, "ficha_tormenta.pdf", "application/pdf");
  }

  updateHalfLevel() {
    setTimeout(() => {
      this.half_level = Math.floor(this.level / 2);
      if(this.level == 1) this.half_level = 1;
    }, 5);
  }

  onTotalExpertises(outputResult: any) {
    this.total_expertises = outputResult;
  }

  onLifePoints(outputResult: any) {
    this.life_points = outputResult;
  }

  onManaPoints(outputResult: any) {
    this.mana_points = outputResult;
  }

  onAttributesModifiers(outputResult: any) {
    this.attributes_modifiers = outputResult; 
  }

  onAttributesValues(outputResult: any) {
    this.attributes_values = outputResult; 
  }

  onExpertisesTable(outputResult: any) {
    this.expertises_table = outputResult; 
  }

  onProeficiencies(outputResult: any) {
    this.proeficiencies = outputResult;
  }

  onOriginBonus(outputResult: any) {
    this.origin_bonus = outputResult;
  }

  onDefaultPowers(outputResult: any) {
    this.default_powers = outputResult;
  }

  onChosenPowers(outputResult: any) {
    this.chosen_powers = outputResult;
  }

  onChosenMagic(outputResult: any) {
    this.chosen_magic = outputResult;
  }
}