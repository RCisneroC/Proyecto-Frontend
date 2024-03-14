import { Directive, ElementRef, HostListener, Input } from "@angular/core";

@Directive({
  selector: '[appOnlyNumber]'
})
export class OnlyNumberDirective {

  regexStr = '^[0-9]*$';
  constructor(private el: ElementRef) { }

  @Input()
  OnlyNumber: boolean = true;

  @HostListener('keydown', ['$event']) onKeyDown(event: KeyboardEvent) {
    const e = <KeyboardEvent> event;

    if(e.key =="Backspace")
       return;


        if ([46, 8, 9, 27, 13, 110, 190].indexOf(parseInt(e.code)) !== -1 ||
        // Allow: Ctrl+A
        (parseInt(e.code) == 65 && e.ctrlKey === true) ||
        // Allow: Ctrl+C
        (parseInt(e.code) == 67 && e.ctrlKey === true) ||
        // Allow: Ctrl+V
        (parseInt(e.code) == 86 && e.ctrlKey === true) ||
        // Allow: Ctrl+X
        (parseInt(e.code) == 88 && e.ctrlKey === true) ||
        // Allow: home, end, left, right
        (parseInt(e.code) >= 35 && parseInt(e.code) <= 39)) {
          // let it happen, don't do anything
          return;
        }

      const regEx =  new RegExp(this.regexStr);
      if(regEx.test(e.key))
        return;
      else
         e.preventDefault();
      }

}
