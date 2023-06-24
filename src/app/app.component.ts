import { Component, Inject, OnInit } from '@angular/core';
import { ApiLogger, ILogger, loggerType } from './providers/ILogger';
import { clientSecret } from './app.module';
import { HttpClient } from '@angular/common/http';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'IKCApp04';
  date = new Date();

  // resolve kısmı
  constructor(
    @Inject(loggerType) private logger: ILogger,
    @Inject(clientSecret) private clientSecret: string,
    @Inject('IsDevelopment') private isDev: boolean,
    private http: HttpClient,
    private translate: TranslateService
  ) {}

  ngOnInit(): void {
    this.logger.log('deneme');
    console.log('clientSecret', this.clientSecret);
    console.log('dev', this.isDev);
    this.translate.addLangs(['tr', 'en']);
    this.translate.setDefaultLang('tr');
    this.translate.use('tr');
  }

  fetchData() {
    // fetch('https://jsonplaceholder.typicode.com/posts').then((data) =>
    //   console.log('data', data)
    // );

    // observable tipini tetiklemek için subcribe olmalıyız
    this.http
      .get('https://jsonplaceholder.typicode.com/posts')
      .subscribe((res) => {
        console.log('res', res);
      });
  }
}
