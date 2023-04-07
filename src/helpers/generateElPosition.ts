interface returnedDataTypes {
    newElLeftPos: number;
    newElTopPos: number;
}

export function generateElPosition(
    elWidth: number,
    elHeight: number
): returnedDataTypes {
    const { width, height } = document.body.getBoundingClientRect();

    // Y = height
    // X = width

    const minX = elWidth;
    const minY = elHeight;
    const maxX = width - elWidth;
    const maxY = height - elHeight;

    const newElLeftPos = Math.random() * (maxX - minX) + Number(minX);
    const newElTopPos = Math.random() * (maxY - minY) + Number(minY);

    return { newElLeftPos, newElTopPos };
}
