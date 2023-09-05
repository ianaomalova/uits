import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Store, Select } from '@ngxs/store';
import { AppConfig } from '@app/shared/types/app-config.interface';
import { Observable } from 'rxjs';
import { UpdateCurrentLanguage } from '@app/store/app-config/app-config.action'
import { supportedLanguages } from  '@app/configs/i18n.config';
import { TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'nav-i18n',
    templateUrl: './nav-i18n.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        '[class.header-nav-item]': 'true'
    }
})
export class NavI18NComponent implements OnInit {
    @Select((state: { app: AppConfig; }) => state.app) app$: Observable<AppConfig>;
    currentLang: string;
    languageList = []

    constructor(private store: Store, private translateService: TranslateService, ) {
    }

    ngOnInit(): void {
        this.getLanguageList()
        this.app$.subscribe(app => {
            this.currentLang = app.lang;
        });
    }

    getLanguageList() {
        let list = []
        for (const key in supportedLanguages) {
            if (Object.prototype.hasOwnProperty.call(supportedLanguages, key)) {
                const lang = supportedLanguages[key];
                list.push({
                    key: key,
                    lang: lang
                })
            }
        }
        this.languageList = list
    }

    setLanguage(language: string) {
        this.store.dispatch(new UpdateCurrentLanguage(language));
        this.translateService.use(language);
    }
}
