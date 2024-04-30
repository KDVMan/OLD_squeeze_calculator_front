import { Injectable } from '@angular/core';
import { filter, Observable, Subject } from 'rxjs';
import { ConfigService } from '@core/services/config.service';
import { map } from 'rxjs/operators';
import { WebsocketEnum } from '@app/enums/websocket.enum';
import { WebsocketModel } from '@core/models/websocket.model';

@Injectable({
	providedIn: 'root'
})
export class WebsocketService {
	private socket: WebSocket;
	private subject = new Subject<WebsocketModel<any>>();
	public messages$: Observable<WebsocketModel<any>> = this.subject.asObservable();

	constructor(private readonly configService: ConfigService) {
		this.connect();
	}

	private connect(): void {
		this.socket = new WebSocket(this.configService.get('api.ws'));

		this.socket.onmessage = (event) => {
			this.subject.next(JSON.parse(event.data));
		};

		this.socket.onclose = (event) => {
			console.error('WebSocket closed', event);
		};

		this.socket.onerror = (error) => {
			console.error('WebSocket error', error);
		};
	}

	public receive<T>(event: WebsocketEnum): Observable<T> {
		return this.messages$.pipe(
			// tap(message => console.log('AAAA WS', message)),
			filter(message => message.event === event),
			map(message => message.data as T)
		);
	}

	public send(data: any): void {
		if (this.socket.readyState === WebSocket.OPEN) {
			this.socket.send(JSON.stringify(data));
		} else {
			console.error('WebSocket is not connected.');
		}
	}
}
