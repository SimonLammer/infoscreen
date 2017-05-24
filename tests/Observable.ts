import { Observable } from '../src/scripts/patterns/Observable';
import { Observer } from '../src/scripts/patterns/Observer';

export class DummyObserver implements Observer<number> {
	public notificationCounter: number = 0;
	public data: number;
	receiveNotification(data: number): void {
		this.data = data;
		this.notificationCounter++;
	}
}

describe('Observable', () => {
	let observable: Observable<number>;
	
	beforeEach(() => {
		observable = new Observable<number>();
	});

	it('can notify without observers', () => {
		observable.notifyObservers(0);
	});

	it('notifies an added observer', () => {
		let data = 4;
		let observer = new DummyObserver();
		observable.addObserver(observer);
		observable.notifyObservers(data);
		expect(observer.data).toBe(4);
		expect(observer.notificationCounter).toBe(1);
	});

	it('does not notify removed a removed observer', () => {
		let observer = new DummyObserver();
		observable.addObserver(observer);
		observable.notifyObservers(0); // should notify observer
		observable.removeObserver(observer);
		observable.notifyObservers(0); // should not notify observer
		expect(observer.notificationCounter).toBe(1);
	});

	it('notifies multiple observers', () => {
		let data = 4;
		let observerA = new DummyObserver();
		let observerB = new DummyObserver();
		observable.addObserver(observerA);
		observable.addObserver(observerB);
		observable.notifyObservers(data);
		expect(observerA.data).toBe(data);
		expect(observerB.data).toBe(data);
		expect(observerA.notificationCounter).toBe(1);
		expect(observerB.notificationCounter).toBe(1);
	});

	it('does not notify multiple observers after removal', () => {
		let data = 4;
		let observerA = new DummyObserver();
		let observerB = new DummyObserver();
		observable.addObserver(observerA);
		observable.addObserver(observerB);
		observable.notifyObservers(0);
		observable.removeObserver(observerB);
		observable.notifyObservers(data);
		expect(observerA.data).toBe(data);
		expect(observerB.data).not.toBe(data);
		expect(observerA.notificationCounter).toBe(2);
		expect(observerB.notificationCounter).toBe(1);
	});
})