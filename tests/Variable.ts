import { Variable, Observer } from '../src/scripts/entities/Variable';
import { DummyObserver } from './Observable';

describe('Variable', () => {
	it('has a default value', () => {
		let defaultValue = 4;
		let variable = new Variable<number>(0, '', defaultValue);
		expect(variable.value).toBe(defaultValue);
	});

	it('has a value setter', () => {
		let data = 4;
		let variable = new Variable<number>(0, '', 0);
		variable.value = data;
		expect(variable.value).toBe(data);
	});

	it('notifies observers', () => {
		let data = 4;
		let variable = new Variable<number>(0, '', 0);
		let observer = new DummyObserver();
		variable.addObserver(observer);
		variable.value = data;
		expect(observer.data).toBe(data);
		expect(observer.notificationCounter).toBe(1);
	});

	it('does not notify removed observers', () => {
		let data = 4;
		let variable = new Variable<number>(0, '', 0);
		let observer = new DummyObserver();
		variable.addObserver(observer);
		variable.value = data;
		variable.removeObserver(observer);
		variable.value = 0;
		expect(observer.data).toBe(data);
		expect(observer.notificationCounter).toBe(1);
	});
});