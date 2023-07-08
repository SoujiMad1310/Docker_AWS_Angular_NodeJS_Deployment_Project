import { Directive, ElementRef, HostListener, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appChangeTestBg]'
})
export class ChangeTestBgDirective {

  @Input() isAnswerCorrect: Boolean = false;
  constructor(private elem: ElementRef, private render: Renderer2) { }
  @HostListener('click') answer() {
    if(this.isAnswerCorrect)
    {
      this.render.setStyle(this.elem.nativeElement,'background','green');
      this.render.setStyle(this.elem.nativeElement,'color','#fff');
      this.render.setStyle(this.elem.nativeElement,'border','2px solid gray');
    }
    else{
      this.render.setStyle(this.elem.nativeElement,'background','red');
      this.render.setStyle(this.elem.nativeElement,'color','#fff');
      this.render.setStyle(this.elem.nativeElement,'border','2px solid gray');
    }
  }
}
