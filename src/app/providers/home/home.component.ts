import { Component, Inject, OnInit } from '@angular/core';
import { ConsoleLogger, ILogger, loggerType } from '../ILogger';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [
    // component içinde servis ovveride etme
    {
      provide: loggerType,
      useClass: ConsoleLogger,
    },
  ],
})
export class HomeComponent implements OnInit {
  today!: Date;
  amount: number = 36788;
  name: string = 'ali'; // capitalize

  constructor(
    @Inject(loggerType) private logger: ILogger // Console logger bağlı kalma Logger provider üzerinden bir loglamaya bağlan.
  ) {
    this.today = new Date();
  }

  ngOnInit(): void {
    this.logger.log('home-component');
  }
}
