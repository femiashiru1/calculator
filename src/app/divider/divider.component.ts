import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subject, debounceTime, takeUntil } from 'rxjs';

@Component({
  selector: 'app-divider',
  templateUrl: './divider.component.html',
  styleUrls: ['./divider.component.scss']
})
export class DividerComponent implements OnInit, OnDestroy {

  @Input('dividend') dividend:number = NaN;
  @Input('divisor') divisor:number = NaN;
  public result:string;
  private dividendSubject:Subject<string>;
  private divisorSubject:Subject<string>;
  private ngUnsubscribe:Subject<void>;

  constructor(){
    this.result = '';
    this.dividendSubject = new Subject<string>();
    this.divisorSubject = new Subject<string>();
    this.ngUnsubscribe = new Subject();
  }

  ngOnInit(): void {
    this.dividendSubject
      .pipe(debounceTime(500),takeUntil(this.ngUnsubscribe))
      .subscribe(value => {
        const parsedValue = Number.parseFloat(value);
        if(Number.isFinite(parsedValue)){
          this.dividend = parsedValue;
          if(this.divisor > 0 && this.dividend){
            this.result = String(this.dividend / this.divisor);
          }
          else{
            this.result = '';
          }
        }
        else{
          this.dividend = NaN;
          this.result = '';
        }
      });

      this.divisorSubject
      .pipe(debounceTime(500))
      .subscribe(value => {
        const parsedValue = Number.parseFloat(value);
        if(Number.isFinite(parsedValue)){
          this.divisor = parsedValue;
          if(this.dividend > 0 && this.divisor > 0){
            this.result = String(this.dividend / this.divisor);
          }
          else{
            this.result = '';
          }
        }
        else{
          this.divisor = NaN;
          this.result = '';
        }
      });
  }

  onDividendChange(event:Event){
    const value = (event.target as HTMLInputElement).value;
    this.dividendSubject.next(value);
  }

  onDivisorChange(event:Event){
    const value = (event.target as HTMLInputElement).value;
    this.divisorSubject.next(value);
  }

  isValid(field:any){
    return isNaN(field) ? true : parseFloat(field) == 0 ? true : false;
  }

  ngOnDestroy(){
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
