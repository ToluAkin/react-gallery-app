import React, {Component} from "react";

class PhotoContainer extends Component {
    render() {
        return (
            <div className="photo-container">
                <h2>Results</h2>
                <ul>
                    <li>
                        <img src="https://farm5.staticflickr.com/4342/36338751244_316b6ee54b.jpg" alt=''/>
                    </li>
                </ul>
            </div>
        );
    }
}

export default PhotoContainer;