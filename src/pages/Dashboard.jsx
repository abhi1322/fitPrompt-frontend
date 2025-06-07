import { useAuth } from '../context/AuthContext';
import { WorkoutGenerator } from '../components/WorkoutGenerator';

export const Dashboard = () => {
  const { user, logout } = useAuth();

  return (
    <div className="dashboard">
      <h2>Welcome, {user?.firstName}!</h2>
      <div className="dashboard-content">
        <WorkoutGenerator user={user} />
      </div>
      <button onClick={logout} className="logout-button">Logout</button>
    </div>
  );
};