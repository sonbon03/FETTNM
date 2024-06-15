import type { TableColumnsType } from "antd";
import { Button, Popconfirm, Table } from "antd";
import React, { memo, useState } from "react";
import { useNavigate } from "react-router-dom";
import iconDelete from "../../assets/images/iconDelete.svg";
import iconEdit from "../../assets/images/iconEdit.svg";
import { Pagination } from "../../components/pagination";
import { useToast } from "../../components/toast/ToastProvider";
import { TOAST_DELETE_ERROR, TOAST_DELETE_SUCCESS } from "../../consts/index";
import { useDeleteProductMutation, useGetListProductPaginateQuery } from "../../redux/queries/admin/admin.product";
import { locale } from "../../utils/common";

const ManagementProduct = () => {
    const [query, setQuery] = useState({
        page: 1,
        limit: 10,
    });
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

    const navigate = useNavigate();

    const { showToast } = useToast();

    const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
        setSelectedRowKeys(newSelectedRowKeys);
    };
    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
    };
    const { data, isFetching, isLoading } = useGetListProductPaginateQuery(query as any);
    const [deleteProduct] = useDeleteProductMutation();
    const columns: TableColumnsType<any> = [
        {
            title: "Tên sản phẩm",
            dataIndex: "tensanpham",
            fixed: "left",
        },
        {
            title: "Số lượng tồn",
            dataIndex: "soluong",
            fixed: "left",
        },
        {
            title: "Gia ban",
            dataIndex: "giaban",
            fixed: "left",
        },
        {
            title: "Anh san pham",
            dataIndex: "anhsanpham",
            fixed: "left",
            render: (img: any) => {
                return (
                    <div className="">
                        <img
                            width={150}
                            src={process.env.REACT_APP_CDN + img}
                            alt=""
                        />
                    </div>
                );
            },
        },
        {
            title: "Chuc nang",
            fixed: "right",
            render: (record: any) => {
                return (
                    <div className="d-flex gap-3">
                        <button
                            onClick={() => {
                                handleClickEdit(record.id);
                            }}
                        >
                            <img
                                src={iconEdit}
                                alt=""
                            />
                        </button>
                        <button>
                            <Popconfirm
                                title="Bạn có muốn xóa bản ghi này?"
                                onConfirm={() => handleDelete(record.id)}
                                okText="Có"
                                cancelText="Không"
                            >
                                <img
                                    src={iconDelete}
                                    alt=""
                                />
                            </Popconfirm>
                        </button>
                    </div>
                );
            },
        },
    ];

    const handleClickEdit = (id: any) => {
        navigate(`/admin/form-management-product/${id}`);
    };
    const handleDelete = async (id: any) => {
        const result = await deleteProduct({
            id: id,
        });
        if ("error" in result) {
            TOAST_DELETE_ERROR.message = "Xóa sản phẩm thất bại!";
            showToast(TOAST_DELETE_ERROR);
        } else {
            TOAST_DELETE_SUCCESS.message = "Xóa sản phẩm thành công!";
            showToast(TOAST_DELETE_SUCCESS);
        }
    };

    return (
        <div className="container-fluid padding0">
            <span className="screen-darken"></span>
            <main>
                <section id="content-main">
                    <div className="box-component">
                        <div className="body-component">
                            <div className="">
                                <h2 className="title-component">Quản lý sản phẩm</h2>
                                <div className="d-flex gap-3 float-start my-3">
                                    <Button className="d-flex gap-3">
                                        <img
                                            src={iconDelete}
                                            alt=""
                                        />
                                        Xóa
                                    </Button>
                                    <Button onClick={() => navigate("/admin/form-management-product/")}>
                                        Thêm mới
                                    </Button>
                                </div>
                            </div>
                            <div className="table-responsive">
                                <Table
                                    rowSelection={rowSelection}
                                    columns={columns}
                                    rowKey="id"
                                    loading={isLoading || isFetching}
                                    dataSource={data?.items as any}
                                    pagination={false}
                                    locale={locale}
                                />
                                <Pagination
                                    onSizeChange={(size) => setQuery({ ...query, limit: size })}
                                    total={data?.meta.totalItems || 0}
                                    showSize={false}
                                    totalPage={data?.meta.totalPages || 0}
                                    onChangePage={(page) => setQuery({ ...query, page: page })}
                                    defaultCurrentPage={query.page}
                                />
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
};

export default memo(ManagementProduct);
