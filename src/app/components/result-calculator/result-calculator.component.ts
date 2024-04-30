import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingSpinnerComponent } from '@core/components/loading-spinner/loading-spinner.component';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoadingPercentComponent } from '@core/components/loading-percent/loading-percent.component';
import { FormatNumberPipe } from '@core/pipes/format-number.pipe';
import { SortIconPipe } from '@core/pipes/sort-icon.pipe';
import { SvgIconComponent } from 'angular-svg-icon';
import { FormInputNumberComponent } from '@core/components/form-input-number/form-input-number.component';
import { NumberOnlyDirective } from '@core/directives/number-only.directive';
import { SelectOnFocusDirective } from '@core/directives/select-on-focus.directive';
import { ZeroNumberDirective } from '@core/directives/zero-number.directive';
import { ResultCalculatorLoadRequest } from '@app/requests/result-calculator/result-calculator-load.request';
import { ControlCalculatorService } from '@app/services/control-calculator/control-calculator.service';
import { ResultCalculatorService } from '@app/services/result-calculator/result-calculator.service';
import { first, Subscription } from 'rxjs';
import { ResultCalculatorModel } from '@app/models/result_calculator/result-calculator.model';
import { ControlCalculatorModel } from '@app/models/control-calculator/control-calculator.model';
import { HelperService } from '@core/services/helper.service';
import { TradeDirectionEnum } from '@core/enums/trade-direction.enum';
import { CalculatorProgressModel } from '@app/models/calculator/calculator-progress.model';
import { WebsocketEnum } from '@app/enums/websocket.enum';
import { WebsocketService } from '@core/services/websocket.service';
import { WebsocketStatusEnum } from '@app/enums/websocket-status.enum';
import { ControlCalculatorSortEnum } from '@app/enums/control-calculator/control-calculator-sort.enum';
import { SortDirectionEnum } from '@core/enums/sort-direction.enum';

@Component({
	selector: 'app-result-calculator',
	templateUrl: './result-calculator.component.html',
	styleUrl: './result-calculator.component.scss',
	standalone: true,
	imports: [CommonModule, FormsModule, LoadingSpinnerComponent, LoadingPercentComponent, FormatNumberPipe, SortIconPipe, SvgIconComponent,
		FormInputNumberComponent, NumberOnlyDirective, ReactiveFormsModule, SelectOnFocusDirective, ZeroNumberDirective]
})
export class ResultCalculatorComponent implements OnInit, OnDestroy {
	public formGroup: FormGroup;
	private subscriptionCalculator: Subscription;
	private subscriptionProgress: Subscription;
	public results: ResultCalculatorModel[];
	public progress: CalculatorProgressModel;
	public status: WebsocketStatusEnum = null;
	public readonly statusEnum = WebsocketStatusEnum;
	public sortColumn: ControlCalculatorSortEnum = ControlCalculatorSortEnum.score;
	public sortDirection: SortDirectionEnum = SortDirectionEnum.desc;
	public loaded: boolean = false;

	public sortFields = [
		{name: 'П.', value: ControlCalculatorSortEnum.bind},
		{name: 'Вх.', value: ControlCalculatorSortEnum.percentIn},
		{name: 'Вы.', value: ControlCalculatorSortEnum.percentOut},
		{name: 'С t', value: ControlCalculatorSortEnum.stopTime},
		{name: 'С %', value: ControlCalculatorSortEnum.stopPercent},
		{name: 'Сд', value: ControlCalculatorSortEnum.total},
		{name: 'Тк', value: ControlCalculatorSortEnum.totalTakes},
		{name: 'Ст', value: ControlCalculatorSortEnum.totalStops},
		{name: 'Проф', value: ControlCalculatorSortEnum.profitPercent},
		{name: 'Ср.Профит', value: ControlCalculatorSortEnum.averageProfitPercent},
		{name: 'ВР', value: ControlCalculatorSortEnum.winRate},
		{name: 'Вр.сдл', value: ControlCalculatorSortEnum.maxTimeDeal},
		{name: 'Ср.вр.сдл', value: ControlCalculatorSortEnum.averageTimeDeal},
		{name: 'Прс.рат', value: ControlCalculatorSortEnum.drawdownProfitRatio},
		{name: 'Прос', value: ControlCalculatorSortEnum.maxDrawdown},
		{name: 'Очки', value: ControlCalculatorSortEnum.score}
	];

