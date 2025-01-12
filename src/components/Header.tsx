import { A } from "@solidjs/router";
import { CgMenuRightAlt } from "solid-icons/cg";
import { VsChromeClose } from "solid-icons/vs";
import {
  Accessor,
  For,
  Match,
  Setter,
  Show,
  Switch,
  createEffect,
  createSignal,
  onMount,
} from "solid-js";
import { isServer } from "solid-js/web";
import { useTheme } from "./ThemeProvider";
import { BsMoonStarsFill, BsSun } from "solid-icons/bs";
import { navLinks } from "../shared";

function Header() {
  const { theme, setTheme } = useTheme();
  const [mobileMenu, setMobileMenu] = createSignal(false);
  const [isDarkMode, setIsDarkMode] = createSignal(false);
  const [animatingThemeIcon, setAnimatingThemeIcon] = createSignal(false);
  const [animatingMenuIcon, setAnimatingMenuIcon] = createSignal(false);

  function toggleDarkMode() {
    setAnimatingThemeIcon(true);
    setTimeout(() => {
      setTheme(theme() === "dark" ? "light" : "dark");
      setIsDarkMode(theme() === "dark");
      setAnimatingThemeIcon(false);
    }, 300); // Matches the CSS animation duration
  }

  createEffect(() => {
    if (isServer) return;
    try {
      if (mobileMenu()) {
        document.querySelector("main")!.style.overflow = "hidden";
      } else {
        document.querySelector("main")!.style.overflow = "";
      }
    } catch (error) {}
  });
  return (
    <>
      <header class="cursor-default sticky top-3 left-5 right-5 dark:bg-black/85 backdrop-blur-xl z-10 h-[40pt] w-[95dvw] md:w-full border dark:border-zinc-800 rounded-full max-w-screen-sm mx-auto">
        <div class="flex justify-between items-center px-[16pt] w-full h-full">
          <A href="/" class="flex items-center gap-x-2">
            <h1 class="font-semibold text-2xl underline underline-offset-4 dark:decoration-accent-1 decoration-blue-600">
              Apex
            </h1>
          </A>

          <nav class="hidden md:flex">
            <ul class="flex flex-row items-center self-center h-[max-content] gap-x-8">
              <For each={navLinks}>
                {(link) => (
                  <li class="dark:hover:text-accent-1 text-center">
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
              setAnimatingMenuIcon(true);
              setTimeout(() => {
                setMobileMenu(!mobileMenu());
                setAnimatingMenuIcon(false);
              }, 300);
            }}
          >
            <span>
              <Show
                when={!mobileMenu()}
                fallback={
                  <VsChromeClose
                    size={24}
                    class="text-gray-700 dark:text-[#ddd] icon-wrapper"
                    classList={{
                      "fade-out": animatingMenuIcon(),
                      "fade-in": !animatingMenuIcon(),
                    }}
                  />
                }
              >
                <CgMenuRightAlt
                  size={24}
                  class="text-gray-700 dark:text-[#ddd] icon-wrapper"
                  classList={{
                    "fade-out": animatingMenuIcon(),
                    "fade-in": !animatingMenuIcon(),
                  }}
                />
              </Show>
            </span>
          </button>

          <button
            class="h-[24pt] w-[24pt] hidden place-content-center rounded-md md:grid"
            onclick={() => toggleDarkMode()}
          >
            <span class="relative">
              <Switch>
                <Match when={isDarkMode()}>
                  <BsSun
                    size={24}
                    class="icon-wrapper"
                    classList={{
                      "fade-out": animatingThemeIcon(),
                      "fade-in": !animatingThemeIcon(),
                    }}
                  />
                </Match>
                <Match when={!isDarkMode()}>
                  <BsMoonStarsFill
                    size={24}
                    class="icon-wrapper"
                    classList={{
                      "fade-out": animatingThemeIcon(),
                      "fade-in": !animatingThemeIcon(),
                    }}
                  />
                </Match>
              </Switch>
            </span>
          </button>
        </div>
      </header>
      <Show when={mobileMenu()}>
        <MobileNav
          setAnimatingMenuIcon={setAnimatingMenuIcon}
          animatingTheme={() => animatingThemeIcon()}
          setMobileMenu={setMobileMenu}
          isDarkMode={isDarkMode}
          toggleDarkMode={toggleDarkMode}
        />
      </Show>
    </>
  );
}

function MobileNav(props: {
  setMobileMenu: Setter<boolean>;
  isDarkMode: Accessor<boolean>;
  toggleDarkMode: () => void;
  animatingTheme: Accessor<boolean>;
  setAnimatingMenuIcon: Setter<boolean>;
}) {
  const [animationState, setAnimationState] = createSignal<
    "open" | "close" | "idle"
  >("idle");
  onMount(() => {
    setAnimationState("open");
  });
  return (
    <nav
      class="md:hidden w-full fixed inset-0 z-10 px-4 flex items-center justify-center backdrop-blur-sm bg-black/85 transition-all duration-300 h-screen"
      classList={{
        "opacity-0 blur": animationState() === "close",
        "opacity-100 blur-0": animationState() === "open",
      }}
      on:click={(e) => {
        if (e.target === e.currentTarget) {
          setAnimationState("close");
          props.setAnimatingMenuIcon(true);
          setTimeout(() => {
            props.setMobileMenu(false);
            props.setAnimatingMenuIcon(false);
            setAnimationState("idle");
          }, 300);
        }
      }}
    >
      <div
        class="w-full md:w-[60%] mx-auto border dark:border-zinc-900 border-zinc-200 bg-zinc-100 dark:bg-zinc-900 px-4 py-3 rounded-2xl backdrop-blur-sm top-20 transition-transform duration-300"
        classList={{
          "scale-100": animationState() === "open",
          "scale-95": animationState() === "close",
        }}
      >
        <ul class="w-full divide-y dark:divide-zinc-800">
          <For each={navLinks}>
            {(link) => (
              <li class="dark:hover:text-accent-1 py-2 flex items-center">
                <A
                  on:click={() => {
                    props.setMobileMenu(false);
                  }}
                  preload={false}
                  href={link.url}
                >
                  {link.name}
                </A>
              </li>
            )}
          </For>

          <div class="bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-500 rounded-xl px-5 py-2 flex justify-between items-center border-none mt-6">
            <p class="text-[11pt] md:text-[10pt]">Appearance</p>

            <button class="p-[3pt]" onclick={() => props.toggleDarkMode()}>
              <Switch>
                <Match when={props.isDarkMode()}>
                  <BsSun
                    size={16}
                    class="text-gray-700 dark:text-white icon-wrapper"
                    classList={{
                      "fade-out": props.animatingTheme(),
                      "fade-in": !props.animatingTheme(),
                    }}
                  />
                </Match>
                <Match when={!props.isDarkMode()}>
                  <BsMoonStarsFill
                    size={16}
                    class="text-gray-700 dark:text-[#ddd] icon-wrapper"
                    classList={{
                      "fade-out": props.animatingTheme(),
                      "fade-in": !props.animatingTheme(),
                    }}
                  />
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
