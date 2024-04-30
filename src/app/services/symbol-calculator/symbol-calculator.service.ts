import { HttpService } from '@core/services/http.service';
import { Injectable } from '@angular/core';
import { first, Observable, Subject, tap } from 'rxjs';
import { ParamModel } from '@core/models/param.model';
import { catchError } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { SymbolCalculatorModel } from '@app/models/symbol-calculator/symbol-calculator.model';
import { SymbolCalculatorSubjectModel } from '@app/models/symbol-calculator/symbol-calculator-subject.model';
import { SymbolCalculatorUpdateModel } from '@app/models/symbol-calculator/symbol-calculator-update.model';
import { SymbolCalculatorSenderEnum } from '@app/enums/symbol-calculator/symbol-calculator-sender.enum';

@Injectable({
	providedIn: 'root'
})
export class SymbolCalculatorService {
	public model: SymbolCalculatorModel;
	public updateModel: SymbolCalculatorSubjectModel;
	public updateSubject = new Subject<SymbolCalculatorSubjectModel>();

	constructor(private readonly httpService: HttpService) {
	}

	public load(): Observable<SymbolCalculatorModel> {
		return this.httpService.get<SymbolCalculatorModel>('symbol_calculator/load').pipe(
			first(),
			tap((response: SymbolCalculatorModel) => {
				this.model = response;
			}),
			catchError((error: HttpErrorResponse) => {
				throw new Error(error.error);
			})
		);
	}

	public update(data: SymbolCalculatorUpdateModel, senders: SymbolCalculatorSenderEnum[], params?: ParamModel): void {
		Object.assign(this.model, data);

		this.httpService
			.post<SymbolCalculatorModel, SymbolCalculatorModel>('symbol_calculator/update', this.model)
			.pipe(first())
			.subscribe((model: SymbolCalculatorModel) => {
				this.model = model;

				this.updateModel = {
					model: model,
					senders: senders,
					params: params
				};

				this.updateSubject.next(this.updateModel);
			});
	}
}
