import { Component, Input, OnInit } from '@angular/core';
import { FraudeService } from 'src/app/services/fraude.service';
import { environment } from 'src/environments/environment';

var url2 = environment.api + '/FileImage';

@Component({
  selector: 'app-image-uploader',
  templateUrl: './image-uploader.component.html',
  styleUrls: ['./image-uploader.component.css']
})
export class ImageUploaderComponent implements OnInit {
  files: File[] = [];
  uploading = false;
  imageUrls: { fileName: string; fileUrl: string }[] = [];
  currentSlideIndex = 0;
  modalImageUrl: string = '';

  @Input()
  podeAcessar: boolean

  @Input()
  lado: string
  
  constructor(private fraudeService: FraudeService) {
    
  }
  
  ngOnInit(): void {
    this.loadImages();
  }

  onFileChange(event: any): void {
    if (event.target.files.length > 0) {
      this.files = Array.from(event.target.files);
    }
  }

  uploadImages(): void {
    if (this.files.length === 0) {
      return;
    }

    this.uploading = true;
    const formData = new FormData();

    this.files.forEach(file => {
      formData.append('files', file);
    });

    // Adiciona o campo 'lado' ao FormData
    formData.append('lado', this.lado);

    this.fraudeService.upload(formData).subscribe(
      (res) => {
        console.log('Upload bem-sucedido:', res);
            this.loadImages();
            this.uploading = false;
      },
      error => {
          console.error('Erro ao enviar imagens:', error);
          this.uploading = false;
        }
    );
  }

  loadImages(): void {
    let data = {
      lado: this.lado
    }

    this.fraudeService.getAllImages(data).subscribe(
      (res) => {
        this.imageUrls = res;
        this.imageUrls.forEach((item:any) => {
          item.fileUrl = url2 + item.fileUrl
        });
      },
      error => {
        console.error('Erro ao carregar imagens:', error);
      }
    );
  }

  prevSlide(): void {
    if (this.imageUrls.length > 0) {
      this.currentSlideIndex = (this.currentSlideIndex - 1 + this.imageUrls.length) % this.imageUrls.length;
      this.updateCarouselPosition();
    }
  }

  nextSlide(): void {
    if (this.imageUrls.length > 0) {
      this.currentSlideIndex = (this.currentSlideIndex + 1) % this.imageUrls.length;
      this.updateCarouselPosition();
    }
  }

  private updateCarouselPosition(): void {
    const slides = document.querySelector('.carousel-slides') as HTMLElement;
    if (slides) {
      slides.style.transform = `translateX(-${this.currentSlideIndex * 100}%)`;
    }
  }

  showModal(imageUrl: string): void {
    this.modalImageUrl = imageUrl;
    const modalElement = document.getElementById('imageModal') as HTMLElement;
    const modal = new (window as any).bootstrap.Modal(modalElement);
    modal.show();
  }
}
