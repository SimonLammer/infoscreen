import { ModuleType, Describer } from './ModuleType';
export { Describer }

export class View<I> extends ModuleType<I, void> {
	constructor(name: String, inputDescriptions: Describer, handle: (inputs: I, $container: JQuery) => void) {
		super(name, inputDescriptions, handle);
	}

	handle(inputs: I, $container: JQuery): void;
	
	/**
	 * Handles inputs as <I>
	 * @param inputs 
	 * @param $container 
	 */
	handle(inputs: any, $container: JQuery): void;

	handle(inputs: any, $container: JQuery): void {
		super.handle(inputs, $container);
	}
}