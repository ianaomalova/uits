export type LayoutType = 'vertical' | 'horizontal'

export type NavMenuColor = 'light' | 'dark'

export interface AppConfig {
    layoutType: LayoutType;
    sideNavCollapse: boolean;
    mobileNavCollapse: boolean;
    lang: string,
    navMenuColor: NavMenuColor,
    headerNavColor: string
}