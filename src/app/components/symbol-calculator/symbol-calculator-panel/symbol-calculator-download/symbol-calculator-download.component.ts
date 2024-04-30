import { Component } from '@angular/core';
import { SvgIconComponent } from 'angular-svg-icon';
import { LoadingService } from '@core/services/loading.service';
import { LoadingEnum } from '@core/enums/loading.enum';
import { SymbolService } from '@app/services/symbol/symbol.service';
import { first } from 'rxjs';

@Component({
	selector: 'app-symbol-calculator-download',
	templateUrl: './symbol-calculator-download.component.html',
	standalone: true,
	imports: [SvgIconComponent]
})
export class SymbolCalculatorDownloadComponent {
	constructor(private readonly loadingService: LoadingService,
				private readonly symbolService: SymbolService) {
	}

	public onDownload(): void {
		this.loadingService.set(LoadingEnum.symbolDownload, true);

		this.symbolService.download().pipe(first()).subscribe(_ => {
			this.loadingService.set(LoadingEnum.symbolDownload, false);
		});
	}
}
