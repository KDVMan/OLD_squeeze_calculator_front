import { IntervalEnum } from '@core/enums/interval.enum';
import { TradeDirectionEnum } from '@core/enums/trade-direction.enum';

export interface ControlCalculatorResetRequest {
	symbol: string;
	tradeDirection: TradeDirectionEnum;
	interval: IntervalEnum;
}