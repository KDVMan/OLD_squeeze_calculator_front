import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { OwlDateTimeIntl, OwlDateTimeModule } from '@danielmoncada/angular-datetime-picker';
import { Subscription } from 'rxjs';
import { ControlCalculatorService } from '@app/services/control-calculator/control-calculator.service';
import { ControlCalculatorModel } from '@app/models/control-calculator/control-calculator.model';

@Component({
	selector: 'app-control-calculator-header-date',
	templateUrl: './control-calculator-header-date.component.html',
	styleUrl: './control-calculator-header-date.component.scss',
	standalone: true,
	imports: [ReactiveFormsModule, OwlDateTimeModule]
})
export class ControlCalculatorHeaderDateComponent implements OnInit, OnDestroy {
	@Input() formGroup: FormGroup;
	private subscription: Subscription;

	constructor(private readonly owlDateTimeIntl: OwlDateTimeIntl,
				private readonly controlCalculatorService: ControlCalculatorService) {
		this.owlDateTimeIntl.rangeFromLabel = 'От';
		this.owlDateTimeIntl.rangeToLabel = 'До';
		this.owlDateTimeIntl.cancelBtnLabel = 'Отмена';
		this.owlDateTimeIntl.setBtnLabel = 'Принять';
	}

	public ngOnInit(): void {
		this.subscription = this.controlCalculatorService.updateSubject.subscribe((response: ControlCalculatorModel) => {
			const date = [];

			if (response?.['timeFrom']) date.push(new Date(response['timeFrom']));
			if (response?.['timeTo']) date.push(new Date(response['timeTo']));

			this.formGroup.get('date').patchValue(date);
		});
	}

	public onClick(event: any): void {
		if (event.which === 2) {
			this.formGroup.get('date').setValue([]);
		}
	}

	public ngOnDestroy(): void {
		if (this.subscription) this.subscription.unsubscribe();
	}
}
