export interface Describer {
	[key: string]: string;
}

export abstract class ModuleType<I, O> {
	constructor(
		public readonly name: String,
		public readonly inputDescriptions: Describer,
		private readonly _handle: (inputs: I, $container?: JQuery) => O,
		public readonly outputDescriptions?: Describer
	) {

	}

	protected handle(inputs: I, $container?: JQuery): O;
	
	/**
	 * Handles inputs as <I>
	 * @param inputs
	 */
	protected handle(inputs: any, $container?: JQuery): O;

	protected handle(inputs: any, $container?: JQuery): any {
		return this._handle(inputs as I, $container);
	}
}