import { useState, useEffect, useRef } from "react";
interface Props {
    textStr: string;
    delay?: number;
}

const TypedText: React.FC<Props> = ({textStr, delay}) => {
    const [revealedLetters, setRevealedLetters] = useState(0);
    const interval: any = useRef(null);

    useEffect( () => {
        if(textStr) {
            // creates interval to add to the number of revealed strings allowed
            interval.current = setInterval( () => {
                setRevealedLetters( l => l + 1)
            }, delay)
        }
    },[textStr, delay])

    useEffect( () => {
        if( revealedLetters === textStr.length ) clearInterval( interval.current) // clears interval at end of the string to prevent continuous interval
    }, [textStr, interval, revealedLetters])

    useEffect( () => {
        return( () => clearInterval( interval.current )) // clean up
    }, [interval])

    return(
        <div>
            {
                [...textStr.split('')].map((str, ind) => (
                    str && ind <= revealedLetters
                    ? <span key={ind}>{str}</span>
                    : null
                ))
            }
        </div>
    )
}

export default TypedText;