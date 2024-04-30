import { HttpService } from '@core/services/http.service';
import { Injectable } from '@angular/core';
import { first, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { ResultCalculatorLoadRequest } from '@app/requests/result-calculator/result-calculator-load.request';
import { ResultCalculatorModel } from '@app/models/result_calculator/result-calculator.model';

@Injectable({
	providedIn: 'root'
})
export class ResultCalculatorService {
	constructor(private readonly httpService: HttpService) {
	}

	public load(request: ResultCalculatorLoadRequest): Observable<ResultCalculatorModel[]> {
		return this.httpService.post<ResultCalculatorLoadRequest, ResultCalculatorModel[]>('result_calculator/load', request).pipe(
			first(),
			catchError((error: HttpErrorResponse) => {
				throw new Error(error.error);
			})
		);
	}
}
