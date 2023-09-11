import { NavMenu } from '@app/shared/types/nav-menu.interface';

const main: NavMenu[] = [
    {
        path: '/main',
        title: 'Main',
        translateKey: 'NAV.HOME',
        type: 'item',
        iconType: 'feather',
        icon: 'icon-home',
        key: 'main',
        submenu: []
    },
];

const about: NavMenu[] = [
    {
        path: '/about',
        title: 'About',
        translateKey: 'NAV.ABOUT',
        type: 'title',
        iconType: 'feather',
        icon: 'icon-file',
        key: 'about',
        submenu: [
          {
            path: 'about/news',
            title: 'News',
            translateKey: 'NAV.NEWS',
            type: 'item',
            iconType: 'feather',
            icon: 'icon-file',
            key: 'about/news',
            submenu: []
          },
            {
                path: 'about/employee',
                title: 'Employee',
                translateKey: 'NAV.EMPLOYEE',
                type: 'item',
                iconType: 'feather',
                icon: 'icon-file',
                key: 'about/employee',
                submenu: [
                  {
                    path: 'about/employee/teachers',
                    title: 'Teachers',
                    translateKey: 'NAV.TEACHERS',
                    type: 'item',
                    iconType: 'feather',
                    icon: 'icon-file',
                    key: 'about/employee/teachers',
                    submenu: []
                  },
                  {
                    path: 'about/employee/uvp',
                    title: 'Uvp',
                    translateKey: 'NAV.UVP',
                    type: 'item',
                    iconType: 'feather',
                    icon: 'icon-file',
                    key: 'about/employee/uvp',
                    submenu: []
                  }
                ]
            },
          {
            path: 'about/fieldsOfStudy',
            title: 'FieldsOfStudy',
            translateKey: 'NAV.FIELD_OF_STUDY',
            type: 'item',
            iconType: 'feather',
            icon: 'icon-file',
            key: 'about/fieldsOfStudy',
            submenu: []
          },
          {
            path: 'about/documents',
            title: 'Documents',
            translateKey: 'NAV.DOCUMENTS.TITLE',
            type: 'item',
            iconType: 'feather',
            icon: 'icon-file',
            key: 'about/documents',
            submenu: [
              {
                path: 'about/documents/departmentDocuments',
                title: 'DepartmentDocuments',
                translateKey: 'NAV.DOCUMENTS.DEPARTMENT',
                type: 'item',
                iconType: 'feather',
                icon: 'icon-file',
                key: 'about/documents/departmentDocuments',
                submenu: []
              },
              {
                path: 'about/documents/university',
                title: 'University',
                translateKey: 'NAV.DOCUMENTS.UNIVERSITY',
                type: 'item',
                iconType: 'feather',
                icon: 'icon-file',
                key: 'about/documents/university',
                submenu: []
              },
            ]
          },
          {
            path: 'about/contacts',
            title: 'Contacts',
            translateKey: 'NAV.CONTACTS',
            type: 'item',
            iconType: 'feather',
            icon: 'icon-file',
            key: 'about/contacts',
            submenu: []
          },
        ]
    }
];

