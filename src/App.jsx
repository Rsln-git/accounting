import "bootstrap/dist/css/bootstrap.min.css";
import './App.css'
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import AppRouter from "./routes/AppRouter";
import Header from "./components/NavigateComponents/Header";
import Footer from "./components/NavigateComponents/Footer";
import Breadcrumbs from "./components/NavigateComponents/Breadcrumbs";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <div className="App">
          <Header />
          <Breadcrumbs />
          <AppRouter />
          <Footer />
        </div>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
