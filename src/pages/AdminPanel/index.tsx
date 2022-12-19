//import { useEffect } from "react";

const AdminPanel = () => {

    /*
    const { user } = useAuth();
    const [isUserAdmin, setIsUserAdmin] = useState(false);
    
    useEffect(() => {
        if (user) {
        const isAdmin = user?.claims?.admin;
        setIsUserAdmin(isAdmin);
        }
    }, [user]);
    
    if (!user) {
        return <div>Loading...</div>;
    }
    
    if (!isUserAdmin) {
        return <div>You are not authorized to view this page.</div>;
    }
    */
    return <div>Welcome to the admin panel!</div>;
    };

export default AdminPanel;