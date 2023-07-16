import { useState, useEffect } from "react";

/**
 * @description
 * Determines if screen size is greater than or equal to the specified width.
 */
export function useScreenSizeDetection(screenWidth) {

    const [isMatch, setMatch] = useState(false);

    useEffect(() => {

        if (window.innerWidth >= screenWidth) setMatch(true)
        else setMatch(false);

        function resize() {

            if (window.innerWidth >= screenWidth) setMatch(true)
            else setMatch(false);
        }
        window.addEventListener('resize', resize);

        return () => {
            window.removeEventListener('resize', resize);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return isMatch;
}