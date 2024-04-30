import { Component } from '@angular/core';
import { SvgIconComponent } from 'angular-svg-icon';
import { ConfirmDialogService } from '@core/services/confirm-dialog.service';
import { first } from 'rxjs';
import { ControlCalculatorService } from '@app/services/control-calculator/control-calculator.service';

@Component({
	selector: 'app-control-calculator-header-reset',
	templateUrl: './control-calculator-header-reset.component.html',
	standalone: true,
	imports: [SvgIconComponent]
})
export class ControlCalculatorHeaderResetComponent {
	constructor(private readonly confirmDialogService: ConfirmDialogService,
				private readonly controlCalculatorService: ControlCalculatorService) {
	}

	public onReset(): void {
		this.confirmDialogService.confirm('Сбросить по умолчанию?',
			() => {
				this.controlCalculatorService.reset({
					symbol: this.controlCalculatorService.model.symbol,
					tradeDirection: this.controlCalculatorService.model.tradeDirection,
					interval: this.controlCalculatorService.model.interval
				}).pipe(first()).subscribe();
			},
			() => null
		);
	}
}
