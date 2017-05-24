import { Module } from './Module';
import { View } from './View';
import { Variable, VariableContainer } from './Variable';

export class ViewModule extends Module {
	constructor(
		id: number,
		view: View<any>,
		args: {[key: string]: any},
		vars: VariableContainer,
		$container: JQuery
	) {
		super(id, view, args, vars, null, $container);
	}
}