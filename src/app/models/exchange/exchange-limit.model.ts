import { ExchangeRateTypeEnum } from '@app/enums/exchange/exchange-rate-type.enum';
import { ExchangeRateIntervalEnum } from '@app/enums/exchange/exchange-rate-interval.enum';

export class ExchangeLimitModel {
	type: ExchangeRateTypeEnum;
	interval: ExchangeRateIntervalEnum;
	intervalNumber: number;
	total: number;
	totalLeft: number;
}