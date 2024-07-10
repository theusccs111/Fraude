import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { FraudeComponent } from './pages/fraude/fraude.component';

import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';
import { ColorSelectorComponent } from './components/color-selector/color-selector.component';
import { FileUploaderComponent } from './components/file-uploader/file-uploader.component';
import { ImageUploaderComponent } from './components/image-uploader/image-uploader.component';

registerLocaleData(en);

const routes: Routes = [
  { path: '', component: FraudeComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    FraudeComponent,
    FileUploaderComponent,
    ImageUploaderComponent,
    ColorSelectorComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NgbCarouselModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
