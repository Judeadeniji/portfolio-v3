import { JSXElement, type Component } from "solid-js";
import { Header } from "./components/Header";

interface P {
  children?: JSXElement
}

const App: Component<P> = (props) => {

  
  return (
    <main class="h-screen w-screen font-sf relative dark:font-medium tracking-normal bg-gray-50 dark:bg-[#111] dark:text-[#ccc] text-gray-700 text-[11pt] margin-x-auto overflow-y-scroll no-scrollbar transition-colors duration-300">
      <Header />
      <section class="max-w-[32rem] mx-auto px-[8pt]">
        {props.children}
      </section>

      <footer class="py-3">
        <p class="text-center text-gray-400 dark:text-zinc-700 text-[14pt] font-medium font-sans">TheLazyDev - {new Date().getFullYear()}</p>
      </footer>
    </main>
  );
};

export default App;
