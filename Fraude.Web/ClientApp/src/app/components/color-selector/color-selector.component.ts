import { Component, Input, OnInit } from '@angular/core';
import { FraudeService } from 'src/app/services/fraude.service';

@Component({
  selector: 'app-color-selector',
  templateUrl: './color-selector.component.html',
  styleUrls: ['./color-selector.component.css']
})
export class ColorSelectorComponent implements OnInit {
  colors: any[] = [
    {  id: 'blue', description : 'azul'},
    { id: 'red', description: 'vermelho'},
    { id: 'yellow', description: 'amarelo'},
    { id: 'green', description: 'verde'}
  ]
  currentColor: string | null = null;
  legends = [
    { color: 'red', text: 'Vermelho - ATENÇÃO MÁXIMA - Quadrilha em operação.' },
    { color: 'yellow', text: 'Amarelo - Quadrilha identificada em outras Cooperativas' },
    { color: 'green', text: 'Verde - Permaneça em atenção!' },
    { color: 'blue', text: 'Azul - Mantenha sempre as informações atualizadas' }
  ];

  @Input()
  podeAcessar : boolean

  constructor(private fraudeService: FraudeService) { }

  ngOnInit(): void {
    this.loadCurrentColor();
  }

  onColorChange(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    const selectedColor = selectElement.value;
    this.updateColor(selectedColor);
  }

  private loadCurrentColor(): void {
    this.fraudeService.getColor().subscribe((res: any) => {
      this.currentColor = res.color;
      },
      error => {
        console.error('Erro ao carregar a cor:', error);
      }
    );
  }

  private updateColor(color: string): void {
    let data = {
      color: color
    }
    this.fraudeService.saveColor(data).subscribe((res: any) => {
        this.currentColor = color;
      },
      error => {
        console.error('Erro ao atualizar a cor:', error);
      }
    );
  }
}
