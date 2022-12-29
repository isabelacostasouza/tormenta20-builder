import { Component, OnInit } from '@angular/core';

import database from '../assets/tormenta/database.json';
import pericias from '../assets/tormenta/pericias.json';
import magic_base from '../assets/tormenta/magics.json';
import char_export from '../assets/tormenta/char_export.json';

import { PDFDocument } from 'pdf-lib';
import * as download from "downloadjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
  title = 'tormenta20-builder';
  
  character = char_export["personagem"];
  races = database["raça"];
  classes = database["classe"];
  origins = database["origem"];
  powers = database["poder"];
  gods = database["deus"];
  magic = magic_base["magias"];

  expertises = pericias["pericias"];

  levels = Array.from({length: 20}, (_, i) => i+1);

  race: any; class: any; origin: any; god: any; level: any; half_level: any;
  expertises_table: any; extra_attributes: any; proeficiencies: any; origin_bonus: any; default_powers: any; chosen_powers: any; chosen_magic: any; chosen_magic_schools: any; chosen_weapons: any; chosen_armor: any; chosen_shield: any;
  extra_attributes_import: any; modifiers_import: any; chosen_weapons_import: any; chosen_armor_import: any; chosen_shield_import: any; chosen_powers_import: any; chosen_magic_import: any; chosen_magic_schools_import: any; expertises_import: any;

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
    const formUrl = '../assets/tormenta/ficha_editavel.pdf'
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
    } else {
      this.chosen_powers = [];
    }

    if(this.chosen_magic) {
      for(let i = 0; i < this.chosen_magic.length; i++) {
        form.getTextField("undefined_" + (i + 30 + this.default_powers.length + this.chosen_powers.length).toString()).setText(this.chosen_magic[i].nome + " (magia)");
      }
    }

    if(this.chosen_weapons) for(let i = 0; i < this.chosen_weapons.length; i++) {
      let fields = [('Ataque ' + (i+1).toString()), ('Dano ' + (i+1).toString()), ('Crítico ' + (i+1).toString()), ('Alcance ' + (i+1).toString())]
      
      form.getTextField(fields[0]).setText(this.chosen_weapons[i].nome);
      form.getTextField(fields[1]).setText(this.chosen_weapons[i].dano);
      form.getTextField(fields[2]).setText(this.chosen_weapons[i].critico);
      form.getTextField(fields[3]).setText(this.chosen_weapons[i].alcance);
    }

    if(this.chosen_armor && this.chosen_armor.length > 0) {
      form.getTextField('Armadura').setText(this.chosen_armor[0].nome.toString());
      form.getTextField('Bônus na CA 1').setText(this.chosen_armor[0].bonus.toString());
      form.getTextField('Penalidade 1').setText(this.chosen_armor[0].penalidade.toString());
    }

    if(this.chosen_shield && this.chosen_shield.length > 0) {
      form.getTextField('Escudo').setText(this.chosen_shield[0].nome.toString());
      form.getTextField('Bônus na CA 2').setText(this.chosen_shield[0].bonus.toString());
      form.getTextField('Penalidade 2').setText(this.chosen_shield[0].penalidade.toString());
    }

    let power_descriptions = [];

    if(this.default_powers) for(let i = 0; i < this.default_powers.length; i++) {
      let power = this.powers.filter((element: any) => {
        return element.nome == this.default_powers[i] });
      if(power && power.length > 0) power_descriptions.push(power[0]);
    }

    if(this.chosen_powers) for(let i = 0; i < this.chosen_powers.length; i++) {
      let power = this.powers.filter((element: any) => {
        return element.nome == this.chosen_powers[i] });
      if(power && power.length > 0) power_descriptions.push(power[0]);
    }

    let power_details_text = "";
    let magic_details_text = "";

    if(power_descriptions.length > 0) {
      power_details_text += "PODERES";
      for(let i = 0; i < power_descriptions.length; i++) {
        power_details_text += ("\n\nNome: " + power_descriptions[i].nome);
        power_details_text += ("\nDescricao: " + power_descriptions[i].descricao);
      }
      power_details_text += "\n\n\n";
    }

    if(this.chosen_magic && this.chosen_magic.length > 0) {
      magic_details_text += "MAGIAS";
      for(let i = 0; i < this.chosen_magic.length; i++) {
        magic_details_text += ("\n\nNome: " + this.chosen_magic[i].nome);
        magic_details_text += ("\nDescricao: " + this.chosen_magic[i].informacao.descricao);
      }
    }
    
    form.getTextField('detailsPage2').setText(power_details_text);
    form.getTextField('detailsPage3').setText(magic_details_text);

    let pdfBytes = await editable_sheet.save();

    download(pdfBytes, "ficha_tormenta.pdf", "application/pdf");
  }

  create_export_pdf() {    
    this.character.raca = this.race;
    this.character.classe = this.class;
    this.character.origem = this.origin;
    this.character.deus = this.god;
    this.character.nivel = this.level;
    this.character.pericias = this.expertises_table;
    this.character.atributos = [this.attributes_modifiers, this.attributes_values];
    this.character.atributos_extra = this.extra_attributes;
    this.character.escudo = this.chosen_shield;
    this.character.armadura = this.chosen_armor;
    this.character.armas = this.chosen_weapons;
    this.character.magias = this.chosen_magic;
    this.character.escolas_magia = this.chosen_magic_schools;
    this.character.poderes = this.chosen_powers;

    var sJson = JSON.stringify(this.character);
    var element = document.createElement('a');
    element.setAttribute('href', "data:text/json;charset=UTF-8," + encodeURIComponent(sJson));
    element.setAttribute('download', "ficha_tormenta_export.json");
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  }

  import_char(event: any) {
    const reader = new FileReader()
 
    this.handle_file_content(event.target.files[0]);
  }

  async handle_file_content(file: any) {
    let character_json = await new Response(file).json();

    this.race = character_json.raca;
    this.class = character_json.classe;
    this.origin = character_json.origem;
    this.god = character_json.deus;
    this.level = character_json.nivel;

    this.extra_attributes_import = character_json.atributos_extra;
    this.modifiers_import = character_json.atributos;

    setTimeout(() => {
      this.chosen_weapons_import = character_json.armas;    
      this.chosen_armor_import = character_json.armadura;
      this.chosen_shield_import = character_json.escudo;
      this.chosen_powers_import = character_json.poderes;  
      this.chosen_magic_schools_import = character_json.escolas_magia;
      this.chosen_magic_import = character_json.magias;
      this.expertises_import = character_json.pericias;
    }, 10);

    this.updateHalfLevel();
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

  onChosenMagicSchool(outputResult: any) {
    this.chosen_magic_schools = outputResult;
  }

  onChosenWeapons(outputResult: any) {
    this.chosen_weapons = outputResult;
  }

  onChosenArmor(outputResult: any) {
    this.chosen_armor = outputResult;
  }

  onChosenShield(outputResult: any) {
    this.chosen_shield = outputResult;
  }

  onExtraAttributes(outputResult: any) {
    this.extra_attributes = outputResult;
  }

}