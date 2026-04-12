import { Suspense, lazy } from "react";
import Index from "./pages/Index";

const Formulario = lazy(() => import("./pages/Formulario"));
const NotFound = lazy(() => import("./pages/NotFound"));

const pathname = typeof window !== "undefined" ? window.location.pathname : "/";

const App = () => {
  if (pathname === "/") {
    return <Index />;
  }

  if (pathname === "/formulario" || pathname === "/formulario/") {
    return (
      <Suspense fallback={null}>
        <Formulario />
      </Suspense>
    );
  }

  return (
    <Suspense fallback={null}>
      <NotFound />
    </Suspense>
  );
};

export default App;
