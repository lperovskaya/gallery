import React, {useState} from 'react';
import "../../styles/Body.css"
import Control from "./Control";

const Slideshow = ({setIsSlideShow, isSlideShow, photo, setPhoto, handelRotationRight, rightArrow}) => {
    const handelClick = (e) => {
        if (e.target.classList.contains("dismiss")) {
            setPhoto(null);
            setIsSlideShow(false);
        }
    }

    const [isLoaded, setIsLoaded] = useState(null);

    const timeoutRef = React.useRef(null);

    function resetTimeout() {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
    }

    React.useEffect(() => {
        resetTimeout();
        timeoutRef.current = setTimeout(
            () => {
                if (rightArrow) {
                    handelRotationRight()
                } else {
                    setIsSlideShow(false);
                }
            },
            3000
        );

        return () => {
            resetTimeout();
        };
    }, [photo]);

    const slideShow = () => {
        setIsSlideShow(isSlideShow ^ 1);
    }

    return (
        <div className="dismiss" onClick={handelClick}>
            <div className="wrapper">
                <Control handelClick={handelClick} slideShow={slideShow} isSlideShow={isSlideShow}/>
                <img
                    className="full"
                    src={photo.url}
                    alt={"bigger picture"}
                    onLoad={() => setIsLoaded(true)}
                />
            </div>
        </div>
    );
};

export default Slideshow;