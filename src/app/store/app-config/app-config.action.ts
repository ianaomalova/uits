import { AppConfig } from '@app/shared/types/app-config.interface';

export class UpdateConfig {
    static readonly type = '[AppConfig] Update Config';

    constructor(public payload: AppConfig) {}
}

export class UpdateSideNavCollapse {
    static readonly type = '[AppConfig] Update Side Nav Collapse';
    
    constructor(public sideNavCollapse: boolean) {}
}

export class UpdateMobileNavCollapse {
    static readonly type = '[AppConfig] Update Mobile Nav Collapse';
    
    constructor(public mobileNavCollapse: boolean) {}
}

export class UpdateCurrentLanguage {
    static readonly type = '[AppConfig] Update Current Language';
    
    constructor(public lang: string) {}
}