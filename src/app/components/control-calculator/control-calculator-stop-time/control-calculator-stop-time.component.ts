import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { FormInputNumberComponent } from '@core/components/form-input-number/form-input-number.component';
import { ControlCalculatorService } from '@app/services/control-calculator/control-calculator.service';
import { ControlCalculatorModel } from '@app/models/control-calculator/control-calculator.model';

@Component({
	selector: 'app-control-calculator-stop-time',
	templateUrl: './control-calculator-stop-time.component.html',
	standalone: true,
	imports: [ReactiveFormsModule, FormInputNumberComponent]
})
export class ControlCalculatorStopTimeComponent implements OnInit, OnDestroy {
	@Input() formGroup: FormGroup;
	private subscription: Subscription;

	constructor(private readonly controlCalculatorService: ControlCalculatorService) {
	}

	public ngOnInit(): void {
		this.subscription = this.controlCalculatorService.updateSubject.subscribe((response: ControlCalculatorModel) => {
			this.formGroup.patchValue({
				stopTime: response.stopTime,
				stopTimeFrom: response.stopTimeFrom,
				stopTimeTo: response.stopTimeTo,
				stopTimeStep: response.stopTimeStep
			});
		});

		this.formGroup.get('stopTime').valueChanges.subscribe((checked: boolean) => {
			this.toggleFields(checked);
		});

		this.toggleFields(this.formGroup.get('stopTime').value);
	}

	public ngOnDestroy(): void {
		if (this.subscription) this.subscription.unsubscribe();
	}

	private toggleFields(checked: boolean): void {
		if (checked) {
			this.formGroup.get('stopTimeFrom').enable();
			this.formGroup.get('stopTimeTo').enable();
			this.formGroup.get('stopTimeStep').enable();
		} else {
			this.formGroup.get('stopTimeFrom').disable();
			this.formGroup.get('stopTimeTo').disable();
			this.formGroup.get('stopTimeStep').disable();
		}
	}
}
