import { For } from 'solid-js';
import { style } from './home.style';
import Readme from '../README.md?raw';

function Home() {
  const colors = ['primary', 'warning', 'error', 'success'],
    types = ['bg', 'outline', 'border', 'color', 'hover', 'active'];

  return (
    <>
      <style>{style}</style>
      <n-md text={Readme} not-render={true} picture-viewer={false} />
      <div class="site-colors">
        <For each={colors} fallback={<div>No items</div>}>
          {(c: string) => {
            return (
              <div class="site-color">
                <For each={types} fallback={<div>No items</div>}>
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
