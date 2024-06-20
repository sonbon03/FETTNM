import { Card, Spin, Typography } from "antd";
import { useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";

import styled from "styled-components";
import arrowLeft from "../../assets/images/arrowLeft.svg";
import arrowRight from "../../assets/images/arrowRight.svg";
import { useGetTypeProductQuery } from "../../redux/queries/admin/admin.product";
import { Link } from "react-router-dom";
import { useCheckAdmin } from "../../hook/useCheckAdmin";

const ListTypeProduct = () => {
    const sliderRef = useRef<any>();

    const { data, isLoading, isFetching } = useGetTypeProductQuery();

    const { isAdmin } = useCheckAdmin();

    const WrapSlider = styled(Slider)`
        .slick-track {
            display: flex;
            gap: 30px;
        }
    `;

    const WrapCard = styled(Card)`
        .ant-card-body {
            position: absolute;
            bottom: 0;
            width: 100%;
            background-color: #ffffff5c;
        }
    `;

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 1500,
        arrows: false, // Tắt mũi tên mặc định
    };

    const handlePrev = () => {
        sliderRef.current.slickPrev();
    };

    const handleNext = () => {
        sliderRef.current.slickNext();
    };

    return (
        <div className="container d-flex align-items-center justify-content-between gap-4 mb-5">
            <button
                className="border-0 bg-transparent"
                onClick={handlePrev}
            >
                <img
                    src={arrowLeft}
                    alt="prev"
                />
            </button>
            {data && data.length > 0 ? (
                <WrapSlider
                    {...settings}
                    ref={sliderRef}
                    className="rounded-2xl overflow-hidden"
                >
                    {data.map((item: any) => {
                        const link = process.env.REACT_APP_CDN + item.image;
                        return (
                            <WrapCard
                                hoverable
                                key={item.id}
                                className="position-relative"
                                cover={
                                    <img
                                        alt="example"
                                        height={350}
                                        className="object-fit-cover"
                                        src={link}
                                    />
                                }
                            >
                                <Card.Meta
                                    className=""
                                    title={item.tenloaisanpham}
                                    description={
                                        <Link
                                            to={
                                                isAdmin
                                                    ? `/admin/product-list-type/${item.id}`
                                                    : `/product-list-type/${item.id}`
                                            }
                                        >
                                            <Typography.Title
                                                level={3}
                                                className="text-white"
                                            >
                                                Xem thêm
                                            </Typography.Title>
                                        </Link>
                                    }
                                />
                            </WrapCard>
                        );
                    })}
                </WrapSlider>
            ) : (
                <div className="d-flex justify-content-center">
                    <Spin size="large" />
                </div>
            )}

            <button
                className="border-0 bg-transparent"
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

export default ListTypeProduct;
