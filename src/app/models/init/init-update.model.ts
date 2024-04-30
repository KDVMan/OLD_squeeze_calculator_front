import { InstrumentEnum } from '@core/enums/instrument.enum';

export interface InitUpdateModel {
	symbol?: string;
	instrument?: InstrumentEnum;
}