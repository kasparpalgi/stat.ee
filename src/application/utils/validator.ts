export function checkMissingProperties<T>(obj: T,limit: number): void {
    const properties = Object.values(obj);
    const missingCount = properties.filter(value => value === null || value === undefined).length;

    if (missingCount > limit) {
        throw new Error(`Number of missing properties exceeds the limit`);
    }
}

export function checkExists<T>(obj: T): void {
    if (obj === null || obj === undefined) {
        throw new Error(`Object does not exist`);
    }
}