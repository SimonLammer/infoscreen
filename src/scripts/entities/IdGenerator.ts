export class IdGenerator {
	private nextId: number;
	
	public constructor(start: number = 1, private increment: number = 1) {
		this.nextId = start;
	}

	public getNextId() {
		let result = this.nextId;
		this.nextId += this.increment;
		return result;
	}
}