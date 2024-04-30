import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from '@app/components/app/app.component';
import { provideRouter } from '@angular/router';
import { routes } from '@app/components/app/app.routes';
import { HTTP_INTERCEPTORS, HttpClient, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { ApiInterceptor } from '@core/interceptors/api.interceptor';
import { ErrorInterceptor } from '@core/interceptors/error.interceptor';
import { APP_INITIALIZER, importProvidersFrom, LOCALE_ID } from '@angular/core';
import { ConfigService } from '@core/services/config.service';
import { provideAngularSvgIcon } from 'angular-svg-icon';
import { provideToastr } from 'ngx-toastr';
import { provideAnimations } from '@angular/platform-browser/animations';
import { DictionaryService } from '@core/services/dictionary.service';
import { TranslationService } from '@core/services/translation.service';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { OWL_DATE_TIME_FORMATS, OwlNativeDateTimeModule } from '@danielmoncada/angular-datetime-picker';
import { registerLocaleData } from '@angular/common';
import localeRu from '@angular/common/locales/ru';

registerLocaleData(localeRu, 'ru');

const dateTimeFormat = {
	fullPickerInput: {year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric'},
	datePickerInput: {year: 'numeric', month: 'numeric', day: 'numeric'},
	timePickerInput: {hour: 'numeric', minute: 'numeric'},
	monthYearLabel: {year: 'numeric', month: 'short'},
	dateA11yLabel: {year: 'numeric', month: 'long', day: 'numeric'},
	monthYearA11yLabel: {year: 'numeric', month: 'long'},
};

bootstrapApplication(AppComponent, {
	providers: [
		provideRouter(routes),
		provideAngularSvgIcon(),
		provideHttpClient(withInterceptorsFromDi()),
		provideAnimations(),
		provideToastr({
			positionClass: 'toast-top-right',
			preventDuplicates: false
		}),
		importProvidersFrom(
			TranslateModule.forRoot({
				defaultLanguage: 'ru',
				loader: {
					provide: TranslateLoader,
					useFactory: (http: HttpClient) => new TranslateHttpLoader(http),
					deps: [HttpClient]
				}
			}),
			OwlNativeDateTimeModule
		),
		{
			provide: HTTP_INTERCEPTORS,
			useClass: ApiInterceptor,
			multi: true
		},
		{
			provide: HTTP_INTERCEPTORS,
			useClass: ErrorInterceptor,
			multi: true
		},
		{
			provide: APP_INITIALIZER,
			useFactory: (configService: ConfigService) => () => configService.load(),
			deps: [ConfigService],
			multi: true
		},
		{
			provide: APP_INITIALIZER,
			useFactory: (dictionaryService: DictionaryService) => () => dictionaryService.load(),
			deps: [DictionaryService],
			multi: true
		},
		{
			provide: APP_INITIALIZER,
			useFactory: (translationService: TranslationService) => () => translationService.load(),
			deps: [TranslationService],
			multi: true
		},
		{
			provide: OWL_DATE_TIME_FORMATS,
			useValue: dateTimeFormat
		},
		{
			provide: LOCALE_ID,
			useValue: 'ru'
		}
	]
}).catch((err: any) => console.error(err));