	constructor(private readonly websocketService: WebsocketService,
				private readonly controlCalculatorService: ControlCalculatorService,
				private readonly resultCalculatorService: ResultCalculatorService) {
	}

	public ngOnInit(): void {
		this.subscriptionCalculator = this.controlCalculatorService.updateSubject.subscribe((response: ControlCalculatorModel) => {
			this.loaded = false;
			this.onLoad();
		});

		this.subscriptionProgress = this.websocketService.receive<CalculatorProgressModel>(WebsocketEnum.calculator).subscribe(result => {
			this.progress = result;
			this.status = result.status;
			if (this.status === WebsocketStatusEnum.done || this.status === WebsocketStatusEnum.stop) this.onLoad();
		});
	}

	public ngOnDestroy(): void {
		if (this.subscriptionCalculator) this.subscriptionCalculator.unsubscribe();
		if (this.subscriptionProgress) this.subscriptionProgress.unsubscribe();
	}

	public onLoad(column: ControlCalculatorSortEnum = null): void {
		if (column) {
			if (column === this.sortColumn) {
				this.sortDirection = this.sortDirection === SortDirectionEnum.asc ? SortDirectionEnum.desc : SortDirectionEnum.asc;
			} else {
				this.sortColumn = column;
				this.sortDirection = SortDirectionEnum.asc;
			}
		}

		const request: ResultCalculatorLoadRequest = {
			symbol: this.controlCalculatorService.model.symbol,
			tradeDirection: this.controlCalculatorService.model.tradeDirection,
			interval: this.controlCalculatorService.model.interval,
			limit: 100,
			sortColumn: this.sortColumn,
			sortDirection: this.sortDirection
		};

		this.resultCalculatorService.load(request)
			.pipe(first())
			.subscribe((response: ResultCalculatorModel[]) => {
				this.results = response;

				// this.sortColumn = this.calculatorService.model.filter.sortColumn;
				// this.sortDirection = this.calculatorService.model.filter.sortDirection;
				this.loaded = true;
			});
	}

	public onCreate(resultCalculatorModel: ResultCalculatorModel): void {
		const stopTime = resultCalculatorModel.param.stopTime > 0 ? resultCalculatorModel.param.stopTime / 60 / 1000 : 0;

		let url = `https://lexx-trade.com/strategy?utm_source=squeeze_calculator#t=s&s=binance-futures:${resultCalculatorModel.symbol}&tu=1&src=squeeze_calculator`;
		url += `&tf=${resultCalculatorModel.interval}`;
		url += `&bi=${HelperService.getBindForLink(resultCalculatorModel.param.bind)}`;
		url += `&bt=${resultCalculatorModel.param.percentIn}`;
		url += `&st=${resultCalculatorModel.param.percentOut}`;
		url += `&oc=${resultCalculatorModel.param.oncePerCandle ? 1 : 0}`;
		url += `&d=${resultCalculatorModel.tradeDirection === TradeDirectionEnum.long ? 'l' : 's'}`;

		if (resultCalculatorModel.param.stopTime > 0) url += `&slt=1&sltv=${stopTime}`;
		if (resultCalculatorModel.param.stopPercent > 0) url += `&sl=${resultCalculatorModel.param.stopPercent}`;

		let stop = [];
		if (resultCalculatorModel.param.stopTime > 0) stop.push(`${stopTime}t`);
		if (resultCalculatorModel.param.stopPercent > 0) stop.push(`${resultCalculatorModel.param.stopPercent}%`);

		let name = [`${resultCalculatorModel.interval}/${resultCalculatorModel.param.bind}`, `${resultCalculatorModel.param.percentIn}/${resultCalculatorModel.param.percentOut}`];
		name.push(`${stop.join('/')}`);
		name.push(`${HelperService.round(resultCalculatorModel.profitPercent)}/${HelperService.round(resultCalculatorModel.maxDrawdown)}`);

		url += `&n=${encodeURIComponent(name.join(', '))}`;

		window.open(url, '_blank');
	}
}
