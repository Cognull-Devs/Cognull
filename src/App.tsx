import { Suspense, lazy } from "react";
import Index from "./pages/Index";
import Formulario from "./pages/Formulario";

const NotFound = lazy(() => import("./pages/NotFound"));

const pathname = typeof window !== "undefined" ? window.location.pathname : "/";

const App = () => {
  if (pathname === "/") {
    return <Index />;
  }

  if (pathname === "/formulario" || pathname === "/formulario/") {
    return <Formulario />;
  }

  return (
    <Suspense fallback={null}>
      <NotFound />
    </Suspense>
  );
};

export default App;
