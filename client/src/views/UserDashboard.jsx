import NavDashboard from "../components/NavDashboard";
import UserDashboardCards from "../components/UserDashBoardCards";
import UserDashboardContent from "../components/UserDashboardContent";
import UserDashboardLayout from "../layouts/Dashboards/UserDashboardLayout";

const UserDashboard = () => {
    return (
      <div className="flex">
        <div>
          <UserDashboardLayout />
        </div>
        <div className="flex flex-col justify-center w-full h-full left-0 right-0">
          <NavDashboard />
          <div className="flex flex-col bg-[#FAFBFC]">
            <UserDashboardContent />
            <UserDashboardCards />
          </div>
        </div>
      </div>
    );
};

export default UserDashboard;