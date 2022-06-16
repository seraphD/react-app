import React, { useEffect, useRef, useState } from "react";

function Counter(props) {
    const [count, setcount] = useState(0)
    const lag = 5000;
    const ref = useRef(count);
    const handleAdd = () => {
        setcount(count + 1);
        ref.current = count;
    }
    const handleSub = () => {
        setcount(count - 1);
        ref.current = count;
    }
    const handleAlert = () => {
        setTimeout(() => {
            alert(ref.current);
        }, lag);
    }

    return (<section>
        <header>{props.title}: {count}</header>
        <button onClick={handleAdd} >+</button><button onClick={handleSub}>-</button>
        <button onClick={handleAlert}>Alert after 5 s</button>
    </section>)
}

export default Counter;