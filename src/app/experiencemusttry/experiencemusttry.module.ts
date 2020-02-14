import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ExperienceMustTryPage } from './experiencemusttry.page';

@NgModule({
  declarations: [
    ExperienceMustTryPage,
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild([
      {
        path: '',
        component: ExperienceMustTryPage,
      }
    ])
  ],
})
export class ExperienceMustTryPageModule {}
