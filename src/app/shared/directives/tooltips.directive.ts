import { Directive, Renderer2, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appTooltips]'
})
export class TooltipsDirective {
  @Input() tooltipsText: string = 'This is tooltips';

  constructor(private elementRef: ElementRef,
    private renderer: Renderer2
  ) { }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.

    /* Add style for the tooltips host element */
    this.renderer.setStyle(this.elementRef.nativeElement, 'position', 'relative')

    /* Styles the span element*/
    const tooltipsTextStyle = {
      'visibility': 'hidden',
      'opacity': '0',
      'width': '120px',
      'background-color': '#555',
      'color': '#fff',
      'text-align': 'center',
      'border-radius': '3px',
      'padding': '5px 0',
      'position': 'absolute',
      'z-index': '1',
      'top': '125%',
      'left': '50%',
      'margin-left': '-60px',
      'transition': 'opacity 0.3s'
    }
    const span = this.renderer.createElement('span')
    const text = this.renderer.createText(this.tooltipsText)
    for(let key in tooltipsTextStyle) {
      this.renderer.setStyle(span, key, tooltipsTextStyle[key])
    }

    /* Append span element to the host element */
    this.renderer.appendChild(span, text)
    this.renderer.appendChild(this.elementRef.nativeElement, span)
  }

  @HostListener('mouseenter') mouseEnter() {
    /* Show span on mouse enter */
    const hoverTooltipsStyle = { 
      'visibility': 'visible',
      'opacity': '1',
    }
    let span = this.elementRef.nativeElement.querySelector('span')
    for(let key in hoverTooltipsStyle) {
      this.renderer.setStyle(span, key, hoverTooltipsStyle[key])
    }
    // console.log(span)
  }
  @HostListener('mouseleave') mouseLeave() {
    /* Hide span on mouse enter */
    const hoverTooltipsStyle = { 
      'visibility': 'hidden',
      'opacity': '0',
    }
    let span = this.elementRef.nativeElement.querySelector('span')
    for(let key in hoverTooltipsStyle) {
      this.renderer.setStyle(span, key, hoverTooltipsStyle[key])
    }
    // console.log(span)
  }
}
