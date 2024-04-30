import { Component } from '@angular/core';
import { SortDirectionEnum } from '@core/enums/sort-direction.enum';
import { SvgIconComponent } from 'angular-svg-icon';
import { SortIconPipe } from '@core/pipes/sort-icon.pipe';
import { CommonModule } from '@angular/common';
import { SymbolCalculatorService } from '@app/services/symbol-calculator/symbol-calculator.service';
import { SymbolCalculatorSortEnum } from '@app/enums/symbol-calculator/symbol-calculator-sort.enum';
import { SymbolCalculatorSenderEnum } from '@app/enums/symbol-calculator/symbol-calculator-sender.enum';

@Component({
	selector: 'app-symbol-calculator-sort',
	templateUrl: './symbol-calculator-sort.component.html',
	styleUrl: './symbol-calculator-sort.component.scss',
	standalone: true,
	imports: [CommonModule, SortIconPipe, SvgIconComponent]
})
export class SymbolCalculatorSortComponent {
	public sortColumn: SymbolCalculatorSortEnum = SymbolCalculatorSortEnum.volume;
	public sortDirection: SortDirectionEnum = SortDirectionEnum.desc;

	public sortFields = [
		{name: 'Пара', value: SymbolCalculatorSortEnum.symbol},
		{name: 'Объем', value: SymbolCalculatorSortEnum.volume},
		{name: 'Трейды', value: SymbolCalculatorSortEnum.trades},
		{name: 'Цена', value: SymbolCalculatorSortEnum.price},
		{name: '%', value: SymbolCalculatorSortEnum.percent}
	];

	constructor(private readonly symbolCalculatorService: SymbolCalculatorService) {
		this.sortColumn = symbolCalculatorService.model.sortColumn;
		this.sortDirection = symbolCalculatorService.model.sortDirection;
	}

	public onSort(column: SymbolCalculatorSortEnum): void {
		if (column === this.sortColumn) {
			this.sortDirection = this.sortDirection === SortDirectionEnum.asc ? SortDirectionEnum.desc : SortDirectionEnum.asc;
		} else {
			this.sortColumn = column;
			this.sortDirection = SortDirectionEnum.asc;
		}

		this.symbolCalculatorService.update({
			sortColumn: this.sortColumn,
			sortDirection: this.sortDirection
		}, [SymbolCalculatorSenderEnum.sort]);
	}
}
