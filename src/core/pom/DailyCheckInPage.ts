import addUrlQuery from '@lib/utils/add-url-query.js';
import Page from './Page.js';

import type { Lang } from '@core/schema/types.js';
import type { Page as PlaywrightPage } from 'playwright';
import type { ResponseBody } from '../types.js';

const actId = 'e202303301540311';

export default class DailyCheckInPage extends Page {
	readonly lang: Lang;

	constructor(page: PlaywrightPage, lang: Lang) {
		super(
			page,
			addUrlQuery('https://act.hoyolab.com/bbs/event/signin/hkrpg/index.html', {
				act_id: actId,
				lang,
			}),
		);

		this.lang = lang;
	}

	async dailyCheckIn(): Promise<ResponseBody> {
		const res = await this.page.request.post(
			'https://sg-public-api.hoyolab.com/event/luna/os/sign',
			{
				params: {
					act_id: actId,
					lang: this.lang,
				},
			},
		);
		return await res.json();
	}
}
