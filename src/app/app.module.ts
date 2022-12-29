import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { ExpertiseTableComponent } from './tormenta/expertise-table/expertise-table.component';
import { OriginBonusComponent } from './tormenta/origin-bonus/origin-bonus.component';
import { DefaultPowersComponent } from './tormenta/default-powers/default-powers.component';
import { BaseAttributesComponent } from './tormenta/base-attributes/base-attributes.component';
import { DefaultProficienciesComponent } from './tormenta/default-proficiencies/default-proficiencies.component';
import { SelectPowerComponent } from './tormenta/select-power/select-power.component';
import { SelectWeaponComponent } from './tormenta/select-weapon/select-weapon.component';
import { SelectArmorComponent } from './tormenta/select-armor/select-armor.component';
import { SelectShieldComponent } from './tormenta/select-shield/select-shield.component';
import { SelectMagicComponent } from './tormenta/select-magic/select-magic.component';
import { AppTormentaComponent } from './tormenta/app-tormenta/app-tormenta.component';

@NgModule({
  declarations: [
    AppComponent,
    ExpertiseTableComponent,
    OriginBonusComponent,
    DefaultPowersComponent,
    BaseAttributesComponent,
    DefaultProficienciesComponent,
    SelectPowerComponent,
    SelectMagicComponent,
    SelectWeaponComponent,
    SelectArmorComponent,
    SelectShieldComponent,
    AppTormentaComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
