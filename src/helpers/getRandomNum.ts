export function getRandomItgrNumber(min: number, max: number): number {
    return Math.round(Math.random() * (Math.floor(max) - Math.ceil(min)) + Math.ceil(min));
};