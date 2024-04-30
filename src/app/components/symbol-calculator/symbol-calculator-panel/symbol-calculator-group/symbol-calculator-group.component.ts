import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormSelect } from '@core/models/form-select.model';
import { FormSelectComponent } from '@core/components/form-select/form-select.component';
import { ControlContainer, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { HelperService } from '@core/services/helper.service';
import { SymbolCalculatorService } from '@app/services/symbol-calculator/symbol-calculator.service';
import { SymbolCalculatorSubjectModel } from '@app/models/symbol-calculator/symbol-calculator-subject.model';
import { SymbolCalculatorSenderEnum } from '@app/enums/symbol-calculator/symbol-calculator-sender.enum';

@Component({
	selector: 'app-symbol-calculator-group',
	templateUrl: './symbol-calculator-group.component.html',
	standalone: true,
	imports: [FormSelectComponent]
})
export class SymbolCalculatorGroupComponent implements OnInit, OnDestroy {
	@ViewChild(FormSelectComponent) formSelectComponent: FormSelectComponent;
	private subscriptionSymbolCalculator: Subscription;
	private subscriptionForm: Subscription;
	public formGroup: FormGroup;
	public groups: FormSelect[];

	constructor(private readonly controlContainer: ControlContainer,
				private readonly symbolCalculatorService: SymbolCalculatorService) {
	}

	public ngOnInit(): void {
		this.groups = HelperService.convertArrayToFormSelect(this.symbolCalculatorService.model.groups);
		this.formGroup = this.controlContainer.control as FormGroup;

		this.subscriptionSymbolCalculator = this.symbolCalculatorService.updateSubject.subscribe(result => this.onUpdate(result));
		this.subscriptionForm = this.formGroup.get('group').valueChanges.subscribe(value => this.onSelect(value));
	}

	public ngOnDestroy(): void {
		if (this.subscriptionSymbolCalculator) this.subscriptionSymbolCalculator.unsubscribe();
		if (this.subscriptionForm) this.subscriptionForm.unsubscribe();
	}

	private onUpdate(result: SymbolCalculatorSubjectModel): void {
		if (this.formGroup.get('group').value === result.model.group) return;

		this.formGroup.get('group').setValue(result.model.group, {emitEvent: false});
		this.formSelectComponent.itemActive = this.groups.find(x => x.key === result.model.group);
	}

	private onSelect(value: string): void {
		this.symbolCalculatorService.update({
			group: value
		}, [SymbolCalculatorSenderEnum.group]);
	}
}
