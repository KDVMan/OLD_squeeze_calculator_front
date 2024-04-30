import { TradeDirectionEnum } from '@core/enums/trade-direction.enum';
import { IntervalEnum } from '@core/enums/interval.enum';
import { ControlCalculatorSortEnum } from '@app/enums/control-calculator/control-calculator-sort.enum';
import { SortDirectionEnum } from '@core/enums/sort-direction.enum';

export interface ResultCalculatorLoadRequest {
	symbol: string;
	tradeDirection: TradeDirectionEnum;
	interval: IntervalEnum;
	limit: number;
	sortColumn: ControlCalculatorSortEnum;
	sortDirection: SortDirectionEnum;
}