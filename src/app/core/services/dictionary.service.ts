import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';

@Injectable({
	providedIn: 'root'
})
export class DictionaryService {
	private dictionary: any;

	constructor(private readonly http: HttpClient) {
	}

	public load(): Promise<boolean> {
		return new Promise((resolve) => {
			this.http.get('/assets/dictionary/dictionary.json').pipe(
				map(res => res),
				catchError(error => {
					resolve(true);
					throw new Error(error);
				})
			).subscribe((dictionary: any) => {
				this.dictionary = dictionary;
				resolve(true);
			});
		});
	}

	public getMessage(key: string): string {
		return this.dictionary[key] ? this.dictionary[key] : this.dictionary['default'];
	}
}
