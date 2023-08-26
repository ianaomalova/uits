import { NgModule } from '@angular/core';

import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { RouterModule } from "@angular/router";
import { SharedModule } from '@app/shared/shared.module';
import { LogoModule } from '@app/shared/components/logo/logo.module';
import { NavMenuModule } from '@app/shared/components/nav-menu/nav-menu.module';
import { AvatarModule } from '@app/shared/components/avatar/avatar.module';
import { DropdownModule } from '@app/shared/components/dropdown/dropdown.module';
import { SwitchModule } from '@app/shared/components/switch/switch.module';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { AppLayoutComponent } from './app-layout/app-layout-component';
import { AuthLayoutComponent } from './auth-layout/auth-layout.component';
import { HorizontalLayoutComponent } from './components/horizontal-layout/horizontal-layout.component';
import { VerticalLayoutComponent } from './components/vertical-layout/vertical-layout.component';
import { SideNavComponent } from './components/side-nav/side-nav.components';
import { HeaderNavComponent } from './components/header-nav/header-nav.component';
import { HeaderNavbarComponent } from './components/header-navbar/header-navbar.component';
import { NavToggleComponent } from './components/nav-toggle/nav-toggle.component';
import { ContentComponent } from './components/content/content.component';
import { FooterComponent } from './components/footer/footer.component';
import { PageHeaderComponent } from './components/page-header/page-header.component';
import { NavNotificationComponent } from './components/nav-notification/nav-notification.component';
import { NavI18NComponent } from './components/nav-i18n/nav-i18n.component';
import { NavProfileComponent } from './components/nav-profile/nav-profile.component';
import { NavConfigComponent } from './components/nav-config/nav-config.component';
import { ThemeConfiguratorComponent } from './components/theme-configurator/theme-configurator.component';
import { VerticalMenuContentComponent } from './components/vertical-menu-content/vertical-menu-content.component';
import { MobileNavComponent } from './components/mobile-nav/mobile-nav.component';

const mandatoryComponents = [
    AppLayoutComponent,
    AuthLayoutComponent,
    VerticalLayoutComponent,
    HorizontalLayoutComponent,
    SideNavComponent,
    HeaderNavComponent,
    HeaderNavbarComponent,
    NavToggleComponent,
    ContentComponent,
    FooterComponent,
    PageHeaderComponent,
    VerticalMenuContentComponent,
    MobileNavComponent
]

const optionalComponents = [
    NavNotificationComponent,
    NavProfileComponent,
    NavI18NComponent,
    NavConfigComponent,
    ThemeConfiguratorComponent
]

@NgModule({
    declarations: [
        ...mandatoryComponents,
        ...optionalComponents
    ],
    imports: [
        SharedModule,
        RouterModule,
        LogoModule,
        NavMenuModule,
        AvatarModule,
        ModalModule.forRoot(),
        ButtonsModule.forRoot(),
        SwitchModule,
        DropdownModule,
        PerfectScrollbarModule,
    ],
    exports: [
        AppLayoutComponent,
        AuthLayoutComponent
    ],
    providers: [],
})
export class LayoutModule {}