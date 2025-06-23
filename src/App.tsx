
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import CMS from "./pages/CMS";
import SamplePage from "./pages/SamplePage";
import HiltonDemo from "./pages/HiltonDemo";
import FlightStatus from "./pages/FlightStatus";
import WelcomePage from "./pages/WelcomePage";
import HotelExperiencePage from "./pages/HotelExperiencePage";
import NotFound from "./pages/NotFound";
import { CMSPageRenderer } from "./components/cms/CMSPageRenderer";
import { CMSProvider } from "./contexts/CMSContext";
import Login from "./pages/Login";
import AuthInit from "./components/AuthInit";
import Register from "./pages/Register";
import EditorPage from "./pages/EditorPage";
import ViewerPage from "./pages/ViewerPage";
import ProtectedRoute from "@/components/ProtectedRoute";

const queryClient = new QueryClient();

const App = () => {
  console.log("App component is rendering");

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <CMSProvider>
          <BrowserRouter>
            {/* 👇 Inicializa el auth */}
            <AuthInit />

            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/cms/*" element={<CMS />} />
              <Route path="/sample" element={<SamplePage />} />
              <Route path="/hilton" element={<HiltonDemo />} />
              <Route path="/flights" element={<FlightStatus />} />
              <Route path="/welcome" element={<WelcomePage />} />
              <Route path="/hotel-experience" element={<HotelExperiencePage />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route
                path="/editor"
                element={
                  <ProtectedRoute roles={["editor"]}>
                    <EditorPage />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/viewer"
                element={
                  <ProtectedRoute roles={["viewer"]}>
                    <ViewerPage />
                  </ProtectedRoute>
                }
              />
              <Route path="/:pageSlug" element={<CMSPageRenderer />} />
              <Route path="/:slug" element={<CMSPageRenderer />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </CMSProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
