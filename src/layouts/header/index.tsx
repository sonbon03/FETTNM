import { CaretDownOutlined } from "@ant-design/icons";
import { Badge, Button, Dropdown, Menu, MenuProps, Space, Table, TableColumnsType } from "antd";
import React, { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import iconCart from "../../assets/images/iconCart.svg";
import iconClose from "../../assets/images/iconClose.svg";
import iconUser from "../../assets/images/iconUser.svg";
import logo from "../../assets/images/logo.png";
import { useToast } from "../../components/toast/ToastProvider";
import { useCart } from "../../Context/CartContext";
import { DataContext } from "../../Context/InfoProductContext";
import { useCheckAdmin } from "../../hook/useCheckAdmin";
import { useGetListProductQuery, useGetTypeProductQuery } from "../../redux/queries/admin/admin.product";

interface HeaderProp {}

const Header = (props: HeaderProp) => {
    const { cartData, setCartData } = useCart();

    const location = useLocation();

    const { setTotalSelectedItems } = useContext(DataContext);

    const { data: dataTypeProducts } = useGetTypeProductQuery();
    const { data: dataProduct } = useGetListProductQuery();

    const navigation = useNavigate();

    const { showToast } = useToast();

    const { isAdmin } = useCheckAdmin();

    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
    const [selectedRows, setSelectedRows] = useState<DataType[]>([]);
    const [dropdownVisible, setDropdownVisible] = useState(false);

    const onSelectChange = (newSelectedRowKeys: React.Key[], newSelectedRows: any) => {
        setSelectedRowKeys(newSelectedRowKeys);
        setSelectedRows(newSelectedRows);
    };

    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
    };

    const totalSelectedItems: DataType[] = selectedRows.map((row) => {
        return {
            idAccount: row.idAccount,
            idProduct: row.idProduct,
            idCart: row.idCart,
            name: row.name,
            price: row.price,
            quantity: row.quantity,
            image: row.image,
        };
    });

    const handleClick = () => {
        setTotalSelectedItems(totalSelectedItems);
        setSelectedRowKeys([]);
        setSelectedRows([]);
        navigation("/payment");
        setDropdownVisible(false);
    };
    const handleIncrease = (value: any) => {
        const check = dataProduct?.filter((item: any) => item.id === value.idProduct);
        const maxQuantity = check?.[0]?.soluong;
        const dataUpdate = cartData.map((item: any) => {
            if (item.idProduct === value.idProduct && maxQuantity) {
                return {
                    ...item,
                    quantity: maxQuantity > value.quantity ? value.quantity + 1 : value.quantity,
                };
            }
        });
        sessionStorage.setItem("cart", JSON.stringify(dataUpdate));
        setCartData(dataUpdate);
    };
    const handleReduce = (value: any) => {
        const minQuantity = 1;
        const dataUpdate = cartData.map((item: any) => {
            if (item.idProduct === value.idProduct) {
                return {
                    ...item,
                    quantity: minQuantity < value.quantity ? value.quantity - 1 : value.quantity,
                };
            }
        });
        sessionStorage.setItem("cart", JSON.stringify(dataUpdate));
        setCartData(dataUpdate);
    };
    const handleDeleteProductCart = (id: string) => {
        const updatedCart = cartData.filter((item: any) => item?.idProduct !== id);
        setCartData(updatedCart);
        sessionStorage.setItem("cart", JSON.stringify(updatedCart));
        const updateSelect = selectedRowKeys.filter((item: any) => item !== id);
        setSelectedRowKeys(updateSelect);
    };

    const columns: TableColumnsType<DataType> = [
        {
            title: "Ảnh sản phẩm",
            dataIndex: "image",
            render: (image: any) => {
                return (
                    <img
                        src={process.env.REACT_APP_CDN + image}
                        alt=""
                        width={100}
                    />
                );
            },
        },
        {
            title: "Tên sản phẩm",
            dataIndex: "name",
            render: (name: any) => {
                return <div className="">{name}</div>;
            },
        },
        {
            title: "Giá",
            dataIndex: "price",
            render: (price: any) => {
                return <div className="">{price?.toLocaleString("vi-VN")}</div>;
            },
        },
        {
            title: "Số lượng",
            render: (record: any) => {
                if (!record) return;
                return (
                    <div className="d-flex flex-column mb-4">
                        <div className="d-flex justify-content-end mb-2">
                            <button
                                className="px-2"
                                onClick={() => handleDeleteProductCart(record.idProduct)}
                            >
                                <img
                                    src={iconClose}
                                    alt=""
                                    width={12}
                                    className="img-fluid"
                                />
                            </button>
                        </div>
                        <div
                            className="border p-1 rounded"
                            key={record}
                        >
                            <Button
                                size="small"
                                className="border-0"
                                onClick={() => handleReduce(record)}
                            >
                                -
                            </Button>
                            <span className="px-2">{record.quantity}</span>
                            <Button
                                size="small"
                                className="border-0"
                                onClick={() => handleIncrease(record)}
                            >
                                +
                            </Button>
                        </div>
                    </div>
                );
            },
        },
    ];

    const itemsTypeProduct: MenuProps["items"] = dataTypeProducts?.map((product: any) => ({
        key: product.id,
        label: (
            <Link
                to={isAdmin ? `/admin/product-list-type/${product.id}` : `/product-list-type/${product.id}`}
                className="my-1"
            >
                {product.tenloaisanpham}
            </Link>
        ),
    }));

    const itemsUser: MenuProps["items"] = [
        ...(isAdmin
            ? [
                  {
                      label: <Link to={"/admin/management-product"}>Quản lý sản phẩm</Link>,
                      key: "1",
                  },
              ]
            : [
                  {
                      label: <Link to="">Thông tin tài khoản</Link>,
                      key: "2",
                  },
                  {
                      label: <Link to="/history-pay">Lịch sử giao dịch</Link>,
                      key: "3",
                  },
              ]),
        {
            label: <a href="">Đăng xuất</a>,
            key: "0",
        },
    ];

    const tableLocale = {
        emptyText: "Bạn chưa có sản phẩm nào",
    };

    const itemsProduct: MenuProps["items"] = [
        {
            label: (
                <div
                    style={{ maxHeight: "500px", overflow: "auto" }}
                    onClick={(e) => e.stopPropagation()}
                >
                    <Table
                        rowSelection={rowSelection}
                        columns={columns}
                        rowKey={"idProduct"}
                        dataSource={cartData as any}
                        pagination={false}
                        locale={tableLocale}
                    />
                </div>
            ),
            key: "0",
        },
        {
            label: (
                <div
                    className="d-flex gap-4 justify-content-between align-items-center"
                    onClick={(e) => e.stopPropagation()}
                >
                    <div className="fw-semibold d-flex gap-3">
                        Giá tiền:
                        <span>
                            {(selectedRowKeys.length > 0
                                ? totalSelectedItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
                                : 0
                            ).toLocaleString("vi-VN")}
                        </span>
                    </div>
                    <Button
                        onClick={handleClick}
                        className="color-btn-pay fw-semibold"
                        disabled={selectedRowKeys.length === 0}
                    >
                        Thanh toán
                    </Button>
                </div>
            ),
            key: "1",
        },
    ];

    const menuTypeProduct = <Menu items={itemsTypeProduct} />;
    const menuUser = <Menu items={itemsUser} />;
    const menuCart = <Menu items={itemsProduct} />;

    const checkActiveSubNavItem = (path: string, className: string) => {
        return location.pathname === path ? `${className} activeLink` : className;
    };

    const customSubNavItem = (path: string, name: string, permission?: string) => {
        return !permission ? (
            <li className={checkActiveSubNavItem(path, "nav-item")}>
                <Link
                    className="nav-link text-black"
                    to={path}
                >
                    {name}
                </Link>
            </li>
        ) : null;
    };

    return (
        <header>
            <div className="containe">
                <nav className="navbar navbar-expand-lg bg-body-tertiary position-fixed w-100 text-white top-0 end-0 bg-navigation color-linear">
                    <div className="container">
                        <Link
                            className="navbar-brand text-white"
                            to={isAdmin ? "/admin" : "/"}
                        >
                            <img
                                src={logo}
                                alt="logo"
                                className="img-fluid w-50 ms-0"
                            />
                        </Link>
                        {/* <button
                            className="navbar-toggler"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#navbarSupportedContent"
                            aria-controls="navbarSupportedContent"
                            aria-expanded="false"
                            aria-label="Toggle navigation"
                        >
                            <span className="navbar-toggler-icon"></span>
                        </button> */}
                        <div
                            className="collapse navbar-collapse "
                            id="navbarSupportedContent"
                        >
                            <ul className="navbar-nav m-auto mb-2 mb-lg-0 gap-5 text-black fs-6">
                                {/* <li className="nav-item">
                                    <Link
                                        className="nav-link active "
                                        aria-current="page"
                                        to={isAdmin ? "/admin" : "/"}
                                    >
                                        Trang chủ
                                    </Link>
                                </li> */}

                                {customSubNavItem(isAdmin ? "/admin" : "/", "Trang chủ")}

                                <li className="nav-item">
                                    <Link
                                        className="nav-link text-black"
                                        to="#"
                                    >
                                        Giới thiệu
                                    </Link>
                                </li>
                                <li className="nav-item d-flex align-items-center">
                                    <Dropdown
                                        overlay={menuTypeProduct}
                                        trigger={["click"]}
                                        arrow
                                        placement="bottomRight"
                                    >
                                        <span className="cursor-pointer d-flex gap-1">
                                            Sản phẩm
                                            <CaretDownOutlined />
                                        </span>
                                    </Dropdown>
                                </li>
                                <li className="nav-item">
                                    <Link
                                        className="nav-link text-black"
                                        to={""}
                                    >
                                        Tin tức
                                    </Link>
                                </li>
                            </ul>
                            <div className="group-icon d-flex gap-3">
                                <Dropdown
                                    overlay={menuUser}
                                    trigger={["hover"]}
                                    placement="bottomRight"
                                >
                                    <img
                                        className="img-fluid"
                                        src={iconUser}
                                        alt="user"
                                    />
                                </Dropdown>
                                {!isAdmin && (
                                    <div className="">
                                        <Dropdown
                                            overlay={menuCart}
                                            trigger={["click"]}
                                            placement="bottomRight"
                                            arrow
                                            visible={dropdownVisible}
                                            onVisibleChange={(visible) => setDropdownVisible(visible)}
                                        >
                                            <Space size="middle">
                                                <Badge count={cartData.length}>
                                                    <img
                                                        className="img-fluid"
                                                        src={iconCart}
                                                        alt="cart"
                                                    />
                                                </Badge>
                                            </Space>
                                        </Dropdown>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </nav>
            </div>
        </header>
    );
};

export default Header;
