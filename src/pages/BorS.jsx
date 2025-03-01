import React from "react";
const BorS = () => {
    return (
        <>
        <input type="button" value="Buyer" onClick={() => { window.location.href = "/register" }} />
        <input type="button" value="seller" onClick={()=>{window.location.href="/Sregister"}}/>
        </>
    );
}
export default BorS;