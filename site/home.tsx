import { For } from 'solid-js';
import mdxScope from '@app/mdx-scope';
import './home.global.less';
import Readme from '../README.md';

function Home() {
  const colors = ['primary', 'warning', 'error', 'success'],
    types = ['bg', 'outline', 'border', 'color', 'hover', 'active'];

  return (
    <>
      <Readme components={mdxScope} />
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
