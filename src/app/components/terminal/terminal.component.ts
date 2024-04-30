import { Component } from '@angular/core';
import { HeaderComponent } from '@app/components/header/header.component';
import { SymbolCalculatorComponent } from '@app/components/symbol-calculator/symbol-calculator.component';
import { FooterComponent } from '@app/components/footer/footer.component';
import { ControlCalculatorComponent } from '@app/components/control-calculator/control-calculator.component';
import { ResultCalculatorComponent } from '@app/components/result-calculator/result-calculator.component';

@Component({
	selector: 'app-terminal',
	templateUrl: './terminal.component.html',
	styleUrl: './terminal.component.scss',
	standalone: true,
	imports: [HeaderComponent, FooterComponent, SymbolCalculatorComponent, ControlCalculatorComponent, ResultCalculatorComponent]
})
export class TerminalComponent {
}
