import React from 'react';
import ReactLoading from 'react-loading';
 
const Example = ({height,width,width2,height2,color}) => {
    return (
        <div className="loading-container" style={{
            width: `${width2}`,
            height: `${height2}`,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          
        }}>
    <ReactLoading type={'spin'} color={color ? color : '#C70039'} height={height} width={width} /></div>
);
    }
 
export default Example;