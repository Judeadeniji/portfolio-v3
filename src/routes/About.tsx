import { Component, For, Show, createSignal, onMount } from "solid-js";
import { Experiences, myStacksData } from "../shared";
import { Dynamic } from "solid-js/web";
import { A } from "@solidjs/router";

// artificial delay to simulate loading
await new Promise((resolve) => setTimeout(resolve, 3000));

// Enhanced intersection observer with scroll progress
const useIntersectionObserver = (options = {}) => {
  const [isVisible, setIsVisible] = createSignal(false);
  const [scrollProgress, setScrollProgress] = createSignal(0);
  const [element, setElement] = createSignal<HTMLElement>();

  onMount(() => {
    if (!element()) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
        if (entry.isIntersecting) {
          const ratio = Math.min(Math.max(entry.intersectionRatio, 0), 1);
          setScrollProgress(ratio);
        }
      },
      { threshold: [0, 0.2, 0.4, 0.6, 0.8, 1], ...options }
    );

    observer.observe(element()!);
    return () => observer.disconnect();
  });

  return [setElement, isVisible, scrollProgress] as const;
};

const AboutMe: Component = function () {
  return (
    <div class="max-w-screen-lg md:mx-auto px-4">
      <section
        id="hero"
        class="w-full min-h-screen flex items-center justify-center"
      >
        <HeroSection />
      </section>

      <section id="about" class="w-full min-h-screen flex items-center py-20">
        <AboutMeDetails />
      </section>

      <section id="experience" class="w-full min-h-screen flex items-center">
        <ExperienceAndEducation />
      </section>

      <section id="contact" class="w-full min-h-screen flex items-center py-20">
        <ContactForm />
      </section>
    </div>
  );
};

