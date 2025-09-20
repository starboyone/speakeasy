import { isAdmin } from "@/lib/admin";
import dynamic from "next/dynamic";
import { redirect } from "next/navigation";
import { toast } from "sonner";

const App = dynamic(() => import("./app"), { ssr: false });
const AdminPage = async () => {

    const isAdminUser = await isAdmin();

    if(!isAdminUser){
        redirect("/learn");
    }
    
    return (
        <App />
    )
}

export default AdminPage;