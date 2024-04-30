import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { ExchangeLimitModel } from '@app/models/exchange/exchange-limit.model';
import { TranslateModule } from '@ngx-translate/core';
import { WebsocketService } from '@core/services/websocket.service';
import { WebsocketEnum } from '@app/enums/websocket.enum';

@Component({
	selector: 'app-footer-limit',
	templateUrl: './footer-limit.component.html',
	styleUrl: './footer-limit.component.scss',
	standalone: true,
	imports: [CommonModule, TranslateModule]
})
export class FooterLimitComponent implements OnInit, OnDestroy {
	private subscription: Subscription;
	public limits: { key: string; total: number; totalLeft: number }[] = [];

	constructor(private readonly websocketService: WebsocketService) {
	}

	public ngOnInit(): void {
		this.subscription = this.websocketService.receive<ExchangeLimitModel[]>(WebsocketEnum.exchangeLimits).subscribe(result => {
			this.limits = result.map(limit => ({
				key: `${limit.type}-${limit.intervalNumber}-${limit.interval}`.toLowerCase(),
				total: limit.total,
				totalLeft: limit.totalLeft
			}));
		});
	}

	public ngOnDestroy(): void {
		if (this.subscription) this.subscription.unsubscribe();
	}
}