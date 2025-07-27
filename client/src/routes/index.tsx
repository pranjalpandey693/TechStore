import { useRoutes } from "react-router-dom";
import AuthRoute from "./authRoutes";
import HomeRoutes from "./homeRoutes";
import AdminRoute from "./adminRoutes"



const Routes = () => {
       const RouteObject = [...AuthRoute,...HomeRoutes,...AdminRoute]
       const element = useRoutes(RouteObject)

  return (
     element
  );
}

export default Routes;
