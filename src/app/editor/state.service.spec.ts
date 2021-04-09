import { Page } from 't3mpl-core/core/model';

import { getNextCurrentPage } from './state.service';

describe('StateService', () => {

	it('getNextCurrentPage() returns proper value', () => {
		const pageO = { filePath: 'o.html', virtualFilePath: 'o/', name: 'O', templateFilePath: 'o.html' };
		const pages1: Page[] = [
			{ filePath: 'a.html', virtualFilePath: 'a/', name: 'A', templateFilePath: 'a.html' },
			{ filePath: 'b.html', virtualFilePath: 'b/', name: 'B', templateFilePath: 'b.html' },
			{ filePath: 'c.html', virtualFilePath: 'c/', name: 'C', templateFilePath: 'c.html' }
		];

		const pages2 = [...pages1];
		pages2.splice(1, 2);
		pages2.push(pageO);

		const pages3 = [...pages1];
		pages3.push(pageO);

		const r1 = getNextCurrentPage(pages1, pages1, pages1[1]);
		expect(r1).toBeNull();

		const r2 = getNextCurrentPage(pages1, pages2, pages1[0]);
		expect(r2.virtualFilePath).toEqual('a/');

		const r3 = getNextCurrentPage([], pages1, null);
		expect(r3.virtualFilePath).toEqual('a/');

		const r4 = getNextCurrentPage(pages1, pages2, pages1[1]);
		expect(r4.virtualFilePath).toEqual('a/');

		const r5 = getNextCurrentPage(pages1, pages3, pages1[0]);
		expect(r5.virtualFilePath).toEqual('a/');
	});
});
