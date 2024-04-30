import { Directive, ElementRef, EventEmitter, HostListener, Output, } from '@angular/core';

@Directive({
	selector: '[click-outside]',
	standalone: true
})
export class ClickOutsideDirective {
	@Output() clickOutside: EventEmitter<MouseEvent> = new EventEmitter();

	constructor(private elementRef: ElementRef) {
	}

	@HostListener('document:mousedown', ['$event'])
	onClick(event: MouseEvent): void {
		if (!this.elementRef.nativeElement.contains(event.target)) {
			this.clickOutside.emit(event);
		}
	}
}
