import { Button, Col, Popconfirm, Row } from "antd";
import { useState } from "react";
import { useParams } from "react-router-dom";
import iconBuy from "../../assets/images/iconBuy.svg";
import iconCart from "../../assets/images/iconCart.svg";
import iconDelete from "../../assets/images/iconDelete.svg";
import iconEdit from "../../assets/images/iconEdit.svg";
import iconUser from "../../assets/images/iconUser.svg";
import imgDefault from "../../assets/images/pngegg2.png";
import FormComment from "../../components/FormComment";
import { useToast } from "../../components/toast/ToastProvider";
import { TOAST_CREATE_ERROR, TOAST_CREATE_SUCCESS, TOAST_DELETE_ERROR, TOAST_DELETE_SUCCESS } from "../../consts/index";
import { useGetDetailProductQuery } from "../../redux/queries/admin/admin.product";
import { useCreateCartMutation } from "../../redux/queries/user/user.cart";
import { useDeleteCommentMutation, useGetListCommentQuery } from "../../redux/queries/user/user.comment";
import { formatDateString } from "../../utils/common";

const DetailProduct = () => {
    const params = useParams();

    const [quanility, setQuanility] = useState(1);
    const [editComment, setEditComment] = useState(null);

    const { showToast } = useToast();

    const { data } = useGetDetailProductQuery({ id: params.id as string });
    const { data: listComment, isFetching, isLoading } = useGetListCommentQuery();
    const [deleteComment] = useDeleteCommentMutation();
    const [createProductCart] = useCreateCartMutation();

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

    const handleAddCart = async () => {
        if (params.id) {
            const dataCart = {
                idAccount: "d4aa9ee2-19ae-11ef-a5b7-acde48001122",
                idCart: "d4aaa36a-19ae-11ef-a5b7-acde48001122",
                idProduct: params.id,
                name: data[0].tensanpham,
                quantity: quanility,
            };
            const result = await createProductCart({ ...dataCart });
            if ("error" in result) {
                TOAST_CREATE_ERROR.message = "Thêm sản phẩm vào giỏ hàng thất bại!";
                showToast({ ...TOAST_CREATE_ERROR });
            } else {
                TOAST_CREATE_SUCCESS.message = "Thêm sản phẩm vào giỏ hàng thành công!";
                showToast({ ...TOAST_CREATE_SUCCESS });
            }
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
        <div className="container-fluid padding0">
            <main>
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
                                    className="d-flex flex-column justify-content-evenly"
                                >
                                    <div className="d-flex gap-3 align-items-center">
                                        <span>Tên sản phẩm:</span>
                                        {data && data[0].tensanpham}
                                    </div>
                                    <div className="d-flex gap-3 align-items-center">
                                        <span>Giá: </span>
                                        {data && data[0].giaban}
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
                                            className="d-flex gap-2 py-3 px-4 align-items-center"
                                            onClick={handleAddCart}
                                        >
                                            Thêm vào giỏ{" "}
                                            <img
                                                src={iconCart}
                                                alt=""
                                                width={20}
                                            />
                                        </Button>
                                        <Button className="d-flex gap-2 py-3 px-5 align-items-center">
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
                            <div className="">
                                <span>Mô tả sản phẩm</span>
                                <p>{data && data[0].motasanpham}</p>
                            </div>
                        </div>
                        <div className="text-start">
                            <div className="">Sản phẩm tương tự</div>
                        </div>
                        <div className="bg-gray p-5">
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
            </main>
        </div>
    );
};

export default DetailProduct;
