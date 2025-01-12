import { FiExternalLink, FiGithub } from "solid-icons/fi";
import {
  Component,
  For,
  Match,
  Suspense,
  Switch,
  createResource,
  createSignal,
  createEffect,
  Show,
} from "solid-js";
import { Project2, Resume } from "../shared";
import { A } from "@solidjs/router";

// Intersection Observer hook for animations
const useIntersectionObserver = (options = {}) => {
  const [isVisible, setIsVisible] = createSignal(false);
  const [element, setElement] = createSignal<HTMLElement>();

  createEffect(() => {
    const currentElement = element();
    if (!currentElement) return;

    const observer = new IntersectionObserver(([entry]) => {
      setIsVisible(entry.isIntersecting);
    }, options);

    observer.observe(currentElement);

    return () => observer.disconnect();
  });

  return [setElement, isVisible] as const;
};

async function fetchProjects() {
  const res = await fetch(new URL("/cv.json", import.meta.url));
  // const res = await fetch("https://port-api.onrender.com/api/projects");
  const data = await res.json();
  return data as Resume;
}

const MyProjectsSection: Component = function () {
  const [projects, { refetch }] = createResource(fetchProjects);
  const [setRef, isVisible] = useIntersectionObserver({
    threshold: 0.05,
    rootMargin: "100px",
  });

  return (
    <section
      ref={setRef}
      class={`pb-40 transform transition-all duration-1000 ${
        isVisible() ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
    >
      <div>
        <Suspense
          fallback={
            <div class="flex flex-col gap-6">
              <h2 class="text-2xl font-bold text-gray-700 dark:text-zinc-300">
                My Projects
              </h2>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <For each={[1, 2, 3, 4]}>
                  {() => <SingleProjectCardSkeleton />}
                </For>
              </div>
            </div>
          }
        >
          <Switch>
            <Match when={projects.error}>
              <div class="flex flex-col items-center justify-center py-20">
                <p class="text-lg text-gray-600 dark:text-gray-400">
                  Failed to load projects. Please try again later.
                </p>
                <button
                  class="mt-4 px-6 py-2 bg-gray-200 dark:bg-zinc-800 rounded-lg hover:bg-gray-300 dark:hover:bg-zinc-700 transition-colors"
                  onClick={() => refetch()}
                >
                  Retry
                </button>
              </div>
            </Match>
            <Match when={projects()}>
              <Projects name="My Projects" projects={projects()!.projects} />
            </Match>
          </Switch>
        </Suspense>
      </div>
    </section>
  );
};

const Projects: Component<{ name: string; projects: Project2[] }> = function (
  props
) {
  return (
    <div class="flex flex-col gap-6">
      <h2 class="text-2xl font-bold text-gray-700 dark:text-zinc-300">
        {props.name}
      </h2>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <For each={props.projects}>
          {(project, index) => (
            <SingleProjectCard project={project} delay={index() * 200} />
          )}
        </For>
      </div>
    </div>
  );
};

const SingleProjectCard: Component<{ project: Project2; delay: number }> =
  function (props) {
    const [isHovered, setIsHovered] = createSignal(false);
    const [setRef, isVisible] = useIntersectionObserver({
      threshold: 0.05,
      rootMargin: "100px",
    });

    return (
      <div
        ref={setRef}
        class={`isolate group relative border border-gray-200 dark:border-zinc-800 rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-500 flex flex-col justify-between ${
          isVisible() ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
        style={{ "animation-delay": `${props.delay}ms` }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div
          class="absolute inset-0 bg-gray-100 dark:bg-zinc-800/50 transform transition-transform duration-300 -z-10"
          classList={{
            "scale-0": !isHovered(),
            "scale-100": isHovered(),
          }}
        />

        <div class="">
          <Show when={props.project.repo}>
            <div class="absolute top-0 right-0 px-3 py-1 bg-gray-100 dark:bg-zinc-800 rounded-bl-xl z-10">
              <A
                class="text-sm font-medium text-gray-600 dark:text-zinc-400"
                href={`${props.project.repo}`}
              >
                Github
              </A>
            </div>
          </Show>

          <div class="flex flex-col p-4">
            <a
              href={props.project.live_url!}
              title={`Visit ${props.project.name}`}
              class="flex items-center gap-2 group mb-3 z-10"
              target="_blank"
              rel="noopener noreferrer"
            >
              <h3 class="text-xl font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-accent-1 transition-colors">
                {props.project.name}
              </h3>
              <FiExternalLink class="w-5 h-5 transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </a>

            <p class="text-gray-600 dark:text-zinc-400 mb-4 line-clamp-3">
              {props.project.description}
            </p>

            <div class="flex flex-wrap gap-2 mb-4">
              <For each={props.project.technologies}>
                {(tech) => (
                  <span class="px-3 py-1 text-sm font-medium text-gray-600 dark:text-zinc-400 bg-gray-100 dark:bg-zinc-800 rounded-full">
                    {tech}
                  </span>
                )}
              </For>
            </div>
          </div>
        </div>

        <figure class="relative aspect-video rounded-lg overflow-hidden m-2">
          <div
            class={`absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10`}
          >
            <a
              href={props.project.live_url || props.project.repo}
              class="transform -translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300 bg-white dark:bg-zinc-800 text-gray-900 dark:text-white px-4 py-2 rounded-lg flex items-center gap-2"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span>View Project</span>
              <FiExternalLink />
            </a>
          </div>
          <img
            class="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-500"
            src={props.project.img_url}
            alt={props.project.name}
            loading="lazy"
          />
        </figure>
      </div>
    );
  };

const SingleProjectCardSkeleton: Component = function () {
  return (
    <div class="relative bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-xl overflow-hidden">
      <div class="absolute top-0 right-0 w-20 h-6 bg-gray-200 dark:bg-zinc-800 rounded-bl-xl" />

      <div class="flex flex-col p-4 gap-4">
        <div class="w-2/3 h-6 bg-gray-200 dark:bg-zinc-800 rounded animate-pulse" />

        <div class="space-y-2">
          <div class="w-full h-4 bg-gray-200 dark:bg-zinc-800 rounded animate-pulse" />
          <div class="w-4/5 h-4 bg-gray-200 dark:bg-zinc-800 rounded animate-pulse" />
          <div class="w-3/4 h-4 bg-gray-200 dark:bg-zinc-800 rounded animate-pulse" />
        </div>

        <div class="flex gap-2">
          <div class="w-20 h-6 bg-gray-200 dark:bg-zinc-800 rounded-full animate-pulse" />
          <div class="w-20 h-6 bg-gray-200 dark:bg-zinc-800 rounded-full animate-pulse" />
        </div>

        <div class="aspect-video bg-gray-200 dark:bg-zinc-800 rounded-lg animate-pulse" />
      </div>
    </div>
  );
};

export { MyProjectsSection };
