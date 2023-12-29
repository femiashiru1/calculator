import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { DividerComponent } from './divider.component';
import { By } from '@angular/platform-browser';

describe('DividerComponent', () => {
  let component: DividerComponent;
  let fixture: ComponentFixture<DividerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DividerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DividerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('Component Template',() => {
    it('should create the component', () => {
      expect(component).toBeTruthy();
    });
    it('should show a dividend input field', () => {
      const dividend = fixture.debugElement.query(By.css('.dividend'));
      expect(dividend.nativeElement.placeholder).toContain('dividend');
    });
    it('should show a divisor input field', () => {
      const divisor = fixture.debugElement.query(By.css('.divisor'));
      expect(divisor.nativeElement.placeholder).toContain('divisor');
    });
    it('should show the result field', () => {
      const result = fixture.debugElement.query(By.css('.result'));
      expect(result).toBeTruthy();
    });
    it('the dividend and divisor should accept only integer value', () => {
      expect(component).toBeTruthy();
    });
    it('the dividend and divisor should show an error if non numerics are entered', fakeAsync(() => {
      let divisor = fixture.debugElement.query(By.css('.divisor'));
      let dividend = fixture.debugElement.query(By.css('.dividend'));
      divisor.nativeElement.value = 'abc';
      dividend.nativeElement.value = 'efg';
      divisor.nativeElement.dispatchEvent(new Event('input'));
      dividend.nativeElement.dispatchEvent(new Event('input'));
      tick(500);
      fixture.detectChanges();

      let invalidFields = fixture.debugElement.queryAll(By.css('.error'));
      expect(invalidFields.length).toBe(2);
    }));
    it('the dividend and divisor should show an error if 0 is entered', fakeAsync(() => {
      let divisor = fixture.debugElement.query(By.css('.divisor'));
      let dividend = fixture.debugElement.query(By.css('.dividend'));
      divisor.nativeElement.value = 0;
      dividend.nativeElement.value = 0;
      divisor.nativeElement.dispatchEvent(new Event('input'));
      dividend.nativeElement.dispatchEvent(new Event('input'));
      tick(500);
      fixture.detectChanges();

      let invalidFields = fixture.debugElement.queryAll(By.css('.error'));
      expect(invalidFields.length).toBe(2);
    }));
  });
  describe('Division',() => {
    it('should divide the dividend by the divisor and show a valid result', fakeAsync(() => {
      let divisor = fixture.debugElement.query(By.css('.divisor'));
      let dividend = fixture.debugElement.query(By.css('.dividend'));
      dividend.nativeElement.value = 55;
      divisor.nativeElement.value = 5;
      divisor.nativeElement.dispatchEvent(new Event('input'));
      dividend.nativeElement.dispatchEvent(new Event('input'));
      tick(500);
      fixture.detectChanges();

      expect(component.result).toBe('11');
    }));
    it('should NOT perform division if one of the input fields is invalid', () => {
      let divisor = fixture.debugElement.query(By.css('.divisor'));
      let dividend = fixture.debugElement.query(By.css('.dividend'));
      // when 'dividend' is invalid
      divisor.nativeElement.value = 24;
      dividend.nativeElement.value = 'abc';
      divisor.nativeElement.dispatchEvent(new Event('input'));
      dividend.nativeElement.dispatchEvent(new Event('input'));
      fixture.detectChanges();

      expect(component.result).toBe('');
      // when 'divisor' is invalid
      divisor.nativeElement.value = 0;
      dividend.nativeElement.value = 56;
      divisor.nativeElement.dispatchEvent(new Event('input'));
      dividend.nativeElement.dispatchEvent(new Event('input'));
      fixture.detectChanges();

      expect(component.result).toBe('');
    });
    it('should NOT show a result if the input field(s) are invalid', () => {
      let divisor = fixture.debugElement.query(By.css('.divisor'));
      let dividend = fixture.debugElement.query(By.css('.dividend'));
      // when 'dividend' is invalid
      divisor.nativeElement.value = 24;
      dividend.nativeElement.value = 'abc';
      divisor.nativeElement.dispatchEvent(new Event('input'));
      dividend.nativeElement.dispatchEvent(new Event('input'));
      fixture.detectChanges();

      let resultElement = fixture.debugElement.query(By.css('.result'));
      expect(resultElement.nativeElement.innerHTML).toBe('');
    });
  });


});
