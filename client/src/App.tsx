import useAuthInitializer from "./hooks/useAuthInitializer";
import useFetchData from "./hooks/useFetchData";
import Routes from "./routes";


const App = () => {
    useAuthInitializer()
    useFetchData()
  return (
   
    
    <Routes/>
   
  );
}

export default App;
