import { Button, Col, Form, Input, Row } from "antd";
import { useForm } from "antd/es/form/Form";
import React, { useEffect } from "react";
import iconUser from "../../assets/images/iconUser.svg";
import { useCreateCommentMutation, useUpdateCommentMutation } from "../../redux/queries/user/user.comment";
import { useToast } from "../toast/ToastProvider";
import { TOAST_CREATE_ERROR, TOAST_CREATE_SUCCESS, TOAST_UPDATE_ERROR, TOAST_UPDATE_SUCCESS } from "../../consts";

interface Props {
    data?: any;
    setOpen?: () => void;
    idProduct: any;
}

const FormComment = (props: Props) => {
    const { data } = props;
    const [form] = Form.useForm();
    const { showToast } = useToast();

    const [createComment] = useCreateCommentMutation();
    const [updateComment] = useUpdateCommentMutation();

    const onFinish = async (values: any) => {
        const dataComment = {
            idAccount: "d4aa9ee2-19ae-11ef-a5b7-acde48001122",
            idProduct: props.idProduct,
            ...values,
        };
        try {
            if (!data) {
                const result = await createComment({ ...dataComment });
                if ("error" in result) {
                    TOAST_CREATE_ERROR.message = "Tạo bình luận thất bại!";
                    showToast({ ...TOAST_CREATE_ERROR });
                } else {
                    TOAST_CREATE_SUCCESS.message = "Tạo bình luận thành công!";
                    showToast({ ...TOAST_CREATE_SUCCESS });
                }
            } else {
                const result = await updateComment({ id: data.id, ...dataComment });
                if ("error" in result) {
                    TOAST_UPDATE_ERROR.message = "Sửa bình luận thất bại!";
                    showToast({ ...TOAST_UPDATE_ERROR });
                } else {
                    TOAST_UPDATE_SUCCESS.message = "Sửa bình luận thành công!";
                    showToast({ ...TOAST_UPDATE_SUCCESS });
                }
                props.setOpen && props.setOpen();
            }
            form.resetFields();
        } catch (error) {}
    };

    useEffect(() => {
        if (data) {
            form.setFieldsValue({
                comment: data?.binhluan,
            });
        }
    }, [data]);
    return (
        <div className="bg-white px-5 py-3 rounded-4">
            <Form
                form={form}
                onFinish={onFinish}
            >
                <Row>
                    <Col
                        span={3}
                        className="justify-content-center d-flex align-items-center"
                    >
                        <img
                            className="img-fluid"
                            src={iconUser}
                            alt=""
                            width={60}
                        />
                    </Col>
                    <Col span={21}>
                        <Form.Item
                            name="comment"
                            className="form-floating text-start"
                            rules={[
                                {
                                    required: true,
                                    message: "Trường bắt buộc nhập",
                                },
                            ]}
                        >
                            <Input
                                type="text"
                                className="form-floating no-icon line-style"
                                placeholder="Nhập bình luận"
                            />
                        </Form.Item>

                        <div className="float-end d-flex gap-3">
                            {props.data && (
                                <Button
                                    type="primary"
                                    onClick={() => props.setOpen && props.setOpen()}
                                >
                                    Hủy
                                </Button>
                            )}
                            <Button
                                type="primary"
                                htmlType="submit"
                            >
                                Gửi
                            </Button>
                        </div>
                    </Col>
                </Row>
            </Form>
        </div>
    );
};

export default FormComment;
