import React, { useState, useEffect } from 'react';
import { Progress } from 'semantic-ui-react';
import mediaRequests from '../../requests/media';
// store
import { useProductState } from '../../store/productCreation'; 

const PhotoUpload = ({ imageFile, handleSetImageUrl, setActive }) => {
    
    // context provider state
    const { productData: { id_album } } = useProductState();
    
    // local state
    
    const [percent, setPercent] = useState(0);
    const [label, setLabel] = useState('saving');
    const [success, setSuccess] = useState(null);
    const [error, setError] = useState(null);

    // function handlers

    const errorCallback = message => {
        setLabel('problem uploading file');
        setError(message);
    }

    const successServerCallback = (downloadUrl) => {
        setLabel('saved!')
        setSuccess(true);
        handleSetImageUrl(
            downloadUrl, 
            // hide overlay
            () => setActive(false)
        );
    }

    // 
    const upload = async () => {
        setLabel('saving');
        setSuccess(null);
        setError(null);

        try {
            const photoFullName = `${id_album}-${imageFile.name}`;
            
            const downloadUrl = await mediaRequests.uploadFile({
                file: imageFile,
                uploadUrl: `products/${photoFullName}`,
                progressCallback: setPercent
            });
            
            await mediaRequests.savePhotoData({
                photoData: {
                    id_album: id_album,
                    photo_fullname: photoFullName,
                    photo_url: downloadUrl
                },
                successCallback: successServerCallback,
                errorCallback
            })

        } catch ({message}) {
            errorCallback(message);
        }
    }


    useEffect(() => {
        upload();
    }, []);


    return (
        <div className="container">

            <Progress 
                active 
                progress 
                percent={percent} 
                label={label} 
                success={success}
                error={error}
                size="medium"
            />
        </div>
    )
}
 
export default PhotoUpload;