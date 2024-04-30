import { Component, Input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ControlCalculatorHeaderDateComponent } from '@app/components/control-calculator/control-calculator-header/control-calculator-header-date/control-calculator-header-date.component';
import { ControlCalculatorHeaderStartComponent } from '@app/components/control-calculator/control-calculator-header/control-calculator-header-start/control-calculator-header-start.component';
import { ControlCalculatorHeaderResetComponent } from '@app/components/control-calculator/control-calculator-header/control-calculator-header-reset/control-calculator-header-reset.component';
import { ControlCalculatorHeaderStopComponent } from '@app/components/control-calculator/control-calculator-header/control-calculator-header-stop/control-calculator-header-stop.component';

@Component({
	selector: 'app-control-calculator-header',
	templateUrl: './control-calculator-header.component.html',
	styleUrl: './control-calculator-header.component.scss',
	standalone: true,
	imports: [ReactiveFormsModule, ControlCalculatorHeaderDateComponent, ControlCalculatorHeaderStartComponent, ControlCalculatorHeaderResetComponent, ControlCalculatorHeaderStopComponent]
})
export class ControlCalculatorHeaderComponent {
	@Input() formGroup: FormGroup;
}
