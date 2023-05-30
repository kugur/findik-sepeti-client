import { Fragment } from "react";
import { useLocation } from "react-router-dom";
import { TopNavigation } from "components/topNavigationBar";
import { Footer } from "layouts/Footer";
import { AdminTabs } from "./AdminTabs";

const Admin = function () {
  const location = useLocation();
  const userInfo = location.state && location.state.userInfo;
  return (
    <Fragment>
      <TopNavigation userInfo={userInfo}></TopNavigation>

      <section className="py-5 dashboardSection">
      <AdminTabs/>
      </section>
      <Footer></Footer>
    </Fragment>
  );
};

export { Admin };
