import { Button, Col, Row, Spin } from "antd";
import { useGetListOrderQuery } from "../../redux/queries/user/user.order";
import { Link } from "react-router-dom";

const HistoryPay = () => {
    const { data, isFetching, isLoading } = useGetListOrderQuery({ idAccount: "d4aa9ee2-19ae-11ef-a5b7-acde48001122" });
    return (
        <div className="container-fluid padding0">
            <span className="screen-darken"></span>
            <main>
                <section id="payment-main">
                    <div className="container text-start">
                        <h6>Lịch sử giao dịch</h6>
                        <ul className="d-grid gap-3 mt-4">
                            {!isLoading ? (
                                data?.map((item: any, index: number) => {
                                    return (
                                        <li>
                                            <div className=" border rounded">
                                                <div className="px-5 pt-3 pb-2">
                                                    <Row>
                                                        <Col span={12}>
                                                            <Link to={`/detail-history-pay/${item.id}`}>
                                                                Đơn hàng {index + 1}
                                                            </Link>
                                                            <div className="d-flex gap-2">
                                                                {item?.sanpham?.map((product: any, index: number) => {
                                                                    return (
                                                                        <span className="">
                                                                            {product.tensanpham} x {product.soluong}
                                                                            {index < item.sanpham.length - 1
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
                                                                {item?.thanhtien.toLocaleString("vi-VN")}
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
                                        </li>
                                    );
                                })
                            ) : (
                                <div className="">
                                    <Spin size="large" />
                                </div>
                            )}
                        </ul>
                    </div>
                </section>
            </main>
        </div>
    );
};

export default HistoryPay;
