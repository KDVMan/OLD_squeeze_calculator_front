import { ParamModel } from '@core/models/param.model';
import { SymbolCalculatorModel } from '@app/models/symbol-calculator/symbol-calculator.model';
import { SymbolCalculatorSenderEnum } from '@app/enums/symbol-calculator/symbol-calculator-sender.enum';

export interface SymbolCalculatorSubjectModel {
	model: SymbolCalculatorModel;
	senders: SymbolCalculatorSenderEnum[];
	params?: ParamModel;
}
