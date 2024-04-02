/* @refresh reload */
import { Route, Router } from "@solidjs/router";
import { VsLoading } from 'solid-icons/vs';
import { Suspense, lazy } from "solid-js";
import { render } from "solid-js/web";
import App from "./App";
import { ThemeProvider } from "./components/ThemeProvider";
import "./index.css";

const Home = lazy(() => import("./routes/Home"));
const About = lazy(() => import("./routes/About"));

const root = document.getElementById("root");

if (import.meta.env.DEV && !(root instanceof HTMLElement)) {
  throw new Error(
    "Root element not found. Did you forget to add it to your index.html? Or maybe the id attribute got misspelled?"
  );
}

function LoadingIndicator() {
  return (
    <div class="flex justify-center items-center h-screen dark:bg-[#111]">
      <div class="animate-spin text-gray-800 dark:text-zinc-300">
        <VsLoading size={30} />
      </div>
    </div>
  );
}

render(
  () => (
    <ThemeProvider>
      <Suspense fallback={<LoadingIndicator />}>
        <Router root={App}>
          <Route path="/" component={Home} />
          <Route path="/about-me" component={About} />
        </Router>
      </Suspense>
    </ThemeProvider>
  ),
  root!
);
