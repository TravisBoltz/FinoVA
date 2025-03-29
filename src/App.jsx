import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import HomePage from "./components/HomePage";
import ContactPage from "./components/ContactPage";
import AboutUs from "./components/AboutUs";
// import Header from "./components/Header";
// import { Footer } from "./components/Footer";
import ScrollToTopButton from "./components/ScrollToTop";
import { ThemeProvider } from "./components/theme-provider";
import Head from "./components/Head";
import AuthContainer from "@/feature/auth/authContainer";
import Home from "./feature/homepage/Home";
import { Toaster } from "@/components/ui/sonner";
import PropTypes from "prop-types";
import { isAuthenticated } from "./utils/auth";

// Protected route component
const ProtectedRoute = ({ children }) => {
  // Check if token exists in localStorage using our auth utility
  if (!isAuthenticated()) {
    // Redirect to auth page if not authenticated
    return <Navigate to="/auth" replace />;
  }

  return children;
};

// Add PropTypes validation
ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Head
        title="FionVa - Fintech Solutions & Innovation"
        description="FionVa - Leading provider of cloud solutions and innovative technology services"
        keywords="Fintech, technology, innovation, digital solutions"
      />
      <Router>
        {/* Main Layout */}
        <div className="relative min-h-screen">
          {/* Watermark Background */}
          <div
            className="fixed inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGgtNnYxMmgtNnYtNmgtNnYxMmg2djZoNnYtNmg2di0xMnoiIHN0cm9rZT0iI2UyZThlYSIgc3Ryb2tlLXdpZHRoPSIyIi8+PC9nPjwvc3ZnPg==')] 
                       bg-cover bg-center opacity-5 pointer-events-none z-[-1]"
          ></div>

          {/* Foreground Content */}
          <div className="relative z-10">
            {/* <Header /> */}
            <ScrollToTopButton />
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/about-us" element={<AboutUs />} />
              <Route path="/register" element={<AuthContainer />} />
              <Route
                path="/home"
                element={
                  <ProtectedRoute>
                    <Home />
                  </ProtectedRoute>
                }
              />
            </Routes>
            <Toaster />
          </div>
        </div>
      </Router>
    </ThemeProvider>
  );
}
