import { Button, Card, Spin } from "antd";
import { useEffect, useRef, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";

import _ from "lodash";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import arrowLeft from "../../assets/images/arrowLeft.svg";
import arrowRight from "../../assets/images/arrowRight.svg";
import iconBasket from "../../assets/images/iconBasket.svg";
import iconEye from "../../assets/images/iconEye.svg";
import { TOAST_CREATE_ERROR, TOAST_CREATE_SUCCESS } from "../../consts";
import { useCart } from "../../Context/CartContext";
import { useCheckAdmin } from "../../hook/useCheckAdmin";
import { useGetListProductPaginateQuery } from "../../redux/queries/admin/admin.product";
import { useToast } from "../toast/ToastProvider";

interface ListSameProductProps {
    idTypeProduct: any;
}

const ListSameProduct = (props: ListSameProductProps) => {
    const [query, setQuery] = useState<any>({
        page: 1,
        limit: 16,
    });

    const { setCartData } = useCart();

    const { showToast } = useToast();

    const { idTypeProduct } = props;

    const sliderRef = useRef<any>();

    const { data, isLoading, isFetching } = useGetListProductPaginateQuery(query as any);

    const { isAdmin } = useCheckAdmin();

    const navigation = useNavigate();

    const WrapSlider = styled(Slider)`
        .slick-track {
            display: flex;
            gap: 30px;
        }
    `;

    const WrapCard = styled(Card)`
        .ant-card-body {
            padding-right: 4px;
            padding-left: 4px;
        }
        .ant-card-cover {
            display: flex;
            justify-content: center;
        }
        .ant-card-cover img {
            width: 250px !important;
            margin: 10px 0;
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

    const handleDetail = (id: string) => {
        const url = isAdmin ? `/admin/detail-product/${id}` : `/detail-product/${id}`;
        navigation(url);
    };

    const handleAddCart = (value: any) => {
        const dataCart = {
            idAccount: "d4aa9ee2-19ae-11ef-a5b7-acde48001122",
            idCart: "d4aaa36a-19ae-11ef-a5b7-acde48001122",
            idProduct: value.id,
            name: value.tensanpham,
            quantity: 1,
            price: value.giaban,
            image: value.anhsanpham,
        };

        let cart: any[] = JSON.parse(sessionStorage.getItem("cart") || "[]");

        let check = cart.find((item: any) => item.idProduct === value.id);
        if (check) {
            cart = cart.map((item) => {
                if (item.idProduct === value.id) {
                    return { ...item, quantity: item.quantity + 1 };
                }
                return item;
            });
        } else {
            cart.push(dataCart);
        }

        if (cart.length > 0) {
            sessionStorage.setItem("cart", JSON.stringify(cart));
            setCartData(cart);
            TOAST_CREATE_SUCCESS.message = "Thêm sản phẩm vào giỏ hàng thành công!";
            showToast({ ...TOAST_CREATE_SUCCESS });
        } else {
            TOAST_CREATE_ERROR.message = "Thêm sản phẩm vào giỏ hàng thất bại!";
            showToast({ ...TOAST_CREATE_ERROR });
        }
    };

    useEffect(() => {
        const newParamId = _.pickBy({
            ...query,
            type: idTypeProduct,
        });
        setQuery(newParamId);
    }, [idTypeProduct]);

    return (
        <div className="container d-flex align-items-center justify-content-between gap-4 my-5">
            <button
                className="border-0 bg-transparent"
                onClick={handlePrev}
            >
                <img
                    src={arrowLeft}
                    alt="prev"
                />
            </button>
            {data?.items && data?.items.length > 0 ? (
                <WrapSlider
                    {...settings}
                    ref={sliderRef}
                    className="rounded-2xl overflow-hidden"
                >
                    {data?.items.map((item: any) => {
                        const link = process.env.REACT_APP_CDN + item.image;
                        return (
                            <WrapCard
                                className="cursor-pointer img-product bg-transparent border-0"
                                style={{ width: 290 }}
                                cover={
                                    <img
                                        alt="img-prouduct"
                                        src={link}
                                    />
                                }
                            >
                                <div className="my-3 d-grid gap-2 text-center">
                                    <Card.Meta title={item.tensanpham} />
                                    <Card.Meta title={`Giá: ${item.giaban.toLocaleString("vi-VN")}đ`} />
                                </div>
                                <div className="show-action-product gap-2">
                                    <Button
                                        className="rounded-5"
                                        onClick={() => handleAddCart(item)}
                                    >
                                        <img
                                            src={iconBasket}
                                            width={24}
                                            className="w-full img-fluid"
                                            alt=""
                                        />
                                    </Button>
                                    <Button
                                        className="rounded-5"
                                        onClick={() => handleDetail(item.id)}
                                    >
                                        <img
                                            src={iconEye}
                                            width={24}
                                            className="w-full img-fluid"
                                            alt=""
                                        />
                                    </Button>
                                </div>
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

export default ListSameProduct;
