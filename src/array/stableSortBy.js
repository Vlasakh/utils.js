import curryN from '../function/curryN';

/**
 * Sorts the array according to the supplied function and keeping the order of elements.
 *
 * @param {Function} fn
 * @param {Array} arr The array to sort.
 * @return {Array} A new array sorted by the keys generated by `fn`.
 * @example
 *
 *      const people = [
 *          { name: 'Ann', age: 20 },
 *          { name: 'Gary', age: 20 },
 *          { name: 'John', age: 17 },
 *          { name: 'Sam', age: 21 },
 *          { name: 'Bob', age: 17 }
 *      ];
 *      stableSortBy(path(['age']), people) => [
 *          { name: 'John', age: 17 },
 *          { name: 'Bob', age: 17 },
 *          { name: 'Ann', age: 20 },
 *          { name: 'Gary', age: 20 },
 *          { name: 'Sam', age: 21 }
 *      ]
 */
export default curryN(2, (fn, arr = []) => {
    const len = arr.length;
    const indexes = new Array(len);

    for (let i = 0; i < len; i++) {
        indexes[i] = i;
    }

    indexes.sort((a, b) => {
        const valueA = arr[a];
        const valueB = arr[b];
        const x = fn(valueA);
        const y = fn(valueB);

        if (x < y) {
            return -1;
        } else if (x > y) {
            return 1;
        }

        return a - b;
    });

    const result = new Array(len);

    for (let i = 0; i < len; i++) {
        result[i] = arr[indexes[i]];
    }

    return result;
});