import NavUserSearch from "../components/NavUserSearch";
import UserDashboardLayout from "../layouts/Dashboards/UserDashboardLayout";




const UserDashboard = () => {
    return(
        <div className="flex flex-1">
            <div className="flex">
            <UserDashboardLayout/>

            </div>
            <NavUserSearch/>
        </div>

        
    );
};
export default UserDashboard;