import { ModuleType } from '../src/scripts/entities/ModuleType';

class MyModuleType<I, O> extends ModuleType<I, O> {
	handle(inputs: any, $container?: JQuery): O {
		return super.handle(inputs, $container);
	}
}

describe('ModuleType', () => {
	it('handles runtime-input', () => {
		interface In {
			value: number;
		}
		let incrementor = new MyModuleType<In,Number>(
			'Incrementor', {
				value: 'Number'
			}, (inputs) => {
				return inputs.value + 1;
			}
		);
		let data = 4;
		let runtimeInput = JSON.parse(JSON.stringify({
			value: data
		}));
		expect(incrementor.handle(runtimeInput)).toBe(data + 1);
	});
});