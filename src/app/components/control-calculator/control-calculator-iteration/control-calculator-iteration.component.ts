import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { FormInputNumberComponent } from '@core/components/form-input-number/form-input-number.component';
import { ControlCalculatorService } from '@app/services/control-calculator/control-calculator.service';
import { ControlCalculatorModel } from '@app/models/control-calculator/control-calculator.model';

@Component({
	selector: 'app-control-calculator-iteration',
	templateUrl: './control-calculator-iteration.component.html',
	standalone: true,
	imports: [ReactiveFormsModule, FormInputNumberComponent]
})
export class ControlCalculatorIterationComponent implements OnInit, OnDestroy {
	@Input() formGroup: FormGroup;
	private subscriptionControlCalculator: Subscription;
	private subscriptionForm: Subscription;
	public count: number = 0;

	constructor(private readonly controlCalculatorService: ControlCalculatorService) {
	}

	public ngOnInit(): void {
		this.subscriptionControlCalculator = this.controlCalculatorService.updateSubject.subscribe((response: ControlCalculatorModel) => {
			this.formGroup.patchValue({
				iterations: response.iterations
			});
		});

		this.subscriptionForm = this.formGroup.valueChanges.subscribe(() => {
			if (this.formGroup.valid && this.formGroup.get('bind').disabled === false) {
				this.count = this.getCount(this.formGroup.value);
			}
		});
	}

	public ngOnDestroy(): void {
		if (this.subscriptionControlCalculator) this.subscriptionControlCalculator.unsubscribe();
		if (this.subscriptionForm) this.subscriptionForm.unsubscribe();
	}

	private getCount(controlCalculatorModel: ControlCalculatorModel): number {
		const percentInStep = controlCalculatorModel.percentInStep || 1;
		const percentOutStep = controlCalculatorModel.percentOutStep || 1;
		const stopTimeStep = controlCalculatorModel.stopTime ? (controlCalculatorModel.stopTimeStep || 1) : 1;
		const stopPercentStep = controlCalculatorModel.stopPercent ? (controlCalculatorModel.stopPercentStep || 1) : 1;
		const percentInIterations = Math.floor((controlCalculatorModel.percentInTo - controlCalculatorModel.percentInFrom) / percentInStep) + 1;
		const percentOutIterations = Math.floor((controlCalculatorModel.percentOutTo - controlCalculatorModel.percentOutFrom) / percentOutStep) + 1;
		const stopTimeIterations = controlCalculatorModel.stopTime ? Math.floor((controlCalculatorModel.stopTimeTo - controlCalculatorModel.stopTimeFrom) / stopTimeStep) + 1 : 1;
		const stopPercentIterations = controlCalculatorModel.stopPercent ? Math.floor((controlCalculatorModel.stopPercentTo - controlCalculatorModel.stopPercentFrom) / stopPercentStep) + 1 : 1;
		const bindIterations = controlCalculatorModel.bind ? controlCalculatorModel.bind.length : 1;
		const result = percentInIterations * percentOutIterations * stopTimeIterations * stopPercentIterations * bindIterations;

		return isFinite(result) ? result : 0;
	}
}
