import { useState, useEffect } from "react";

export function useScreenSizeDetection(screenWidth) {

    const [isMatch, setMatch] = useState(false);

    useEffect(() => {

        window.addEventListener('resize', () => {

            if (window.innerWidth >= screenWidth) setMatch(true)
            else setMatch(false);
        });

        return () => {

            window.removeEventListener('resize', () => {

                if (screenWidth === window.innerWidth) setMatch(true)
                else setMatch(false);
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return isMatch;
}