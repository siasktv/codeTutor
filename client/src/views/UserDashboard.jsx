import NavDashboard from "../components/NavDashboard";
import UserDashboardCards from "../components/UserDashBoardCards";
import UserDashboardContent from "../components/UserDashboardContent";
import UserDashboardLayout from "../layouts/Dashboards/UserDashboardLayout";

const UserDashboard = () => {
    return (
        <div className="">
            <div className="flex-1 flex">
                <div className="">
                    <UserDashboardLayout />
                </div>
                <div>

                <NavDashboard />
            <div className="flex flex-col bg-[#FAFBFC]">
                <UserDashboardContent />
                <UserDashboardCards/>
            </div>
                </div>
            </div>
        </div>
    );
};

export default UserDashboard;