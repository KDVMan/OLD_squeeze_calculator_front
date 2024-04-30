import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { FormInputNumberComponent } from '@core/components/form-input-number/form-input-number.component';
import { ControlCalculatorModel } from '@app/models/control-calculator/control-calculator.model';
import { ControlCalculatorService } from '@app/services/control-calculator/control-calculator.service';

@Component({
	selector: 'app-control-calculator-stop-percent',
	templateUrl: './control-calculator-stop-percent.component.html',
	standalone: true,
	imports: [ReactiveFormsModule, FormInputNumberComponent]
})
export class ControlCalculatorStopPercentComponent implements OnInit, OnDestroy {
	@Input() formGroup: FormGroup;
	private subscription: Subscription;

	constructor(private readonly controlCalculatorService: ControlCalculatorService) {
	}

	public ngOnInit(): void {
		this.subscription = this.controlCalculatorService.updateSubject.subscribe((response: ControlCalculatorModel) => {
			this.formGroup.patchValue({
				stopPercent: response.stopPercent,
				stopPercentFrom: response.stopPercentFrom,
				stopPercentTo: response.stopPercentTo,
				stopPercentStep: response.stopPercentStep
			});
		});

		this.formGroup.get('stopPercent').valueChanges.subscribe((checked: boolean) => {
			this.toggleFields(checked);
		});

		this.toggleFields(this.formGroup.get('stopPercent').value);
	}

	public ngOnDestroy(): void {
		if (this.subscription) this.subscription.unsubscribe();
	}

	private toggleFields(checked: boolean): void {
		if (checked) {
			this.formGroup.get('stopPercentFrom').enable();
			this.formGroup.get('stopPercentTo').enable();
			this.formGroup.get('stopPercentStep').enable();
		} else {
			this.formGroup.get('stopPercentFrom').disable();
			this.formGroup.get('stopPercentTo').disable();
			this.formGroup.get('stopPercentStep').disable();
		}
	}
}
