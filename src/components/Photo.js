import React from "react";

const Photo = props => {
    const source = `https://farm${props.farm}.staticflickr.com/${props.server}/${props.id}_${props.secret}.jpg`;
    return (
        <li>
            <img src={ source } alt={ props.title } />
        </li>
    );
}

export default Photo;