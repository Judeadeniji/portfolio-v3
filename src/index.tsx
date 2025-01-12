/* @refresh reload */
import { Route, Router } from "@solidjs/router";
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

const LoadingExperience = () => {
  return (
    <div class="h-screen w-screen flex flex-col items-center justify-center bg-white dark:bg-black">
      {/* Outer ring */}
      <div class="relative">
        <div class="w-24 h-24 rounded-full border-4 border-zinc-200 dark:border-zinc-700 opacity-25"></div>

        {/* Spinning arc */}
        <div class="absolute top-0 left-0 w-24 h-24">
          <div class="w-24 h-24 rounded-full border-4 border-transparent border-t-accent-1 dark:border-t-accent-1 animate-spin"></div>
        </div>

        {/* Pulsing center dot */}
        <div class="absolute top-1/2 left-1/2 -translate-x-2 -translate-y-2">
          <div class="w-4 h-4 bg-accent-1 dark:bg-accent-1 rounded-full animate-pulse"></div>
        </div>
      </div>

      {/* Loading text */}
      <div class="mt-8 space-y-2 text-center">
        <p class="text-zinc-600 dark:text-zinc-300 text-lg font-medium animate-pulse">
          Loading...
        </p>
        <p class="text-zinc-400 dark:text-zinc-500 text-sm">
          Please wait while we prepare your experience
        </p>
      </div>
    </div>
  );
};

render(
  () => (
    <ThemeProvider>
      <Suspense fallback={<LoadingExperience />}>
        <Router root={App}>
          <Route path="/" component={Home} />
          <Route path="/about-me" component={About} />
        </Router>
      </Suspense>
    </ThemeProvider>
  ),
  root!
);
