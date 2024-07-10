import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TokenStorageService } from './services/token.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  isLoggedIn = false;
  username: string;

  constructor(private router: Router
    ,private tokenStorageService: TokenStorageService) { }
  
  ngOnInit(): void{

   
  }
}
