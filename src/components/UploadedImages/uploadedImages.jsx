import React from 'react'

// src/components/ImageKitWrapper.jsx
import { IKContext } from "imagekitio-react";

const UploadedImages = ({ children }) => {
  return (
    <IKContext
      publicKey={process.env.REACT_APP_IMAGEKIT_PUBLIC_KEY}
      urlEndpoint={process.env.REACT_APP_IMAGEKIT_URL_ENDPOINT}
      transformationPosition="path"
    >
      {children}
    </IKContext>
  );
};
export default UploadedImages