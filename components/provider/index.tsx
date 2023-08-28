import { type JSXElement, createComponent, createEffect, mergeProps } from 'solid-js';
import { customElement, noShadowDOM } from 'solid-element';
import theme, { ColorScheme } from '../theme';
import type { CustomElement } from '..';

function Provider(props: ProviderProps) {
  const { baseStyle, scheme } = theme;

  noShadowDOM();
  createEffect(() => {
    props.onScheme?.(scheme());
  });
  return (
    <>
      <style>{baseStyle()}</style>
      {props.children}
    </>
  );
}
export interface ProviderProps {
  /** 包裹的子项 */
  children?: JSXElement;
  /** 响应 scheme 变化 */
  onScheme?(scheme: keyof typeof ColorScheme): void;
}
export type ProviderElement = CustomElement<ProviderProps, 'onScheme'>;

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

  return createComponent(Provider, props);
});
export default Provider;
