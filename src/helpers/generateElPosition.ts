export function generateElPosition(elWidth: number, elHeight: number): any {
    const { width, height } = document.body.getBoundingClientRect();

    const newBodyWidth = width - elWidth;
    const newBodyHeight = height - elHeight;

    const elTopPos = Math.floor(Math.random() * newBodyWidth);
    const elLeftPos = Math.floor(Math.random() * newBodyHeight);

    return { elTopPos, elLeftPos };
}
