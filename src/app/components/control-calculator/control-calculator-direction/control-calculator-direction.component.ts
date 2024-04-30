import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { first, Subscription } from 'rxjs';
import { FormSelectComponent } from '@core/components/form-select/form-select.component';
import { FormSelect } from '@core/models/form-select.model';
import { HelperService } from '@core/services/helper.service';
import { TradeDirectionEnum } from '@core/enums/trade-direction.enum';
import { ControlCalculatorService } from '@app/services/control-calculator/control-calculator.service';
import { ControlCalculatorModel } from '@app/models/control-calculator/control-calculator.model';
import { ControlCalculatorLoadRequest } from '@app/requests/control-calculator/control-calculator-load.request';

@Component({
	selector: 'app-control-calculator-direction',
	templateUrl: './control-calculator-direction.component.html',
	standalone: true,
	imports: [ReactiveFormsModule, FormSelectComponent]
})
export class ControlCalculatorDirectionComponent implements OnInit, OnDestroy {
	@Input() formGroup: FormGroup;
	private subscriptionCalculator: Subscription;
	private subscriptionForm: Subscription;
	public directions: FormSelect[];

	constructor(private readonly controlCalculatorService: ControlCalculatorService) {
		this.directions = HelperService.convertEnumToFormSelect(TradeDirectionEnum, 'trade-direction');
	}

	public ngOnInit(): void {
		this.subscriptionCalculator = this.controlCalculatorService.updateSubject.subscribe((response: ControlCalculatorModel) => {
			this.formGroup.get('tradeDirection').patchValue(response.tradeDirection, {emitEvent: false});
		});
	}

	public ngOnDestroy(): void {
		if (this.subscriptionCalculator) this.subscriptionCalculator.unsubscribe();
		if (this.subscriptionForm) this.subscriptionForm.unsubscribe();
	}

	public onSelect(index: number): void {
		const request: ControlCalculatorLoadRequest = {
			symbol: this.controlCalculatorService.model.symbol,
			tradeDirection: this.directions[index].key as TradeDirectionEnum,
			interval: this.controlCalculatorService.model.interval
		};

		this.controlCalculatorService.load(request)
			.pipe(first())
			.subscribe();
	}
}
