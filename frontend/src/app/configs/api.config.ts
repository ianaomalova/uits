// Слеш в конце каждого api url обязателен
export const ApiConfig = {
  auth: {
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
      teacher: 'api/department/employee/teachers/'
    }
  }
};
