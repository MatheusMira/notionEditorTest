import { CommonModule } from '@angular/common';
import { Component, ElementRef } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  
  public inputValue: string = '';
  public optionSelected:boolean = false;
  public expectedText:boolean = false;

  constructor(private el: ElementRef) {}

  filter(e:any){
    const inputElement = e.target as HTMLInputElement;
    this.inputValue = inputElement.value;

    debugger
    if (this.inputValue === '/1') {
      this.expectedText = true;
    } else if (this.inputValue != '/1'){
      this.expectedText = false;
    } 

    if(inputElement.value === '/1' && e.key === 'Enter'){
      this.expectedText = false;
      this.optionSelected = true;
      this.inputValue = '';
      this.addDomElem('h1Input');
    } else if(inputElement.value != '/1' && e.key === 'Enter'){
      this.optionSelected = true;
      this.addDomElem('p');
    } 
  }

  addDomElem(type:string){
    const parent = document.getElementById('editor');

    switch(type){

      case 'defaultInput':
        const input = document.createElement('input');
        input.type = 'text';
        input.id = 'defaultInput'
        input.placeholder = 'Type / for blocks, @ to link docs or people';
        this.setInputStyle(input);
        input.addEventListener('keyup', this.filter.bind(this));
        parent?.appendChild(input);
        input.focus();
        break;

      case 'h1Input':
        const removeOldInputH1 = document.getElementById('defaultInput');
        removeOldInputH1?.remove();
        const h1Input = document.createElement('input');
        h1Input.type = 'text';
        h1Input.id = 'dinamicH1Input'
        h1Input.placeholder = 'Heading 1';
        this.setInputStyle(h1Input);
        h1Input.addEventListener('keyup', this.h1DomInput.bind(this));
        parent?.appendChild(h1Input);
        h1Input.focus();
        break;

      case 'h1':
        const oldH1Input = document.getElementById('dinamicH1Input');
        oldH1Input?.remove();
        const h1Elem = document.createElement('h1');
        h1Elem.id = 'dinamicH1'
        h1Elem.textContent = this.inputValue;
        parent?.appendChild(h1Elem);
        this.addDomElem('defaultInput');
        break;

      case 'p':
          const removeOldInputP = document.getElementById('defaultInput');
          removeOldInputP?.remove();
          const pElem = document.createElement('p');
          pElem.id = 'dinamicP'
          pElem.textContent = this.inputValue;
          this.inputValue = '';
          parent?.appendChild(pElem);
          this.addDomElem('defaultInput');
          break;
    }
    
  }

  setInputStyle(input: HTMLInputElement){
    input.style.width = '100%';
    input.style.padding = '10px 10px 10px 0px;';
    input.style.fontSize  = '16px';
    input.style.border = 'none';
    input.style.outline = 'none';
  }

  h1DomInput(e:any){
    const inputElement = e.target as HTMLInputElement;
    this.inputValue = inputElement.value;
    if( e.key === 'Enter'){
      this.addDomElem('h1');
    }
  }

}
