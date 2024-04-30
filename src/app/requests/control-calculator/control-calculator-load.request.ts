import { TradeDirectionEnum } from '@core/enums/trade-direction.enum';
import { IntervalEnum } from '@core/enums/interval.enum';

export interface ControlCalculatorLoadRequest {
	symbol: string;
	tradeDirection?: TradeDirectionEnum;
	interval?: IntervalEnum;
}