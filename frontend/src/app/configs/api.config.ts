// Слеш в конце каждого api url обязателен
export const ApiConfig = {
  telegram: {
    user: "api/telegram/user",
    events: {
      notify: 'api/telegram/events'
    }
  },
  auth: {
    users: 'api/users/',
    user: 'api/users/auth/user/',
    login: 'api/users/auth/login/',
    logout: 'api/users/auth/logout/'
  },
  department: {
    news: {
      posts: 'api/department/news/posts/',
      announcements: 'api/department/news/announcements/'
    },
    employee: {
      teacher: {
        info: 'api/department/employee/teachers/',
        uvp: "api/department/employee/teachers/uvp/",
        schedule: {
          import: (id: number) => `api/department/employee/teachers/${id}/schedule/import`,
          retrieve: (id: number) => `api/department/employee/teachers/${id}/schedule`,
        }
      },
    }
  },
  editableContentPage: 'api/editable-pages/',
  events: {
    read: 'api/users/events/',
    write: (id: number) => 'api/users/events/' + id
  }
};
