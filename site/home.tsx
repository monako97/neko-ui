import { For } from 'solid-js';

import Readme from '../README.md?raw';

import { style } from './home.style';

function Home() {
  const colors = ['primary', 'warning', 'error', 'success'],
    types = ['bg', 'outline', 'border', 'color', 'hover', 'active'];

  return (
    <>
      <style textContent={style} />
      <n-md text={Readme} not-render={true} picture-viewer={false} />
      <div class="site-colors">
        <For each={colors}>
          {(c: string) => {
            return (
              <div class="site-color">
                <For each={types}>
                  {(t: string) => {
                    const v = `--${c}-${t}`;

                    return (
                      <div
                        class="site-color-item"
                        style={{
                          'background-color': `var(${v})`,
                        }}
                      >
                        <span data-val={v} data-name={t} />
                        <span>
                          {getComputedStyle(document.documentElement).getPropertyValue(v)}
                        </span>
                      </div>
                    );
                  }}
                </For>
              </div>
            );
          }}
        </For>
      </div>
    </>
  );
}

export default Home;
