import { WebsocketStatusEnum } from '@app/enums/websocket-status.enum';

export class CalculatorProgressModel {
	count: number;
	total: number;
	status: WebsocketStatusEnum;
}