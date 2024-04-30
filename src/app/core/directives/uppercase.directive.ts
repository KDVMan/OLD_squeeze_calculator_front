import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
	selector: '[uppercase]',
	standalone: true
})
export class UppercaseDirective {
	constructor(public ref: ElementRef) {
	}

	@HostListener('input', ['$event']) onInput(event: { target: { value: string; }; }): void {
		this.ref.nativeElement.value = event.target.value.toUpperCase();
	}
}
