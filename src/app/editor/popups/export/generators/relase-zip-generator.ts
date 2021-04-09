import { Injectable } from '@angular/core';
import * as JSZip from 'jszip';
import { Observable } from 'rxjs';
import { PagesDataGenerator } from 't3mpl-core/core/data/pages-data-generator';
import { Exporter } from 't3mpl-core/core/exporter';
import { PagesResolver } from 't3mpl-core/core/pages-resolver';
import { TemplateRenderer } from 't3mpl-core/core/renderer/template-renderer';
import { UsedFilesScanner } from 't3mpl-core/core/scanners/used-files-scanner';
import { generateFileName } from 't3mpl-core/core/utils/file-name-generator';

import { StateService } from '../../../state.service';
import { compress, zipExportHandler, ZipFile } from './zip-utils';

@Injectable()
export class ReleaseZipGenerator {

	public constructor(
		private readonly stateService: StateService) {
	}

	public generate(): Observable<ZipFile> {
		return new Observable(r => {
			const templateRenderer = new TemplateRenderer(
				false,
				this.stateService.templateStorage,
				this.stateService.contentStorage,
				new PagesDataGenerator());

			const pagesResolver = new PagesResolver(this.stateService.templateData.configuration.pagePathStrategy);
			const usedFileScanner = new UsedFilesScanner(this.stateService.contentStorage);

			const zip = new JSZip();
			Exporter.exportRelease(
				this.stateService.templateManifest,
				this.stateService.templateData,
				this.stateService.contentStorage,
				this.stateService.templateStorage,
				pagesResolver,
				templateRenderer,
				usedFileScanner,
				zipExportHandler(zip));

			compress(zip).then((content) => {
				const fileName = generateFileName({
					name: this.stateService.templateManifest.meta.name,
					minUniqueIdLength: 4,
					fileExt: '.zip'
				});

				r.next({ content, fileName });
			});
		});
	}
}
