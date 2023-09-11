export const SnakeToCamelCase = (snake: string) => {
  return snake.toLowerCase().replace(/([-_][a-z])/g, group =>
    group
      .toUpperCase()
      .replace('-', '')
      .replace('_', '')
  );
}

export const SnakeObjectToCamelCase = (obj) => {
  return Object.keys(obj).map(key => [key, SnakeToCamelCase(key)]).reduce(
    (previousValue, keys, currentIndex, array) => {
      return {
        ...previousValue,
        [keys[1]]: obj[keys[0]]
      }
    }, {})
}
