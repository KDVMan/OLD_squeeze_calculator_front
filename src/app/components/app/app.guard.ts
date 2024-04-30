import { inject } from '@angular/core';
import { catchError, forkJoin, of, switchMap, tap } from 'rxjs';
import { InitService } from '@app/services/init/init.service';
import { SymbolCalculatorService } from '@app/services/symbol-calculator/symbol-calculator.service';

export const addGuard = () => {
	const initService = inject(InitService);
	const symbolCalculatorService = inject(SymbolCalculatorService);

	return forkJoin({
		init: initService.load(),
		symbolCalculator: symbolCalculatorService.load()
	}).pipe(
		tap(() => {
		}),
		switchMap(() => of(true)),
		catchError(() => of(false))
	);
};