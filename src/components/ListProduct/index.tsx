import { Button, Card, Spin } from "antd";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import iconBasket from "../../assets/images/iconBasket.svg";
import iconEye from "../../assets/images/iconEye.svg";
import images1 from "../../assets/images/pngegg.png";
import { TOAST_CREATE_ERROR, TOAST_CREATE_SUCCESS } from "../../consts";
import { useCart } from "../../Context/CartContext";
import { useToast } from "../toast/ToastProvider";

interface ListProductProp {
    data: any;
}

const ListProduct = (props: ListProductProp) => {
    const { data } = props;
    const { setCartData } = useCart();
    const navigation = useNavigate();
    const { showToast } = useToast();

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
        navigation(`/detail-product/${id}`);
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

    return (
        <div className="container mt-5">
            {data ? (
                <ul className="d-flex flex-wrap list-product">
                    {data?.map((item: any) => {
                        return (
                            <li>
                                <WrapCard
                                    className="cursor-pointer img-product"
                                    style={{ width: 290 }}
                                    cover={
                                        <img
                                            className="img-fluid"
                                            alt="example"
                                            src={images1}
                                        />
                                    }
                                >
                                    <Card.Meta title={item.tensanpham} />
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
