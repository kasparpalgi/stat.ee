export function subtractObjects<T extends Record<string, any>>(
  objA: T,
  objB: T
): T {
  const result: Partial<T> = {};

  (Object.keys(objA) as Array<keyof T>).forEach((key) => {
    const valueA = objA[key];
    const valueB = objB[key];

    if (typeof valueA === "number" && typeof valueB === "number") {
      result[key] = (valueA - valueB) as any;
    } else {
      result[key] = valueA;
    }
  });
  return result as T;
}

export function divideObjects<T>(objA: T, objB: T): T {
  const result: Partial<T> = {};

  (Object.keys(objA) as Array<keyof T>).forEach((key) => {
    const valueA = objA[key];
    const valueB = objB[key];

    if (typeof valueA === "number" && typeof valueB === "number") {
      result[key] = (valueA / valueB) as any;
    } else {
      result[key] = valueA;
    }
  });

  return result as T;
}
