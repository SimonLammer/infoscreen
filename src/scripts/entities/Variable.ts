import { Observable, Observer } from "../patterns/Observable";
export { Observer };
export interface VariableContainer {
	[key: string]: Variable<any>
};

export class Variable<T> {
	private observable: Observable<T> = new Observable<T>();
	private _value: T;

	constructor(
		public readonly id: number,
		public name: String,
		public defaultValue: T
	) {
		this._value = defaultValue;
	}

	get value(): T {
		return this._value;
	}

	set value(value: T) {
		this._value = value;
		this.observable.notifyObservers(value);
	}

	addObserver(observer: Observer<T>): void {
		this.observable.addObserver(observer);
	}

	removeObserver(observer: Observer<T>): void {
		this.observable.removeObserver(observer);
	}
}