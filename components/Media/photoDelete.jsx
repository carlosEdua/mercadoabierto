import React, { useState, useContext } from 'react';
import mediaRequests from '../../requests/media';
import { useProductState } from '../../store/productCreation';
import { Icon, Loader, Message } from 'semantic-ui-react';
// context
import { PhotoMediaContext } from '../ContextsAndHOCs/productPhotoMediaHOC';

const PhotoDelete = ({deleteCallback, imageFile, uploadedImageUrl = ''}) => {

    // context provider state
    const { productData: { id_album } } = useProductState();

    const [error, setError] = useState(null);
    const [deleting, setDeleting] = useState(false);
    const { setIsOngoingProcess } = useContext(PhotoMediaContext);

    // if this is a re render, we receive the firebase image location
    // if it is not, construct the image name
    let photoFullName;
    if(uploadedImageUrl){
        const url = new URL(uploadedImageUrl),
        decoded = decodeURIComponent(url.pathname.match(/products.+/g)),
        parsedFilename = decoded.replace('products/', '');

        photoFullName = parsedFilename;
    }
    else{
        photoFullName = `${id_album}-${imageFile.name}`;
    }   

    // delete from mysql server
    const deleteFromServer = () => {
        mediaRequests.deletePhotoData({
            photo_fullname: photoFullName,
            successCallback: () => {
                setDeleting(false);
                deleteCallback(uploadedImageUrl);
                setIsOngoingProcess(false);
            },
            errorCallback: handleError
        })
    }

    const handleError = (err) => {
        setError(err);
        setDeleting(false);
        setIsOngoingProcess(false);
    }

    // delete from firebase all call deleteFromServer() to delete it in mysql too.
    const handleDelete = async () => {
        setDeleting(true);
        setIsOngoingProcess(true);

        mediaRequests.deleteFile({
            fileUrl: `products/${photoFullName}`,
            successCallback: deleteFromServer,
            errorCallback: handleError
        })
    }


    return (
        <div className="container" onClick={handleDelete}>
            {
                deleting ? (
                    <Loader active size="medium" />
                ) : (
                    <Icon name="delete" size="huge" color="red" />
                )
            }
            {
                error && <Message error header={error} />
            }

            <style jsx>{`
                .container{ cursor: pointer; }
            `}</style>
        </div>
    );
}
 
export default PhotoDelete;