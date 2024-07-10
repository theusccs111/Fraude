import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { FileUploaderComponent } from './file-uploader/file-uploader.component';
import { FraudeComponent } from './pages/fraude/fraude.component';

import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { ImageUploaderComponent } from './image-uploader/image-uploader.component';
import { ColorSelectorComponent } from './color-selector/color-selector.component';

registerLocaleData(en);

const routes: Routes = [
  { path: '', component: FraudeComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    FileUploaderComponent,
    FraudeComponent,
    ImageUploaderComponent,
    ColorSelectorComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
