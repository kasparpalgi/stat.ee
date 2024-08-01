export function convertKeysToLowerCase(obj: any) {
    return Object.keys(obj).reduce((acc, key) => {
        acc[key.toLowerCase()] = obj[key];
        return acc;
    }, {},);
}


export function replaceNaWith0(json: Record<string, any>): Record<string, any> {
    try {
        return JSON.parse(JSON.stringify(json).replace(/"NA"/g, "0"));
    } catch (e) {
        return json;
    }
}