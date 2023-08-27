import { NavMenu } from '@app/shared/types/nav-menu.interface';

const home: NavMenu[] = [
    {
        path: '/home',
        title: 'Home',
        translateKey: 'NAV.HOME',
        type: 'item',
        iconType: 'feather',
        icon: 'icon-home',
        key: 'home',
        submenu: []
    },
]

const about: NavMenu[] = [
    {
        path: '/about',
        title: 'About',
        translateKey: 'NAV.ABOUT',
        type: 'title',
        iconType: 'feather',
        icon: 'icon-file',
        key: 'menu-with-title',
        submenu: [
          {
            path: '/news',
            title: 'News',
            translateKey: 'NAV.NEWS',
            type: 'item',
            iconType: 'feather',
            icon: 'icon-file',
            key: 'news',
            submenu: []
          },
            {
                path: '/employee',
                title: 'employee',
                translateKey: 'NAV.EMPLOYEE',
                type: 'item',
                iconType: 'feather',
                icon: 'icon-file',
                key: 'employee',
                submenu: [
                  {
                    path: '/teachers',
                    title: 'Teachers',
                    translateKey: 'NAV.TEACHERS',
                    type: 'item',
                    iconType: 'feather',
                    icon: 'icon-file',
                    key: 'teachers',
                    submenu: []
                  },
                  {
                    path: '/uvp',
                    title: 'Uvp',
                    translateKey: 'NAV.UVP',
                    type: 'item',
                    iconType: 'feather',
                    icon: 'icon-file',
                    key: 'uvp',
                    submenu: []
                  }
                ]
            },
          {
            path: '/fieldOfStudy',
            title: 'FieldOfStudy',
            translateKey: 'NAV.FIELD_OF_STUDY',
            type: 'item',
            iconType: 'feather',
            icon: 'icon-file',
            key: 'fieldOfStudy',
            submenu: []
          },
          {
            path: '/documents',
            title: 'Documents',
            translateKey: 'NAV.DOCUMENTS.TITLE',
            type: 'item',
            iconType: 'feather',
            icon: 'icon-file',
            key: 'documents',
            submenu: [
              {
                path: '/departmentDocuments',
                title: 'DepartmentDocuments',
                translateKey: 'NAV.DOCUMENTS.DEPARTMENT',
                type: 'item',
                iconType: 'feather',
                icon: 'icon-file',
                key: 'departmentDocuments',
                submenu: []
              },
              {
                path: '/university',
                title: 'University',
                translateKey: 'NAV.DOCUMENTS.UNIVERSITY',
                type: 'item',
                iconType: 'feather',
                icon: 'icon-file',
                key: 'university',
                submenu: []
              },
            ]
          },
          {
            path: '/contacts',
            title: 'Contacts',
            translateKey: 'NAV.CONTACTS',
            type: 'item',
            iconType: 'feather',
            icon: 'icon-file',
            key: 'contacts',
            submenu: []
          },
        ]
    }
]

