import { BsChevronBarExpand, BsTools } from "solid-icons/bs";
import { Component, For, createSignal } from "solid-js";
import { myStacksData } from "../shared";
import { cn } from "../utils";

const MyTechStacks: Component = function () {
  const [dropdownOpened, setDropdownOpened] = createSignal(false);

  return (
    <div class="dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 bg-gray-100 rounded-[6pt] py-[6pt] px-[8pt]">
      <div
        role="checkbox"
        aria-checked={dropdownOpened()}
        class="flex items-center justify-between px-[4pt] cursor-pointer"
        onClick={() => setDropdownOpened(!dropdownOpened())}
      >
        <div class="aspect-square p-2 grid place-content-center dark:bg-[hsl(0,0%,18%)] bg-gray-100 rounded-[6pt]">
          <BsTools size={16} />
        </div>
        <div>
          <p class="text-[13pt] font-semibold">My Tech Stacks</p>
        </div>
        <div class="aspect-square p-2 grid place-content-center dark:bg-[hsl(0,0%,18%)] bg-gray-100 rounded-[6pt]">
          <BsChevronBarExpand />
        </div>
      </div>

      <div
        class={cn(
          "p-4 mt-[8pt] flex flex-col gap-y-3",
          dropdownOpened()
            ? "max-h-[400px] transition-all duration-[400ms]"
            : "max-h-0 overflow-hidden py-0 mt-0 opacity-0 scale-95 blur-sm duration-300"
        )}
        style={{ "max-height": dropdownOpened() ? "400px" : "0" }}
        aria-hidden={!dropdownOpened()}
      >
        <For each={myStacksData}>
          {(section) => (
            <div class="flex flex-col gap-y-1">
              <p class="text-[13pt] text-zinc-400 font-semibold uppercase">
                {section.sectionName}
              </p>
              <div class="flex flex-wrap gap-2">
                <For each={section.stacks}>
                  {(stack) => (
                    <div class="bg-white/50 dark:bg-zinc-900/50 hover:bg-white/80 dark:hover:bg-zinc-900/80 backdrop-blur-sm rounded-lg border border-zinc-200/50 dark:border-zinc-700/50 transition-all duration-200 transform hover:scale-105 py-1 px-2 cursor-pointer">
                      <p class="text-[11pt] capitalize">{stack}</p>
                    </div>
                  )}
                </For>
              </div>
            </div>
          )}
        </For>
      </div>
    </div>
  );
};

export { MyTechStacks };
