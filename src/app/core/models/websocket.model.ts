import { WebsocketEnum } from '@app/enums/websocket.enum';

export interface WebsocketModel<T> {
	event: WebsocketEnum;
	data: T;
}