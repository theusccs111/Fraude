import { Component, Input } from '@angular/core';
import { FraudeService } from 'src/app/services/fraude.service';

@Component({
  selector: 'app-file-uploader',
  templateUrl: './file-uploader.component.html',
  styleUrls: ['./file-uploader.component.css']
})
export class FileUploaderComponent {
  msg1: string = '';
  msg2: string = '';
  msg3: string = '';
  
  @Input()
  podeAcessar: boolean

  constructor(
    private fraudeService: FraudeService
  ) { }

  ngOnInit(){
    this.fraudeService.getText().subscribe(
      (res) => {
        this.msg1 = res.param1;
        this.msg2 = res.param2;
        this.msg3 = res.param3;
      });
  }

  onFileChange(event: any, msgType: string) {
    const reader = new FileReader();
    reader.onload = () => {
      const text = reader.result as string;
      if (msgType === 'msg1') {
        this.msg1 = text;
      } else if (msgType === 'msg2') {
        this.msg2 = text;
      } else if (msgType === 'msg3') {
        this.msg3 = text;
      }
    };
    reader.readAsText(event.target.files[0]);
  }

  updateMessages() {
    let data = {
      param1: this.msg1 ,
      param2: this.msg2 ,
      param3: this.msg3 ,
    }
    this.fraudeService.saveText(data).subscribe(
      (res) => {
        console.log("res",res)

      });
  }
}
