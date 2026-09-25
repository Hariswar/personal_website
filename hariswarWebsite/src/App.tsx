import { TooltipProvider } from "@/components/ui/tooltip"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { lazy, Suspense } from "react"
import { ThemeProvider } from "@/Theme/darkLight"
import Page from "./Page"
import ResearchPaper from "./pages/ResearchPaper"
import ResearchPaperDetail from "./pages/ResearchPaperDetail"
import NotFound from "./pages/Failed"
import "./App.css"

// The 3D room pulls in Three.js, so it is downloaded only when someone opens it
const RoomPage = lazy(() => import("./room/RoomPage"))

const queryClient = new QueryClient()

// List research paper and its details 
const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <TooltipProvider>
        <BrowserRouter>
          <Routes>
            <Route
              path="/"
              element={
                <Suspense fallback={<div className="fixed inset-0 bg-[#0a0b1e]" />}>
                  <RoomPage />
                </Suspense>
              }
            />
            <Route path="/portfolio" element={<Page />} />
            <Route path="/research-paper" element={<ResearchPaper />} />
            <Route path="/research-paper/:id" element={<ResearchPaperDetail />} />
            {}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
)

export default App
