import { Injectable } from '@angular/core';

import { PopupService } from '../popup.service';
import { TemplateInfoPopupComponent } from './template-info-popup.component';

@Injectable()
export class TemplateInfoPopupService {

	public constructor(
		private readonly popupService: PopupService) {
	}

	public open() {
		this.popupService.open(TemplateInfoPopupComponent, () => {})
			.subscribe(() => {});
	}
}
