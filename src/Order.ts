/**
 * The Order Type of a Model.
 * It's composed by a Model attribute, and an ordenation direction.
 */
export type Order<T> = {
  [P in keyof T]: 'ASC' | 'DESC' | 1 | -1;
}

/**
 * Creates an Order type by passing a order String.
 * The String should respect the following rule:
 * - If no string or an empty String be passed, it'll return 'undefined'.
 * - If the String has prefix '+' followed by the attribute ('+createdAt'),
 * it will sort by ascending and return { createdAd: 'ASC' }
 * - If the String has prefix '-' followed by the attribute ('-createdAt'),
 * it will sort by descending and return { createdAd: 'DESC' }
 * - If no prefix be passed ('createdAt'), it will sort by ascending and
 * return { createdAt: 'ASC' }
 * @see Order
 * @param orderStr The Order String.
 * @throws If the attribute passed is not part of the Model.
 */
export function OrderBuilder<T>(orderStr: string): Order<T> | undefined {
  if (orderStr === "") return undefined;

  const field = orderStr.substr(0, 1) === '+' || orderStr.substr(0, 1) === '-'
    ? (orderStr.substr(1) as keyof T)
    : orderStr as keyof T;

  return { [field]: orderStr.substr(0, 1) === '-' ? 'DESC' : 'ASC' } as Order<T>;
}
