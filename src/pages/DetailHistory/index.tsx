import { Button, Col, Row, Table } from "antd";
import { Link } from "react-router-dom";
import iconBack from "../../assets/images/arrowBack.svg";
import iconEdit from "../../assets/images/iconEdit.svg";
import { locale } from "../../utils/common";

const DetailHistory = () => {
    const columns = [
        {
            title: "Tên sản phẩm",
        },
        {
            title: "Số lượng",
        },
        {
            title: "Giá bán",
        },
        {
            title: "Thành tiền",
        },
        {
            title: "Đánh giá",
            render: () => {
                return (
                    <Link to={""}>
                        <img
                            src={iconEdit}
                            alt=""
                        />
                    </Link>
                );
            },
        },
    ];
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
                                        <div className="">Nguyễn Văn A</div>
                                        <div className="">09xxxxxxxx</div>
                                        <div className="">175 Tây Sơn, Đống Đa, Hà Nội</div>
                                    </div>
                                </div>
                            </Col>
                            <Col span={18}>
                                <div className="table-responsive">
                                    <Table
                                        columns={columns}
                                        rowKey="id"
                                        locale={locale}
                                        // loading={isLoading || isFetching}
                                        // dataSource={data?.items as any}
                                        pagination={false}
                                        // locale={locale}
                                    />
                                </div>
                            </Col>
                        </Row>
                        <div className="mt-4">
                            <div className=" border rounded">
                                <div className="px-5 pt-3 pb-2">
                                    <Row>
                                        <Col span={12}>
                                            <div className="">1</div>
                                            <div className="">2</div>
                                        </Col>
                                        <Col
                                            span={12}
                                            className="text-end"
                                        >
                                            <div className="">3</div>
                                            <div className="">4</div>
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
