import { Component, Input, OnInit } from '@angular/core';
import { ControlContainer, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgbTooltip } from '@ng-bootstrap/ng-bootstrap';
import { SelectOnFocusDirective } from '@core/directives/select-on-focus.directive';
import { NumberOnlyDirective } from '@core/directives/number-only.directive';
import { ZeroNumberDirective } from '@core/directives/zero-number.directive';

@Component({
	selector: 'app-form-input-number',
	templateUrl: './form-input-number.component.html',
	standalone: true,
	imports: [CommonModule, ReactiveFormsModule, NgbTooltip, SelectOnFocusDirective, NumberOnlyDirective, ZeroNumberDirective]
})
export class FormInputNumberComponent implements OnInit {
	@Input() name: string;
	@Input() width: number;
	@Input() widthHalf: boolean;
	@Input() widthMax: boolean;
	@Input() height: number;
	@Input() align: 'left' | 'right' | 'center' = 'left';
	@Input() allowSign: boolean = false;
	@Input() allowDecimal: boolean = false;
	@Input() decimalSeparator: string = '.';
	@Input() maxLength: number;
	@Input() maxDecimalLength: number;
	@Input() tooltip: string;
	@Input() tooltipDelay: number = 300;
	@Input() placeholder: string = '';
	@Input() addString: string = '';
	public formGroup: FormGroup;

	constructor(private controlContainer: ControlContainer) {
	}

	ngOnInit(): void {
		this.formGroup = <FormGroup>this.controlContainer.control;
	}
}