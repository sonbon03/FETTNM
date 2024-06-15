import { randomNum } from "../../utils/common";
import { Button, Input, InputNumber, Space } from "antd";
import React, { useEffect, useState } from "react";

interface PaginationProps {
    total: number;
    totalPage: number;
    onChangePage: (page: number) => void;
    defaultCurrentPage?: number;
    showSize?: boolean;
    listSize?: Array<number>;
    defaultSize?: number;
    onSizeChange?: (size: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({
    totalPage: total_page,
    onChangePage,
    defaultCurrentPage: default_current_page,
    showSize,
    onSizeChange,
    listSize: list_size,
    total,
    defaultSize: default_size,
}) => {
    const [goToPage, setGoToPage] = useState<number | null>(null);
    const [activePage, setActivePage] = useState(1);
    const [currentSize, setCurrentSize] = useState(list_size ? list_size[0] : 10);
    useEffect(() => {
        if (default_current_page) {
            setActivePage(default_current_page);
        }
    }, [default_current_page]);

    const onChange = (page: number) => {
        setActivePage(page);
        onChangePage(page);
    };

    const disabledPrevBtt = () => {
        if (activePage <= 1) {
            return "";
        }
        return "disabled";
    };

    const disabledNextBtt = () => {
        if (activePage >= total_page) {
            return "";
        }
        return "disabled";
    };

    const onClickPrevBtt = () => {
        if (activePage <= 1) {
            return;
        }
        setActivePage((prevState) => prevState - 1);
        onChangePage(activePage - 1);
    };

    const onClickNextBtt = () => {
        if (activePage >= total_page) {
            return;
        }
        setActivePage((prevState) => prevState + 1);
        onChangePage(activePage + 1);
    };

    const renderPaginationItem = () => {
        let items = [];
        for (let page = 1; page <= total_page; page++) {
            if (total_page >= 6) {
                if (items.length >= 5) {
                    items.splice(
                        1,
                        1,
                        <li className="page-item">
                            <span className="page-link page-link-dot">
                                <span aria-hidden="true">&hellip;</span>
                            </span>
                        </li>
                    );
                }
                if (items.length > 5) {
                    items.splice(2, 1);
                }
                if (page === activePage + 2) {
                    if (activePage < total_page - 2) {
                        items.push(
                            <li className="page-item">
                                <span className="page-link page-link-dot">
                                    <span aria-hidden="true">&hellip;</span>
                                </span>
                            </li>
                        );
                    }
                    items.push(
                        <li
                            className={`page-item cursor-pointer ${page === activePage ? "active" : ""}`}
                            key={randomNum(100000)}
                            onClick={() => {
                                setActivePage(total_page);
                                onChange(total_page);
                            }}
                        >
                            <span className="page-link">{total_page}</span>
                        </li>
                    );
                    break;
                }
            }

            items.push(
                <li
                    className={`page-item cursor-pointer ${page === activePage ? "active" : ""}`}
                    key={randomNum(100000)}
                    onClick={() => {
                        setActivePage(page);
                        onChange(page);
                    }}
                >
                    <span className="page-link">{page}</span>
                </li>
            );
        }
        return items;
    };

    const listSizeDefault = [10, 20, 50, 100];
    const defaultSize = default_size ?? 10;

    return total === 0 || total <= defaultSize ? null : (
        <div className="d-flex justify-content-between group-sub-action">
            <div className="">
                {showSize && (
                    <div className="show-entries">
                        <span>
                            Show {(activePage || 1) * currentSize - (currentSize - 1)} to{" "}
                            {activePage == total_page ? total : (activePage || 1) * currentSize} of {total} entries
                        </span>
                        <select
                            className="form-select"
                            onChange={(value) => {
                                setActivePage(1);
                                setCurrentSize(parseInt(value.target.value));
                                onSizeChange?.(parseInt(value.target.value));
                            }}
                        >
                            {(list_size ? list_size : listSizeDefault).map((e, i) => (
                                <option
                                    key={i}
                                    value={e}
                                >
                                    {e}
                                </option>
                            ))}
                        </select>
                    </div>
                )}
            </div>

            <div className="">
                <ul className="pagination justify-content-end">
                    <li
                        className={`cursor-pointer page-item ${disabledPrevBtt()}`}
                        onClick={onClickPrevBtt}
                        key="100"
                    >
                        <span className="page-link">
                            <span aria-hidden="true">«</span>
                        </span>
                    </li>
                    {renderPaginationItem()}
                    <li
                        className={`page-item cursor-pointer ${disabledNextBtt()}`}
                        onClick={onClickNextBtt}
                        key="101"
                    >
                        <span className="page-link">
                            <span aria-hidden="true">»</span>
                        </span>
                    </li>
                    {/* <Space.Compact style={{ width: 120 }}>
                        <InputNumber
                            value={goToPage}
                            onChange={(value) => setGoToPage(value)}
                        />
                        <Button
                            type="primary"
                            onClick={() => {
                                if (goToPage && goToPage > 0 && goToPage <= total_page) {
                                    setActivePage(goToPage);
                                    onChange(goToPage);
                                    setGoToPage(null);
                                }
                            }}
                        >
                            Đến
                        </Button>
                    </Space.Compact> */}
                </ul>
            </div>
        </div>
    );
};
