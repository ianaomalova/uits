export interface NavMenu {
    path: string;
    title: string;
    translateKey: string,
    type: 'title' | 'collapse' | 'item',
    iconType?: '' | 'feather' | 'line-awesome';
    icon?: string;
    submenu : NavMenu[];
    key: string
}
