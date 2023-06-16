import { useFetchData, useFetchDataById } from "app/hooks/dataFetchingHooks";
import {useEffect, useState} from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { ProductTemplate } from "./ProductTemplate";

const EditProduct = function(props) {
    const {productId} = useParams();
    const [data, setData, isFetching] = useFetchDataById("/product/", productId);
    const setValue = function(key, value) {
        setData({
            ...data,
            [key]: value
        })
    }

    if (!data || isFetching) return (<></>);


    return (
        <ProductTemplate data={data} setValue={setValue}></ProductTemplate>
           )
}

export {EditProduct};
