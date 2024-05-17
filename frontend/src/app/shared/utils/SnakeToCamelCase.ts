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

function camelToSnake(str: string): string {
  return str.replace(/([a-z])([A-Z])/g, '$1_$2').toLowerCase();
}

/**
 * Рекурсивная функция для преобразования всех ключей объекта из camelCase в snake_case
 * @param obj - объект, ключи которого нужно преобразовать
 * @returns новый объект с преобразованными ключами
 */
export function convertKeysToSnakeCase(obj: any): any {
  if (Array.isArray(obj)) {
    return obj.map(item => convertKeysToSnakeCase(item));
  } else if (obj !== null && obj.constructor === Object) {
    const newObj: { [key: string]: any } = {};
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        const newKey = camelToSnake(key);
        newObj[newKey] = convertKeysToSnakeCase(obj[key]);
      }
    }
    return newObj;
  }
  return obj;
}
