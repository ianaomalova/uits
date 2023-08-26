import { NavMenu } from '@app/shared/types/nav-menu.interface';

const dashboard: NavMenu[] = [
    {
        path: '/dashboard',
        title: 'Dashboard',
        translateKey: 'NAV.DASHBOARD',
        type: 'item',
        iconType: 'feather',
        icon: 'icon-home',
        key: 'dashboard',
        submenu: []
    },
]

const menuWithTitle: NavMenu[] = [
    {
        path: '',
        title: 'Menu with Title',
        translateKey: 'NAV.MENU_WITH_TITLE',
        type: 'title',
        iconType: 'feather',
        icon: 'icon-file',
        key: 'menu-with-title',
        submenu: [
            {
                path: '/menu-1',
                title: 'Menu 1',
                translateKey: 'NAV.MENU_WITH_TITLE_ITEM_1',
                type: 'item',
                iconType: 'feather',
                icon: 'icon-file',
                key: 'menu-with-title.menu-with-title-item-1',
                submenu: []
            },
            {
                path: '/menu-2',
                title: 'Menu 2',
                translateKey: 'NAV.MENU_WITH_TITLE_ITEM_2',
                type: 'item',
                iconType: 'feather',
                icon: 'icon-file',
                key: 'menu-with-title.menu-with-title-item-2',
                submenu: []
            },
        ]
    }
]

const navWithSubMenu: NavMenu[] = [
    {
        path: '',
        title: 'Nav with submenu',
        translateKey: 'NAV.NAV_WITH_SUBMENU',
        type: 'collapse',
        iconType: 'feather',
        icon: 'icon-align-left',
        key: 'nav-wth-submenu',
        submenu: [
            {
                path: '/submenu-1',
                title: 'Submenu 1',
                translateKey: 'NAV.SUBMENU_1',
                type: 'item',
                iconType: 'feather',
                icon: 'icon-file',
                key: 'nav-wth-submenu.submenu-1',
                submenu: []
            },
            {
                path: '/submenu-2',
                title: 'Submenu 2',
                translateKey: 'NAV.SUBMENU_2',
                type: 'item',
                iconType: 'feather',
                icon: 'icon-file',
                key: 'nav-wth-submenu.submenu-2',
                submenu: []
            },
        ]
    }
]

const subMenuWithTitle: NavMenu[] = [
    {
        path: '',
        title: 'Submenu with title',
        translateKey: 'NAV.SUBMENU_WITH_TITLE',
        type: 'title',
        iconType: 'feather',
        icon: 'icon-package',
        key: 'submenu-with-title',
        submenu: [
            {
                path: '',
                title: 'Menu',
                translateKey: 'NAV.MENU',
                type: 'collapse',
                iconType: 'feather',
                icon: 'icon-box',
                key: 'submenu-with-title.menu',
                submenu : [
                    {
                        path: '/ui-elements/accordion',
                        title: 'Submenu 1',
                        translateKey: 'NAV.SUBMENU_1',
                        type: 'item',
                        iconType: '',
                        icon: '',
                        key: 'submenu-with-title.menu.submenu-1',
                        submenu: []
                    },
                    {
                        path: '/ui-elements/alert',
                        title: 'Submenu 2',
                        translateKey: 'NAV.SUBMENU_2',
                        type: 'item',
                        iconType: '',
                        icon: '',
                        key: 'submenu-with-title.menu.submenu-2',
                        submenu: []
                    }
                ],
            },
        ]
    }
]

export const navConfiguration: NavMenu[] = [
    ...dashboard,
    ...navWithSubMenu,
    ...menuWithTitle,
    ...subMenuWithTitle
]