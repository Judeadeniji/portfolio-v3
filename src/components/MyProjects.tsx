import { FiExternalLink, FiGithub, FiCode, FiStar, FiEye } from "solid-icons/fi";
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
  const [activeFilter, setActiveFilter] = createSignal("all");
  const [displayMode, setDisplayMode] = createSignal<"grid" | "carousel">("grid");

  return (
    <section
      ref={setRef}
      class={`pb-40 transform transition-all duration-1000 relative overflow-hidden ${
        isVisible() ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
    >
      {/* Animated background elements */}
      <div class="absolute inset-0 overflow-hidden pointer-events-none">
        <div class="absolute -top-40 -right-40 w-80 h-80 bg-gray-100/30 dark:bg-zinc-800/20 rounded-full blur-3xl animate-pulse" />
        <div class="absolute -bottom-40 -left-40 w-96 h-96 bg-gray-100/20 dark:bg-zinc-800/10 rounded-full blur-3xl animate-pulse" style="animation-delay: 2s" />
      </div>

      <div class="relative z-10">
        <Suspense
          fallback={
            <div class="flex flex-col gap-8">
              <div class="text-center">
                <div class="w-48 h-8 bg-gray-200 dark:bg-zinc-800 rounded-lg mx-auto animate-pulse" />
                <div class="w-64 h-4 bg-gray-200 dark:bg-zinc-800 rounded mx-auto mt-4 animate-pulse" />
              </div>
              <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <For each={[1, 2, 3, 4, 5, 6]}>
                  {() => <SingleProjectCardSkeleton />}
                </For>
              </div>
            </div>
          }
        >
          <Switch>
            <Match when={projects.error}>
              <div class="flex flex-col items-center justify-center py-32 relative">
                <div class="absolute inset-0 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-zinc-900 dark:to-zinc-800 rounded-3xl blur-3xl opacity-50" />
                <div class="relative z-10 text-center">
                  <div class="w-16 h-16 bg-gray-200 dark:bg-zinc-800 rounded-full flex items-center justify-center mx-auto mb-6">
                    <FiCode class="w-8 h-8 text-gray-600 dark:text-zinc-400" />
                  </div>
                  <p class="text-xl text-gray-600 dark:text-gray-400 mb-6">
                    Failed to load projects. Please try again later.
                  </p>
                  <button
                    class="px-8 py-3 bg-gray-200 dark:bg-zinc-800 rounded-full hover:bg-gray-300 dark:hover:bg-zinc-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
                    onClick={() => refetch()}
                  >
                    Retry Loading
                  </button>
                </div>
              </div>
            </Match>
            <Match when={projects()}>
              <Projects 
                name="My Projects" 
                projects={projects()!.projects} 
                displayMode={displayMode()}
                activeFilter={activeFilter()}
                setActiveFilter={setActiveFilter}
                setDisplayMode={setDisplayMode}
              />
            </Match>
          </Switch>
        </Suspense>
      </div>
    </section>
  );
};

const Projects: Component<{ 
  name: string; 
  projects: Project2[];
  displayMode: "grid" | "carousel";
  activeFilter: string;
  setActiveFilter: (filter: string) => void;
  setDisplayMode: (mode: "grid" | "carousel") => void;
}> = function (props) {
  const [hoveredCard, setHoveredCard] = createSignal<number | null>(null);
  
  // Get unique technologies for filtering
  const uniqueTechnologies = () => {
    const techs = new Set<string>();
    props.projects.forEach(project => {
      if (project.technologies) {
        project.technologies.forEach(tech => techs.add(tech));
      }
    });
    return Array.from(techs).slice(0, 6); // Limit to 6 for UI
  };

  const filteredProjects = () => {
    if (props.activeFilter === "all") return props.projects;
    return props.projects.filter(project => 
      project.technologies?.some(tech => 
        tech.toLowerCase().includes(props.activeFilter.toLowerCase())
      )
    );
  };

  return (
    <div class="flex flex-col gap-12">
      {/* Header with animated title */}
      <div class="text-center relative">
        <div class="absolute inset-0 bg-gradient-to-r from-transparent via-gray-100/50 dark:via-zinc-800/50 to-transparent h-px top-1/2 transform -translate-y-1/2" />
        <h2 class="text-4xl font-bold ">
          <span class="bg-gradient-to-r from-gray-600 via-gray-800 to-gray-600 dark:from-zinc-300 dark:via-zinc-100 dark:to-zinc-300 bg-clip-text text-transparent">
            {props.name}
          </span>
        </h2>
        <p class="text-gray-600 dark:text-zinc-400 mt-4 text-lg">
          Crafted with passion • Built with purpose
        </p>
      </div>

      {/* Control Panel */}
      <div class="flex flex-col sm:flex-row gap-6 items-center justify-between bg-gray-50/80 dark:bg-zinc-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50 dark:border-zinc-700/50">
        {/* Filter Tabs */}
        <div class="flex flex-wrap gap-2">
          <button
            class={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 transform hover:scale-105 ${
              props.activeFilter === "all"
                ? "bg-gray-200 dark:bg-zinc-700 text-gray-900 dark:text-white shadow-lg"
                : "bg-white dark:bg-zinc-800 text-gray-600 dark:text-zinc-400 hover:bg-gray-100 dark:hover:bg-zinc-700"
            }`}
            onClick={() => props.setActiveFilter("all")}
          >
            All Projects ({props.projects.length})
          </button>
          <For each={uniqueTechnologies()}>
            {(tech) => (
              <button
                class={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 transform hover:scale-105 ${
                  props.activeFilter === tech
                    ? "bg-gray-200 dark:bg-zinc-700 text-gray-900 dark:text-white shadow-lg"
                    : "bg-white dark:bg-zinc-800 text-gray-600 dark:text-zinc-400 hover:bg-gray-100 dark:hover:bg-zinc-700"
                }`}
                onClick={() => props.setActiveFilter(tech)}
              >
                {tech}
              </button>
            )}
          </For>
        </div>

        {/* View Mode Toggle */}
        <div class="flex items-center gap-2 bg-white dark:bg-zinc-800 rounded-full p-1 border border-gray-200 dark:border-zinc-700">
          <button
            class={`p-2 rounded-full transition-all duration-300 ${
              props.displayMode === "grid"
                ? "bg-gray-200 dark:bg-zinc-700 text-gray-900 dark:text-white"
                : "text-gray-600 dark:text-zinc-400 hover:bg-gray-100 dark:hover:bg-zinc-700"
            }`}
            onClick={() => props.setDisplayMode("grid")}
          >
            <div class="w-4 h-4 grid grid-cols-2 gap-0.5">
              <div class="bg-current rounded-sm" />
              <div class="bg-current rounded-sm" />
              <div class="bg-current rounded-sm" />
              <div class="bg-current rounded-sm" />
            </div>
          </button>
          <button
            class={`p-2 rounded-full transition-all duration-300 ${
              props.displayMode === "carousel"
                ? "bg-gray-200 dark:bg-zinc-700 text-gray-900 dark:text-white"
                : "text-gray-600 dark:text-zinc-400 hover:bg-gray-100 dark:hover:bg-zinc-700"
            }`}
            onClick={() => props.setDisplayMode("carousel")}
          >
            <div class="w-4 h-4 flex gap-0.5">
              <div class="bg-current rounded-sm flex-1" />
              <div class="bg-current rounded-sm flex-1" />
              <div class="bg-current rounded-sm flex-1" />
            </div>
          </button>
        </div>
      </div>

      {/* Projects Display */}
      <div 
        class={`transition-all duration-500 ${
          props.displayMode === "grid" 
            ? "grid grid-cols-1 md:grid-cols-2 gap-8" 
            : "flex overflow-x-auto gap-6 pb-4 snap-x snap-mandatory"
        }`}
        onMouseLeave={() => setHoveredCard(null)}
      >
        <For each={filteredProjects()}>
          {(project, index) => (
            <SingleProjectCard 
              project={project} 
              delay={index() * 100} 
              isCarousel={props.displayMode === "carousel"}
              index={index()}
              hoveredCard={hoveredCard()}
              setHoveredCard={setHoveredCard}
            />
          )}
        </For>
      </div>

      {/* Project Count */}
      <div class="text-center">
        <span class="text-gray-600 dark:text-zinc-400">
          Showing {filteredProjects().length} of {props.projects.length} projects
        </span>
      </div>
    </div>
  );
};

const SingleProjectCard: Component<{ 
  project: Project2; 
  delay: number;
  isCarousel: boolean;
  index: number;
  hoveredCard: number | null;
  setHoveredCard: (index: number | null) => void;
}> = function (props) {
  const [isHovered, setIsHovered] = createSignal(false);
  const [setRef, isVisible] = useIntersectionObserver({
    threshold: 0.05,
    rootMargin: "100px",
  });
  const [imageLoaded, setImageLoaded] = createSignal(false);

  const isOtherCardHovered = () => 
    props.hoveredCard !== null && props.hoveredCard !== props.index;

  return (
    <div
      ref={setRef}
      class={`group relative transition-all duration-700 transform-gpu ${
        props.isCarousel ? "flex-none w-80 snap-center" : ""
      } ${
        isVisible() ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-8 scale-95"
      } ${
        isOtherCardHovered() ? "opacity-50 scale-95" : "opacity-100 scale-100"
      }`}
      style={{ 
        "animation-delay": `${props.delay}ms`,
        "transform-style": "preserve-3d"
      }}
      onMouseEnter={() => {
        setIsHovered(true);
        props.setHoveredCard(props.index);
      }}
      onMouseLeave={() => {
        setIsHovered(false);
        props.setHoveredCard(null);
      }}
    >
      {/* Floating Card Container */}
      <div class={`relative bg-white h-full dark:bg-zinc-900 rounded-3xl overflow-hidden shadow-xl transition-all duration-500 transform-gpu ${
        isHovered() ? "shadow-2xl translate-y-[-8px] " : "shadow-lg"
      }`}>
        
        {/* Animated Border Gradient */}
        <div class={`absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-zinc-700 dark:via-zinc-600 dark:to-zinc-700 rounded-3xl transition-opacity duration-500 ${
          isHovered() ? "opacity-100" : "opacity-0"
        }`} style="padding: 2px;">
          <div class="bg-white dark:bg-zinc-900 rounded-3xl h-full w-full" />
        </div>

        {/* Content Container */}
        <div class="relative h-full z-10">
          {/* Image Section with Parallax Effect */}
          <div class="relative h-64 overflow-hidden">
            {/* Image Overlay */}
            <div class={`absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent z-10 transition-opacity duration-500 ${
              isHovered() ? "opacity-100" : "opacity-40"
            }`} />
            
            {/* Repository Badge */}
            <Show when={props.project.repo}>
              <div class={`absolute top-4 right-4 z-20 transition-all duration-500 transform ${
                isHovered() ? "translate-y-0 opacity-100" : "translate-y-[-10px] opacity-80"
              }`}>
                <A
                  class="bg-white/90 dark:bg-zinc-800/90 backdrop-blur-sm px-3 py-1.5 rounded-full text-sm font-medium text-gray-700 dark:text-zinc-300 hover:bg-white dark:hover:bg-zinc-800 transition-all duration-300 flex items-center gap-1.5"
                  href={`${props.project.repo}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FiGithub class="w-3.5 h-3.5" />
                  <span>Code</span>
                </A>
              </div>
            </Show>

            {/* Project Image */}
            <img
              class={`w-full h-full object-cover transition-all duration-700 transform-gpu ${
                isHovered() ? "scale-110 " : "scale-100"
              } ${imageLoaded() ? "opacity-100" : "opacity-0"}`}
              src={props.project.img_url}
              alt={props.project.name}
              loading="lazy"
              onLoad={() => setImageLoaded(true)}
            />

            {/* Image Loading Skeleton */}
            <div class={`absolute inset-0 bg-gray-200 dark:bg-zinc-800 animate-pulse ${
              imageLoaded() ? "opacity-0" : "opacity-100"
            } transition-opacity duration-300`} />

            {/* Floating Action Button */}
            <div class={`absolute bottom-4 right-4 z-20 transition-all duration-500 transform ${
              isHovered() ? "translate-y-0 opacity-100 scale-100" : "translate-y-4 opacity-0 scale-90"
            }`}>
              <a
                href={props.project.live_url || props.project.repo}
                class="bg-white dark:bg-zinc-800 text-gray-900 dark:text-white p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 flex items-center justify-center"
                target="_blank"
                rel="noopener noreferrer"
                title="View Project"
              >
                <FiExternalLink class="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Content Section */}
          <div class="p-6 space-y-4">
            {/* Project Title */}
            <div class="space-y-2">
              <h3 class={`text-xl font-bold text-gray-900 dark:text-white transition-all duration-300 ${
                isHovered() ? "translate-x-2" : ""
              }`}>
                {props.project.name}
              </h3>
              
              {/* Animated Underline */}
              <div class={`h-0.5 bg-gradient-to-r from-gray-300 to-gray-500 dark:from-zinc-600 dark:to-zinc-400 transition-all duration-500 ${
                isHovered() ? "w-full" : "w-8"
              }`} />
            </div>

            {/* Description */}
            <p class={`text-gray-600 dark:text-zinc-400 leading-relaxed transition-all duration-300 ${
              isHovered() ? "translate-y-0 opacity-100" : "translate-y-2 opacity-90"
            }`}>
              {props.project.description}
            </p>

            {/* Technologies */}
            <div class="space-y-3">
              <div class="flex items-center gap-2 text-sm text-gray-500 dark:text-zinc-500">
                <FiCode class="w-4 h-4" />
                <span>Built with</span>
              </div>
              
              <div class="flex flex-wrap gap-2">
                <For each={props.project.technologies || []}>
                  {(tech, techIndex) => (
                    <span 
                      class={`px-3 py-1.5 text-xs font-medium text-gray-600 dark:text-zinc-400 bg-gray-100 dark:bg-zinc-800 rounded-full border border-gray-200 dark:border-zinc-700 transition-all duration-300 transform hover:scale-105 ${
                        isHovered() ? "translate-y-0 opacity-100" : "translate-y-1 opacity-80"
                      }`}
                      style={{ "animation-delay": `${techIndex() * 50}ms` }}
                    >
                      {tech}
                    </span>
                  )}
                </For>
              </div>
            </div>

            {/* Action Links */}
            <div class={`flex items-center gap-3 pt-2 transition-all duration-500 ${
              isHovered() ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
            }`}>
              <Show when={props.project.live_url}>
                <a
                  href={props.project.live_url!}
                  class="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-zinc-800 text-gray-700 dark:text-zinc-300 rounded-lg hover:bg-gray-200 dark:hover:bg-zinc-700 transition-all duration-300 transform hover:scale-105"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FiEye class="w-4 h-4" />
                  <span class="text-sm font-medium">Preview</span>
                </a>
              </Show>
              
              <Show when={props.project.repo}>
                <a
                  href={props.project.repo!}
                  class="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-zinc-800 text-gray-700 dark:text-zinc-300 rounded-lg hover:bg-gray-200 dark:hover:bg-zinc-700 transition-all duration-300 transform hover:scale-105"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FiGithub class="w-4 h-4" />
                  <span class="text-sm font-medium">Source</span>
                </a>
              </Show>
            </div>
          </div>
        </div>

        {/* Decorative Elements */}
        <div class={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-gray-300 via-gray-400 to-gray-300 dark:from-zinc-600 dark:via-zinc-500 dark:to-zinc-600 transition-all duration-500 ${
          isHovered() ? "opacity-100" : "opacity-0"
        }`} />
        
        {/* Corner Accent */}
        <div class={`absolute bottom-0 right-0 w-16 h-16 transition-all duration-500 ${
          isHovered() ? "opacity-20" : "opacity-0"
        }`}>
          <div class="w-full h-full bg-gradient-to-tl from-gray-300 dark:from-zinc-600 to-transparent rounded-tl-3xl" />
        </div>
      </div>

      {/* Shadow Effects */}
      <div class={`absolute inset-0 -z-10 transition-all duration-500 ${
        isHovered() ? "opacity-100" : "opacity-0"
      }`}>
        <div class="absolute inset-0 bg-gray-200/50 dark:bg-zinc-800/50 rounded-3xl blur-xl transform translate-y-4 scale-95" />
      </div>
    </div>
  );
};

const SingleProjectCardSkeleton: Component = function () {
  return (
    <div class="relative bg-white dark:bg-zinc-900 rounded-3xl overflow-hidden shadow-xl">
      {/* Image Skeleton */}
      <div class="h-48 bg-gray-200 dark:bg-zinc-800 animate-pulse relative">
        {/* Repository Badge Skeleton */}
        <div class="absolute top-4 right-4 w-16 h-7 bg-gray-300 dark:bg-zinc-700 rounded-full animate-pulse" />
        
        {/* Floating Action Button Skeleton */}
        <div class="absolute bottom-4 right-4 w-12 h-12 bg-gray-300 dark:bg-zinc-700 rounded-full animate-pulse" />
      </div>

      {/* Content Skeleton */}
      <div class="p-6 space-y-4">
        {/* Title */}
        <div class="space-y-2">
          <div class="w-3/4 h-6 bg-gray-200 dark:bg-zinc-800 rounded animate-pulse" />
          <div class="w-8 h-0.5 bg-gray-300 dark:bg-zinc-700 rounded animate-pulse" />
        </div>

        {/* Description */}
        <div class="space-y-2">
          <div class="w-full h-4 bg-gray-200 dark:bg-zinc-800 rounded animate-pulse" />
          <div class="w-5/6 h-4 bg-gray-200 dark:bg-zinc-800 rounded animate-pulse" />
          <div class="w-4/5 h-4 bg-gray-200 dark:bg-zinc-800 rounded animate-pulse" />
        </div>

        {/* Technologies Label */}
        <div class="flex items-center gap-2">
          <div class="w-4 h-4 bg-gray-300 dark:bg-zinc-700 rounded animate-pulse" />
          <div class="w-16 h-4 bg-gray-200 dark:bg-zinc-800 rounded animate-pulse" />
        </div>

        {/* Technology Tags */}
        <div class="flex flex-wrap gap-2">
          <div class="w-16 h-7 bg-gray-200 dark:bg-zinc-800 rounded-full animate-pulse" />
          <div class="w-20 h-7 bg-gray-200 dark:bg-zinc-800 rounded-full animate-pulse" />
          <div class="w-14 h-7 bg-gray-200 dark:bg-zinc-800 rounded-full animate-pulse" />
          <div class="w-18 h-7 bg-gray-200 dark:bg-zinc-800 rounded-full animate-pulse" />
        </div>

        {/* Action Buttons */}
        <div class="flex items-center gap-3 pt-2">
          <div class="w-20 h-8 bg-gray-200 dark:bg-zinc-800 rounded-lg animate-pulse" />
          <div class="w-18 h-8 bg-gray-200 dark:bg-zinc-800 rounded-lg animate-pulse" />
        </div>
      </div>

      {/* Decorative Elements */}
      <div class="absolute top-0 left-0 w-full h-1 bg-gray-300 dark:bg-zinc-700 animate-pulse" />
      <div class="absolute bottom-0 right-0 w-16 h-16">
        <div class="w-full h-full bg-gradient-to-tl from-gray-200 dark:from-zinc-800 to-transparent rounded-tl-3xl animate-pulse" />
      </div>
    </div>
  );
};

export { MyProjectsSection };
