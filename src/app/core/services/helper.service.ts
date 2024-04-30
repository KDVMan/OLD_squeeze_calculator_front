import { Injectable } from '@angular/core';
import { FormSelect } from '@core/models/form-select.model';
import { BindEnum } from '@core/enums/bind.enum';

@Injectable({
	providedIn: 'root'
})
export class HelperService {
	public static convertTimeToDate(time: number): string {
		const date = new Date(time);
		const day = `${date.getDate()}`.padStart(2, '0');
		const month = `${date.getMonth() + 1}`.padStart(2, '0');

		return `${day}.${month}.${date.getFullYear()}`;
	}

	public static convertFromToTimeToDate(timeFrom: number, timeTo: number, delimiter: string = '-'): string {
		const dateFrom = HelperService.convertTimeToDate(timeFrom);
		const dateTo = HelperService.convertTimeToDate(timeTo);

		return `${dateFrom} ${delimiter} ${dateTo}`;
	}

	public static convertArrayToFormSelect(data: string[], translateModule: string = null): FormSelect[] {
		const out: FormSelect[] = [];

		for (const key of data) {
			out.push({
				key: key,
				value: translateModule ? translateModule + '.' + key : key
			});
		}

		return out;
	}

	public static convertEnumToFormSelect<T>(data: T, translateModule: string = null): FormSelect[] {
		const out: FormSelect[] = [];

		for (const key of Object.keys(data)) {
			out.push({
				key: key,
				value: translateModule ? translateModule + '.' + data[key] : data[key]
			});
		}

		return out;
	}

	public static getBindForLink(bind: BindEnum) {
		switch (bind) {
			case BindEnum.low:
				return 'l';
			case BindEnum.high:
				return 'h';
			case BindEnum.open:
				return 'o';
			case BindEnum.close:
				return 'c';
			case BindEnum.mhl:
				return 'hl';
			case BindEnum.moc:
				return 'oc';

			default:
				return undefined;
		}
	}

	public static round(value: number, decimals: number = 2): number {
		return Number(value.toFixed(decimals));
	}
}
