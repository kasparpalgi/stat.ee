export  function cleanifyJson(json: Record<string, any>): Record<string, any> {
    return JSON.parse(JSON.stringify(json).replace(/"NA"/g, "0"));
}