/**
 * Wild card search on all property of the object
 * @param {Number | String} input - any value to search
 * @param {Array} list - array for search
 * @return {Array} array of object contained keyword
 */
export function WildcardSearch<T>(list: T[], input: string | number): T[] {
    const searchText = (item) => {
        for (let key in item) {
            if (item[key] == null) {
                continue;
            }
            if (item[key].toString().toUpperCase().indexOf(input.toString().toUpperCase()) !== -1) {
                return true;
            }
        }
    };
    list = list.filter(value => searchText(value));
    return list;
}