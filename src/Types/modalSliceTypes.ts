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
    isModalAuthVisible: boolean;
    isModalRegistrVisible: boolean;
    isModalTermsVisible: boolean;
    isModalExitVisible: boolean;
}
