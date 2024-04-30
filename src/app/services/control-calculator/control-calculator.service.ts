import { HttpService } from '@core/services/http.service';
import { Injectable } from '@angular/core';
import { first, Observable, Subject } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { ControlCalculatorModel } from '@app/models/control-calculator/control-calculator.model';
import { ControlCalculatorLoadRequest } from '@app/requests/control-calculator/control-calculator-load.request';
import { ControlCalculatorStartRequest } from '@app/requests/control-calculator/control-calculator-start.request';
import { ControlCalculatorFilterRequest } from '@app/requests/control-calculator/control-calculator-filter.request';
import { ControlCalculatorResetRequest } from '@app/requests/control-calculator/control-calculator-reset.request';

@Injectable({
	providedIn: 'root'
})
export class ControlCalculatorService {
	public model: ControlCalculatorModel;
	public updateSubject = new Subject<ControlCalculatorModel>();

	constructor(private readonly httpService: HttpService) {
	}

	private init(model: ControlCalculatorModel): void {
		this.model = model;
		this.updateSubject.next(model);
	}

	public load(request: ControlCalculatorLoadRequest): Observable<ControlCalculatorModel> {
		return this.httpService.post<ControlCalculatorLoadRequest, ControlCalculatorModel>('control_calculator/load', request).pipe(
			first(),
			tap((response: ControlCalculatorModel) => {
				this.init(response);
			}),
			catchError((error: HttpErrorResponse) => {
				throw new Error(error.error);
			})
		);
	}

	public start(request: ControlCalculatorStartRequest): Observable<void> {
		return this.httpService.post<ControlCalculatorStartRequest, void>('control_calculator/start', request).pipe(
			first(),
			catchError((error: HttpErrorResponse) => {
				throw new Error(error.error);
			})
		);
	}

	public stop(): Observable<void> {
		return this.httpService.get<void>('control_calculator/stop').pipe(
			first(),
			catchError((error: HttpErrorResponse) => {
				throw new Error(error.error);
			})
		);
	}

	public filter(request: ControlCalculatorFilterRequest): Observable<ControlCalculatorModel> {
		return this.httpService.post<ControlCalculatorFilterRequest, ControlCalculatorModel>('control_calculator/filter', request).pipe(
			first(),
			tap((response: ControlCalculatorModel) => {
				this.init(response);
			}),
			catchError((error: HttpErrorResponse) => {
				throw new Error(error.error);
			})
		);
	}

	public reset(request: ControlCalculatorResetRequest): Observable<ControlCalculatorModel> {
		return this.httpService.post<ControlCalculatorResetRequest, ControlCalculatorModel>('control_calculator/reset', request).pipe(
			first(),
			tap((response: ControlCalculatorModel) => {
				this.init(response);
			}),
			catchError((error: HttpErrorResponse) => {
				throw new Error(error.error);
			})
		);
	}
}
