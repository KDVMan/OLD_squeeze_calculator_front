import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { first, Subscription } from 'rxjs';
import { FormSelectComponent } from '@core/components/form-select/form-select.component';
import { FormSelect } from '@core/models/form-select.model';
import { HelperService } from '@core/services/helper.service';
import { IntervalEnum } from '@core/enums/interval.enum';
import { ControlCalculatorService } from '@app/services/control-calculator/control-calculator.service';
import { ControlCalculatorLoadRequest } from '@app/requests/control-calculator/control-calculator-load.request';
import { ControlCalculatorModel } from '@app/models/control-calculator/control-calculator.model';

@Component({
	selector: 'app-control-calculator-interval',
	templateUrl: './control-calculator-interval.component.html',
	standalone: true,
	imports: [ReactiveFormsModule, FormSelectComponent]
})
export class ControlCalculatorIntervalComponent implements OnInit, OnDestroy {
	@Input() formGroup: FormGroup;
	private subscription: Subscription;
	public intervals: FormSelect[];

	constructor(private readonly controlCalculatorService: ControlCalculatorService) {
		this.intervals = HelperService.convertEnumToFormSelect(IntervalEnum, 'interval');
	}

	public ngOnInit(): void {
		this.subscription = this.controlCalculatorService.updateSubject.subscribe((response: ControlCalculatorModel) => {
			this.formGroup.get('interval').patchValue(response.interval);
		});
	}

	public ngOnDestroy(): void {
		if (this.subscription) this.subscription.unsubscribe();
	}

	public onSelect(index: number): void {
		const request: ControlCalculatorLoadRequest = {
			symbol: this.controlCalculatorService.model.symbol,
			tradeDirection: this.controlCalculatorService.model.tradeDirection,
			interval: this.intervals[index].key as IntervalEnum
		};

		this.controlCalculatorService.load(request)
			.pipe(first())
			.subscribe();
	}
}
