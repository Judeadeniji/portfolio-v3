import { Herosection } from "../components/Hero";
import { MyProjectsSection } from "../components/MyProjects";
import { MyTechStacks } from "../components/Stacks";

// artificial delay to simulate loading
await new Promise((resolve) => setTimeout(resolve, 3000));

const Marquee = () => {
  return (
    <div id="marquee" class="group relative overflow-hidden select-none h-16 bg-transparent flex flex-row items-center justify-between gap-x-8 origin-top-right rotate-3 uppercase text-black text-3xl font-extrabold font-mono my-1 -mx-2">
      <div class="flex whitespace-nowrap gap-x-8 animate-marquee group-hover:[animation-play-state:paused]">
        <div>Full-Stack Developer</div>
        <div>Open Source Advocate</div>
        <div>JavaScript Wizard</div>
        <div>React & Solid.js</div>
        <div>Node.js Backend</div>
        <div>Innovative Problem Solver</div>
        <div>Design Enthusiast</div>
        <div>Tech Stack Explorer</div>
      </div>
      <div class="flex whitespace-nowrap gap-x-8 animate-marquee group-hover:[animation-play-state:paused]" aria-hidden>
        <div>Full-Stack Developer</div>
        <div>Open Source Advocate</div>
        <div>JavaScript Wizard</div>
        <div>React & Solid.js</div>
        <div>Node.js Backend</div>
        <div>Innovative Problem Solver</div>
        <div>Design Enthusiast</div>
        <div>Tech Stack Explorer</div>
      </div>
      <div class="absolute inset-0 bg-accent-1" style={{ "z-index": -1 }} />
    </div>
  );
};


export default function Home() {
  return (
    <div class="overflow-x-clip">
      <Herosection />
      <Marquee />
      <section class="max-w-screen-lg md:mx-auto px-4 mt-4 flex flex-col gap-y-[25pt]">
        <MyTechStacks />

        <MyProjectsSection />
      </section>
    </div>
  );
}
