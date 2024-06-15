import { pick } from "lodash";
import { useSearchParams } from "react-router-dom";

const useQueryString = () => {
    const [params, setParams] = useSearchParams();

    const getParams = (name: string) => params.get(name);

    const setOne = (key: string, value: string | number) => {
        const allParams = getAllParams();
        allParams[key] = value.toString();
        setParams(allParams);
    };

    const setMulti = (obj: { [key: string]: string }) => {
        const allParams = getAllParams();
        let objKeys = Object.keys(obj);
        for (let index = 0; index < objKeys.length; index++) {
            const key = objKeys[index];
            const value = obj[key];
            allParams[key] = value;
        }
        setParams(allParams);
    };

    const getAllParams = (): { [key: string]: string } => {
        const paramsObj = {};
        // @ts-ignore
        for (const [key, value] of params.entries()) {
            // @ts-ignore
            paramsObj[key] = value;
        }
        return paramsObj;
    };

    const deleteOne = (name: string) => {
        const allParams = getAllParams();
        let keys: Array<string> = [];
        // @ts-ignore
        for (const [key, value] of params.entries()) {
            // @ts-ignore
            keys.push(key);
        }
        keys = keys.filter((e) => e !== name);
        const newParams: any = pick(allParams, keys);
        setParams(newParams);
    };

    const deleteAll = () => {
        setParams({});
    };

    return { params, getParams, getAllParams, deleteAll, deleteOne, setOne, setParams, setMulti };
};

export default useQueryString;
