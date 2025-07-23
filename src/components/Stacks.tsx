import { BsChevronBarExpand, BsTools, BsStars, BsLightning } from "solid-icons/bs";
import { Component, For, createSignal, createEffect, onMount } from "solid-js";
import { myStacksData } from "../shared";
import { cn } from "../utils";

const MyTechStacks: Component = function () {
  const [dropdownOpened, setDropdownOpened] = createSignal(false);
  const [hoveredStack, setHoveredStack] = createSignal<string | null>(null);
  const [animationPhase, setAnimationPhase] = createSignal(0);
  const [mounted, setMounted] = createSignal(false);

  onMount(() => {
    setMounted(true);
    // Continuous background animation
    const interval = setInterval(() => {
      setAnimationPhase(prev => (prev + 1) % 4);
    }, 3000);
    
    return () => clearInterval(interval);
  });

  const totalStacks = () => myStacksData.reduce((acc, section) => acc + section.stacks.length, 0);

  return (
    <div class={`relative overflow-hidden transition-all duration-700 transform ${
      mounted() ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
    }`}>
      {/* Animated Background Elements */}
      <div class="absolute inset-0 overflow-hidden pointer-events-none">
        <div class={`absolute -top-8 -right-8 w-24 h-24 bg-gray-200/20 dark:bg-zinc-700/20 rounded-full blur-2xl transition-all duration-3000 ${
          animationPhase() % 2 === 0 ? 'transform scale-150 opacity-30' : 'transform scale-100 opacity-10'
        }`} />
        <div class={`absolute -bottom-8 -left-8 w-32 h-32 bg-gray-100/30 dark:bg-zinc-800/30 rounded-full blur-3xl transition-all duration-3000 ${
          animationPhase() % 2 === 1 ? 'transform scale-125 opacity-40' : 'transform scale-100 opacity-20'
        }`} style={{ "animation-delay": "1.5s" }} />
      </div>

      <div class="relative dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 bg-gray-100 rounded-2xl p-2 shadow-lg hover:shadow-xl transition-all duration-500">
        {/* Header Section */}
        <div
          role="checkbox"
          aria-checked={dropdownOpened()}
          class={`group flex items-center justify-between p-3 cursor-pointer rounded-xl transition-all duration-500 hover:bg-white/50 dark:hover:bg-zinc-800/50 ${
            dropdownOpened() ? 'bg-white/30 dark:bg-zinc-800/30' : ''
          }`}
          onClick={() => setDropdownOpened(!dropdownOpened())}
        >
          {/* Left Icon with Animation */}
          <div class={`relative aspect-square p-3 grid place-content-center dark:bg-zinc-800 bg-gray-200 rounded-xl transition-all duration-500 transform group-hover:scale-110 group-hover:rotate-12 ${
            dropdownOpened() ? 'rotate-180 scale-110' : ''
          }`}>
            <div class="absolute inset-0 bg-gradient-to-br from-gray-300/50 to-gray-100/50 dark:from-zinc-700/50 dark:to-zinc-600/50 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <BsTools size={18} class="relative z-10 transition-transform duration-300" />
            
            {/* Floating particles effect */}
            <div class={`absolute inset-0 transition-opacity duration-500 ${dropdownOpened() ? 'opacity-100' : 'opacity-0'}`}>
              <BsStars size={8} class="absolute -top-1 -right-1 text-gray-400 dark:text-zinc-500 animate-pulse" />
              <BsLightning size={6} class="absolute -bottom-1 -left-1 text-gray-400 dark:text-zinc-500 animate-bounce" style={{ "animation-delay": "0.5s" }} />
            </div>
          </div>

          {/* Center Content */}
          <div class="flex flex-col items-center transition-all duration-300 transform group-hover:scale-105">
            <p class="text-[14pt] font-bold text-gray-800 dark:text-zinc-200 transition-colors duration-300">
              My Tech Stacks
            </p>
            <div class={`text-[10pt] text-gray-500 dark:text-zinc-400 transition-all duration-500 ${
              dropdownOpened() ? 'opacity-100 translate-y-0 h-auto' : 'opacity-0 h-0 -translate-y-2'
            }`}>
              {totalStacks()} technologies
            </div>
          </div>

          {/* Right Icon with Rotation */}
          <div class={`relative aspect-square p-3 grid place-content-center dark:bg-zinc-800 bg-gray-200 rounded-xl transition-all duration-500 transform ${
            dropdownOpened() ? 'rotate-180 scale-110 bg-gray-300 dark:bg-zinc-700' : 'group-hover:scale-110'
          }`}>
            <div class="absolute inset-0 bg-gradient-to-tl from-gray-300/50 to-gray-100/50 dark:from-zinc-700/50 dark:to-zinc-600/50 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <BsChevronBarExpand size={16} class="relative z-10 transition-transform duration-500" />
          </div>
        </div>

        {/* Dropdown Content with Advanced Animations */}
        <div
          class={cn(
            "overflow-hidden transition-all duration-700 ease-out",
            dropdownOpened()
              ? "max-h-[500px] opacity-100 scale-100 mt-3"
              : "max-h-0 opacity-0 scale-95 mt-0"
          )}
          style={{ 
            "max-height": dropdownOpened() ? "500px" : "0",
            "transform-origin": "top center"
          }}
          aria-hidden={!dropdownOpened()}
        >
          <div class="p-4 space-y-6">
            <For each={myStacksData}>
              {(section, sectionIndex) => (
                <div class={`transition-all duration-500 transform ${
                  dropdownOpened() 
                    ? 'translate-y-0 opacity-100' 
                    : 'translate-y-4 opacity-0'
                }`} style={{ "animation-delay": `${sectionIndex() * 150}ms` }}>
                  
                  {/* Section Header */}
                  <div class="flex items-center gap-3 mb-4 group">
                    <div class="flex-1 h-px bg-gradient-to-r from-transparent via-gray-300 dark:via-zinc-600 to-transparent" />
                    <div class="relative">
                      <p class="text-[12pt] text-zinc-500 dark:text-zinc-400 font-bold uppercase tracking-wider px-3 py-1 bg-white/80 dark:bg-zinc-800/80 rounded-full border border-gray-200/50 dark:border-zinc-700/50 backdrop-blur-sm transition-all duration-300 group-hover:scale-105">
                        {section.sectionName}
                      </p>
                      <div class="absolute inset-0 bg-gradient-to-r from-gray-100/50 to-gray-200/50 dark:from-zinc-700/50 dark:to-zinc-600/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
                    </div>
                    <div class="flex-1 h-px bg-gradient-to-r from-transparent via-gray-300 dark:via-zinc-600 to-transparent" />
                  </div>

                  {/* Stacks Grid */}
                  <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                    <For each={section.stacks}>
                      {(stack, stackIndex) => (
                        <div 
                          class={`group relative overflow-hidden bg-white/60 dark:bg-zinc-800/60 hover:bg-white/90 dark:hover:bg-zinc-700/90 backdrop-blur-sm rounded-xl border border-zinc-200/60 dark:border-zinc-700/60 transition-all duration-400 transform cursor-pointer ${
                            hoveredStack() === stack 
                              ? 'scale-110 shadow-lg ring-2 ring-gray-300/50 dark:ring-zinc-600/50 z-10' 
                              : 'hover:scale-105 hover:shadow-md'
                          } ${
                            hoveredStack() && hoveredStack() !== stack
                              ? 'opacity-60 scale-95'
                              : 'opacity-100'
                          }`}
                          style={{ 
                            "animation-delay": `${(sectionIndex() * 200) + (stackIndex() * 50)}ms`,
                            "transition-delay": hoveredStack() ? '0ms' : `${stackIndex() * 30}ms`
                          }}
                          onMouseEnter={() => setHoveredStack(stack)}
                          onMouseLeave={() => setHoveredStack(null)}
                        >
                          {/* Background Animation */}
                          <div class="absolute inset-0 bg-gradient-to-br from-gray-100/0 via-gray-200/50 to-gray-100/0 dark:from-zinc-700/0 dark:via-zinc-600/50 dark:to-zinc-700/0 transform scale-0 group-hover:scale-100 transition-transform duration-500 rounded-xl" />
                          
                          {/* Content */}
                          <div class="relative z-10 p-3 text-center">
                            <p class="text-[11pt] font-medium capitalize text-gray-800 dark:text-zinc-200 transition-all duration-300 group-hover:font-semibold">
                              {stack}
                            </p>
                          </div>

                          {/* Hover Accent */}
                          <div class="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-gray-400 via-gray-500 to-gray-400 dark:from-zinc-500 dark:via-zinc-400 dark:to-zinc-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
                          
                          {/* Corner Sparkle */}
                          <div class={`absolute top-1 right-1 w-1.5 h-1.5 bg-gray-400 dark:bg-zinc-500 rounded-full transition-all duration-300 ${
                            hoveredStack() === stack ? 'opacity-100 scale-100' : 'opacity-0 scale-0'
                          }`} />
                        </div>
                      )}
                    </For>
                  </div>
                </div>
              )}
            </For>

            {/* Footer Stats */}
            <div class={`text-center pt-4 border-t border-gray-200/50 dark:border-zinc-700/50 transition-all duration-700 ${
              dropdownOpened() ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
            }`} style={{ "animation-delay": "600ms" }}>
              <p class="text-[10pt] text-gray-500 dark:text-zinc-400">
                Powered by {totalStacks()} cutting-edge technologies
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export { MyTechStacks };
