import React from 'react';

const style1 = {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "rgba(255, 255, 255, 0.5)",
    backdropFilter: "blur(5px)",
    zIndex: 9999
};
const style2 = {
    width: "100px",
    height: "100px"
};
const Loader = () => {
    return (
        <div style={style1}>
            <img style={style2} src="https://cdn.pixabay.com/animation/2022/07/29/03/42/03-42-05-37_512.gif" alt="loading-gif" />
        </div>
    );
};

export default Loader;
