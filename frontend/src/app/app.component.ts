import { Component, OnInit, OnDestroy } from '@angular/core';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { Select } from '@ngxs/store';
import { AppConfig } from '@app/shared/types/app-config.interface';
import { Observable, Subscription } from 'rxjs';
import { en_US } from '@app/i18n/en';
import { ru_RU } from '@app/i18n/ru';

const storageKey = 'uits_lang';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html'
})
export class AppComponent implements OnInit, OnDestroy {
    @Select((state: { app: AppConfig }) => state.app) app$: Observable<AppConfig>;
    private langChangeSubscription!: Subscription;
    currentLang: string;

    constructor(private translateService: TranslateService) {
        translateService.setTranslation('en_US', en_US);
        translateService.setTranslation('ru_RU', ru_RU);
    }

    ngOnInit() {
        this.app$.subscribe(app => {
            this.currentLang = localStorage.getItem(storageKey) || app.lang || this.translateService.getBrowserCultureLang();
            this.translateService.use(this.currentLang);
        });
        this.langChangeSubscription = this.translateService.onLangChange.subscribe((event: LangChangeEvent) => {
            localStorage.setItem(storageKey, event.lang);
        });
    }

    ngOnDestroy() {
        if (this.langChangeSubscription) {
            this.langChangeSubscription.unsubscribe();
        }
    }

}
