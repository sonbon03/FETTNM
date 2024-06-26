import { Typography } from "antd";
import { memo, useState } from "react";
import chatluong from "../../assets/images/chatluong.svg";
import dadang from "../../assets/images/dadang.svg";
import nhanhchong from "../../assets/images/nhanhchong.svg";
import ListProduct from "../../components/ListProduct";
import ListTypeProduct from "../../components/ListTypeProduct";
import { Pagination } from "../../components/pagination";
import { useGetListProductPaginateQuery } from "../../redux/queries/admin/admin.product";
import Banner from "./components/Banner";
const HomePageUser = () => {
    const [query, setQuery] = useState<any>({
        page: 1,
        limit: 12,
    });

    const { data } = useGetListProductPaginateQuery(query as any);

    return (
        <div
            className=""
            id="main"
        >
            <div className="banner">
                <Banner />
            </div>
            <div className="container">
                <div className="d-flex justify-content-evenly my-5">
                    <div className="d-flex flex-column gap-3 justify-content-between">
                        <div className="border border-4 rounded-circle img-attribute">
                            <img
                                src={chatluong}
                                className="img-fluid"
                                alt=""
                            />
                        </div>
                        <Typography.Title level={3}>Cam kết chất lượng</Typography.Title>
                    </div>
                    <div className="d-flex flex-column gap-3 justify-content-between">
                        <div className="border border-4 rounded-circle img-attribute">
                            <img
                                src={dadang}
                                className="img-fluid"
                                alt=""
                            />
                        </div>
                        <Typography.Title level={3}>Thanh toán đa dạng</Typography.Title>
                    </div>
                    <div className="d-flex flex-column gap-3 justify-content-between">
                        <div className="border border-4 rounded-circle img-attribute">
                            <img
                                src={nhanhchong}
                                className="img-fluid"
                                alt=""
                            />
                        </div>
                        <Typography.Title level={3}>Giao hàng nhanh chóng</Typography.Title>
                    </div>
                </div>
            </div>

            <ListTypeProduct />
            <ListProduct data={data?.items} />
            <div className="d-flex justify-content-center">
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
    );
};

export default memo(HomePageUser);
