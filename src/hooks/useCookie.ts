interface propTypes {
    label: string;
    value: string | null;
    daysToLive: number | null;
}

export function useCookie(): any {
    const setCookie = ({ label, value, daysToLive }: propTypes): void => {
        const date = new Date();

        if (daysToLive) {
            date.setTime(date.getTime() + daysToLive * 24 * 60 * 60 * 1000);
        }

        const expires = 'expires=' + date.toUTCString(); // Wed, 14 Jun 2017 07:00:00 GMT format
        document.cookie = `${label}=${value}; ${expires}; path=/`;
        // console.log('setted', document.cookie);
    };

    const getCookie = (label: string): string | null => {
        const cookieDecoded = decodeURIComponent(document.cookie);
        const cookieArray = cookieDecoded.split('; '); // expected ['login=test', 'password='123']
        let result = null;

        cookieArray.forEach(item => {
            if (item.indexOf(label) == 0) {
                // iterate by all arr[] elements
                result = item.substring(label.length + 1); // expected login= / password=
            }
        });
        // console.log('getted:', result);
        return result;
    };

    const deleteCookie = (label: string): void => {
        setCookie({ label, value: null, daysToLive: null });
    };

    return { setCookie, getCookie, deleteCookie };
}
