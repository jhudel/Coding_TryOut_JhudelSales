import { Component } from '@angular/core';
import { TextEncoderService } from './text-encoder.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-text-encoder',
  templateUrl: './text-encoder.component.html',
  styleUrls: ['./text-encoder.component.css']
})
export class TextEncoderComponent {
  inputText: string = '';
  encodedText: string = '';
  partialEncodedText: string = '';
  isEncoding: boolean = false;
  isCancelled: boolean = false;
  destroy$ = new Subject<void>();

  constructor(private textEncoderService: TextEncoderService) { }

  async encodeText() {
    if (!this.inputText || this.isEncoding) {
      return;
    }

    this.isEncoding = true;
    this.isCancelled = false; 
    this.encodedText = ''; 
    this.partialEncodedText = ''; 

    try {
      const response = await this.textEncoderService
        .encodeText(this.inputText, this.destroy$)
        .toPromise();

      if (response instanceof ArrayBuffer) {
        const uintArray = new Uint8Array(response);

        for (let i = 0; i < uintArray.length; i++) {
          if (this.isCancelled) {
            break; 
          }
          this.encodedText += String.fromCharCode(uintArray[i]);
        }

        this.encodedText = this.cleanUpEncodedText(this.encodedText);

        if (this.encodedText.includes('encodedText')) {
          this.encodedText = this.encodedText.replace('encodedText', '');
        }

        for (let i = 0; i < this.encodedText.length; i++) {
          if (this.isCancelled) {
            break;
          }
          this.partialEncodedText = this.encodedText.substr(0, i + 1);
          await this.delay(1000 + Math.floor(Math.random() * 4000));
        }
      } else {
        console.error('Unexpected response format:', response);
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }

    this.isEncoding = false;
  }

  cancelEncoding() {
    this.isCancelled = true;
    this.destroy$.next();
  }

  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  private cleanUpEncodedText(text: string): string {
    return text.replace(/[^a-zA-Z0-9]/g, '');
  }
}
