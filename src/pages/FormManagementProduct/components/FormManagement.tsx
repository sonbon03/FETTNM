import { Button, Col, Form, Input, Row, Select } from "antd";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import iconBack from "../../../assets/images/iconBack.svg";
import { useToast } from "../../../components/toast/ToastProvider";
import { TOAST_CREATE_ERROR, TOAST_CREATE_SUCCESS } from "../../../consts/index";
import {
    useCreateProductMutation,
    useGetTypeProductQuery,
    useUpdateProductMutation,
} from "../../../redux/queries/admin/admin.product";
import UploadThumbnail from "./UploadThumbnail";

interface Props {
    data?: any;
}

const FormManagement = (props: Props) => {
    const { data } = props;
    const [form] = Form.useForm();

    const [thumbnail, setThumbnail] = useState();

    const navigation = useNavigate();

    const { data: list_typeProduct } = useGetTypeProductQuery();
    const [createProduct] = useCreateProductMutation();
    const [updateProduct] = useUpdateProductMutation();
    const { showToast } = useToast();
    const handleCreate = async (values: any) => {
        try {
            await createProduct({ image: thumbnail, ...values });
            TOAST_CREATE_SUCCESS.message = "Tạo sản phẩm thành công!";
            showToast(TOAST_CREATE_SUCCESS);
            setTimeout(() => {
                navigation("/admin/management-product");
            }, 0);
        } catch (error) {
            TOAST_CREATE_ERROR.message = "Tạo sản phẩm không thất bại!";
            showToast(TOAST_CREATE_ERROR);
        }
    };
    const handleUpdate = async (values: any) => {
        try {
            await updateProduct({ id: data[0].id, image: thumbnail, ...values });
            TOAST_CREATE_SUCCESS.message = "Sửa sản phẩm thành công!";
            showToast(TOAST_CREATE_SUCCESS);
            setTimeout(() => {
                navigation("/admin/management-product");
            }, 0);
        } catch (error) {
            TOAST_CREATE_ERROR.message = "Sửa sản phẩm không thất bại!";
            showToast(TOAST_CREATE_ERROR);
        }
    };
    const onFinish = (values: any) => {
        if (!thumbnail) {
            form.setFields([
                {
                    name: "thumbnail",
                    errors: ["Vui lòng tải lên ảnh sản phẩm!"],
                },
            ]);
            return;
        }

        if (data && data.length > 0) {
            handleUpdate(values);
        } else {
            handleCreate(values);
        }
    };

    useEffect(() => {
        if (data && data.length > 0) {
            form.setFieldsValue({
                name: data[0].tensanpham,
                description: data[0].motasanpham,
                quantity: data[0].soluong,
                price: data[0].giaban,
                idTypeProduct: data[0].id_loaisanpham,
            });
            setThumbnail(data[0].anhsanpham);
        }
    }, [data]);

    return (
        <div className="container border border-1 rounded-1">
            <div className="d-flex gap-3 align-items-center my-3">
                <Link to="/admin/management-product">
                    <img
                        src={iconBack}
                        alt=""
                    />
                </Link>
                <h3>{typeof data !== "undefined" && data.length > 0 ? "Phiếu sửa sản phẩm" : "Phiếu thêm sản phẩm"}</h3>
            </div>
            <Form
                form={form}
                onFinish={onFinish}
            >
                <div className="body-component text-start">
                    <Row gutter={24}>
                        <Col span={12}>
                            <div className="form-group">
                                <div className="form-floating">
                                    <Form.Item
                                        name="thumbnail"
                                        validateTrigger={["onChange", "onBlur"]}
                                        rules={[
                                            {
                                                validator: (_, value) => {
                                                    if (thumbnail) {
                                                        return Promise.resolve();
                                                    } else {
                                                        return Promise.reject(new Error("Trường thông tin bắt buộc"));
                                                    }
                                                },
                                            },
                                        ]}
                                    >
                                        <div className="form-floating">
                                            <UploadThumbnail
                                                thumbnail={thumbnail}
                                                setThumbnail={(data: any) => setThumbnail(data)}
                                            />
                                            <label>Ảnh sản phẩm</label>
                                        </div>
                                    </Form.Item>
                                </div>
                            </div>
                        </Col>
                        <Col span={12}>
                            <div className="form-group">
                                <div className="form-floating">
                                    <Form.Item
                                        name="name"
                                        className="form-floating"
                                        rules={[
                                            {
                                                required: true,
                                                message: "Trường thông tin bắt buộc",
                                            },
                                        ]}
                                    >
                                        <Input
                                            type="text"
                                            className="form-floating no-icon"
                                            placeholder="Nhập tên sản phẩm"
                                        />
                                    </Form.Item>
                                    <label>Tên sản phẩm</label>
                                </div>
                            </div>
                            <div className="form-group">
                                <div className="form-floating">
                                    <Form.Item
                                        name="quantity"
                                        className="form-floating"
                                        rules={[
                                            {
                                                required: true,
                                                message: "Trường thông tin bắt buộc",
                                            },
                                        ]}
                                    >
                                        <Input
                                            type="number"
                                            className="form-floating no-icon"
                                            onWheel={(e) => e.currentTarget.blur()}
                                            min={0}
                                            placeholder="Nhập số lượng sản phẩm"
                                        />
                                    </Form.Item>
                                    <label>Số lượng sản phẩm</label>
                                </div>
                            </div>
                            <div className="form-group">
                                <div className="form-floating">
                                    <Form.Item
                                        name="price"
                                        className="form-floating"
                                        rules={[
                                            {
                                                required: true,
                                                message: "Trường thông tin bắt buộc",
                                            },
                                        ]}
                                    >
                                        <Input
                                            type="number"
                                            onWheel={(e) => e.currentTarget.blur()}
                                            min={0}
                                            className="form-floating no-icon"
                                            placeholder="Nhập giá bản sản phẩm sản phẩm"
                                        />
                                    </Form.Item>
                                    <label>Giá bán sản phẩm</label>
                                </div>
                            </div>
                            <div className="form-group">
                                <div className="form-floating">
                                    <Form.Item
                                        name="idTypeProduct"
                                        className="form-floating"
                                        rules={[
                                            {
                                                required: true,
                                                message: "Trường thông tin bắt buộc",
                                            },
                                        ]}
                                    >
                                        <Select
                                            className="form-control"
                                            bordered={false}
                                            showSearch
                                            filterOption={(input, option) =>
                                                (option?.children as any)?.toLowerCase().indexOf(input.toLowerCase()) >=
                                                0
                                            }
                                            placeholder="Chọn loại sản phẩm"
                                        >
                                            {list_typeProduct &&
                                                list_typeProduct.map((o: any) => {
                                                    return (
                                                        <Select.Option
                                                            key={o.id}
                                                            value={o.id}
                                                        >
                                                            {o.tenloaisanpham}
                                                        </Select.Option>
                                                    );
                                                })}
                                        </Select>
                                    </Form.Item>
                                    <label>Loại sản phẩm</label>
                                </div>
                            </div>
                        </Col>
                    </Row>
                    <div className="form-group">
                        <div className="form-floating">
                            <Form.Item
                                name="description"
                                className="form-floating"
                                rules={[
                                    {
                                        required: true,
                                        message: "Trường thông tin bắt buộc",
                                    },
                                ]}
                            >
                                <Input.TextArea
                                    placeholder="Nhập mô tả sản phẩm"
                                    className="pt-2"
                                    autoSize={{ minRows: 5, maxRows: 10 }}
                                />
                            </Form.Item>
                            <label>Mô tả sản phẩm</label>
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="form-floating">
                            <Button
                                className="w-100 color-linear text-black"
                                type="primary"
                                htmlType="submit"
                            >
                                {typeof data !== "undefined" && data.length > 0 ? "Sửa sản phẩm" : "Thêm sản phẩm"}
                            </Button>
                        </div>
                    </div>
                </div>
            </Form>
        </div>
    );
};

export default FormManagement;
