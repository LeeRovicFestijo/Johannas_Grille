// import { AreaCards, AreaCharts, AreaTable, AreaTop } from "../../../components";
import AreaTop from "../../../components/Admin/Dashboard/AreaTop/AreaTop";
import AreaCards from "../../../components/Admin/Dashboard/AreaCards/AreaCards";
import AreaCharts from "../../../components/Admin/Dashboard/AreaCharts/AreaCharts";
import AreaTable from "../../../components/Admin/Dashboard/AreaTable/AreaTable";
import Header from "../../../components/Admin/Header/Header";
import Sidebar from "../../../components/Admin/Sidebar/Sidebar";
import './Dashboard.css'

const Dashboard = () => {
  return (
    <main >
      {/* left of page */}
      <Sidebar />
      {/* right side/content of the page */}
      <div className="content-wrapper">
      <Header />
        <AreaTop />
        <AreaCards />
        <AreaCharts />
        <AreaTable />
      </div>
    </main>
  );
};

export default Dashboard;
