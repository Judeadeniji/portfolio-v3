import { For, JSXElement, type Component } from "solid-js";
import { Header } from "./components/Header";
import { A } from "@solidjs/router";
import { navLinks } from "./shared";
import { CustomCursor } from "./components/cursor";

interface P {
  children?: JSXElement;
}

const App: Component<P> = (props) => {
  return (
    <main class="h-screen w-screen font-sf dark:font-medium tracking-normal bg-gray-50 dark:bg-black dark:text-[#ccc] text-gray-700 text-[11pt] margin-x-auto overflow-y-scroll no-scrollbar transition-colors duration-300">
      <CustomCursor />
      <section class="relative max-w-screen-xl md:mx-auto md:border-x border-zinc-200 dark:border-zinc-800 dark:bg-black">
        <Header />
        {props.children}
        <footer class="container mx-auto py-2 px-4 md:px-8 border-t border-zinc-200 dark:border-zinc-800 flex flex-col md:flex-row items-center justify-between select-none">
          <p class="text-gray-600 dark:text-gray-400 text-[10pt] md:text-[12pt] font-light text-center md:text-left">
            &copy; {new Date().getFullYear()} <span class="font-semibold font-mono">TheLazyDev</span>. All rights reserved.
          </p>
          <nav class="mt-2 md:mt-0">
            <ul class="flex flex-row items-center self-center gap-x-3 md:gap-x-8">
              <For each={navLinks}>
          {(link) => (
            <li class="dark:hover:text-accent-1 dark:text-gray-400 text-center">
              <A preload={false} href={link.url}>
                {link.name}
              </A>
            </li>
          )}
              </For>
            </ul>
          </nav>
        </footer>
      </section>

    </main>
  );
};

export default App;
