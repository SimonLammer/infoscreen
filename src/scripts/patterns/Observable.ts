import { Observer } from './Observer';
export { Observer }

export class Observable<T> {
	private observers = new Array<Observer<T>>();

	addObserver(observer: Observer<T>) {
		this.observers.push(observer);
	}

	removeObserver(observer: Observer<T>) {
		this.observers = this.observers.filter((o) => o !== observer)
	}

	notifyObservers(data: T) {
		this.observers.forEach((observer) => {
			observer.receiveNotification(data);
		});
	}
}