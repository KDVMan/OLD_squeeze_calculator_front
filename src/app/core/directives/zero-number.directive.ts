import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
	selector: '[zero-number]',
	standalone: true
})
export class ZeroNumberDirective {
	constructor(public ref: ElementRef) {
	}

	@HostListener('input', ['$event']) onInput(event: { target: { value: string; }; }): void {
		if (/^0[0-9]+/.test(event.target.value)) event.target.value = event.target.value.replace(/^0+/, '');
		if (event.target.value === '') event.target.value = '0';

		this.ref.nativeElement.value = event.target.value;
	}
}
