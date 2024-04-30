import { TradeDirectionEnum } from '@core/enums/trade-direction.enum';
import { IntervalEnum } from '@core/enums/interval.enum';
import { SortDirectionEnum } from '@core/enums/sort-direction.enum';
import { ControlCalculatorSortEnum } from '@app/enums/control-calculator/control-calculator-sort.enum';

export interface ControlCalculatorFilterRequest {
	symbol: string;
	tradeDirection: TradeDirectionEnum;
	interval: IntervalEnum;
	profitPercent?: number;
	averageProfitPercent?: number;
	total?: number;
	coefficient?: number;
	ratio?: number;
	winRate?: number;
	score?: number;
	sortColumn?: ControlCalculatorSortEnum;
	sortDirection?: SortDirectionEnum;
}