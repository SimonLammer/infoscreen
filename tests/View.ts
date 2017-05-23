import { View } from '../src/scripts/entities/View';
import * as $ from 'jquery';

describe('View', () => {
	it('can display text', () => {
		let displayer = new View<{
			text: string
		}>('Displayer', {
			test: 'Text to display'
		}, (inputs, $container) => {
			$container.text(inputs.text);
			return 4;
		});
		let $container = $('<div></div>');
		let data = 'Hello World!';
		displayer.handle({
			text: data
		}, $container);
		expect($container.text()).toBe(data);
	});
});