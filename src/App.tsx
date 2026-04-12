import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

const isNotFoundRoute = typeof window !== "undefined" && window.location.pathname !== "/";

const App = () => (
  isNotFoundRoute ? <NotFound /> : <Index />
);

export default App;
