import { Herosection } from "../components/Hero";
import { MyProjectsSection } from "../components/MyProjects";
import { MyTechStacks } from "../components/Stacks";

export default function Home() {
  return (
    <div>
      <Herosection />

      <section class="mt-4 flex flex-col gap-y-[25pt]">
        <MyTechStacks />

        <MyProjectsSection />
      </section>
    </div>
  );
}
