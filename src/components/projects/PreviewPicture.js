import React from 'react'

const PreviewPicture=(props)=> {
    const {pictureUrl, height}= props;
    return (
        <img className="mb-2 mt-2" src={pictureUrl} height={height} width="100%"alt=""/> 
    )
}

export default PreviewPicture
