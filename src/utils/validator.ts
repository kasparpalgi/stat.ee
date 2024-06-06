export function checkMissingProperties<T>(obj: T,limit: number): void {
    const properties = Object.values(obj);
    const missingCount = properties.filter(value => value === null || value === undefined).length;

    console.log(`Missing properties: ${missingCount}`);

    if (missingCount > limit) {
        throw new Error(`Insufficient data`);
    }
}

