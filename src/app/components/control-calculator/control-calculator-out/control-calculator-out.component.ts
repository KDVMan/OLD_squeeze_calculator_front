import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { FormInputNumberComponent } from '@core/components/form-input-number/form-input-number.component';
import { ControlCalculatorService } from '@app/services/control-calculator/control-calculator.service';
import { ControlCalculatorModel } from '@app/models/control-calculator/control-calculator.model';

@Component({
	selector: 'app-control-calculator-out',
	templateUrl: './control-calculator-out.component.html',
	standalone: true,
	imports: [ReactiveFormsModule, FormInputNumberComponent]
})
export class ControlCalculatorOutComponent implements OnInit, OnDestroy {
	@Input() formGroup: FormGroup;
	private subscription: Subscription;

	constructor(private readonly controlCalculatorService: ControlCalculatorService) {
	}

	public ngOnInit(): void {
		this.subscription = this.controlCalculatorService.updateSubject.subscribe((response: ControlCalculatorModel) => {
			this.formGroup.get('percentOutFrom').patchValue(response.percentOutFrom);
			this.formGroup.get('percentOutTo').patchValue(response.percentOutTo);
			this.formGroup.get('percentOutStep').patchValue(response.percentOutStep);
		});
	}

	public ngOnDestroy(): void {
		if (this.subscription) this.subscription.unsubscribe();
	}
}