const educationActivities: NavMenu[] = [
    {
        path: '/educationActivities',
        title: 'EducationActivities',
        translateKey: 'NAV.EDUCATION_ACTIVITIES.TITLE',
        type: 'title',
        iconType: 'feather',
        icon: 'icon-align-left',
        key: 'nav-wth-submenu',
        submenu: [
            {
                path: '/bachelor',
                title: 'Bachelor',
                translateKey: 'NAV.EDUCATION_ACTIVITIES.BACHELOR.TITLE',
                type: 'item',
                iconType: 'feather',
                icon: 'icon-file',
                key: 'nav-wth-submenu.submenu-1',
                submenu: [
                  {
                    path: '/studyPlan',
                    title: 'StudyPlan',
                    translateKey: 'NAV.EDUCATION_ACTIVITIES.BACHELOR.STUDY_PLAN',
                    type: 'item',
                    iconType: 'feather',
                    icon: 'icon-file',
                    key: 'nav-wth-submenu.submenu-1',
                    submenu:[]
                  },
                  {
                    path: '/schedule',
                    title: 'Schedule',
                    translateKey: 'NAV.EDUCATION_ACTIVITIES.BACHELOR.SCHEDULE.TITLE',
                    type: 'item',
                    iconType: 'feather',
                    icon: 'icon-file',
                    key: 'nav-wth-submenu.submenu-1',
                    submenu:[

                    ]
                  },
                  {
                    path: '/graduation',
                    title: 'Graduation',
                    translateKey: 'NAV.EDUCATION_ACTIVITIES.BACHELOR.GRADUATION.TITLE',
                    type: 'item',
                    iconType: 'feather',
                    icon: 'icon-file',
                    key: 'nav-wth-submenu.submenu-1',
                    submenu:[

                    ]
                  },
                  {
                    path: '/practices',
                    title: 'Practices',
                    translateKey: 'NAV.EDUCATION_ACTIVITIES.BACHELOR.PRACTICES.TITLE',
                    type: 'item',
                    iconType: 'feather',
                    icon: 'icon-file',
                    key: 'nav-wth-submenu.submenu-1',
                    submenu:[]
                  }
                ],
            },
          {
            path: '/magistracy',
            title: 'Magistracy',
            translateKey: 'NAV.EDUCATION_ACTIVITIES.MAGISTRACY.TITLE',
            type: 'item',
            iconType: 'feather',
            icon: 'icon-file',
            key: 'nav-wth-submenu.submenu-2',
            submenu: [
              {
                path: '/studyPlan',
                title: 'StudyPlan',
                translateKey: 'NAV.EDUCATION_ACTIVITIES.BACHELOR.STUDY_PLAN',
                type: 'item',
                iconType: 'feather',
                icon: 'icon-file',
                key: 'nav-wth-submenu.submenu-1',
                submenu:[]
              },
              {
                path: '/schedule',
                title: 'Schedule',
                translateKey: 'NAV.EDUCATION_ACTIVITIES.BACHELOR.SCHEDULE.TITLE',
                type: 'item',
                iconType: 'feather',
                icon: 'icon-file',
                key: 'nav-wth-submenu.submenu-1',
                submenu:[

                ]
              },
              {
                path: '/graduation',
                title: 'Graduation',
                translateKey: 'NAV.EDUCATION_ACTIVITIES.BACHELOR.GRADUATION.TITLE',
                type: 'item',
                iconType: 'feather',
                icon: 'icon-file',
                key: 'nav-wth-submenu.submenu-1',
                submenu:[

                ]
              },
              {
                path: '/practices',
                title: 'Practices',
                translateKey: 'NAV.EDUCATION_ACTIVITIES.BACHELOR.PRACTICES.TITLE',
                type: 'item',
                iconType: 'feather',
                icon: 'icon-file',
                key: 'nav-wth-submenu.submenu-1',
                submenu:[]
              }
            ]
          }
        ]
    }
]
const scientificActivity: NavMenu[] = [
  {
    path: '/scientificActivity',
    title: 'ScientificActivity',
    translateKey: 'NAV.SCIENTIFIC_ACTIVITY.TITLE',
    type: 'title',
    iconType: 'feather',
    icon: 'icon-home',
    key: 'home',
    submenu: [
      {
        path: '/postGraduate',
        title: 'PostGraduate',
        translateKey: 'NAV.SCIENTIFIC_ACTIVITY.POST_GRADUATE.TITLE',
        type: 'item',
        iconType: 'feather',
        icon: 'icon-align-left',
        key: 'nav-wth-submenu',
        submenu:[
          {
            path: '/practices',
            title: 'Practices',
            translateKey: 'NAV.SCIENTIFIC_ACTIVITY.POST_GRADUATE.PRACTICES',
            type: 'title',
            iconType: 'feather',
            icon: 'icon-align-left',
            key: 'nav-wth-submenu',
            submenu:[]
          },
          {
            path: '/specialities',
            title: 'Specialities',
            translateKey: 'NAV.SCIENTIFIC_ACTIVITY.POST_GRADUATE.SPECIALITIES',
            type: 'title',
            iconType: 'feather',
            icon: 'icon-align-left',
            key: 'nav-wth-submenu',
            submenu:[]
          },
          {
            path: '/dissertations',
            title: 'Dissertations',
            translateKey: 'NAV.SCIENTIFIC_ACTIVITY.POST_GRADUATE.DISSERTATIONS.TITLE',
            type: 'title',
            iconType: 'feather',
            icon: 'icon-align-left',
            key: 'nav-wth-submenu',
            submenu:[]
          }
        ]
      },
      {
        path: '/scientificPublications',
        title: 'ScientificPublications',
        translateKey: 'NAV.SCIENTIFIC_ACTIVITY.SCIENTIFIC_PUBLICATIONS',
        type: 'item',
        iconType: 'feather',
        icon: 'icon-align-left',
        key: 'nav-wth-submenu',
        submenu:[]
      },
      {
        path: '/scientificWork',
        title: 'ScientificWork',
        translateKey: 'NAV.SCIENTIFIC_ACTIVITY.SCIENTIFIC_WORK',
        type: 'item',
        iconType: 'feather',
        icon: 'icon-align-left',
        key: 'nav-wth-submenu',
        submenu:[]
      },
      {
        path: '/conferences',
        title: 'Conferences',
        translateKey: 'NAV.SCIENTIFIC_ACTIVITY.CONFERENCES',
        type: 'item',
        iconType: 'feather',
        icon: 'icon-align-left',
        key: 'nav-wth-submenu',
        submenu:[]
      }
    ]
  },
]


export const navConfiguration: NavMenu[] = [
    ...home,
    ...about,
    ...educationActivities,
    ...scientificActivity,
]
