import React from 'react';
import './Footer.css'; 

const Footer: React.FC = () => {
    return (
        <footer className="footer">
            <div className="footer-container">
                <div className="footer-section logo-section">
                <img src="../../assets/images/logo.png" alt="Company Logo" className="footer-logo" />
                    <p className="footer-description">
                    <strong>Giới thiệu</strong><br />
                        Chúng tôi là công ti hàng đầu về xuất nhập khẩu đồ gia dụng.<br />
                        Chúng tôi luôn ưu tiên trải nghiệm người dùng và sự tin tưởng của khách hàng là tuyệt đối.
                    </p>
                    <p><strong>Email:</strong>  ...@gmail.com</p>
                    <p><strong>Số điện thoại:</strong> 09.........</p>
                </div>
                <div className="footer-section">
                    <h3>VỀ CHÚNG TÔI</h3>
                    <ul>
                        <li><a href="/">Trang chủ</a></li>
                        <li><a href="/gioi-thieu">Giới thiệu</a></li>
                        <li><a href="/san-pham">Sản phẩm</a></li>
                        <li><a href="/tin-tuc">Tin tức</a></li>
                        <li><a href="/cam-nang">Cẩm nang</a></li>
                        <li><a href="/lien-he">Liên hệ</a></li>
                    </ul>
                </div>
                <div className="footer-section">
                    <h3>CHÍNH SÁCH</h3>
                    <ul>
                        <li><a href="/chinh-sach-giao-hang">Chính sách giao hàng</a></li>
                        <li><a href="/chinh-sach-doi-tra">Chính sách đổi trả</a></li>
                        <li><a href="/chinh-sach-ban-hang">Chính sách bán hàng</a></li>
                        <li><a href="/chinh-sach-mua-hang">Chính sách mua hàng</a></li>
                    </ul>
                </div>
                <div className="footer-section feedback">
                    <h3>Đánh giá phản hồi</h3>
                    <p>Hãy gửi email của bạn, chúng tôi sẽ phản hồi</p>
                    <form className="feedback-form">
                        <input type="email" placeholder="Email của bạn" required />
                        <button type="submit">Gửi</button>
                    </form>
                </div>
            </div>
        </footer>
    );
};

export default Footer;