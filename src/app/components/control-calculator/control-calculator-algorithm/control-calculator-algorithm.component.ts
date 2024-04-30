import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { FormSelectComponent } from '@core/components/form-select/form-select.component';
import { FormSelect } from '@core/models/form-select.model';
import { HelperService } from '@core/services/helper.service';
import { AlgorithmEnum } from '@core/enums/algorithm.enum';
import { ControlCalculatorService } from '@app/services/control-calculator/control-calculator.service';
import { ControlCalculatorModel } from '@app/models/control-calculator/control-calculator.model';

@Component({
	selector: 'app-control-calculator-algorithm',
	templateUrl: './control-calculator-algorithm.component.html',
	standalone: true,
	imports: [ReactiveFormsModule, FormSelectComponent]
})
export class ControlCalculatorAlgorithmComponent implements OnInit, OnDestroy {
	@Input() formGroup: FormGroup;
	private subscription: Subscription;
	public algorithms: FormSelect[];

	constructor(private readonly controlCalculatorService: ControlCalculatorService) {
		this.algorithms = HelperService.convertEnumToFormSelect(AlgorithmEnum);
	}

	public ngOnInit(): void {
		this.subscription = this.controlCalculatorService.updateSubject.subscribe((response: ControlCalculatorModel) => {
			this.formGroup.get('algorithm').patchValue(response.algorithm);
		});
	}

	public ngOnDestroy(): void {
		if (this.subscription) this.subscription.unsubscribe();
	}
}
