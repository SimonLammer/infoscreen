import { ModuleType } from '../src/scripts/entities/ModuleType';

describe('ModuleType', () => {
	it('handles runtime-input', () => {
		interface In {
			value: number;
		}
		let incrementor = new ModuleType<In,Number>(
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
		expect(incrementor.handle(runtimeInput as In)).toBe(data + 1);
	});
});