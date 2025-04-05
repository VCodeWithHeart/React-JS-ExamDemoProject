import React from 'react'

const ErrorPage = ({ error, errorfn }) => {
    console.log("This error is shown by errorpage component", error);
    return (
        <>
            <div style={{ height: "100vh", width: "full", backgroundColor: "lightpink" }}>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                    <img src='https://raw.githubusercontent.com/myogeshchavan97/react-error-boundary-demo/ddda5040fe80fd5888aaead2c6544798e84e6ab6/src/assets/writer.svg' className='size-100' />

                    <h1 className='font-bold text-2xl text-center text-amber-800'>Something went wrong try refreshing the page or try again after sometime</h1>
                </div>
            </div>
        </>
    )
}

export default ErrorPage