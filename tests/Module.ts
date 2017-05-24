import { Module, Process, Variable } from '../src/scripts/entities/Module';

class MyModule extends Module {

}

describe('Module', () => {
	let adderProcess = new Process<{
		a: number,
		b: number
	}, {
		sum: number
	}>('Adder', {
		a: 'Number',
		b: 'Number'
	}, (inputs) => {
		return {
			sum: inputs.a + inputs.b
		};
	}, {
		sum: 'Sum'
	});
	let varA = new Variable<number>(0, 'a', 1);
	let varB = new Variable<number>(0, 'b', 2);
	let varSum = new Variable<number>(0, 'sum', 0);

	it('can add arguments', () => {
		let module = new MyModule(0, adderProcess, {
			a: varA.value,
			b: varB.value
		}, {}, {
			sum: varSum
		}, null);
		expect(module.update()).toBeTruthy();
		expect(varSum.value).toEqual(varA.value + varB.value);
	});

	it('can add variables', () => {
		let module = new MyModule(0, adderProcess, {}, {
			a: varA,
			b: varB
		}, {
			sum: varSum
		}, null);
		expect(module.update()).toBeTruthy();
		expect(varSum.value).toEqual(varA.value + varB.value);
	});

	it('can add arguments and variables', () => {
		let module = new MyModule(0, adderProcess,  {
			a: varA.value
		}, {
			b: varB
		}, {
			sum: varSum
		}, null);
		expect(module.update()).toBeTruthy();
		expect(varSum.value).toEqual(varA.value + varB.value);
	});

	it('updates automatically when input variables change', () => {
		let module = new MyModule(0, adderProcess, {}, {
			a: varA,
			b: varB
		}, {
			sum: varSum
		}, null);
		module.update();
		varA.value = 3;
		expect(varSum.value).toEqual(varA.value + varB.value);
	});

	it('updates automatically when input variables change (re-enabled)', () => {
		let module = new MyModule(0, adderProcess, {}, {
			a: varA,
			b: varB
		}, {
			sum: varSum
		}, null);
		module.update();
		module.disable();
		module.enable();
		varA.value = 3;
		expect(varSum.value).toEqual(varA.value + varB.value);
	});

	it('does not update automatically when disabled (and input variables change)', () => {
		let module = new MyModule(0, adderProcess, {}, {
			a: varA,
			b: varB
		}, {
			sum: varSum
		}, null);
		module.update();
		module.disable();
		let sum = varSum.value
		varA.value = 3;
		expect(varSum.value).toEqual(sum);
	});
})