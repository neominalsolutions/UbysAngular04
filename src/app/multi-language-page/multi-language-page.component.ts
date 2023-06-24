import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  templateUrl: './multi-language-page.component.html',
  styleUrls: ['./multi-language-page.component.scss'],
})
export class MultiLanguagePageComponent {
  constructor(private tra: TranslateService) {
    this.tra.onLangChange.subscribe((lng) => {
      console.log('lng', lng);
    });
  }

  onLangChange(lng: string) {
    console.log('lng', lng);
    this.tra.use(lng);

    // this.tra.setTranslation('en', {
    //   HELLO: 'hi',
    // });
  }
}
