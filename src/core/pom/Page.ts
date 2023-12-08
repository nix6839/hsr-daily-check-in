import type { Page as PlaywrightPage } from 'playwright';

export interface IPage {
	readonly page: PlaywrightPage;
	pageUrl: string;

	goto: () => Promise<void>;
	close: () => Promise<void>;
}

export default abstract class Page implements IPage {
	readonly page: PlaywrightPage;
	readonly pageUrl: string;

	constructor(page: PlaywrightPage, pageUrl: string) {
		this.page = page;
		this.pageUrl = pageUrl;
	}

	async goto(): Promise<void> {
		await this.page.goto(this.pageUrl);
	}

	async close(): Promise<void> {
		await this.page.close();
	}
}
