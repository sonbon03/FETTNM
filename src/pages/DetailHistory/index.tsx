import { Button, Col, Row, Table, Typography } from "antd";
import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import iconBack from "../../assets/images/arrowBack.svg";
import iconEdit from "../../assets/images/iconEdit.svg";
import { useLazyGetByIdOrderQuery } from "../../redux/queries/user/user.order";
import { locale, formatDateString } from "../../utils/common";

const DetailHistory = () => {
    const params = useParams();
    const [getOrderDetail, data] = useLazyGetByIdOrderQuery();
    const columns = [
        {
            title: "Tên sản phẩm",
            dataIndex: "tensanpham",
            key: "tensanpham",
        },
        {
            title: "Số lượng",
            dataIndex: "soluong",
            key: "soluong",
        },
        {
            title: "Giá bán",
            dataIndex: "giaban",
            key: "giaban",
            render: (price: any) => price.toLocaleString("vi-VN"),
        },
        {
            title: "Thành tiền",
            key: "thanhtien",
            render: (record: any) => {
                return <div className="">{(record.soluong * record.giaban).toLocaleString("vi-VN")}</div>;
            },
        },
        {
            title: "Đánh giá",
            dataIndex: "id_sanpham",
            key: "id_sanpham",
            render: (idProduct: any) => {
                return (
                    <Link to={`/detail-product/${idProduct}`}>
                        <img
                            src={iconEdit}
                            alt=""
                        />
                    </Link>
                );
            },
        },
    ];

    useEffect(() => {
        if (params.id) {
            getOrderDetail({ id: params.id });
        }
    }, [params]);

    return (
        <div className="container-fluid padding0">
            <span className="screen-darken"></span>
            <main>
                <section
                    id="payment-main"
                    style={{ height: "100dvh" }}
                >
                    <div className="container text-start d-flex flex-column gap-3 mt-3 h-100">
                        <Link
                            to={"/history-pay"}
                            className="d-flex gap-1 align-items-center "
                        >
                            <img
                                src={iconBack}
                                alt=""
                            />
                            <Typography.Title
                                level={4}
                                className="my-0"
                            >
                                Trở lại
                            </Typography.Title>
                        </Link>
                        <div className="d-flex flex-column justify-content-between h-100">
                            <Row gutter={30}>
                                <Col
                                    span={7}
                                    className="border-end border-3"
                                >
                                    <div className="">
                                        <h5>Thông tin nhận hàng</h5>
                                        <div className="d-flex flex-column gap-3 mt-3">
                                            <div className="">{data?.data?.[0].tennguoinhan}</div>
                                            <div className="d-flex flex-column gap-1">
                                                <div className="">{data?.data?.[0].sodienthoai}</div>
                                                <div className="">{data?.data?.[0].diachi}</div>
                                            </div>
                                        </div>
                                    </div>
                                </Col>
                                <Col span={17}>
                                    <div className="table-responsive">
                                        <Table
                                            columns={columns}
                                            rowKey="id"
                                            locale={locale}
                                            dataSource={data?.data?.[0]?.sanpham as any}
                                            pagination={false}
                                        />
                                    </div>
                                </Col>
                            </Row>
                            <div className="mt-4 ">
                                <div className=" border rounded color-bg">
                                    <div className="px-5 py-3">
                                        <Row>
                                            <Col span={12}>
                                                <div className="">Đơn hàng 1</div>
                                                <div className="">
                                                    {data?.data?.[0]?.sanpham?.map((item: any, index: number) => {
                                                        return (
                                                            <span className="">
                                                                {item.tensanpham} x {item.soluong}
                                                                {index < data?.data?.[0]?.sanpham?.length - 1
                                                                    ? ", "
                                                                    : ""}
                                                            </span>
                                                        );
                                                    })}
                                                </div>
                                            </Col>
                                            <Col
                                                span={12}
                                                className="text-end"
                                            >
                                                <div className="">Hoàn thành</div>
                                                <div className="">
                                                    {data?.data?.[0]?.thanhtien?.toLocaleString("vi-VN")}
                                                </div>
                                                <div className="d-flex gap-2 justify-content-end">
                                                    Ngày đặt hàng :{" "}
                                                    <span>{formatDateString(data?.data?.[0]?.ngaydathang)}</span>
                                                </div>
                                            </Col>
                                        </Row>
                                    </div>
                                    <div className="px-5 py-2 bg-white border-top">
                                        <div className="d-flex gap-4 justify-content-end mt-2">
                                            <Button className="rounded-3 color-btn-backpay">Mua lại</Button>
                                            <Button className="rounded-3">Liên hệ shop</Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
};

export default DetailHistory;
