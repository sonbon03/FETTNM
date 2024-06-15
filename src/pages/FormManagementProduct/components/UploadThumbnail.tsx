import { message, UploadFile } from "antd";
import Upload, { RcFile, UploadChangeParam } from "antd/es/upload";
import { useState } from "react";
import { useToast } from "../../../components/toast/ToastProvider";
import { TOAST_DELETE_SUCCESS, TOAST_UPLOAD_ERROR, TOAST_UPLOAD_SUCCESS } from "../../../consts";

interface Props {
    thumbnail: any;
    setThumbnail: (data: any) => void;
}

const UploadThumbnail = (props: Props) => {
    const { thumbnail, setThumbnail } = props;
    const [fileList, setFileList] = useState<UploadFile[]>([]);
    const { showToast } = useToast();

    const uploadProps: any = {
        name: "files",
        action: `${process.env.REACT_APP_HOST}/thumbnail/add`,
        method: "POST",
        maxCount: 1,
        accept: "image/*",
        headers: {},
        fileList,
        showUploadList: false,
        beforeUpload: (file: RcFile) => {
            const isJpgOrPngOrPdf = file.type === "image/jpeg" || file.type === "image/png";
            if (!isJpgOrPngOrPdf) {
                message.error("Không đúng định dạng file yêu cầu");
            }
            const thumbnail = document.getElementById("thumbnail") as HTMLImageElement;
            thumbnail.src = URL.createObjectURL(file);

            return isJpgOrPngOrPdf;
        },
        onChange: async (info: UploadChangeParam) => {
            setFileList(info.fileList);
            if (info.file.response && info.file.response && info.file.status === "done") {
                showToast({ ...TOAST_UPLOAD_SUCCESS });
                setFileList([info.file]);
                setThumbnail && setThumbnail(info.file.response.split("/").slice(7).join("/"));
            }
            if (info.file.status === "removed") {
                showToast({ ...TOAST_DELETE_SUCCESS });
                setFileList([]);
            }
            if (info.file.status === "error") {
                showToast({ ...TOAST_UPLOAD_ERROR });
            }
        },
    };

    return (
        <div
            className="tab-pane fade show active"
            id="default-tab-pane"
            role="tabpanel"
            aria-labelledby="default-tab"
            tabIndex={0}
        >
            <div className="body-component">
                <div className="form-group">
                    <div className="frame-upload text-center">
                        <img
                            className="img-fluid"
                            src={thumbnail ? process.env.REACT_APP_CDN + thumbnail : ""}
                            alt=""
                            id="thumbnail"
                            width={200}
                        />
                    </div>
                    <Upload.Dragger {...uploadProps}>
                        <div className="upload-btn-wrapper">
                            <button className="btn">Tải ảnh sản phẩm</button>
                        </div>
                    </Upload.Dragger>
                </div>
            </div>
        </div>
    );
};

export default UploadThumbnail;
