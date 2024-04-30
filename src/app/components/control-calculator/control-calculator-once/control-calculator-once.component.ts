import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ControlCalculatorService } from '@app/services/control-calculator/control-calculator.service';
import { ControlCalculatorModel } from '@app/models/control-calculator/control-calculator.model';

@Component({
	selector: 'app-control-calculator-once',
	templateUrl: './control-calculator-once.component.html',
	standalone: true,
	imports: [ReactiveFormsModule]
})
export class ControlCalculatorOnceComponent implements OnInit, OnDestroy {
	@Input() formGroup: FormGroup;
	private subscription: Subscription;

	constructor(private readonly controlCalculatorService: ControlCalculatorService) {
	}

	public ngOnInit(): void {
		this.subscription = this.controlCalculatorService.updateSubject.subscribe((response: ControlCalculatorModel) => {
			this.formGroup.patchValue({
				oncePerCandle: response.oncePerCandle
			});
		});
	}

	public ngOnDestroy(): void {
		if (this.subscription) this.subscription.unsubscribe();
	}
}
