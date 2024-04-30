import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingSpinnerComponent } from '@core/components/loading-spinner/loading-spinner.component';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { first, Subscription } from 'rxjs';
import { LoadingPercentComponent } from '@core/components/loading-percent/loading-percent.component';
import { InitService } from '@app/services/init/init.service';
import { dateRangeValidator } from '@core/validators/date-range.validator';
import { greaterThanValidator } from '@core/validators/greater-than.validator';
import { lesserThanValidator } from '@core/validators/lesser-than.validator';
import { ControlCalculatorHeaderComponent } from '@app/components/control-calculator/control-calculator-header/control-calculator-header.component';
import { ControlCalculatorDirectionComponent } from '@app/components/control-calculator/control-calculator-direction/control-calculator-direction.component';
import { ControlCalculatorIntervalComponent } from '@app/components/control-calculator/control-calculator-interval/control-calculator-interval.component';
import { ControlCalculatorInComponent } from '@app/components/control-calculator/control-calculator-in/control-calculator-in.component';
import { ControlCalculatorOutComponent } from '@app/components/control-calculator/control-calculator-out/control-calculator-out.component';
import { ControlCalculatorStopTimeComponent } from '@app/components/control-calculator/control-calculator-stop-time/control-calculator-stop-time.component';
import { ControlCalculatorStopPercentComponent } from '@app/components/control-calculator/control-calculator-stop-percent/control-calculator-stop-percent.component';
import { ControlCalculatorBindComponent } from '@app/components/control-calculator/control-calculator-bind/control-calculator-bind.component';
import { ControlCalculatorAlgorithmComponent } from '@app/components/control-calculator/control-calculator-algorithm/control-calculator-algorithm.component';
import { ControlCalculatorIterationComponent } from '@app/components/control-calculator/control-calculator-iteration/control-calculator-iteration.component';
import { ControlCalculatorOnceComponent } from '@app/components/control-calculator/control-calculator-once/control-calculator-once.component';
import { InitSubjectModel } from '@app/models/init/init-subject.model';
import { InitSenderEnum } from '@app/enums/init/init-sender.enum';
import { ControlCalculatorLoadRequest } from '@app/requests/control-calculator/control-calculator-load.request';
import { ControlCalculatorService } from '@app/services/control-calculator/control-calculator.service';
import { WebsocketEnum } from '@app/enums/websocket.enum';
import { WebsocketService } from '@core/services/websocket.service';
import { CalculatorProgressModel } from '@app/models/calculator/calculator-progress.model';
import { WebsocketStatusEnum } from '@app/enums/websocket-status.enum';

@Component({
	selector: 'app-control-calculator',
	templateUrl: './control-calculator.component.html',
	styleUrl: './control-calculator.component.scss',
	standalone: true,
	imports: [CommonModule, ReactiveFormsModule, LoadingSpinnerComponent, LoadingPercentComponent, ControlCalculatorHeaderComponent, ControlCalculatorDirectionComponent,
		ControlCalculatorIntervalComponent, ControlCalculatorInComponent, ControlCalculatorOutComponent, ControlCalculatorStopTimeComponent, ControlCalculatorStopPercentComponent,
		ControlCalculatorBindComponent, ControlCalculatorAlgorithmComponent, ControlCalculatorIterationComponent, ControlCalculatorOnceComponent]
})
export class ControlCalculatorComponent implements OnInit, OnDestroy {
	public formGroup: FormGroup;
	private subscriptionInit: Subscription;
	private subscriptionProgress: Subscription;
	public status: WebsocketStatusEnum = null;
	public readonly statusEnum = WebsocketStatusEnum;
	public loaded: boolean = false;

	constructor(private readonly formBuilder: FormBuilder,
				private readonly initService: InitService,
				private readonly websocketService: WebsocketService,
				private readonly controlCalculatorService: ControlCalculatorService) {
	}

	public ngOnInit(): void {
		this.createForm();
		this.load();

		this.subscriptionInit = this.initService.updateSubject.subscribe((response: InitSubjectModel) => {
			if (response.senders.some(x => x === InitSenderEnum.symbol)) {
				this.loaded = false;
				this.load();
			}
		});

		this.subscriptionProgress = this.websocketService.receive<CalculatorProgressModel>(WebsocketEnum.calculator).subscribe(result => {
			this.status = result.status;
			this.toggleForm(this.status);
		});
	}

	public ngOnDestroy(): void {
		if (this.subscriptionInit) this.subscriptionInit.unsubscribe();
		if (this.subscriptionProgress) this.subscriptionProgress.unsubscribe();
	}

	private load(): void {
		const request: ControlCalculatorLoadRequest = {
			symbol: this.initService.model.symbol
		};

		this.controlCalculatorService.load(request)
			.pipe(first())
			.subscribe(_ => this.loaded = true);
	}

	private createForm(): void {
		const pairs = [
			{from: 'percentInFrom', to: 'percentInTo'},
			{from: 'percentOutFrom', to: 'percentOutTo'},
			{from: 'stopTimeFrom', to: 'stopTimeTo'},
			{from: 'stopPercentFrom', to: 'stopPercentTo'}
		];

		this.formGroup = this.formBuilder.group({
			date: ['', [Validators.required, dateRangeValidator()]],
			tradeDirection: ['', Validators.required],
			interval: ['', Validators.required],
			oncePerCandle: ['', Validators.required],
			bind: ['', Validators.required],
			percentInFrom: ['', [Validators.required, lesserThanValidator('percentInTo')]],
			percentInTo: ['', [Validators.required, greaterThanValidator('percentInFrom')]],
			percentInStep: ['', Validators.required],
			percentOutFrom: ['', [Validators.required, lesserThanValidator('percentOutTo')]],
			percentOutTo: ['', [Validators.required, greaterThanValidator('percentOutFrom')]],
			percentOutStep: ['', Validators.required],
			stopTime: ['', Validators.required],
			stopTimeFrom: ['', [Validators.required, lesserThanValidator('stopTimeTo')]],
			stopTimeTo: ['', [Validators.required, greaterThanValidator('stopTimeFrom')]],
			stopTimeStep: ['', Validators.required],
			stopPercent: ['', Validators.required],
			stopPercentFrom: ['', [Validators.required, lesserThanValidator('stopPercentTo')]],
			stopPercentTo: ['', [Validators.required, greaterThanValidator('stopPercentFrom')]],
			stopPercentStep: ['', Validators.required],
			algorithm: ['', Validators.required],
			iterations: ['', Validators.required]
		});

		pairs.forEach(pair => {
			this.formGroup.get(pair.to).valueChanges.subscribe(() => {
				this.formGroup.get(pair.from).updateValueAndValidity({onlySelf: true, emitEvent: false});
			});

			this.formGroup.get(pair.from).valueChanges.subscribe(() => {
				this.formGroup.get(pair.to).updateValueAndValidity({onlySelf: true, emitEvent: false});
			});
		});
	}

	private toggleForm(status: WebsocketStatusEnum): void {
		if (status === WebsocketStatusEnum.progress) {
			Object.keys(this.formGroup.controls).forEach(control => {
				if (control !== 'interval' && control !== 'tradeDirection') {
					this.formGroup.get(control).disable();
				}
			});
		} else {
			this.formGroup.enable();
		}
	}
}
