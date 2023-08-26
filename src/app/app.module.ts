import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { PathLocationStrategy, LocationStrategy } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { LayoutModule } from './layout/layout.module';
import { SharedModule } from './shared/shared.module';
import { NgxsModule } from '@ngxs/store';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';
import { AppConfigState } from './store/app-config/app-config.state';
import { TranslateModule } from '@ngx-translate/core';
import { AppComponent } from './app.component';

// import mockServer from './mock-data/app.mock';

// mockServer();

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        SharedModule,
        TranslateModule.forRoot(),
        LayoutModule,
        NgxsModule.forRoot([
            AppConfigState
        ]),
        NgxsReduxDevtoolsPluginModule.forRoot(),
        NgxsLoggerPluginModule.forRoot()
    ],
    providers: [
        {
            provide: LocationStrategy, 
            useClass: PathLocationStrategy
        }
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
