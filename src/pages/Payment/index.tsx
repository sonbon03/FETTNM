import { Button, Col, Form, Input, Modal, Row, Select, Table } from "antd";
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import iconBack from "../../assets/images/arrowBack.svg";
import iconLocation from "../../assets/images/iconLocation.svg";
import imgQr from "../../assets/images/qr.png";
import { useToast } from "../../components/toast/ToastProvider";
import { TOAST_CREATE_ERROR, TOAST_CREATE_SUCCESS } from "../../consts";
import { DataContext } from "../../Context/InfoProductContext";
import { useCart } from "../../Context/CartContext";
import { useCreateOrderMutation } from "../../redux/queries/user/user.order";
import { formatDateString, locale } from "../../utils/common";
import { TypeOption } from "./TypeOption";

const Payment = () => {
    const [form] = Form.useForm();

    const { cartData, setCartData } = useCart();

    const [openModal, setOpenModal] = useState(false);
    const [pendingValues, setPendingValues] = useState<any>(null);

    const navigation = useNavigate();

    const { showToast } = useToast();

    const { totalSelectedItem } = useContext(DataContext);

    console.log(totalSelectedItem);

    const [dateShip, setDateShip] = useState(new Date());
    const [totalMoney, setTotalMoney] = useState(0);
    const [productMoney, setProductMoney] = useState(0);

    const [createOrder] = useCreateOrderMutation();

    const columns = [
        {
            title: "Tên sản phẩm",
            dataIndex: "name",
        },
        {
            title: "Số lượng",
            dataIndex: "quantity",
        },
        {
            title: "Giá bán",
            dataIndex: "price",
            render: (price: any) => {
                return <div className="">{price.toLocaleString("vi-VN")}</div>;
            },
        },
        {
            title: "Thành tiền",
            render: (record: any) => {
                const totalMoney = record.price * record.quantity;
                return <div className="">{totalMoney.toLocaleString("vi-VN")}</div>;
            },
        },
    ];

    const handleAdd = async (values: any) => {
        const data = {
            ...values,
            id_taikhoan: "d4aa9ee2-19ae-11ef-a5b7-acde48001122",
            idShip: "5f9bd1ea-1cd6-11ef-8dc1-acde48001122",
            product: totalSelectedItem,
            total: totalMoney,
            dateShip: dateShip,
        };
        const result = await createOrder({ ...data });
        if ("error" in result) {
            TOAST_CREATE_ERROR.message = "Tạo đơn hàng thất bại!";
            showToast({ ...TOAST_CREATE_ERROR });
        } else {
            TOAST_CREATE_SUCCESS.message = "Tạo đơn hàng thành công!";
            showToast({ ...TOAST_CREATE_SUCCESS });
            const updateCart = cartData.filter(
                (item: any) =>
                    !totalSelectedItem?.some((selectedItem: any) => selectedItem.idProduct === item.idProduct)
            );
            setCartData(updateCart);
            sessionStorage.setItem("cart", JSON.stringify(updateCart));
        }
    };

    const onFinish = async (values: any) => {
        if (values.typePay === 1) {
            handleAdd(values);
            setTimeout(() => {
                navigation("/thankpage");
            }, 0);
        } else {
            setOpenModal(true);
            setPendingValues(values);
        }
    };

    const handleCancel = () => {
        setOpenModal(false);
    };

    useEffect(() => {
        const newDate = new Date(dateShip);
        newDate.setDate(newDate.getDate() + 7);
        setDateShip(newDate);
    }, []);

    useEffect(() => {
        if (totalSelectedItem.length === 0) {
            navigation("/");
        }
    }, [totalSelectedItem]);

    useEffect(() => {
        if (totalSelectedItem && totalSelectedItem.length > 0) {
            let newTotal = totalSelectedItem.reduce((acc, item: any) => {
                return acc + item.price * item.quantity;
            }, 0);
            setProductMoney(newTotal);
            setTotalMoney(newTotal + 12800);
        }
    }, [totalSelectedItem]);

    useEffect(() => {
        let timer: NodeJS.Timeout;

        if (openModal && pendingValues) {
            timer = setTimeout(() => {
                setOpenModal(false);
                handleAdd(pendingValues);
                setTimeout(() => {
                    navigation("/thankpage");
                }, 2000);
            }, 10000);
        }

        return () => clearTimeout(timer);
    }, [openModal, pendingValues, navigation]);

    return (
        <div className="container-fluid padding0">
            <span className="screen-darken"></span>
            <main>
                <section id="payment-main">
                    <div className="">
                        <Link
                            to={"/"}
                            className="d-flex gap-1 align-items-center"
                        >
                            <img
                                src={iconBack}
                                alt=""
                            />
                            Trở lại
                        </Link>
                    </div>
                    <div className="container text-start">
                        <Form
                            onFinish={onFinish}
                            form={form}
                            initialValues={{ typePay: 1 }}
                        >
                            <div className="">
                                <div className="form-group">
                                    <div className="form-floating py-3 px-4 border border-2 rounded-4">
                                        <Row
                                            gutter={20}
                                            className="mt-3"
                                        >
                                            <Col span={8}>
                                                <div className="form-group">
                                                    <div className="form-floating">
                                                        <Form.Item
                                                            name="name"
                                                            className="form-floating"
                                                            rules={[
                                                                {
                                                                    required: true,
                                                                    message: "Thông tin bắt buộc",
                                                                },
                                                            ]}
                                                        >
                                                            <Input
                                                                type="text"
                                                                className="form-floating no-icon"
                                                                placeholder="Nhập tên người nhận"
                                                            />
                                                        </Form.Item>
                                                        <label htmlFor="">Tên người nhận</label>
                                                    </div>
                                                </div>
                                            </Col>
                                            <Col span={8}>
                                                <div className="form-group">
                                                    <div className="form-floating">
                                                        <Form.Item
                                                            name="phone"
                                                            className="form-floating"
                                                            rules={[
                                                                {
                                                                    required: true,
                                                                    message: "Thông tin bắt buộc",
                                                                },
                                                                {
                                                                    pattern: /^0\d{9}$/,
                                                                    message: "Không đúng định dạng số điện thoại",
                                                                },
                                                            ]}
                                                        >
                                                            <Input
                                                                type="text"
                                                                className="form-floating no-icon"
                                                                placeholder="Nhập tên số điện thoại"
                                                            />
                                                        </Form.Item>
                                                        <label htmlFor="">SĐT</label>
                                                    </div>
                                                </div>
                                            </Col>
                                            <Col span={8}>
                                                <div className="form-group">
                                                    <div className="form-floating">
                                                        <Form.Item
                                                            name="city"
                                                            className="form-floating"
                                                            rules={[
                                                                {
                                                                    required: true,
                                                                    message: "Thông tin bắt buộc",
                                                                },
                                                            ]}
                                                        >
                                                            <Input
                                                                type="text"
                                                                className="form-floating no-icon"
                                                                placeholder="Nhập tên sản phẩm"
                                                            />
                                                        </Form.Item>
                                                        <label htmlFor="">Tỉnh/Thành phố</label>
                                                    </div>
                                                </div>
                                            </Col>
                                        </Row>
                                        <Row
                                            gutter={20}
                                            className="mt-3"
                                        >
                                            <Col span={8}>
                                                <div className="form-group">
                                                    <div className="form-floating">
                                                        <Form.Item
                                                            name="district"
                                                            className="form-floating"
                                                            rules={[
                                                                {
                                                                    required: true,
                                                                    message: "Thông tin bắt buộc",
                                                                },
                                                            ]}
                                                        >
                                                            <Input
                                                                type="text"
                                                                className="form-floating no-icon"
                                                                placeholder="Nhập tên sản phẩm"
                                                            />
                                                        </Form.Item>
                                                        <label htmlFor="">Quận/Huyện</label>
                                                    </div>
                                                </div>
                                            </Col>
                                            <Col span={8}>
                                                <div className="form-group">
                                                    <div className="form-floating">
                                                        <Form.Item
                                                            name="ward"
                                                            className="form-floating"
                                                            rules={[
                                                                {
                                                                    required: true,
                                                                    message: "Thông tin bắt buộc",
                                                                },
                                                            ]}
                                                        >
                                                            <Input
                                                                type="text"
                                                                className="form-floating no-icon"
                                                                placeholder="Nhập tên sản phẩm"
                                                            />
                                                        </Form.Item>
                                                        <label htmlFor="">Xã/Phường</label>
                                                    </div>
                                                </div>
                                            </Col>
                                            <Col span={8}>
                                                <div className="form-group">
                                                    <div className="form-floating">
                                                        <Form.Item
                                                            name="location"
                                                            className="form-floating"
                                                            rules={[
                                                                {
                                                                    required: true,
                                                                    message: "Thông tin bắt buộc",
                                                                },
                                                            ]}
                                                        >
                                                            <Input
                                                                type="text"
                                                                className="form-floating no-icon"
                                                                placeholder="Nhập địa chỉ"
                                                            />
                                                        </Form.Item>
                                                        <label htmlFor="">Tên đường, số nhà</label>
                                                    </div>
                                                </div>
                                            </Col>
                                        </Row>
                                        <label className="d-flex gap-2 ms-5">
                                            <img
                                                src={iconLocation}
                                                alt=""
                                            />
                                            Địa chỉ nhận hàng
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <div className="table-responsive form-group">
                                <Table
                                    columns={columns}
                                    rowKey="idProduct"
                                    dataSource={totalSelectedItem as any}
                                    pagination={false}
                                    locale={locale}
                                />
                            </div>
                            <div className="py-3 px-4 border border-2  form-group rounded-4">
                                <Row gutter={20}>
                                    <Col span={3}>Đơn vị vận chuyển :</Col>
                                    <Col span={18}>
                                        <div className="">
                                            Nhanh
                                            <p>Dự kiến nhận hàng : {formatDateString(dateShip.toString())}</p>
                                        </div>
                                    </Col>
                                    <Col span={3}>
                                        <span>12.800</span>
                                    </Col>
                                </Row>
                            </div>
                            <div className="p-3">
                                <Row gutter={20}>
                                    <Col span={20}>
                                        <Row gutter={20}>
                                            <Col
                                                span={4}
                                                className="align-items-center d-flex"
                                            >
                                                <div className="">Phương thức thanh toán: </div>
                                            </Col>
                                            <Col
                                                span={10}
                                                className=""
                                            >
                                                <div className="form-floating">
                                                    <Form.Item
                                                        name="typePay"
                                                        className="form-floating"
                                                        rules={[
                                                            {
                                                                required: true,
                                                                message: "Thông tin bắt buộc",
                                                            },
                                                        ]}
                                                    >
                                                        <Select>
                                                            {TypeOption.map((option) => (
                                                                <Select.Option
                                                                    key={option.value}
                                                                    value={option.value}
                                                                >
                                                                    {option.label}
                                                                </Select.Option>
                                                            ))}
                                                        </Select>
                                                    </Form.Item>
                                                </div>
                                            </Col>
                                        </Row>
                                    </Col>
                                    <Col span={4}>
                                        <div className="form-group">
                                            <Row>
                                                <Col
                                                    span={16}
                                                    className="text-start d-grid gap-3 "
                                                >
                                                    <div className="">Tổng tiền hàng:</div>
                                                    <div className="">Phí vận chuyển:</div>
                                                    <div className="">Tổng thanh toán:</div>
                                                </Col>
                                                <Col
                                                    span={8}
                                                    className="text-end d-grid gap-3"
                                                >
                                                    <div className="">{productMoney.toLocaleString("vi-VN")}</div>
                                                    <div className="">12.800</div>
                                                    <div className="">{totalMoney.toLocaleString("vi-VN")}</div>
                                                </Col>
                                            </Row>
                                        </div>
                                        <div className="form-group">
                                            <div className="form-floating float-end">
                                                <Button
                                                    type="primary"
                                                    htmlType="submit"
                                                >
                                                    Thanh toán
                                                </Button>
                                            </div>
                                        </div>
                                    </Col>
                                </Row>
                            </div>
                        </Form>
                    </div>
                </section>
                <Modal
                    open={openModal}
                    onCancel={handleCancel}
                    // cancelText="Hủy"
                    footer={
                        <div>
                            <Button onClick={handleCancel}>Hủy</Button>
                        </div>
                    }
                >
                    <div className="text-center">
                        <img
                            src={imgQr}
                            alt=""
                        />
                        <div className="">Quý khách vui lòng quét mã thanh toán để hoàn tất giao dịch</div>
                    </div>
                </Modal>
            </main>
        </div>
    );
};

export default Payment;
