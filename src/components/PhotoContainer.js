import React from "react";
import Photo from './Photo';
import NotFound from './NotFound';

const PhotoContainer = (props) => {
    const photos = props.data;

    let pictures;
    if (photos.length > 0) {
        pictures = photos.map(
            picture => <Photo
                        farm={picture.farm}
                        id={picture.id}
                        key={picture.id}
                        server={picture.server}
                        secret={picture.secret}
                        title={picture.title}
                    />
            )
    } else {
        pictures = <NotFound />
    }
    return (
        <div className="photo-container">
            <h2>{props.query}</h2>
            <ul>
                { (props.loading)
                    ? <p>Loading pictures ......</p>
                    : pictures
                }
            </ul>
        </div>
    );
}

export default PhotoContainer;