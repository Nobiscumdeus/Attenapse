import "./App.css";
import { ToastContainer } from "react-toastify";
import ChurchAttendanceSystem from "./components/Home";
import ErrorBoundary from "./Error/ErrorBoundary";


function App() {
  //onst [count, setCount] = useState(0)

  return (
    <>
   
    <ErrorBoundary >
        <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <ChurchAttendanceSystem />

    </ErrorBoundary>
    
    </>
  );
}

export default App;
