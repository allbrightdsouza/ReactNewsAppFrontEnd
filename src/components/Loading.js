import React from 'react';
import BounceLoader from 'react-spinners/BounceLoader'
const Loading = () => {
    return (
        <div style={{
            marginTop: "40vh",
        }}>
            <div className="loader" style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                alignContent: "center"
            }}>
                <BounceLoader
                    size = {60}
                    color ={"#123abc"}
                    />
                <h1>
                    Loading
                </h1>
            </div>
        </div>

    )
}
export default Loading;