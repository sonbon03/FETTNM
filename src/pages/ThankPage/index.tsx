import { Button } from "antd";
import React from "react";
import { Link } from "react-router-dom";
import iconArrow from "../../assets/images/arrowRightAlt.svg";

const ThankPage = () => {
    return (
        <div className="container-fluid padding0">
            <span className="screen-darken"></span>
            <main>
                <section id="payment-main">
                    <div className="container">
                        <h5>SẢN PHẨM ĐÃ ĐẶT THÀNH CÔNG</h5>
                        <div className="">
                            <h6>CẢM ƠN QUÝ KHÁCH HÀNG</h6>
                            <p>
                                Chúng tôi xin gửi lời cảm ơn chân thành và sâu sắc nhất đến Quý khách hàng đã tin tưởng
                                lựa chọn và sử dụng dịch vụ của chúng tôi trong thời gian vừa qua. Đây là một món quà vô
                                giá đổi với chúng tỏi. Nhờ sự tin tưởng của Quý khách hàng mà chúng tôi có được sự thành
                                công như ngày hôm nay.
                            </p>
                            <p>
                                Với triết lý kinh doanh đặt khách hàng là trọng tâm, chúng tỏi xin hứa sẽ không ngừng
                                cải thiện để nâng cao chất lượng sản phẩm, dịch vụ, mang đến cho Quý khách hàng những
                                trải nghiệm mua sám tốt nhất để đáp lại sự tin tưởng của bạn dành cho chúng tôi. Hy vọng
                                trong thời gian sáp tới, chúng tôi sẻ tiếp tục nhận được sự tin tưởng của bạn.
                            </p>
                        </div>
                        <Button>
                            <Link to={"/"}>
                                Quay lại mua thêm sản phẩm
                                <img
                                    src={iconArrow}
                                    alt=""
                                />
                            </Link>
                        </Button>
                    </div>
                </section>
            </main>
        </div>
    );
};

export default ThankPage;
