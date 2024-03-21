import AuthContext from "../context/AuthProvider"
import { useContext } from "react";

const Dashboard = () => {
    const { auth } = useContext(AuthContext);
    const userData = auth.data.user;
    console.log(auth.data.user);
  return (
    <div>
        <h1>Welcome {userData.name}</h1>
        <h2>This is your Dashboard</h2>
    </div>
  )
}

export default Dashboard
