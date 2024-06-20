import { Button, Col, Popconfirm, Row, Typography } from "antd";
import { useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import iconBuy from "../../assets/images/iconBuy.svg";
import iconCart from "../../assets/images/iconCart.svg";
import iconDelete from "../../assets/images/iconDelete.svg";
import iconEdit from "../../assets/images/iconEdit.svg";
import iconUser from "../../assets/images/iconUser.svg";
import imgDefault from "../../assets/images/pngegg2.png";
import FormComment from "../../components/FormComment";
import { useToast } from "../../components/toast/ToastProvider";
import { TOAST_CREATE_ERROR, TOAST_CREATE_SUCCESS, TOAST_DELETE_ERROR, TOAST_DELETE_SUCCESS } from "../../consts/index";
import { useCart } from "../../Context/CartContext";
import { useGetDetailProductQuery } from "../../redux/queries/admin/admin.product";
import { useDeleteCommentMutation, useGetListCommentQuery } from "../../redux/queries/user/user.comment";
import { formatDateString } from "../../utils/common";
import { DataContext } from "../../Context/InfoProductContext";
import ListSameProduct from "../../components/ListSameProduct";

const DetailProduct = () => {
    const params = useParams();

    const [quanility, setQuanility] = useState(1);
    const [editComment, setEditComment] = useState(null);

    const navigate = useNavigate();

    const { setCartData } = useCart();
    const { setTotalSelectedItems } = useContext(DataContext);

    const { showToast } = useToast();

    const { data } = useGetDetailProductQuery({ id: params.id as string });
    const { data: listComment, isFetching, isLoading } = useGetListCommentQuery();
    const [deleteComment] = useDeleteCommentMutation();

    const handleIncrease = (value: any) => {
        if (value < data[0].soluong) {
            setQuanility(value + 1);
        }
    };
    const handleReduce = (value: any) => {
        if (value > 1) {
            setQuanility(value - 1);
        }
    };

    const handleAddCart = (value: any) => {
        if (params.id) {
            const dataCart = {
                idAccount: "d4aa9ee2-19ae-11ef-a5b7-acde48001122",
                idCart: "d4aaa36a-19ae-11ef-a5b7-acde48001122",
                idProduct: params.id,
                name: value.tensanpham,
                quantity: quanility,
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
        }
    };

    const handleBuyProduct = async (value: any) => {
        if (params.id) {
            const data = {
                idProduct: params.id,
                idCart: "d4aaa36a-19ae-11ef-a5b7-acde48001122",
                name: value.tensanpham,
                price: value.giaban,
                quantity: quanility,
                image: value.anhsanpham,
                idAccount: "d4aa9ee2-19ae-11ef-a5b7-acde48001122",
            };
            await setTotalSelectedItems(Array.of(data));
            navigate("/payment");
        }
    };

    const handleOpenFormCommentEdit = (id: any) => {
        setEditComment(id);
    };

    const handleDeleteComment = async (id: string) => {
        try {
            const result = await deleteComment({ id: id });
            if ("error" in result) {
                TOAST_DELETE_ERROR.message = "Xóa bình luận thất bại!";
                showToast({ ...TOAST_DELETE_ERROR });
            } else {
                TOAST_DELETE_SUCCESS.message = "Xóa bình luận thành công!";
                showToast({ ...TOAST_DELETE_SUCCESS });
            }
        } catch (error) {}
    };

    return (
        <div
            className="container-fluid padding0"
            id="main"
        >
            <section id="content-main">
                <div className="body-component">
                    <div className="text-start">
                        <Row>
                            <Col span={8}>
                                <img
                                    src={imgDefault}
                                    alt=""
                                    width={400}
                                />
                            </Col>
                            <Col
                                span={16}
                                className="d-flex flex-column justify-content-evenly text-black"
                            >
                                <div className="d-flex align-items-center w-50">
                                    <Typography.Title
                                        level={4}
                                        className="mb-0 w-50"
                                    >
                                        Tên sản phẩm:
                                    </Typography.Title>
                                    <div className="fs-5">{data && data[0].tensanpham}</div>
                                </div>
                                <div className="d-flex align-items-center  w-50">
                                    <Typography.Title
                                        level={4}
                                        className="mb-0 w-50"
                                    >
                                        Giá:
                                    </Typography.Title>
                                    <Typography.Title
                                        level={3}
                                        className="my-0 color-red"
                                    >
                                        {(data && data[0].giaban)?.toLocaleString("vi-VN")} đ
                                    </Typography.Title>
                                </div>

                                <div className="">
                                    <button
                                        className="border-0 px-2 bg-white py-2 text-black rounded-start "
                                        onClick={() => handleReduce(quanility)}
                                    >
                                        -
                                    </button>
                                    <input
                                        type="text"
                                        value={quanility}
                                        className="text-center border-0 py-2 border-end border-start"
                                    />
                                    {/* <span className="px-2">{quanility}</span> */}
                                    <button
                                        className="border-0 px-2 bg-white py-2 text-black rounded-end"
                                        onClick={() => handleIncrease(quanility)}
                                    >
                                        +
                                    </button>
                                </div>
                                <div className="d-flex gap-4">
                                    <Button
                                        className="d-flex gap-2 py-3 px-4 align-items-center color-gray "
                                        onClick={() => handleAddCart(data[0])}
                                    >
                                        Thêm vào giỏ{" "}
                                        <img
                                            src={iconCart}
                                            alt=""
                                            width={20}
                                        />
                                    </Button>
                                    <Button
                                        className="d-flex gap-2 py-3 px-5 align-items-center color-gray "
                                        onClick={() => handleBuyProduct(data[0])}
                                    >
                                        Mua hàng{" "}
                                        <img
                                            src={iconBuy}
                                            width={20}
                                            alt=""
                                        />
                                    </Button>
                                </div>
                            </Col>
                        </Row>
                        <div className="text-black">
                            <Typography.Title
                                level={4}
                                className="mb-0 w-50"
                            >
                                Mô tả sản phẩm
                            </Typography.Title>
                            <p className="fs-5">{data && data[0].motasanpham}</p>
                        </div>
                    </div>
                    <div className="text-start">
                        <Typography.Title
                            level={4}
                            className="mb-0 w-50"
                        >
                            Sản phẩm tương tự
                        </Typography.Title>
                        <ListSameProduct idTypeProduct={data && data[0].id_loaisanpham} />
                    </div>
                    <div className=" rounded-5 color-form-comment p-5">
                        <FormComment idProduct={params.id} />
                        <div className="">
                            <ul>
                                {listComment?.map((item: any) => {
                                    return item.id_sanpham === params.id ? (
                                        <li
                                            key={item.id}
                                            className="my-3"
                                        >
                                            {editComment === item.id ? (
                                                <FormComment
                                                    idProduct={params.id}
                                                    data={item}
                                                    setOpen={() => setEditComment(null)}
                                                />
                                            ) : (
                                                <>
                                                    <Row>
                                                        <Col span={1}>
                                                            <img
                                                                src={iconUser}
                                                                alt=""
                                                                width={40}
                                                            />
                                                        </Col>
                                                        <Col span={3}>
                                                            <ul className="ps-0 text-start">
                                                                <li>AB</li>
                                                                <li>{formatDateString(item.createdAt)}</li>
                                                            </ul>
                                                        </Col>
                                                    </Row>
                                                    <Row>
                                                        <Col span={1}></Col>
                                                        <Col>
                                                            <div className="text-start">
                                                                <p>{item.binhluan}</p>
                                                            </div>
                                                        </Col>
                                                    </Row>
                                                    <div className="d-flex gap-5 justify-content-end me-3">
                                                        <button
                                                            className="text-black d-flex gap-2 align-items-center"
                                                            onClick={() => handleOpenFormCommentEdit(item.id)}
                                                        >
                                                            <img
                                                                src={iconEdit}
                                                                alt=""
                                                            />
                                                            Sửa
                                                        </button>
                                                        <button className="text-black d-flex gap-2 align-items-center">
                                                            <Popconfirm
                                                                title="Bạn có muốn xóa bình luận này?"
                                                                onConfirm={() => handleDeleteComment(item.id)}
                                                                okText="Có"
                                                                cancelText="Không"
                                                            >
                                                                <img
                                                                    src={iconDelete}
                                                                    alt=""
                                                                />
                                                                Xóa
                                                            </Popconfirm>
                                                        </button>
                                                    </div>
                                                </>
                                            )}
                                        </li>
                                    ) : (
                                        ""
                                    );
                                })}
                            </ul>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default DetailProduct;
