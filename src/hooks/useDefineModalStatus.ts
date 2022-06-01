import { useAppDispatch } from '../app/hooks';

import { switchModalVisibleStatus } from '../app/slices/modalSlice';

// /. imports

export function useDefineModalStatus() {  // add return type
    const dispatch = useAppDispatch();

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
            case 'exit-modal':
                dispatch(switchModalVisibleStatus({ name: 'exit-modal', status: false }));
                console.log('exit-modal');
                break;
        }
    };

    return { handleModalCase };
};