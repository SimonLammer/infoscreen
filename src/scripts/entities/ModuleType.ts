interface Describer {
	[key: string]: string;
}

export class ModuleType<I, O> {
	constructor(
		public readonly name: String,
		public readonly inputDescriptions: Describer,
		public readonly handle: (inputs: I) => O,
		public readonly outputDescriptions?: Describer
	) {
		
	}
}