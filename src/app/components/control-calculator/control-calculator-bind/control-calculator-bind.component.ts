import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { FormSelect } from '@core/models/form-select.model';
import { HelperService } from '@core/services/helper.service';
import { BindEnum } from '@core/enums/bind.enum';
import { NgForOf } from '@angular/common';
import { ControlCalculatorService } from '@app/services/control-calculator/control-calculator.service';
import { ControlCalculatorModel } from '@app/models/control-calculator/control-calculator.model';

@Component({
	selector: 'app-control-calculator-bind',
	templateUrl: './control-calculator-bind.component.html',
	standalone: true,
	imports: [ReactiveFormsModule, NgForOf]
})
export class ControlCalculatorBindComponent implements OnInit, OnDestroy {
	@Input() formGroup: FormGroup;
	private subscription: Subscription;
	public binds: FormSelect[];

	constructor(private readonly controlCalculatorService: ControlCalculatorService) {
		this.binds = HelperService.convertEnumToFormSelect(BindEnum);
	}

	public ngOnInit(): void {
		this.subscription = this.controlCalculatorService.updateSubject.subscribe((response: ControlCalculatorModel) => {
			this.formGroup.get('bind').patchValue(response.bind);
		});
	}

	public ngOnDestroy(): void {
		if (this.subscription) this.subscription.unsubscribe();
	}
}
