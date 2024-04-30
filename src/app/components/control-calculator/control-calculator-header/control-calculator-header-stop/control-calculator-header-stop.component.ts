import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { first } from 'rxjs';
import { ControlCalculatorService } from '@app/services/control-calculator/control-calculator.service';
import { NgIf } from '@angular/common';

@Component({
	selector: 'app-control-calculator-header-stop',
	templateUrl: './control-calculator-header-stop.component.html',
	styleUrl: './control-calculator-header-stop.component.scss',
	imports: [NgIf],
	standalone: true
})
export class ControlCalculatorHeaderStopComponent {
	@Input() formGroup: FormGroup;

	constructor(private readonly controlCalculatorService: ControlCalculatorService) {
	}

	public onClick(): void {
		this.controlCalculatorService.stop()
			.pipe(first())
			.subscribe();
	}
}