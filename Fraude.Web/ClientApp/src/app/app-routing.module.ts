import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FraudeComponent } from './pages/fraude/fraude.component';

const routes: Routes = [
  { path: '', component: FraudeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
