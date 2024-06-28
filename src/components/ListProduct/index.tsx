import { Button, Card, Spin, Typography } from "antd";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import iconBasket from "../../assets/images/iconBasket.svg";
import iconEye from "../../assets/images/iconEye.svg";
import images1 from "../../assets/images/pngegg.png";
import { TOAST_CREATE_ERROR, TOAST_CREATE_SUCCESS } from "../../consts";
import { useCart } from "../../Context/CartContext";
import { useToast } from "../toast/ToastProvider";
import { useCheckAdmin } from "../../hook/useCheckAdmin";

interface ListProductProp {
    data: any;
}

const ListProduct = (props: ListProductProp) => {
    const { data } = props;
    const { setCartData } = useCart();
    const navigation = useNavigate();
    const { showToast } = useToast();
    const { isAdmin } = useCheckAdmin();

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

    const handleDetail = (id: string) => {
        const url = isAdmin ? `/admin/detail-product/${id}` : `/detail-product/${id}`;
        navigation(url);
    };
    const handleAddCart = (value: any) => {
        const dataCart = {
            idAccount: "d4aa9ee2-19ae-11ef-a5b7-acde48001122",
            idCart: "c905d9f0-31fd-11ef-8eb7-acde48001122",
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

    return (
        <div className="container mt-5">
            <Typography.Title
                className="text-start"
                level={3}
            >
                Sản phẩm
            </Typography.Title>
            {data ? (
                <ul className="d-flex flex-wrap list-product">
                    {data?.map((item: any) => {
                        const link = process.env.REACT_APP_CDN + item.anhsanpham;
                        return (
                            <li>
                                <WrapCard
                                    className="cursor-pointer img-product bg-transparent border-0"
                                    style={{ width: 290 }}
                                    cover={
                                        <img
                                            alt="img-prouduct"
                                            src={link}
                                            height={300}
                                            className="object-fit-cover rounded-4"
                                        />
                                    }
                                >
                                    <div className="my-3 d-grid gap-2">
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
                            </li>
                        );
                    })}
                </ul>
            ) : (
                <div className="d-flex justify-content-center">
                    <Spin size="large" />
                </div>
            )}
        </div>
    );
};

export default ListProduct;
