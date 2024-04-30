import { SortDirectionEnum } from '@core/enums/sort-direction.enum';
import { SymbolCalculatorSortEnum } from '@app/enums/symbol-calculator/symbol-calculator-sort.enum';

export interface SymbolCalculatorUpdateModel {
	group?: string;
	volume?: number;
	sortColumn?: SymbolCalculatorSortEnum;
	sortDirection?: SortDirectionEnum;
}