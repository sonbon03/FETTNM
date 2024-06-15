import { Button, Col, Row } from "antd";
import { useGetListProductQuery } from "../../redux/queries/admin/admin.product";

const HistoryPay = () => {
    const { data, isFetching, isLoading } = useGetListProductQuery();
    console.log(data);
    return (
        <div className="container-fluid padding0">
            <span className="screen-darken"></span>
            <main>
                <section id="payment-main">
                    <div className="container text-start">
                        <h6>Lịch sử giao dịch</h6>
                        <ul className="d-grid gap-3 mt-4">
                            <li>
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
                            </li>
                        </ul>
                    </div>
                </section>
            </main>
        </div>
    );
};

export default HistoryPay;
