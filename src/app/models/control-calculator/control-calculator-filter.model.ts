import { SortDirectionEnum } from '@core/enums/sort-direction.enum';
import { ControlCalculatorSortEnum } from '@app/enums/control-calculator/control-calculator-sort.enum';

export class ControlCalculatorFilterModel {
	profitPercent: number;
	total: number;
	coefficient: number;
	ratio: number;
	winRate: number;
	score: number;
	sortColumn: ControlCalculatorSortEnum;
	sortDirection: SortDirectionEnum;
}