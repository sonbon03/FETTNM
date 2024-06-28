import React from "react";
import logo from "../../assets/images/logo.png";
import { Button, Col, Form, Input, Row } from "antd";
import { Typography } from "antd";
import { MailOutlined } from "@ant-design/icons";
import iconEmail from "../../assets/images/iconEmail.svg";
import { Link } from "react-router-dom";

const Footer: React.FC = () => {
    return (
        <footer className="footer ">
            <div className="container text-start">
                <div className="mb-4">
                    <Link to="/">
                        <img
                            src={logo}
                            alt="Company Logo"
                            className="footer-logo"
                            width={75}
                        />
                    </Link>
                </div>
                <Row gutter={30}>
                    <Col span={8}>
                        <div className="">
                            <div className="">
                                <Typography.Title
                                    className=""
                                    level={4}
                                >
                                    Giới thiệu
                                </Typography.Title>
                                <p>
                                    Chúng tôi là công ti hàng đầu về xuất nhập khẩu đồ gia dụng.
                                    <br />
                                    Chúng tôi luôn ưu tiên trải nghiệm người dùng và sự tin tưởng của khách hàng là
                                    tuyệt đối.
                                </p>
                            </div>
                            <Row gutter={20}>
                                <Col
                                    className=""
                                    span={12}
                                >
                                    <Typography.Title
                                        className=""
                                        level={5}
                                    >
                                        Email:
                                    </Typography.Title>
                                </Col>
                                <Col
                                    className=""
                                    span={12}
                                >
                                    ...@gmail.com
                                </Col>
                            </Row>
                            <Row gutter={20}>
                                <Col
                                    className=""
                                    span={12}
                                >
                                    <Typography.Title
                                        className="mb-0"
                                        level={5}
                                    >
                                        Số điện thoại:
                                    </Typography.Title>
                                </Col>
                                <Col
                                    className=""
                                    span={12}
                                >
                                    09.........
                                </Col>
                            </Row>
                        </div>
                    </Col>
                    <Col span={4}>
                        <Typography.Title
                            className=""
                            level={4}
                        >
                            Về chúng tôi
                        </Typography.Title>
                        <ul className="ps-0">
                            <li>
                                <Link
                                    to="/"
                                    className="text-black"
                                >
                                    {" "}
                                    Trang chủ
                                </Link>
                            </li>
                            <li>Giới thiệu</li>
                            <li>Sản phẩm</li>
                            <li>Tin tức</li>
                            <li>Cẩm nang</li>
                            <li>Liên hệ</li>
                        </ul>
                    </Col>
                    <Col span={4}>
                        <Typography.Title
                            className=""
                            level={4}
                        >
                            Chính sách
                        </Typography.Title>
                        <ul className="ps-0">
                            <li>Chính sách giao hàng</li>
                            <li>Chính sách đổi trả</li>
                            <li>Chính sách bán hàng</li>
                            <li>Chính sách mua hàng</li>
                        </ul>
                    </Col>
                    <Col span={8}>
                        <div className="rounded-4 bg-white text-center p-4">
                            <div className="mb-3">
                                <Typography.Title
                                    className="mb-2"
                                    level={4}
                                >
                                    Đánh giá phản hồi
                                </Typography.Title>
                                <div className="fs-6 text-gray">Hãy gửi email của bạn, chúng tôi sẽ phản hồi</div>
                            </div>
                            <Form>
                                <div className="form-floating mb-3">
                                    <Form.Item className="form-floating">
                                        <Input
                                            placeholder="Email của bạn"
                                            prefix={
                                                <img
                                                    src={iconEmail}
                                                    alt="Email Icon"
                                                    style={{
                                                        width: 16,
                                                        height: 16,
                                                        marginRight: 8,
                                                        position: "absolute",
                                                        top: 18,
                                                        right: 10,
                                                    }}
                                                />
                                            }
                                        />
                                    </Form.Item>
                                </div>
                                <Button className="w-100 form-floating color-btn-send-email ">Gửi</Button>
                            </Form>
                        </div>
                    </Col>
                </Row>
            </div>
        </footer>
    );
};

export default Footer;
