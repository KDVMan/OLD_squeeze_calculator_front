import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { first } from 'rxjs';
import { ControlCalculatorService } from '@app/services/control-calculator/control-calculator.service';
import { ControlCalculatorStartRequest } from '@app/requests/control-calculator/control-calculator-start.request';
import { NgIf } from '@angular/common';

@Component({
	selector: 'app-control-calculator-header-start',
	templateUrl: './control-calculator-header-start.component.html',
	styleUrl: './control-calculator-header-start.component.scss',
	imports: [
		NgIf
	],
	standalone: true
})
export class ControlCalculatorHeaderStartComponent {
	@Input() formGroup: FormGroup;

	constructor(private readonly controlCalculatorService: ControlCalculatorService) {
	}

	public onClick(): void {
		const request: ControlCalculatorStartRequest = {
			symbol: this.controlCalculatorService.model.symbol,
			tradeDirection: this.formGroup.get('tradeDirection').value,
			interval: this.formGroup.get('interval').value,
			timeFrom: new Date(this.formGroup.get('date').value[0]).getTime(),
			timeTo: new Date(this.formGroup.get('date').value[1]).getTime(),
			oncePerCandle: this.formGroup.get('oncePerCandle').value,
			bind: this.formGroup.get('bind').value,
			percentInFrom: Number(this.formGroup.get('percentInFrom').value),
			percentInTo: Number(this.formGroup.get('percentInTo').value),
			percentInStep: Number(this.formGroup.get('percentInStep').value),
			percentOutFrom: Number(this.formGroup.get('percentOutFrom').value),
			percentOutTo: Number(this.formGroup.get('percentOutTo').value),
			percentOutStep: Number(this.formGroup.get('percentOutStep').value),
			stopTime: this.formGroup.get('stopTime').value,
			stopTimeFrom: Number(this.formGroup.get('stopTimeFrom').value),
			stopTimeTo: Number(this.formGroup.get('stopTimeTo').value),
			stopTimeStep: Number(this.formGroup.get('stopTimeStep').value),
			stopPercent: this.formGroup.get('stopPercent').value,
			stopPercentFrom: Number(this.formGroup.get('stopPercentFrom').value),
			stopPercentTo: Number(this.formGroup.get('stopPercentTo').value),
			stopPercentStep: Number(this.formGroup.get('stopPercentStep').value),
			algorithm: this.formGroup.get('algorithm').value,
			iterations: Number(this.formGroup.get('iterations').value)
		};

		this.controlCalculatorService.start(request)
			.pipe(first())
			.subscribe();
	}
}