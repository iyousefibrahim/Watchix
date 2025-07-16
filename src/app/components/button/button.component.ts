import { NgClass, NgStyle } from '@angular/common';
import { Component, input, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-button',
  imports: [NgClass, NgStyle, RouterLink, TranslateModule],
  templateUrl: './button.component.html',
  styleUrl: './button.component.css'
})
export class ButtonComponent {
  title = input.required<string>();
  textColorClass = input<string>('white');
  buttonWidth = input<string>('auto');
  buttonPadding = input<string>('12px 24px');
  imageSrc = input<string>('');
  bgColor = input<string>('bg-red-700');
  routerLink = input<string>(''); 
  disabledStatus = input<boolean>(false);
}
