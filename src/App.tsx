import { Suspense, lazy } from "react";
import Index from "./pages/Index";

const NotFound = lazy(() => import("./pages/NotFound"));

const isNotFoundRoute = typeof window !== "undefined" && window.location.pathname !== "/";

const App = () => (
  isNotFoundRoute
    ? (
      <Suspense fallback={null}>
        <NotFound />
      </Suspense>
    )
    : <Index />
);

export default App;
