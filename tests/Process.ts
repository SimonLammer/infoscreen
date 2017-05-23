import { Process } from '../src/scripts/entities/Process';

describe('Process', () => {
	it('can add', () => {
		let adder = new Process<{
			summandA: number,
			summandB: number
		}, {
			result: number
		}>('Sum', {
			summandA: 'First summand',
			summandB: 'Second summand'
		}, (inputs) => {
			return {
				result: inputs.summandA + inputs.summandB
			};
		}, {
			result: 'Sum'
		});
		expect(adder.handle({
			summandA: 2,
			summandB: 3
		})).toEqual({
			result: 2 + 3
		});
	});
});