import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { SymbolCalculatorService } from '@app/services/symbol-calculator/symbol-calculator.service';
import { SymbolCalculatorGroupComponent } from '@app/components/symbol-calculator/symbol-calculator-panel/symbol-calculator-group/symbol-calculator-group.component';
import { SymbolCalculatorVolumeComponent } from '@app/components/symbol-calculator/symbol-calculator-panel/symbol-calculator-volume/symbol-calculator-volume.component';
import { SymbolCalculatorDownloadComponent } from '@app/components/symbol-calculator/symbol-calculator-panel/symbol-calculator-download/symbol-calculator-download.component';

@Component({
	selector: 'app-symbol-calculator-panel',
	templateUrl: './symbol-calculator-panel.component.html',
	styleUrl: './symbol-calculator-panel.component.scss',
	standalone: true,
	imports: [ReactiveFormsModule, SymbolCalculatorGroupComponent, SymbolCalculatorVolumeComponent, SymbolCalculatorDownloadComponent]
})
export class SymbolCalculatorPanelComponent implements OnInit {
	public formGroup: FormGroup;

	constructor(private readonly formBuilder: FormBuilder,
				private readonly symbolCalculatorService: SymbolCalculatorService) {
	}

	public ngOnInit(): void {
		this.formGroup = this.formBuilder.group({
			group: [this.symbolCalculatorService.model.group],
			volume: [this.symbolCalculatorService.model.volume]
		});
	}
}
