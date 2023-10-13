export function getEnvString(key: string): string {
    return process.env[key] || '';
}

export function toNumber(value: string): number | undefined {
    return parseInt(value, 10);
}
