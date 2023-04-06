export interface coordinatesTypes {
    top: number;
    left: number;
}

export interface modalPositionsTypes {
    modalAuthPosition: coordinatesTypes;
    modalRegistrPosition: coordinatesTypes;
    modalTermsPosition: coordinatesTypes;
    modalExitPosition: coordinatesTypes;
}

export interface modalStatusTypes {
    [key: string]: boolean;
}

export interface modalSizeTypes {
    width: number;
    height: number;
}
