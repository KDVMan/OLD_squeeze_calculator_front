import { BindEnum } from '@core/enums/bind.enum';

export class ResultCalculatorParamModel {
	bind: BindEnum;
	percentIn: number;
	percentOut: number;
	stopTime?: number;
	stopPercent?: number;
	oncePerCandle: boolean;
}