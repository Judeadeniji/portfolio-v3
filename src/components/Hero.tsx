import { createSignal, onMount, Component, For, JSXElement } from "solid-js";
import { BsCalendar4Event } from "solid-icons/bs";
import { FaBrandsTwitter } from "solid-icons/fa";
import { VsGlobe } from "solid-icons/vs";
import { socials } from "../shared";
import { A } from "@solidjs/router";
import { CgFileDocument } from "solid-icons/cg";

// Custom hook for typing animation
const useTypewriter = (text: string, speed = 50) => {
  const [displayText, setDisplayText] = createSignal("");

  onMount(() => {
    let index = 0;
    let start: number | null = null;

    const step = (timestamp: number) => {
      if (!start) start = timestamp;
      const progress = timestamp - start;

      if (progress >= speed) {
        if (index < text.length) {
          setDisplayText((prev) => prev + text[index]);
          index++;
          start = timestamp;
        }
      }

      if (index < text.length) {
        requestAnimationFrame(step);
      }
    };

    requestAnimationFrame(step);
  });

  return displayText;
};

const Herosection: Component = function () {
  const [isHovered, setIsHovered] = createSignal(false);

  const typedBio = useTypewriter(
    "I'm a Fullstack Engineer — a builder focused on creating user-friendly products and experiences for the web."
  );

  return (
    <section class="relative py-20 flex flex-col gap-y-3 items-center justify-center w-full px-4 overflow-hidden">
      {/* Profile image with hover effect */}
      <figure
        class="relative w-32 h-32 rounded-full overflow-hidden transform transition-transform duration-500 hover:scale-110"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div
          class={`absolute inset-0 bg-gradient-to-r from-purple-500/20 to-blue-500/20 transition-opacity duration-300 ${
            isHovered() ? "opacity-100" : "opacity-0"
          }`}
        />
        <img
          src="https://s1.zerochan.net/Sung.Jin-woo.600.3537814.jpg"
          class="size-full object-cover object-center transform transition-transform duration-500 hover:scale-110"
          alt="The Creator"
        />
      </figure>

      {/* Name and role with animation */}
      <div class="text-center space-y-2">
        <h1 class="text-4xl md:text-6xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 dark:from-gray-500 dark:via-white dark:to-gray-400 transform transition-all duration-500 hover:scale-105 animate-fadeIn">
          Adeniji Oluwaferanmi
        </h1>

        {/* <div class="h-6 overflow-hidden">
          <div
            class="flex flex-col transition-transform duration-500"
            style={{ transform: `translateY(-${currentRole() * 28}px)` }}
          >
            {roles.map((role) => (
              <p class="text-lg text-gray-600 dark:text-gray-300">{role}</p>
            ))}
          </div>
        </div> */}

        <div class="flex mx-auto min-w-0 max-w-[max-content] items-center text-sm gap-x-2 text-gray-600 dark:text-gray-300">
          <p>Nigeria</p>
          <span role="img" class="animate-wave inline-block">🇳🇬</span>
        </div>
      </div>

      {/* Animated bio text */}
      <p class="text-center leading-relaxed max-w-2xl text-gray-700 dark:text-gray-200">
        {typedBio()}
      </p>

      {/* Interactive navigation links */}
      <div class="flex flex-wrap justify-center items-center gap-4">
        <NavLink href="https://the-lazy-dev.netlify.app/" icon={VsGlobe}>
          Blog
        </NavLink>
        <NavLink
          href="mailto:adeniiferanmi64@gmail.com"
          icon={BsCalendar4Event}
        >
          Book a meeting
        </NavLink>
      </div>

      <CTA />
      <SocialIcons />
    </section>
  );
};

const NavLink: Component<{ href: string; icon: any; children: JSXElement }> = (
  props
) => {
  const [isHovered, setIsHovered] = createSignal(false);

  return (
    <A
      href={props.href}
      target="_blank"
      class="group relative px-6 py-2 rounded-lg overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      aria-label={props.children as string}
      aria-haspopup="true"
    >
      <div
        class={`absolute inset-0 bg-gray-100 dark:bg-zinc-800 transform transition-transform duration-300 ${
          isHovered() ? "scale-100" : "scale-0"
        }`}
      />
      <div class="relative flex items-center gap-2 text-gray-700 dark:text-white font-medium">
        <props.icon size={18} />
        <span>{props.children}</span>
      </div>
    </A>
  );
};

const CTA: Component = function () {
  return (
    <div class="w-full max-w-md">
      <A
        download={"Adeniji Oluwaferanmi Resume.pdf"}
        href="/adeniji-oluwaferanmi-resume.pdf"
        class="group relative block overflow-hidden rounded-xl bg-black dark:bg-white text-white dark:text-black hover:bg-accent-1 hover:text-black py-3 px-8 text-center font-semibold transition-transform hover:scale-105"
      >
        <div class="flex items-center justify-center gap-3">
          <span>Get my Resume</span>
          <CgFileDocument class="transform transition-transform group-hover:rotate-12" />
        </div>
      </A>
    </div>
  );
};

const SocialIcons: Component = function () {
  return (
    <div class="flex flex-wrap justify-center gap-x-4">
      <For each={socials}>
        {(social) => (
          <SocialIcon href={social.url}>
            <social.Icon />
          </SocialIcon>
        )}
      </For>
    </div>
  );
};

const SocialIcon: Component<{ href: string; children: JSXElement }> = function (
  props
) {
  return (
    <a
      href={props.href}
      class="group relative p-3 rounded-lg overflow-hidden transition-transform hover:scale-110"
    >
      <div class="absolute inset-0 bg-gray-100 dark:bg-zinc-800 transform transition-transform origin-left group-hover:scale-x-100 scale-x-0" />
      <div class="relative text-2xl text-gray-700 dark:text-white transition-transform group-hover:rotate-12">
        {props.children}
      </div>
    </a>
  );
};

export { Herosection };
