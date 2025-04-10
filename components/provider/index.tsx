import { createEffect, mergeProps } from 'solid-js';
import { customElement, noShadowDOM } from 'solid-element';

import type { CustomElement } from '..';
import type { JSXElement } from '../basic-config';
import theme, { ColorScheme } from '../theme';
import { registry } from '../utils';

function Provider(props: ProviderProps) {
  const { baseStyle, scheme, setScheme } = theme;

  noShadowDOM();
  createEffect(() => {
    props.onScheme?.(scheme());
  });
  createEffect(() => {
    if (props.scheme) {
      setScheme(props.scheme);
    }
  });
  return (
    <>
      <style textContent={baseStyle()} />
      {props.children}
    </>
  );
}
export interface ProviderProps {
  /** 主题, 等同于使用 setScheme
   * @default 'auto'
   */
  scheme?: keyof typeof ColorScheme;
  /** 包裹的子项 */
  children?: JSXElement;
  /** 响应 scheme 变化 */
  onScheme?(scheme: keyof typeof ColorScheme): void;
}
export type ProviderElement = CustomElement<ProviderProps, 'onScheme'>;

Provider.registry = () => {
  customElement<ProviderProps>('n-provider', (_, opt) => {
    const el = opt.element;
    const props = mergeProps(
      {
        onScheme(scheme: keyof typeof ColorScheme) {
          el.dispatchEvent(
            new CustomEvent('scheme', {
              detail: scheme,
            }),
          );
        },
      },
      _,
    );

    return <Provider {...props} />;
  });
};
registry(Provider);
export default Provider;
