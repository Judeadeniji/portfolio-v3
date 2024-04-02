import { A } from "@solidjs/router";
import { CgMenuRightAlt } from "solid-icons/cg";
import { FaSolidMoon, FaSolidSun } from "solid-icons/fa";
import { VsChromeClose } from "solid-icons/vs";
import { Accessor, For, Match, Setter, Show, Switch, createComputed, createEffect, createSignal } from "solid-js";
import { isServer } from "solid-js/web";
import { useTheme } from "./ThemeProvider";

const navLinks = [
  {
    name: "Home",
    url: "/",
  },
  {
    name: "About",
    url: "/about-me",
  },
  {
    name: "Blog",
    url: "https://the-lazy-dev.vercel.app/",
  },
  {
    name: "GitHub",
    url: "https://github.com/Judeadeniji",
  },
];

function Header() {
  const [mobileMenu, setMobileMenu] = createSignal(false);
  const { theme, setTheme } = useTheme();
  const [isDarkMode, setIsDarkMode] = createSignal(false)
   createComputed(() => {
    setIsDarkMode(theme() === "dark");
   });

   function toggleDarkMode() {
    setTheme(theme() === "dark" ? "light" : "dark")
   }

  createEffect(() => {
    if (isServer) return;
    if (mobileMenu()) {
      document.querySelector("main")!.style.overflow = "hidden";
    } else {
      document.querySelector("main")!.style.overflow = "";
    }
  });
  return (
    <header class="cursor-default sticky top-0 left-0 right-0 dark:bg-[#00000092] backdrop-blur-md z-10 h-[40pt] w-full border-b dark:border-b-zinc-800">
      <div class="flex justify-between items-center  px-[16pt] w-full h-full">
        <A href="/" class="flex items-center gap-x-2">
          <h1 class="font-semibold text-2xl underline underline-offset-4 dark:decoration-[#fff70c7c] decoration-blue-600">Apex</h1>
        </A>

        <nav class="hidden md:flex">
          <ul class="flex flex-row items-center self-center h-[max-content] gap-x-8">
            <For each={navLinks}>
              {(link) => (
                <li class="dark:hover:text-white text-center">
                  <A preload={false} href={link.url}>
                    {link.name}
                  </A>
                </li>
              )}
            </For>
          </ul>
        </nav>

        <button
          class="h-[24pt] w-[24pt] grid place-content-center rounded-md md:hidden"
          onclick={() => {
            setMobileMenu(!mobileMenu());
          }}
        >
          <span>
            <Show
              when={!mobileMenu()}
              fallback={
                <VsChromeClose
                  size={24}
                  class="text-gray-700 dark:text-[#ddd]"
                />
              }
            >
              <CgMenuRightAlt
                size={24}
                class="text-gray-700 dark:text-[#ddd]"
              />
            </Show>
          </span>
        </button>

        <button class="h-[24pt] w-[24pt] hidden place-content-center rounded-md md:grid" onclick={() => toggleDarkMode()}>
          <span>
            <Switch>
              <Match when={isDarkMode()}>
                <FaSolidSun size={24} class="text-gray-700 dark:text-[#ddd]" />
              </Match>
              <Match when={!isDarkMode()}>
                <FaSolidMoon size={24} class="text-gray-700 dark:text-[#ddd]" />
              </Match>
            </Switch>
          </span>
        </button>
      </div>

      <Show when={mobileMenu()}>
        <MobileNav setMobileMenu={setMobileMenu} isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
      </Show>
    </header>
  );
}

function MobileNav(props: { setMobileMenu: Setter<boolean>, isDarkMode: Accessor<boolean>, toggleDarkMode: () => void }) {

  return (
    <nav class="md:hidden w-full bg-white dark:bg-[#000] h-screen">
      <div class="w-[90%] md:w-[60%] mx-auto">
        <ul class="w-full divide-y dark:divide-zinc-800">
          <For each={navLinks}>
            {(link) => (
              <li class="dark:hover:text-white py-2 flex items-center">
                <A onClick={() => {
                  props.setMobileMenu(false)
                }} preload={false} href={link.url}>
                  {link.name}
                </A>
              </li>
            )}
          </For>

          <div class="bg-[#00000011] dark:bg-[#111] dark:text-zinc-500 rounded-md px-5 py-3 flex justify-between items-center border-none mt-6">
            <p class="text-[11pt] md:text-[10pt]">Appearance</p>

            <button class="p-[3pt]" onclick={() => props.toggleDarkMode()}>
            <Switch>
              <Match when={props.isDarkMode()}>
              <FaSolidSun size={16} class="text-gray-700 dark:text-white" />

              </Match>
              <Match when={!props.isDarkMode()}>
                <FaSolidMoon size={16} class="text-gray-700 dark:text-[#ddd]" />
              </Match>
            </Switch>
            </button>
          </div>

          <div class=" border-none mt-3 dark:text-zinc-600 text-gray-600 text-sm text-center">
            <p>Adeniji Oluwaferanmi - {new Date().getFullYear()}</p>
          </div>
        </ul>
      </div>
    </nav>
  );
}

export { Header };
