import { CgProfile } from "solid-icons/cg";
import { Component, For } from "solid-js";
import { myStacksData } from "../shared";

const AboutMe: Component = function () {
  return (
    <>
      <section class="w-full py-6 md:py-24 lg:py-32">
        <HeroSection />
      </section>

      <section class="w-full py-6 md:py-24 lg:py-32">
        <AboutMeDetails />
      </section>

      <section class="w-full py-6 md:py-24 lg:py-32 ">
        <ExperienceAndEducation />
      </section>

      <section class="w-full py-6 md:py-24 lg:py-32 ">
        <ContactForm />
      </section>
    </>
  );
};

function ContactForm() {
  return (
    <div class="container grid items-start gap-14 px-4">
      <div class="space-y-4">
        <h2 class="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl xl:text-[3.4rem] 2xl:text-[3.75rem]">
          Contact
        </h2>
        <form class="flex flex-col gap-2 max-[400px]:mx-auto">
          <input
            class="flex h-10 w-full rounded-md border dark:border-zinc-800 border-input dark:bg-[#333] bg-gray-100 px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            placeholder="Email"
            type="email"
          />
          <input
            class="flex h-10 w-full rounded-md border dark:border-zinc-800 border-input dark:bg-[#333] bg-gray-100 px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            placeholder="Subject"
            type="text"
          />
          <textarea
            class="flex w-full rounded-md border dark:border-zinc-800 border-input dark:bg-[#333] bg-gray-100 px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 min-h-[200px]"
            placeholder="Message"
          ></textarea>
          <button
            class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-white dark:text-black dark:hover:bg-white/90 h-10 px-4 py-2"
            type="submit"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
}

const mockExperiences = [
  {
    title: "Freelancing",
    company: "Personal",
    duration: "2022 - Present",
  }
];

function ExperienceAndEducation() {
  return (
    <div class="container grid items-start gap-14 px-4">
      <div class="space-y-4">
        <h2 class="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl xl:text-[3.4rem] 2xl:text-[3.75rem]">
          Experience
        </h2>
        <ul class="grid gap-4 list-none custom-disc-outside md:grid-cols-2">
          <For each={mockExperiences}>
            {(experience) => (
              <li>
                <h3 class="text-xl font-bold">{experience.title}</h3>
                <p>{experience.company}</p>
                <p>{experience.duration}</p>
              </li>
            )}
          </For>
        </ul>
      </div>
      <div class="space-y-4">
        <h2 class="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl xl:text-[3.4rem] 2xl:text-[3.75rem]">
          Education
        </h2>
        <ul class="grid gap-4 list-none custom-disc-outside">
          <li>
            <h3 class="text-xl font-bold">
              Bachelor of Science in Mathematics
            </h3>
            <p>University of Ibadan</p>
            <p>2023 - Present</p>
          </li>
        </ul>
      </div>
    </div>
  );
}

function AboutMeDetails() {
  return (
    <div class="container grid items-start gap-14 px-4">
      <div class="space-y-4">
        <h2 class="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl xl:text-[3.4rem] 2xl:text-[3.75rem]">
          About Me
        </h2>
        <p class="mx-auto max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
          I'm a passionate web developer with a love for creating beautiful and
          functional websites. I've always been fascinated by the intersection
          of design and technology, and I bring that passion to my work every
          day.
        </p>
      </div>
      <div class="space-y-4">
        <h2 class="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl xl:text-[3.4rem] 2xl:text-[3.75rem]">
          Skills
        </h2>
        <div class="grid gap-4 md:grid-cols-2">
          <For each={myStacksData}>
            {(section) => (
              <div class="space-y-2">
                <h3 class="text-xl font-bold capitalize">
                  {section.sectionName}
                </h3>
                <ul class="flex gap-3 flex-wrap list-none custom-disc-outside">
                  <For each={section.stacks}>
                    {(stack) => (
                      <li class=">dark:bg-[#333] >>bg-gray-200 rounded-[4pt] >py-1 >px-2 overflow-hidden cursor-pointer">
                        {/* <p class="text-[11pt] capitalize">{stack}</p> */}

            <img class="w-[20pt] h-[20pt] object-top object-cover" src={`https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${stack}/${stack}-original.svg`} />
          
                      </li>
                    )}
                  </For>
                </ul>
              </div>
            )}
          </For>
        </div>
      </div>
    </div>
  );
}
function HeroSection() {
  return (
    <div class="container flex flex-col items-center gap-4 px-4 md:px-6">
      <CgProfile
        width="150"
        height="150"
        class="rounded-full w-20 h-20 object-cover object-center"
        style={{ "aspect-ratio": 150 / 150, "object-fit": "cover" }}
      />
      <div class="space-y-2 text-center">
        <h1 class="text-3xl font-bold tracking-tighter sm:text-5xl">
          Adeniji Oluwaferanmi
        </h1>
        <p class="text-gray-500 dark:text-gray-400">Web Developer</p>
      </div>
    </div>
  );
}

export default AboutMe;
