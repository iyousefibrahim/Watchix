import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { ButtonComponent } from '../button/button.component';

@Component({
  selector: 'app-not-found',
  imports: [TranslateModule, ButtonComponent],
  templateUrl: './not-found.component.html',
  styleUrl: './not-found.component.css'
})
export class NotFoundComponent {

}