const HeroSection: Component = function () {
  const [setRef, isVisible, scrollProgress] = useIntersectionObserver();

  return (
    <div
      ref={setRef}
      class={`relative [height:calc(100vh-100px)] flex flex-col items-center gap-8 px-4 md:px-6 transform transition-all duration-1000 ${
        isVisible() ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
      style={{
        transform: `scale(${0.8 + scrollProgress() * 0.2})`,
      }}
    >
      <div class="relative group cursor-pointer">
        <div class="relative w-32 h-32 md:w-40 md:h-40 rounded-full transform transition-all duration-500 group-hover:scale-110 overflow-hidden">
          <img
            src="https://s1.zerochan.net/Sung.Jin-woo.600.3537814.jpg"
            class="size-full object-cover object-center transform transition-transform duration-500 hover:scale-110"
            alt="The Creator"
          />
        </div>
      </div>

      <div class="space-y-4 text-center max-w-2xl">
        <h1 class="text-4xl md:text-6xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 dark:from-gray-500 dark:via-white dark:to-gray-400 transform transition-all duration-500 hover:scale-105 animate-fadeIn">
          Adeniji Oluwaferanmi
        </h1>

        <p class="text-xl md:text-2xl text-gray-600 dark:text-gray-400 font-light">
          <span class="typing-animation">
            Crafting Digital Experiences Through Code
          </span>
        </p>
      </div>

      <div class="absolute bottom-2 animate-bounce">
        <div class="w-8 h-12 rounded-full border-2 border-gray-400 dark:border-gray-600 flex items-start justify-center p-2">
          <div class="w-1 h-3 bg-gray-400 dark:bg-gray-600 rounded-full animate-scroll" />
        </div>
      </div>
    </div>
  );
};

const AboutMeDetails: Component = function () {
  const [setRef, isVisible] = useIntersectionObserver();

  return (
    <div
      ref={setRef}
      class={`grid items-start gap-16 px-4 transform transition-all duration-1000 ${
        isVisible() ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
    >
      <div class="space-y-6">
        <h2 class="text-3xl md:text-5xl font-bold tracking-tight">About Me</h2>
        <p class="text-lg md:text-xl text-gray-600 dark:text-gray-400 leading-relaxed max-w-3xl">
          I'm a passionate web developer with a love for creating beautiful and
          functional websites. I've always been fascinated by the intersection
          of design and technology, and I bring that passion to my work every
          day.
        </p>
      </div>

      <div class="space-y-8">
        <h2 class="text-3xl md:text-5xl font-bold tracking-tight">
          Technical Skills
        </h2>
        <div class="grid gap-8 md:grid-cols-2">
          <For each={myStacksData}>
            {(section) => (
              <div class="space-y-4 p-6 rounded-xl bg-white dark:bg-zinc-900/50 shadow-lg dark:shadow-zinc-900/20">
                <h3 class="text-2xl font-bold capitalize">
                  {section.sectionName}
                </h3>
                <ul class="flex flex-wrap gap-4">
                  <For each={section.stacks}>
                    {(stack) => (
                      <li class="group relative">
                        <div class="absolute inset-0 bg-gradient-to-br from-accent-1/10 via-blue-800/20 to-accent-1/20 rounded-lg blur opacity-0 group-hover:opacity-100 transition-opacity" />
                        <div class="relative p-3 rounded-lg bg-gray-100 dark:bg-zinc-800 transform transition-transform duration-300 group-hover:scale-110">
                          <img
                            class="w-8 h-8 object-contain"
                            src={`https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${stack}/${stack}-${"original.svg"}`}
                            alt={stack}
                          />
                        </div>
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
};

const ExperienceCard: Component<{
  experience: (typeof Experiences)[number];
}> = (props) => {
  const [isExpanded, setIsExpanded] = createSignal(false);

  return (
    <div class="group relative transform transition-all duration-300 opacity-0 translate-y-4 animate-fadeIn">
      <div
        class={`p-6 rounded-xl bg-white dark:bg-zinc-900/50 shadow-lg dark:shadow-zinc-900/20 
          hover:shadow-xl transition-all duration-300 cursor-pointer hover:rotate-2 hover:scale-105
          ${isExpanded() ? "md:col-span-2" : ""}`}
        onClick={() => setIsExpanded(!isExpanded())}
      >
        <div class="flex items-start justify-between">
          <div>
            <h3 class="text-2xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-400">
              {props.experience.title}
            </h3>
            <p class="text-lg text-gray-600 dark:text-gray-400 font-medium">
              {props.experience.company}
            </p>
            <p class="text-sm text-gray-500 dark:text-gray-500 mb-4 flex items-center gap-2">
              <span class="w-2 h-2 rounded-full bg-blue-500" />
              {props.experience.duration}
            </p>
          </div>

          <div
            class={`transform transition-transform duration-300 ${
              isExpanded() ? "rotate-180" : ""
            }`}
          >
            <svg
              class="w-6 h-6 text-gray-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
        </div>

        <p class="text-gray-600 dark:text-gray-400 leading-relaxed">
          {props.experience.description}
        </p>

        <Show when={props.experience.url}>
          <A
            href={props.experience.url!}
            class="text-blue-500 dark:text-blue-400 px-2 py-1 my-2 rounded-full bg-blue-100 dark:bg-blue-900/30 text-sm font-medium"
            target="_blank"
          >
            View Project
          </A>
        </Show>

        <Show when={isExpanded()}>
          <div
            class={`mt-4 space-y-4 overflow-hidden transition-[max-height,opacity] duration-300 ${
              isExpanded() ? "max-h-full opacity-100" : "max-h-0 opacity-0"
            }`}
          >
            <Show when={props.experience.achievements}>
              <div class="space-y-2">
                <h4 class="font-semibold text-lg">Key Achievements:</h4>
                <ul class="space-y-2">
                  <For each={props.experience.achievements}>
                    {(achievement) => (
                      <li class="flex items-start gap-2 text-gray-600 dark:text-gray-400">
                        <span class="text-blue-500">→</span>
                        {achievement}
                      </li>
                    )}
                  </For>
                </ul>
              </div>
            </Show>

            <Show when={props.experience.projects}>
              <div class="space-y-4">
                <h4 class="font-semibold text-lg">Projects:</h4>
                <div class="grid gap-4 md:grid-cols-2">
                  <For each={props.experience.projects}>
                    {(project) => (
                      <Dynamic
                        component={project.url ? A : "div"}
                        href={project.url}
                      >
                        <div class="p-4 rounded-lg bg-gray-50 dark:bg-zinc-800/50">
                          <h5 class="font-medium mb-2">{project.name}</h5>
                          <p class="text-sm text-gray-500 mb-2">
                            {project.type}
                          </p>
                          <div class="flex flex-wrap gap-2">
                            <For each={project.tech}>
                              {(tech) => (
                                <span class="px-2 py-1 text-xs rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400">
                                  {tech}
                                </span>
                              )}
                            </For>
                          </div>
                        </div>
                      </Dynamic>
                    )}
                  </For>
                </div>
              </div>
            </Show>
          </div>
        </Show>
      </div>
    </div>
  );
};

const ExperienceSection: Component = () => {
  return (
    <div class="space-y-8 px-4">
      <h2 class="text-3xl md:text-5xl font-bold tracking-tight transform transition-all duration-300 opacity-0 animate-fadeIn">
        Experience
      </h2>

      <div class="grid gap-6 md:grid-cols-2">
        <For each={Experiences}>
          {(experience) => <ExperienceCard experience={experience} />}
        </For>
      </div>
    </div>
  );
};

const ExperienceAndEducation: Component = function () {
  const [setRef, isVisible] = useIntersectionObserver();

  return (
    <div
      ref={setRef}
      class={`container grid items-start gap-16 px-4 transform transition-all duration-1000 ${
        isVisible() ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
    >
      <ExperienceSection />

      <div class="space-y-8">
        <h2 class="text-3xl md:text-5xl font-bold tracking-tight">Education</h2>
        <div class="p-6 rounded-xl bg-white dark:bg-zinc-900/50 shadow-lg dark:shadow-zinc-900/20 hover:shadow-xl transition-shadow">
          <h3 class="text-2xl font-bold mb-2">
            Bachelor of Science in Mathematics
          </h3>
          <p class="text-lg text-gray-600 dark:text-gray-400">
            University of Ibadan
          </p>
          <p class="text-sm text-gray-500 dark:text-gray-500">2023 - Present</p>
        </div>
      </div>
    </div>
  );
};

function fdToJSON(formData: FormData) {
  const data: Record<string, string> = {};
  formData.forEach((value, key) => {
    data[key] = value as string;
  });
  return data;
}

const ContactForm: Component = function () {
  const [setRef, isVisible] = useIntersectionObserver();
  const [isSending, setIsSending] = createSignal(false);

  const handleSubmit = async (e: Event) => {
    e.preventDefault();
    setIsSending(true);
    try {
      const url = "https://port-api.onrender.com/api/contact";
      const formData = new FormData(e.target as HTMLFormElement);
      const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify(fdToJSON(formData)),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        alert("Message sent successfully!");
        (e.target as HTMLFormElement).reset();
      } else {
        alert("Failed to send message. Please try again later.");
      }
    } catch (error) {
      alert("Failed to send message. Please try again later.");
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div
      ref={setRef}
      class={`container max-w-2xl mx-auto px-4 transform transition-all duration-1000 ${
        isVisible() ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
    >
      <div class="space-y-8">
        <h2 class="text-3xl md:text-5xl font-bold tracking-tight text-center">
          Get in Touch
        </h2>
        <form onSubmit={handleSubmit} class="space-y-6">
          <div class="space-y-4">
            <div class="relative">
              <input
                class="w-full px-4 py-3 bg-transparent border border-gray-300 dark:border-zinc-700 rounded-lg focus:outline-none focus:border-blue-500 dark:focus:border-blue-400 transition-colors"
                placeholder="Name"
                name="name"
                type="text"
                required
              />
              <div class="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-lg opacity-0 focus-within:opacity-100 transition-opacity -z-10" />
            </div>

            <div class="relative">
              <input
                class="w-full px-4 py-3 bg-transparent border border-gray-300 dark:border-zinc-700 rounded-lg focus:outline-none focus:border-blue-500 dark:focus:border-blue-400 transition-colors"
                placeholder="Email"
                name="email"
                type="email"
                required
              />
              <div class="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-lg opacity-0 focus-within:opacity-100 transition-opacity -z-10" />
            </div>

            <div class="relative">
              <input
                class="w-full px-4 py-3 bg-transparent border border-gray-300 dark:border-zinc-700 rounded-lg focus:outline-none focus:border-blue-500 dark:focus:border-blue-400 transition-colors"
                placeholder="Subject"
                name="subject"
                type="text"
                required
              />
              <div class="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-lg opacity-0 focus-within:opacity-100 transition-opacity -z-10" />
            </div>

            <div class="relative">
              <textarea
                class="w-full px-4 py-3 bg-transparent border border-gray-300 dark:border-zinc-700 rounded-lg focus:outline-none focus:border-blue-500 dark:focus:border-blue-400 transition-colors min-h-[200px] resize-y"
                placeholder="Message"
                name="message"
                required
              />
              <div class="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-lg opacity-0 focus-within:opacity-100 transition-opacity -z-10" />
            </div>
          </div>

          <button
            class="w-full px-6 py-3 bg-black dark:bg-white dark:text-black text-white font-medium rounded-lg transform transition-all duration-300 hover:scale-105 focus:scale-105 disabled:opacity-50"
            type="submit"
            disabled={isSending()}
          >
            {isSending() ? "Sending..." : "Send Message"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AboutMe;
