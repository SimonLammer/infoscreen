export interface Observer<T> {
	receiveNotification(data: T): void;
}