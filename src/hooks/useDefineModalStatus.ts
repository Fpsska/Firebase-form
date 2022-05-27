import { useDispatch } from 'react-redux';

import { switchModalVisibleStatus } from '../app/slices/modalSlice';

// /. imports

export function useDefineModalStatus() {  // add return type
    const dispatch = useDispatch();

    const handleModalCase = (name: string) => {
        switch (name) {
            case 'auth-modal':
                dispatch(switchModalVisibleStatus({ name: 'auth-modal', status: false }));
                console.log('auth-modal');
                break;
            case 'registr-modal':
                dispatch(switchModalVisibleStatus({ name: 'registr-modal', status: false }));
                console.log('registr-modal');
                break;
            case 'terms-modal':
                dispatch(switchModalVisibleStatus({ name: 'terms-modal', status: false }));
                console.log('terms-modal');
                break;
        }
    };

    return { handleModalCase };
};