/**
 * 注册组件
 * @example
 * import { Button, Avatar } from 'neko-ui';
 *
 * registry(Button, Avatar);
 */
export function registry(...components: { registry: VoidFunction }[]) {
  components.forEach((component) => {
    component.registry();
  });
}
