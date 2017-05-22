import { Observable } from "../patterns/Observable";

export class Variable<T> {
	private observable: Observable<T> = new Observable<T>();
	private _value: T;

	constructor(
		public readonly id: number,
		public name: String,
		public defaultValue: T
	) {

	}

	get value() {
		return this._value;
	}

	set value(value: T) {
		this._value = value;
		this.observable.notifyObservers(value);
	}
}