const educationActivities: NavMenu[] = [
    {
        path: '/educationActivities',
        title: 'EducationActivities',
        translateKey: 'NAV.EDUCATION_ACTIVITIES.TITLE',
        type: 'title',
        iconType: 'feather',
        icon: 'icon-align-left',
        key: 'educationActivities',
        submenu: [
            {
                path: '/bachelor',
                title: 'Bachelor',
                translateKey: 'NAV.EDUCATION_ACTIVITIES.BACHELOR.TITLE',
                type: 'item',
                iconType: 'feather',
                icon: 'icon-file',
                key: 'bachelor',
                submenu: [
                  {
                    path: '/studyPlan',
                    title: 'StudyPlan',
                    translateKey: 'NAV.EDUCATION_ACTIVITIES.BACHELOR.STUDY_PLAN',
                    type: 'item',
                    iconType: 'feather',
                    icon: 'icon-file',
                    key: 'studyPlan',
                    submenu:[]
                  },
                  {
                    path: '/schedule',
                    title: 'Schedule',
                    translateKey: 'NAV.EDUCATION_ACTIVITIES.BACHELOR.SCHEDULE.TITLE',
                    type: 'item',
                    iconType: 'feather',
                    icon: 'icon-file',
                    key: 'schedule',
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
                    key: 'graduation',
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
                    key: 'practices',
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
            key: 'magistracy',
            submenu: [
              {
                path: '/studyPlan',
                title: 'StudyPlan',
                translateKey: 'NAV.EDUCATION_ACTIVITIES.BACHELOR.STUDY_PLAN',
                type: 'item',
                iconType: 'feather',
                icon: 'icon-file',
                key: 'studyPlan',
                submenu:[]
              },
              {
                path: '/schedule',
                title: 'Schedule',
                translateKey: 'NAV.EDUCATION_ACTIVITIES.BACHELOR.SCHEDULE.TITLE',
                type: 'item',
                iconType: 'feather',
                icon: 'icon-file',
                key: 'schedule',
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
                key: 'graduation',
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
                key: 'practices',
                submenu:[]
              }
            ]
          }
        ]
    }
];
const scientificActivity: NavMenu[] = [
  {
    path: '/scientificActivity',
    title: 'ScientificActivity',
    translateKey: 'NAV.SCIENTIFIC_ACTIVITY.TITLE',
    type: 'title',
    iconType: 'feather',
    icon: 'icon-home',
    key: 'scientificActivity',
    submenu: [
      {
        path: '/scientificActivity/postGraduate',
        title: 'ScientificActivity/PostGraduate',
        translateKey: 'NAV.SCIENTIFIC_ACTIVITY.POST_GRADUATE.TITLE',
        type: 'item',
        iconType: 'feather',
        icon: 'icon-align-left',
        key: 'scientificActivity/postGraduate',
        submenu:[
          {
            path: '/scientificActivity/postGraduate/practices',
            title: 'scientificActivity/postGraduate/Practices',
            translateKey: 'NAV.SCIENTIFIC_ACTIVITY.POST_GRADUATE.PRACTICES',
            type: 'title',
            iconType: 'feather',
            icon: 'icon-align-left',
            key: 'scientificActivity/postGraduate/practices',
            submenu:[]
          },
          {
            path: '/specialities',
            title: 'Specialities',
            translateKey: 'NAV.SCIENTIFIC_ACTIVITY.POST_GRADUATE.SPECIALITIES',
            type: 'title',
            iconType: 'feather',
            icon: 'icon-align-left',
            key: 'specialities',
            submenu:[]
          },
          {
            path: '/dissertations',
            title: 'Dissertations',
            translateKey: 'NAV.SCIENTIFIC_ACTIVITY.POST_GRADUATE.DISSERTATIONS.TITLE',
            type: 'title',
            iconType: 'feather',
            icon: 'icon-align-left',
            key: 'dissertations',
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
        key: 'scientificPublications',
        submenu:[]
      },
      {
        path: '/scientificWork',
        title: 'ScientificWork',
        translateKey: 'NAV.SCIENTIFIC_ACTIVITY.SCIENTIFIC_WORK',
        type: 'item',
        iconType: 'feather',
        icon: 'icon-align-left',
        key: 'scientificWork',
        submenu:[]
      },
      {
        path: '/conferences',
        title: 'Conferences',
        translateKey: 'NAV.SCIENTIFIC_ACTIVITY.CONFERENCES',
        type: 'item',
        iconType: 'feather',
        icon: 'icon-align-left',
        key: 'conferences',
        submenu:[]
      }
    ]
  },
];


export const navConfiguration: NavMenu[] = [
    ...main,
    ...about,
    ...educationActivities,
    ...scientificActivity,
];
