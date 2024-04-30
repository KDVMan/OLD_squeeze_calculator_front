import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormInputNumberComponent } from '@core/components/form-input-number/form-input-number.component';
import { Subscription } from 'rxjs';
import { ControlContainer, FormGroup } from '@angular/forms';
import { ZeroNumberDirective } from '@core/directives/zero-number.directive';
import { SymbolCalculatorService } from '@app/services/symbol-calculator/symbol-calculator.service';
import { SymbolCalculatorSenderEnum } from '@app/enums/symbol-calculator/symbol-calculator-sender.enum';

@Component({
	selector: 'app-symbol-calculator-volume',
	templateUrl: './symbol-calculator-volume.component.html',
	standalone: true,
	imports: [FormInputNumberComponent, ZeroNumberDirective]
})
export class SymbolCalculatorVolumeComponent implements OnInit, OnDestroy {
	private subscription: Subscription;
	public formGroup: FormGroup;

	constructor(private readonly controlContainer: ControlContainer,
				private readonly symbolCalculatorService: SymbolCalculatorService) {
	}

	public ngOnInit(): void {
		this.formGroup = this.controlContainer.control as FormGroup;

		this.subscription = this.formGroup.get('volume').valueChanges.subscribe(volume => {
			this.symbolCalculatorService.update({
				volume: Number(volume || 0)
			}, [SymbolCalculatorSenderEnum.volume]);
		});
	}

	public ngOnDestroy(): void {
		if (this.subscription) this.subscription.unsubscribe();
	}
}
