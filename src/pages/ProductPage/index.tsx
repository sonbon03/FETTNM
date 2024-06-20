import _ from "lodash";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import banner from "../../assets/images/banner01.webp";
import arrowRight from "../../assets/images/iconArrowRight.svg";
import ListProduct from "../../components/ListProduct";
import { Pagination } from "../../components/pagination";
import { useCheckAdmin } from "../../hook/useCheckAdmin";
import { useGetListProductPaginateQuery } from "../../redux/queries/admin/admin.product";

const ProductPage = () => {
    const [linkBack, setLinkBack] = useState("");
    const { isAdmin } = useCheckAdmin();
    const paramId = useParams();

    const [query, setQuery] = useState<any>({
        page: 1,
        limit: 16,
    });

    const { data, isFetching, isLoading } = useGetListProductPaginateQuery(query as any);

    useEffect(() => {
        const newParamId = _.pickBy({
            ...query,
            type: paramId.id,
        });
        setQuery(newParamId);
    }, [paramId.id]);

    useEffect(() => {
        !isAdmin ? setLinkBack("/") : setLinkBack("/admin");
    }, [isAdmin]);
    return (
        <div
            className=""
            id="main"
        >
            <div className="position-relative">
                <ul className="position-absolute back-link">
                    <li>
                        <Link to={linkBack}>Trang chủ</Link>
                    </li>
                    <li>
                        <img
                            src={arrowRight}
                            alt=""
                        />
                    </li>
                    <li>Trang sản phẩm</li>
                </ul>
                <div className="banner">
                    <img
                        src={banner}
                        height={300}
                        className="w-100 object-fit-cover"
                        alt=""
                    />
                </div>
            </div>
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

export default ProductPage;
