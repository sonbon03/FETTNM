import { Button, Col, Row, Table } from "antd";
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
                console.log(record);
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
                <section id="payment-main">
                    <div className="container text-start">
                        <Link
                            to={"/history-pay"}
                            className="d-flex gap-1 align-items-center"
                        >
                            <img
                                src={iconBack}
                                alt=""
                            />
                            Trở lại
                        </Link>
                        <Row gutter={30}>
                            <Col
                                span={5}
                                className="border-end border-3"
                            >
                                <div className="">
                                    <h5>Thông tin nhận hàng</h5>
                                    <div className="">
                                        <div className="">{data?.data?.[0].tennguoinhan}</div>
                                        <div className="">{data?.data?.[0].sodienthoai}</div>
                                        <div className="">{data?.data?.[0].diachi}</div>
                                    </div>
                                </div>
                            </Col>
                            <Col span={18}>
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
                        <div className="mt-4">
                            <div className=" border rounded">
                                <div className="px-5 pt-3 pb-2">
                                    <Row>
                                        <Col span={12}>
                                            <div className="">Đơn hàng 1</div>
                                            <div className="">
                                                {data?.data?.[0]?.sanpham?.map((item: any, index: number) => {
                                                    return (
                                                        <span className="">
                                                            {item.tensanpham} x {item.soluong}
                                                            {index < data?.data?.[0]?.sanpham?.length - 1 ? ", " : ""}
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
                                <hr />
                                <div className="px-5 pb-2">
                                    <div className="d-flex gap-4 justify-content-end mt-2">
                                        <Button>Mua lại</Button>
                                        <Button>Liên hệ shop</Button>
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
