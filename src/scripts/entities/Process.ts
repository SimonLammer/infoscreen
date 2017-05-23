import { ModuleType, Describer } from './ModuleType';
export { Describer }

export class Process<I, O> extends ModuleType<I, O> {
	constructor(name: String, inputDescriptions: Describer, handle: (inputs: I) => O, outputDescriptions: Describer) {
		super(name, inputDescriptions, handle, outputDescriptions);
	}

	handle(inputs: I): O;
	
	/**
	 * Handles inputs as <I>
	 * @param inputs 
	 * @param container 
	 */
	handle(inputs: any): O;

	handle(inputs: any): O {
		return super.handle(inputs);
	}
}