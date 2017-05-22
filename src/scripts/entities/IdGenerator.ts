export class IdGenerator {
	private nextId: number;
	
	constructor(start: number = 1, private increment: number = 1) {
		this.nextId = start;
	}

	getNextId() {
		let result = this.nextId;
		this.nextId += this.increment;
		return result;
	}
}