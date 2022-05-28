export interface coordinatesTypes {
    // top: number,
    // left: number
    top: number | string,
    left: number | string
}

export interface modalPositionsTypes {
    modalAuthPosition: coordinatesTypes,
    modalRegistrPosition: coordinatesTypes
    modalTermsPosition: coordinatesTypes
}

export interface modalStatusTypes {
    isModalAuthVisible: boolean,
    isModalRegistrVisible: boolean,
    isModalTermsVisible: boolean,
    isModalExitVisible: boolean
}


