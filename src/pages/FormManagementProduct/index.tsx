import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useLazyGetDetailProductQuery } from "../../redux/queries/admin/admin.product";
import FormManagement from "./components/FormManagement";

const FormManagementProduct = () => {
    const params = useParams();
    const [getDataProductById, { data }] = useLazyGetDetailProductQuery();
    useEffect(() => {
        if (params) {
            getDataProductById({
                id: params.id as string,
            });
        }
    }, [params]);
    return (
        <div className="container-fluid padding0">
            <span className="screen-darken"></span>
            <main>
                <section id="content-main">
                    <div className="box-component">
                        <div className="body-component">
                            <FormManagement data={data} />
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
};

export default FormManagementProduct;
