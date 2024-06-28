import { Carousel } from "antd";
import banner from "../../../assets/images/banner.png";
import banner1 from "../../../assets/images/banner2.png";
import banner2 from "../../../assets/images/banner3.png";
import banner3 from "../../../assets/images/banner4.png";
import arrowLeft from "../../../assets/images/arrowLeft.svg";
import arrowRight from "../../../assets/images/arrowRight.svg";
import { useRef } from "react";

const Banner = () => {
    const carouselRef = useRef<any>(null);

    const handlePrev = () => {
        if (carouselRef.current) {
            carouselRef.current.prev();
        }
    };

    const handleNext = () => {
        if (carouselRef.current) {
            carouselRef.current.next();
        }
    };

    return (
        <div className="position-relative">
            <button
                className="border-0 bg-transparent btn-banner btn-prev"
                onClick={handlePrev}
            >
                <img
                    src={arrowLeft}
                    alt="prev"
                />
            </button>
            <Carousel
                ref={carouselRef}
                autoplay
                autoplaySpeed={2000}
                infinite={true}
            >
                <img
                    src={banner}
                    alt=""
                    className="object-fit-cover"
                    height={700}
                />

                <img
                    src={banner1}
                    alt=""
                    className="object-fit-cover"
                    height={700}
                />

                <img
                    src={banner2}
                    alt=""
                    className="object-fit-cover"
                    height={700}
                />

                <img
                    src={banner3}
                    alt=""
                    className="object-fit-cover"
                    height={700}
                />
            </Carousel>
            <button
                className="border-0 bg-transparent btn-banner btn-next"
                onClick={handleNext}
            >
                <img
                    src={arrowRight}
                    alt="next"
                />
            </button>
        </div>
    );
};

export default Banner;
