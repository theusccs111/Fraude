import { Component, OnInit } from '@angular/core';
import { IpService } from '../../services/ip.service';

@Component({
  selector: 'app-fraude',
  templateUrl: './fraude.component.html',
  styleUrls: ['./fraude.component.css'],
})
export class FraudeComponent implements OnInit {
  ipAddress: string | undefined;
  ipsPermitidos: string[] = ["177.134.105.23"]
  podeAcessar = false;

  constructor(private ipService: IpService ) { }

  ngOnInit(): void {
    this.ipService.getIp().subscribe(
      data => {
        this.ipAddress = data.ip;
        this.podeAcessar = this.ipsPermitidos.includes(this.ipAddress);
      },
      error => {
        console.error('Erro ao obter o endereço IP:', error);
      }
    );
  }
}
