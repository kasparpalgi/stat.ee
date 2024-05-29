export function clamp(value: number, max: number): number {
        return Math.min(value, max);
}

/**
 * Clamps a value between a minimum and maximum value.
 * @param value - The value to clamp.
 * @param min - The minimum value.
 * @param max - The maximum value.
 * @returns The clamped value.
 */
export function clampBetween(value: number, min: number, max: number): number {
        if (value < min) {
                return min;
        } else if (value > max) {
                return max;
        } else {
                return value;
        }
}
