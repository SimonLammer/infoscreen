import { Module } from './Module';
import { Process } from './Process';
import { Variable, VariableContainer } from './Variable';

export { Process, Variable }
export class ProcessModule extends Module {
	constructor(
		id: number,
		process: Process<any, any>,
		args: {[key: string]: any},
		vars: VariableContainer,
		outputs: VariableContainer
	) {
		super(id, process, args, vars, outputs, null);
	}
}