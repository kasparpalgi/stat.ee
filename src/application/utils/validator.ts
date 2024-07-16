export function checkMissingProperties<T>(obj: T,limit: number): void {
    const properties = Object.values(obj);
    const missingCount = properties.filter(value => value === null || value === undefined).length;

    if (missingCount > limit) {
        console.log(`Missing properties: ${missingCount}`);
        throw new Error(`Insufficient data`);
    }
}

