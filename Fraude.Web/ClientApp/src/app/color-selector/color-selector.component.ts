import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FraudeService } from '../services/fraude.service';

@Component({
  selector: 'app-color-selector',
  templateUrl: './color-selector.component.html',
  styleUrls: ['./color-selector.component.css']
})
export class ColorSelectorComponent implements OnInit {
  colors: string[] = ['blue', 'red', 'yellow', 'green'];
  currentColor: string | null = null;

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
    this.fraudeService.getColor().subscribe(
      (res) => {
        this.currentColor = res.color;
      },
      error => {
        console.error('Erro ao atualizar a cor:', error);
      }
    );
  }

  private updateColor(color: string): void {
    this.fraudeService.saveColor(color).subscribe(
      (res) => {
        this.currentColor = color;
      },
      error => {
        console.error('Erro ao atualizar a cor:', error);
      }
    );
  }
}
