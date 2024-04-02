import { FiExternalLink } from "solid-icons/fi";
import { SiNounproject } from "solid-icons/si";
import {
  Component,
  For,
  Match,
  Suspense,
  Switch,
  createResource,
} from "solid-js";
import { Post, PostsResponse } from "../shared";

async function fetchProjects() {
  const res = await fetch("https://port-api.onrender.com/api/projects");
  const data = await res.json();
  return data as PostsResponse;
}

const MyProjectsSection: Component = function () {
  const [projects] = createResource(fetchProjects);
  return (
    <section class="pb-40">
      {/* <div>
        <h1 class=" font-bold text-3xl text-center underline underline-offset-[6pt]">My Projects</h1>
      </div> */}

      <div>
        <Suspense
          fallback={
            <div class="flex flex-col gap-y-[16pt]">
              <h2 class="text-[16pt] font-medium mt-4 mb-1 text-gray-700 dark:text-zinc-300">
                My Projects
              </h2>
              <SingleProjectCardSkeleton />
              <SingleProjectCardSkeleton />
              <SingleProjectCardSkeleton />
              <SingleProjectCardSkeleton />
            </div>
          }
        >
          <Switch>
            <Match when={projects.error}>Error...</Match>
            <Match when={projects()}>
              <Projects name="My Projects" projects={projects()!.posts} />
            </Match>
          </Switch>
        </Suspense>
      </div>
    </section>
  );
};

const Projects: Component<{ name: string; projects: Post[] }> = function (
  props
) {
  return (
    <div class="flex flex-col gap-y-[20pt]">
      <h2 class="text-[16pt] font-medium mt-4 mb-1 text-gray-700 dark:text-zinc-300">
        {props.name}
      </h2>

      <div class="flex flex-col gap-y-[16pt]">
        <For each={props.projects}>
          {(project) => <SingleProjectCard project={project} />}
        </For>
      </div>
    </div>
  );
};

const SingleProjectCard: Component<{ project: Post }> = function (props) {
  return (
    <div class="relative dark:bg-[#22222261] bg-gray-100 p-[4pt] rounded-[6pt] overflow-hidden">
      <div class="absolute text-[10pt] top-0 right-0 rounded-bl-[6pt] px-2 py-1 dark:bg-[#222] bg-[#22222223]">
        <span>FullStack</span>
      </div>

      <div class="flex flex-col gap-y-1 p-1">
        <a
          href={props.project.link}
          title={`link to ${props.project.title}`}
          class="flex flex-row items-center gap-x-2 p-1"
        >
          {/* <img
            src="https://www.amcechealth.com/favicon.png"
            class="rounded aspect-square h-full w-[16pt]"
            alt={props.project.title}
          /> */}
          <span>
            <SiNounproject class="h-[16pt] w-[16pt]" />
          </span>
          <p class="uppercase flex items-center flex-nowrap gap-x-1 hover:scale-105 text-[14pt] duration-200 font-medium">
            {props.project.title}{" "}
            <span>
              <FiExternalLink />
            </span>
          </p>
        </a>

        <p class="text-[16px] md:text-[11pt] dark:text-zinc-400 leading-normal p-1">
          {props.project.body}
        </p>

        <ul class="flex flex-wrap gap-2 my-3">
          <For each={[props.project.category]}>
            {(tech) => (
              <li class="text-[11pt] capitalize bg-gray-200 dark:bg-[#242326] text-gray-600 dark:text-zinc-400 dark:hover:text-zinc-200 cursor-default py-1 px-2 rounded-md text-cener">
                <a href="">{tech}</a>
              </li>
            )}
          </For>
        </ul>

        <figure class="w-full rounded-[6pt] overflow-hidden transition">
          <img
            class="size-full aspect-[4/3] object-cover object-top"
            src={props.project.img_url}
            alt={props.project.title}
          />
        </figure>
      </div>
    </div>
  );
};

const SingleProjectCardSkeleton: Component = function () {
  return (
    <div class="relative dark:bg-[#22222261] bg-gray-100 p-[4pt] rounded-[9pt] overflow-hidden">
      <div class="absolute  animate-ping w-[40pt] h-[20pt] top-0 right-0 rounded-bl-[6pt] px-2 py-1 dark:bg-[#222] bg-[#22222223]"></div>

      <div class="flex flex-col gap-y-2 p-1">
        <div class="w-[40%] h-[16pt] rounded animate-pulse duration-200" />

        <p class="h-[16pt] rounded-md w-full bg-gray-400 dark:bg-zinc-800 animate-pulse duration-300" />
        <p class="h-[16pt] rounded-md w-[80%] bg-gray-400 dark:bg-zinc-800 animate-pulse duration-300" />
        <p class="h-[16pt] rounded-md w-[60%] bg-gray-400 dark:bg-zinc-800 animate-pulse duration-300" />

        <div class="flex flex-wrap gap-2 my-3">
          <div class="h-[16px] w-[30pt] rounded-md animate-pulse bg-gray-200 dark:bg-zinc-700 duration-300"></div>
          <div class="h-[16px] w-[30pt] rounded-md animate-pulse bg-gray-200 dark:bg-zinc-700 duration-200"></div>
        </div>

        <div class="w-full h-[200pt] bg-gray-200 dark:bg-gray-700 animate-pulse rounded-[6pt] overflow-hidden transition duration-[350ms]"></div>
      </div>
    </div>
  );
};

export { MyProjectsSection };
