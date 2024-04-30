import { Injectable } from '@angular/core';
import { catchError, first, Observable } from 'rxjs';
import { HttpService } from '@core/services/http.service';
import { HttpErrorResponse } from '@angular/common/http';
import { SymbolSearchRequest } from '@app/requests/symbol-search/symbol-search.request';
import { SymbolSearchModel } from '@app/models/symbol-search/symbol-search.model';

@Injectable({
	providedIn: 'root'
})
export class SymbolService {
	constructor(private readonly httpService: HttpService) {
	}

	public search(request: SymbolSearchRequest): Observable<SymbolSearchModel[]> {
		return this.httpService.post<SymbolSearchRequest, SymbolSearchModel[]>('symbol/search', request).pipe(
			first(),
			catchError((error: HttpErrorResponse) => {
				throw new Error(error.error);
			})
		);
	}

	public download(): Observable<void> {
		return this.httpService.get<void>('symbol/download').pipe(
			first(),
			catchError((error: HttpErrorResponse) => {
				throw new Error(error.error);
			})
		);
	}
}
