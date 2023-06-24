import { InjectionToken, LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ApiLogger, ConsoleLogger, loggerType } from './providers/ILogger';
import {
  CommonModule,
  CurrencyPipe,
  registerLocaleData,
} from '@angular/common';

export const clientSecret = new InjectionToken<string>('clientSecret');
import tr from '@angular/common/locales/tr'; // datetime format, para birimi, ölçü birimi, sistem takvim.
import fr from '@angular/common/locales/fr';
import {
  HTTP_INTERCEPTORS,
  HttpClient,
  HttpClientModule,
} from '@angular/common/http';
import { TokenInterceptor } from './services/token.interceptor';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { MultiLanguagePageComponent } from './multi-language-page/multi-language-page.component';

registerLocaleData(tr);
registerLocaleData(fr);

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/pages/admin/', '.json');
}

@NgModule({
  declarations: [AppComponent, MultiLanguagePageComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
  ],
  providers: [
    // IoC
    {
      provide: loggerType,
      useClass: ConsoleLogger,
    },
    {
      provide: clientSecret,
      useValue: 'x-client',
    },
    {
      provide: 'IsDevelopment', // string unqiue key
      useValue: false, // development mod bazlı bazı servislere uygulamanın karar vermesini sitedik
    },
    {
      // duruma göre service instance almayı sağlayan bir tekniktir.
      provide: loggerType,
      useFactory: (isdev: boolean) => {
        console.log('IsDevelopment', isdev);
        return isdev ? new ConsoleLogger() : new ApiLogger();
      },
      deps: ['IsDevelopment'],
    },
    { provide: LOCALE_ID, useValue: 'fr' },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
