import {NavMenu} from '@app/shared/types/nav-menu.interface';
import {PagesConfig} from "@app/configs/pages.config";

const main: NavMenu[] = [
  {
    path: '/home',
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
    icon: 'icon-info',
    key: 'about',
    submenu: [
      {
        path: 'about/news',
        title: 'News',
        translateKey: 'NAV.NEWS',
        type: 'item',
        iconType: 'feather',
        icon: 'icon-globe',
        key: 'about/news',
        submenu: []
      },
      {
        path: 'about/announcements',
        title: 'Announcements',
        translateKey: 'NAV.ANNOUNCEMENTS',
        type: 'item',
        iconType: 'feather',
        icon: 'icon-alert-octagon',
        key: 'about/announcements',
        submenu: []
      },
      {
        path: 'about/employee',
        title: 'Employee',
        translateKey: 'NAV.EMPLOYEE',
        type: 'item',
        iconType: 'feather',
        icon: 'icon-users',
        key: 'about/employee',
        submenu: [
          {
            path: 'about/employee/teachers',
            title: 'Teachers',
            translateKey: 'NAV.TEACHERS',
            type: 'item',
            iconType: 'feather',
            icon: 'icon-user',
            key: 'about/employee/teachers',
            submenu: []
          },
          {
            path: 'about/employee/uvp',
            title: 'Uvp',
            translateKey: 'NAV.UVP',
            type: 'item',
            iconType: 'feather',
            icon: 'icon-user',
            key: 'about/employee/uvp',
            submenu: []
          }
        ]
      },
      {
        path: 'about/fields-of-study',
        title: 'FieldsOfStudy',
        translateKey: 'NAV.FIELD_OF_STUDY',
        type: 'item',
        iconType: 'feather',
        icon: 'icon-list',
        key: 'about/fieldsOfStudy',
        submenu: []
      },
      {
        path: 'about/documents',
        title: 'Documents',
        translateKey: 'NAV.DOCUMENTS.TITLE',
        type: 'item',
        iconType: 'feather',
        icon: 'icon-folder',
        key: 'about/documents',
        submenu: [
          {
            path: 'about/documents/department',
            title: 'DepartmentDocuments',
            translateKey: 'NAV.DOCUMENTS.DEPARTMENT',
            type: 'item',
            iconType: 'feather',
            icon: 'icon-file-text',
            key: 'about/documents/departmentDocuments',
            submenu: []
          },
          {
            path: 'about/documents/university',
            title: 'University',
            translateKey: 'NAV.DOCUMENTS.UNIVERSITY',
            type: 'item',
            iconType: 'feather',
            icon: 'icon-file-text',
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
        icon: 'icon-phone',
        key: 'about/contacts',
        submenu: []
      },
    ]
  }
];

const educationActivities: NavMenu[] = [
  {
    path: '/educational-activities',
    title: 'EducationActivities',
    translateKey: 'NAV.EDUCATION_ACTIVITIES.TITLE',
    type: 'title',
    iconType: 'feather',
    icon: 'icon-book',
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
            path: PagesConfig.educationalActivities.bachelor.eduPlans,
            title: 'StudyPlan',
            translateKey: 'NAV.EDUCATION_ACTIVITIES.BACHELOR.STUDY_PLAN',
            type: 'item',
            iconType: 'feather',
            icon: 'icon-file',
            key: 'studyPlan',
            submenu: []
          },
          {
            path: PagesConfig.educationalActivities.bachelor.graduate,
            title: 'Graduation',
            translateKey: 'NAV.EDUCATION_ACTIVITIES.BACHELOR.GRADUATION.TITLE',
            type: 'item',
            iconType: 'feather',
            icon: 'icon-file',
            key: 'graduation',
            submenu: []
          },
          {
            path: PagesConfig.educationalActivities.bachelor.practices,
            title: 'Practices',
            translateKey: 'NAV.EDUCATION_ACTIVITIES.BACHELOR.PRACTICES.TITLE',
            type: 'item',
            iconType: 'feather',
            icon: 'icon-file',
            key: 'practices',
            submenu: []
          }
        ],
      },
      {
        path: '/master',
        title: 'Magistracy',
        translateKey: 'NAV.EDUCATION_ACTIVITIES.MAGISTRACY.TITLE',
        type: 'item',
        iconType: 'feather',
        icon: 'icon-file',
        key: 'magistracy',
        submenu: [
          {
            path: PagesConfig.educationalActivities.master.eduPlans,
            title: 'StudyPlan',
            translateKey: 'NAV.EDUCATION_ACTIVITIES.BACHELOR.STUDY_PLAN',
            type: 'item',
            iconType: 'feather',
            icon: 'icon-file',
            key: 'studyPlan',
            submenu: []
          },
          {
            path: PagesConfig.educationalActivities.master.graduate,
            title: 'Graduation',
            translateKey: 'NAV.EDUCATION_ACTIVITIES.BACHELOR.GRADUATION.TITLE',
            type: 'item',
            iconType: 'feather',
            icon: 'icon-file',
            key: 'graduation',
            submenu: []
          },
          {
            path: PagesConfig.educationalActivities.master.practices,
            title: 'Practices',
            translateKey: 'NAV.EDUCATION_ACTIVITIES.BACHELOR.PRACTICES.TITLE',
            type: 'item',
            iconType: 'feather',
            icon: 'icon-file',
            key: 'practices',
            submenu: []
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
    icon: 'icon-search',
    key: 'scientificActivity',
    submenu: [
      {
        path: PagesConfig.editable('scientific-activity-postgraduate'),
        title: 'ScientificActivity/PostGraduate',
        translateKey: 'NAV.SCIENTIFIC_ACTIVITY.POST_GRADUATE.TITLE',
        type: 'item',
        iconType: 'feather',
        icon: 'icon-briefcase',
        key: 'scientificActivity/postGraduate',
        submenu: []
      },
      ]
    }
      // {
      //   path: PagesConfig.scientificActivities.publications,
      //   title: 'ScientificPublications',
      //   translateKey: 'NAV.SCIENTIFIC_ACTIVITY.SCIENTIFIC_PUBLICATIONS',
      //   type: 'item',
      //   iconType: 'feather',
      //   icon: 'icon-align-left',
      //   key: 'scientificPublications',
      //   submenu: []
      // },
      // {
      //   path: PagesConfig.scientificActivities.scientificWork,
      //   title: 'ScientificWork',
      //   translateKey: 'NAV.SCIENTIFIC_ACTIVITY.SCIENTIFIC_WORK',
      //   type: 'item',
      //   iconType: 'feather',
      //   icon: 'icon-align-left',
      //   key: 'scientificWork',
      //   submenu: []
      // },
      // {
      //   path: PagesConfig.scientificActivities.conferences,
      //   title: 'Conferences',
      //   translateKey: 'NAV.SCIENTIFIC_ACTIVITY.CONFERENCES',
      //   type: 'item',
      //   iconType: 'feather',
      //   icon: 'icon-align-left',
      //   key: 'conferences',
      //   submenu: []
      // }
];


export const navConfiguration: NavMenu[] = [
  ...main,
  ...about,
  ...educationActivities,
  ...scientificActivity,
];
