import useAuthInitializer from "./hooks/useAuthInitializer";
import Routes from "./routes";


const App = () => {
    useAuthInitializer()
    
  return (
   
    
    <Routes/>
   
  );
}

export default App;
