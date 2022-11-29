import { TopNavigation } from "components/topNavigationBar";
import { Footer } from "layouts/Footer";
import { Fragment, React } from "react";
import { Container } from "react-bootstrap";

export const CustomerAccount = (params) => {
    return (
        <Fragment>
            <div className="customerAccount">
                <TopNavigation></TopNavigation>
                <Container className="customerCointainer"></Container>
                <Footer></Footer>
            </div>
        </Fragment>
    )
}