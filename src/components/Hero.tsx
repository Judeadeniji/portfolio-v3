import { BsCalendar4Event } from "solid-icons/bs";
import { FaBrandsTwitter } from "solid-icons/fa";
import { VsGlobe } from "solid-icons/vs";
import { Component, For, JSXElement } from "solid-js";
import { socials } from "../shared";

const Herosection: Component = function () {
  return (
    <section class="flex flex-col gap-y-4 items-center justify-center w-full py-[16pt]">
      <figure class="h-[50pt] w-auto aspect-square overflow-clip rounded-md">
        <img src="https://s1.zerochan.net/Sung.Jin-woo.600.3537814.jpg" class="size-full object-cover object-center" alt="The Creator" />
      </figure>

      <div>
        <h1 class="font-bold self-stretch text-xl text-center leading-loose dark:text-[#fefefe]">
          Adeniji Oluwaferanmi
        </h1>

        <div class="flex mx-auto min-w-0 max-w-[max-content] items-center text-[10pt] gap-x-2">
          <p> Web Developer </p>
          <p>-</p>
          <p>
            Nigeria{" "}
            <span role="img" aria-label="Nigerian Flag">
              🇳🇬
            </span>
          </p>
        </div>
      </div>

      <p class="text-center leading-tight">
        I'm a Fullstack Engineer — a builder focused on creating user-friendly
        products and experiences for the web.
      </p>

      <div class="flex flex-row items-center gap-x-3">
        <div class="flex items-center gap-x-2 py-1 px-2 rounded hover:bg-gray-200 dark:hover:bg-zinc-700 hover:bg-opacity-40">
          <span>
            <VsGlobe size={18} image-rendering="optimizeQuality" />
          </span>

          <a href="https://the-lazy-dev.vercel.app/" target="_blank"  class="text-gray-700 dark:text-white font-bold text-[11pt]">
            Blog
          </a>
        </div>
        <p>-</p>
        <div class="flex items-center gap-x-2 py-1 px-2 rounded hover:bg-gray-200 dark:hover:bg-zinc-700 hover:bg-opacity-40">
          <span>
            <BsCalendar4Event size={18} image-rendering="optimizeQuality" />
          </span>

          <a href="mailto:adeniiferanmi64@gmail.com" class="text-gray-700 dark:text-white font-bold text-[11pt]">
            Book a meeting
          </a>
        </div>
      </div>

      <CTA />

      <SocialIcons />
    </section>
  );
};

const CTA: Component = function () {
  return (
    <div class="w-full flex justify-center items-center">
      <a role="button" aria-describedby="Connect with me on X(fka Twitter)" href="https://x.com/feranmiwebdev" tabIndex={-1} class="inline-block text-center dark:bg-white bg-black text-white hover:bg-blend-darken hover:bg-opacity-80 duration-300 dark:text-black py-[8pt] px-4 md:py-[6pt] md:w-[65%] w-full font-semibold rounded-xl">
        <p class="items-center md:text-[13pt] gap-x-3 mx-auto inline-flex">
          <span>Get in touch</span>

          <span>
            <FaBrandsTwitter />
          </span>
        </p>
      </a>
    </div>
  );
};

const SocialIcons: Component = function () {
  return (
    <div class="flex flex-row gap-x-3 mt-[8pt]">
      <For each={socials}>
        {(social) => (
          <SocialIcon href={social.url}>
            <social.Icon />
          </SocialIcon>
        )}
      </For>
    </div>
  );
}

const SocialIcon: Component<{ href: string; children: JSXElement }> = function (props) {
  return (
    <a href={props.href} class="dark:bg-[#222] dark:hover:bg-zinc-800 dark:text-white text-gray-700 grid place-content-center p-3 h-[30pt] aspect-square rounded-lg text-2xl duration-200">
      {props.children}
    </a>
  )
}

export { Herosection };
