export function handleObjProperties(activeFlag: string, obj: any) {
    const newStatusesObj = Object.keys(obj).reduce((acc, key) => {
        if (activeFlag === 'reset') {
            return {
                ...acc,
                [key]: false
            };
        } else if (key === activeFlag) {
            return {
                ...acc,
                [key]: true
            };
        } else {
            return {
                ...acc,
                [key]: false
            };
        }
    }, {});
    return newStatusesObj;
}
