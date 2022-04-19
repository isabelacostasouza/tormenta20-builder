import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { ExpertiseTableComponent } from './expertise-table/expertise-table.component';
import { BasicStatsComponent } from './basic-stats/basic-stats.component';
import { OriginBonusComponent } from './origin-bonus/origin-bonus.component';
import { DefaultPowersComponent } from './default-powers/default-powers.component';
import { BaseAttributesComponent } from './base-attributes/base-attributes.component';
import { DefaultProficienciesComponent } from './default-proficiencies/default-proficiencies.component';
import { ChosenPowersComponent } from './chosen-powers/chosen-powers.component';
import { ChosenMagicComponent } from './chosen-magic/chosen-magic.component';

@NgModule({
  declarations: [
    AppComponent,
    ExpertiseTableComponent,
    BasicStatsComponent,
    OriginBonusComponent,
    DefaultPowersComponent,
    BaseAttributesComponent,
    DefaultProficienciesComponent,
    ChosenPowersComponent,
    ChosenMagicComponent
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
