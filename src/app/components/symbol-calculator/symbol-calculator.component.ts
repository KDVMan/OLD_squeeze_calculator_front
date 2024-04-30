import { Component, OnDestroy, OnInit } from '@angular/core';
import { LoadingSpinnerComponent } from '@core/components/loading-spinner/loading-spinner.component';
import { LoadingService } from '@core/services/loading.service';
import { CommonModule } from '@angular/common';
import { FormatNumberPipe } from '@core/pipes/format-number.pipe';
import { InitService } from '@app/services/init/init.service';
import { combineLatest, Observable, startWith, Subscription } from 'rxjs';
import { SymbolModel } from '@app/models/symbol/symbol.model';
import { SymbolCalculatorPanelComponent } from '@app/components/symbol-calculator/symbol-calculator-panel/symbol-calculator-panel.component';
import { LoadingEnum } from '@core/enums/loading.enum';
import { SymbolCalculatorSortComponent } from '@app/components/symbol-calculator/symbol-calculator-sort/symbol-calculator-sort.component';
import { SymbolCalculatorService } from '@app/services/symbol-calculator/symbol-calculator.service';
import { map } from 'rxjs/operators';
import { InitSubjectModel } from '@app/models/init/init-subject.model';
import { SymbolCalculatorSubjectModel } from '@app/models/symbol-calculator/symbol-calculator-subject.model';
import { SymbolCalculatorSortEnum } from '@app/enums/symbol-calculator/symbol-calculator-sort.enum';
import { SortDirectionEnum } from '@core/enums/sort-direction.enum';
import { InitSenderEnum } from '@app/enums/init/init-sender.enum';
import { WebsocketService } from '@core/services/websocket.service';
import { WebsocketEnum } from '@app/enums/websocket.enum';

@Component({
	selector: 'app-symbol-calculator',
	templateUrl: './symbol-calculator.component.html',
	styleUrl: './symbol-calculator.component.scss',
	standalone: true,
	imports: [CommonModule, LoadingSpinnerComponent, FormatNumberPipe, SymbolCalculatorPanelComponent, SymbolCalculatorSortComponent]
})
export class SymbolCalculatorComponent implements OnInit, OnDestroy {
	private subscriptionDownload: Subscription;
	public symbols$: Observable<SymbolModel[]>;
	public symbolActive: string;
	public loaded = true;

	constructor(private readonly loadingService: LoadingService,
				private readonly initService: InitService,
				private readonly symbolCalculatorService: SymbolCalculatorService,
				private readonly websocketService: WebsocketService) {
	}

	public ngOnInit(): void {
		this.subscriptionDownload = this.loadingService.subject.subscribe(result => {
			if (result.name === LoadingEnum.symbolDownload) this.loaded = !result.loading;
		});

		this.symbols$ = combineLatest([
			this.initService.updateSubject.pipe(startWith({model: this.initService.model})),
			this.symbolCalculatorService.updateSubject.pipe(startWith({model: this.symbolCalculatorService.model})),
			this.websocketService.receive<SymbolModel[]>(WebsocketEnum.symbolCalculatorSymbols)
		]).pipe(
			map(([initSubjectModel, symbolCalculatorSubjectModel, symbols]: [InitSubjectModel, SymbolCalculatorSubjectModel, SymbolModel[]]) => {
				this.symbolActive = initSubjectModel.model.symbol;
				const group = symbolCalculatorSubjectModel.model.group;
				const volume = symbolCalculatorSubjectModel.model.volume;
				const sortColumn = symbolCalculatorSubjectModel.model.sortColumn;
				const sortDirection = symbolCalculatorSubjectModel.model.sortDirection;

				return symbols
					.filter(x => (group == '' || x.group === group) && x.statistic.volume >= volume)
					.sort((a, b) => {
						if (sortColumn === SymbolCalculatorSortEnum.price) {
							return sortDirection === SortDirectionEnum.asc ? a.statistic.price - b.statistic.price : b.statistic.price - a.statistic.price;
						} else if (sortColumn === SymbolCalculatorSortEnum.volume) {
							return sortDirection === SortDirectionEnum.asc ? a.statistic.volume - b.statistic.volume : b.statistic.volume - a.statistic.volume;
						} else if (sortColumn === SymbolCalculatorSortEnum.trades) {
							return sortDirection === SortDirectionEnum.asc ? a.statistic.trades - b.statistic.trades : b.statistic.trades - a.statistic.trades;
						} else if (sortColumn === SymbolCalculatorSortEnum.percent) {
							return sortDirection === SortDirectionEnum.asc ? a.statistic.pricePercent - b.statistic.pricePercent : b.statistic.pricePercent - a.statistic.pricePercent;
						}

						return sortDirection === SortDirectionEnum.asc ? a.symbol.localeCompare(b.symbol) : b.symbol.localeCompare(a.symbol);
					});
			})
		);
	}

	public ngOnDestroy(): void {
		if (this.subscriptionDownload) this.subscriptionDownload.unsubscribe();
	}

	public onClick(symbol: string) {
		this.initService.update({
			symbol: symbol
		}, [InitSenderEnum.symbol]);
	}

	public trackBySymbol(index: number, symbol: SymbolModel): string {
		return symbol.symbol;
	}
}
