import { Injectable } from '@angular/core';
import { State, Action, StateContext, Selector } from '@ngxs/store';
import { AppConfig } from '@app/shared/types/app-config.interface';
import { 
    UpdateConfig,
    UpdateSideNavCollapse,
    UpdateCurrentLanguage,
    UpdateMobileNavCollapse 
} from './app-config.action';
import { AppConfiguration } from '@app/configs/app.config'

@State<AppConfig>({
    name: 'app',
    defaults: AppConfiguration
})

@Injectable()
export class AppConfigState {

    @Selector()
    static getUsers(state: AppConfig) {
        return state.layoutType;
    }

    @Action(UpdateConfig)
    updateConfig({getState, patchState }: StateContext<AppConfig>, { payload }: UpdateConfig) {
        const state = getState();
        patchState({
            ...state,
            ...payload
        });
    }

    @Action(UpdateSideNavCollapse)
    changeSideNavCollapse({getState, patchState}: StateContext<AppConfig>, { sideNavCollapse }: UpdateSideNavCollapse) {
        const state = getState();
        patchState({
            ...state,
            sideNavCollapse
        });
    }

    @Action(UpdateMobileNavCollapse)
    changeMobileNavCollapse({getState, patchState}: StateContext<AppConfig>, { mobileNavCollapse }: UpdateMobileNavCollapse) {
        const state = getState();
        patchState({
            ...state,
            mobileNavCollapse
        });
    }


    @Action(UpdateCurrentLanguage)
    changeCurrentLanguage({getState, patchState}: StateContext<AppConfig>, { lang }: UpdateCurrentLanguage) {
        const state = getState();
        patchState({
            ...state,
            lang
        });
    }
}