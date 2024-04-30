import { IntervalEnum } from '@core/enums/interval.enum';
import { TradeDirectionEnum } from '@core/enums/trade-direction.enum';
import { ResultCalculatorParamModel } from '@app/models/result_calculator/result-calculator-param.model';
import { ResultCalculatorDealModel } from '@app/models/result_calculator/result-calculator-deal.model';
import { ResultCalculatorFilterModel } from '@app/models/result_calculator/result-calculator-filter.model';

export class ResultCalculatorModel {
	symbol: string;
	tradeDirection: TradeDirectionEnum;
	interval: IntervalEnum;
	profitPercent: number;
	averageProfitPercent: number;
	standardDeviationProfitPercent: number;
	total: number;
	totalStops: number;
	totalTakes: number;
	coefficient: number;
	ratio: number;
	winRate: number;
	maxTimeDeal: number;
	averageTimeDeal: number;
	maxDrawdown: number;
	averageDrawdown: number;
	drawdownProfitRatio: number;
	score: number;
	param: ResultCalculatorParamModel;
	deals: ResultCalculatorDealModel[];
	filter: ResultCalculatorFilterModel;
}
