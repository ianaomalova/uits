const eduActivitiesPrefix = "/educational-activities"
const sciActivitiesPrefix = "/scientific-activities"

export const PagesConfig = {
  auth: {
    login: '/auth/login',
    logout: '/auth/logout',
  },
  home: '/home',
  about: {
    news: '/about/news/',
    announcements: '/about/announcements/',
    employee: {
      teachers: '/about/employee/teachers/',
    }
  },
  admin: "/admin",
  profile: "/profile",
  educationalActivities: {
    bachelor: {
      eduPlans: eduActivitiesPrefix + '/bachelor/edu-plans',
      graduate: eduActivitiesPrefix + '/bachelor/graduate',
      practices: eduActivitiesPrefix + '/bachelor/practices',
    },
    master: {
      eduPlans: eduActivitiesPrefix + '/master/edu-plans',
      graduate: eduActivitiesPrefix + '/master/graduate',
      practices: eduActivitiesPrefix + '/master/practices',
    },
  },
  scientificActivities: {
    postgraduate: {
      practices : sciActivitiesPrefix + '/postgraduate/practices',
      specialties: sciActivitiesPrefix + '/postgraduate/specialties',
      dissertations: sciActivitiesPrefix + '/postgraduate/dissertations',
    },
    conferences: sciActivitiesPrefix + '/conferences',
    publications: sciActivitiesPrefix + '/publications',
    scientificWork: sciActivitiesPrefix + '/scientific-work',
  }
};
