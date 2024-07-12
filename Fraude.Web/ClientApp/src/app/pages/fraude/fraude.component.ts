import { Component, OnInit } from '@angular/core';
import { IpService } from '../../services/ip.service';

@Component({
  selector: 'app-fraude',
  templateUrl: './fraude.component.html',
  styleUrls: ['./fraude.component.css'],
})
export class FraudeComponent implements OnInit {
  ipAddress: string | undefined;
  podeAcessar = false;

  constructor(private ipService: IpService ) { }

  ngOnInit(): void {
    this.ipService.getIp().subscribe(
      data => {
        this.podeAcessar = data.podeAcessar
      },
      error => {
        console.error('Erro ao obter o endereço IP:', error);
      }
    );
  }
}
