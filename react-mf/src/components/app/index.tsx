import React, { useEffect, useRef } from "react";
import "./styles.scss";
// @ts-ignore
import mount from "VueApp/App"; // remote app name/exported module name
const App = () => {
    const ref = useRef(null);

    useEffect(() => {
        if (mount) {
            mount(ref.current);
        }
    }, [mount]);

    return (
        <>
            <div className={"app"}>Hello, this is React MF</div>
            <iframe src="http://127.0.0.1:8080" title="my iframe" />
            <div id={"vue-app"} ref={ref} />
        </>
    );
};
export default App;
