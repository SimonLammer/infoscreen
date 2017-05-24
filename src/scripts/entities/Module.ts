import { ModuleType } from './ModuleType';
import { Process } from './Process';
import { View } from './View';
import { Variable, VariableContainer } from './Variable';
import { Observer } from '../patterns/Observer';
export { Process, View, Variable, VariableContainer, Observer }

export abstract class Module {
	private varObserver: Observer<any> = <Observer<any>>{
		receiveNotification: (data: any) => {
			this.update();
		}
	}

	constructor(
		readonly id: number,
		readonly moduleType: ModuleType<any, any>,
		public args: {[key: string]: any},
		public vars: VariableContainer,
		public outputs: VariableContainer,
		public $container: JQuery
	) {
		this.enable();
	}

	enable(): void {
		for (let key in this.moduleType.inputDescriptions) {
			if (key in this.vars) {
				this.vars[key].addObserver(this.varObserver);
			}
		}
	}

	disable(): void {
		for (let key in this.moduleType.inputDescriptions) {
			if (key in this.vars) {
				this.vars[key].removeObserver(this.varObserver);
			}
		}
	}

	update(): boolean {
		let inputs: {[key: string]: any} = {};
		for (let key in this.moduleType.inputDescriptions) {
			if (key in this.args) {
				inputs[key] = this.args[key];
			} else if(key in this.vars) {
				inputs[key] = this.vars[key].value;
			} else {
				return false;
			}
		}
		if (this.moduleType instanceof Process) {
			let process = this.moduleType as Process<any, any>;
			let output = process.handle(inputs);
			for (let key in this.moduleType.outputDescriptions) {
				if (key in output && key in this.outputs) {
					this.outputs[key].value = output[key];
				} else {
					return false;
				}
			}
		} else if (this.moduleType instanceof View) {
			let view = this.moduleType as View<any>;
			view.handle(inputs, this.$container);
		} else {
			return false;
		}
		return true;
	}
}