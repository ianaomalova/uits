export const SnakeToCamelCase = (snake: string) => snake.toLowerCase().replace(/([-_][a-z])/g, group =>
  group
    .toUpperCase()
    .replace('-', '')
    .replace('_', '')
);

export const SnakeObjectToCamelCase = <T>(obj: Snaked<T>) => Object.keys(obj).map(key => [key, SnakeToCamelCase(key)]).reduce(
  (previousValue, keys, currentIndex, array) => ({
    ...previousValue,
    [keys[1]]: obj[keys[0]]
  }), {}) as T;

export type Snaked<T> = T;
