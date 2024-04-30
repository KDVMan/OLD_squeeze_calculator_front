import { HttpService } from '@core/services/http.service';
import { Injectable } from '@angular/core';
import { first, Observable, Subject, tap } from 'rxjs';
import { ParamModel } from '@core/models/param.model';
import { InitModel } from '@app/models/init/init.model';
import { catchError } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { InitUpdateModel } from '@app/models/init/init-update.model';
import { InitSenderEnum } from '@app/enums/init/init-sender.enum';
import { InitSubjectModel } from '@app/models/init/init-subject.model';

@Injectable({
	providedIn: 'root'
})
export class InitService {
	public model: InitModel;
	public updateModel: InitSubjectModel;
	public updateSubject = new Subject<InitSubjectModel>();

	constructor(private readonly httpService: HttpService) {
	}

	public load(): Observable<InitModel> {
		return this.httpService.get<InitModel>('init/load').pipe(
			first(),
			tap((response: InitModel) => {
				this.model = response;
			}),
			catchError((error: HttpErrorResponse) => {
				throw new Error(error.error);
			})
		);
	}

	public update(data: InitUpdateModel, senders: InitSenderEnum[], params?: ParamModel): void {
		Object.assign(this.model, data);

		this.httpService
			.post<InitModel, InitModel>('init/update', this.model)
			.pipe(first())
			.subscribe((model: InitModel) => {
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
