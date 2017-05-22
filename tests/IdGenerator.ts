import { IdGenerator } from '../src/scripts/entities/IdGenerator';

describe('IdGenerator', () => {
	it('starts with id 1', () => {
		let generator = new IdGenerator();
		expect(generator.getNextId()).toBe(1);
	});

	it('increments by 1', () => {
		let generator = new IdGenerator();
		let firstId = generator.getNextId();
		let secondId = generator.getNextId();
		expect(secondId - firstId).toBe(1);
	});

	it('can start with 2', () => {
		let firstId = 2;
		let generator = new IdGenerator(firstId);
		expect(generator.getNextId()).toBe(firstId);
	});

	it('can increment by 3', () => {
		let firstId = 2;
		let increment = 3;
		let generator = new IdGenerator(firstId, increment);
		generator.getNextId(); // firstId is already known
		let secondId = generator.getNextId();
		expect(secondId - firstId).toBe(increment);
	});

	it('can have multiple instances', () => {
		let generatorA = new IdGenerator();
		let firstAId = generatorA.getNextId();
		let secondAId = generatorA.getNextId();
		let generatorB = new IdGenerator();
		let firstBId = generatorB.getNextId();
		let secondBId = generatorB.getNextId();
		expect(firstAId).toEqual(firstBId);
		expect(secondBId).toEqual(secondBId);
	})
});