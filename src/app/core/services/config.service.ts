import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';

@Injectable({
	providedIn: 'root'
})
export class ConfigService {
	private config: any;

	constructor(private http: HttpClient) {
	}

	public load(): Promise<boolean> {
		return new Promise((resolve) => {
			this.http.get('/assets/config.json').pipe(
				map(result => result),
				catchError(error => {
					resolve(true);
					throw new Error(error);
				})
			).subscribe((config: any) => {
				this.config = config;
				resolve(true);
			});
		});
	}

	public get(name: string): any {
		let value = this.config;

		for (const key of name.split('.')) {
			if (value && value[key]) value = value[key];
			else return '';
		}

		return value;
	}
}
