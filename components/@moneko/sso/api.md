[TOC]

# SSO React 共享状态对象

> Shared Store Object `共享状态对象`
> 通过 useSyncExternalStore 衔接的外部状态管理

## 安装依赖

```shell
npm install shared-store-object -S
# or
yarn add shared-store-object -S
```

## 使用方式

> 页面 render 后在任意位置使用, 可通过简单的方式进行创建、修改、回收（回收的对象将无法继续使用）

```jsx
// 引入 或 import { sso } from '@moneko/react';
import sso from 'shared-store-object';

// 创建公共状态
const like = sso({
  count: 0,
  inc() {
    store.count++;
  },
});

// 使用
const App = () => {
  const { count, inc } = like;

  return (
    <div>
      <p>{count}</p>
      <button onClick={inc}>inc</button>
      {/* 直接修改 */}
      <button onClick={() => like.count++}>add</button>
      {/* 函数函数修改 */}
      <button onClick={() => like('count', (prev) => prev + 1)}>func</button>
    </div>
  );
};

// 也可以直接在 react 函数外操作
like.count++;
```

## 计算属性

> 在第二个入参中配置计算属性

```jsx
// 使用
const store = sso(
  {
    count: 0,
    inc() {
      store.count++;
    },
  },
  // 在这里配置计算属性
  {
    age() {
      return store.count * 2 + 1;
    },
  },
);

const App = () => {
  const { count, age } = store;

  return (
    <div>
      <p>count: {count}</p>
      <p>age: {age}</p>
      <button onClick={() => store.inc()}>add</button>
    </div>
  );
};
```

## 回收

> 当作 react 的 useState 来使用，并在组件卸载时手动回收

```jsx
// 使用
const App = () => {
  const store = useRef(sso({ count: 0 }));
  // 结构出 deps 对象
  const { count } = store.current;

  useEffect(() => {
    return () => {
      // 回收之后将无法继续使用store
      store.current();
    };
  }, []);
  return (
    <div>
      <p>{count}</p>
      <button onClick={() => store.count++}>add</button>
    </div>
  );
};
```

## 配置项

> 通过 `next` 参数传递的 `iteration` 函数决定是否需要进行迭代

### 全局

> 所有的 sso 都将使用这个配置

```javascript
sso.config({
  next(iteration, key, data) {
    console.log('global', key, data);
    // 不执行 iteration 函数数据将不会改变
    iteration();
  },
});
```

### 私有

> 为单独的对象设置私有的配置, 权限高于全局配置

```typescript
const app = sso({
  count: 0,
});

app((): Partial<SSOConfig> => {
  return {
    next(iteration, key, data) {
      console.log('app', key, data);
      // 不执行 iteration 函数数据将不会改变
      iteration();
    },
  };
});
```

## 批量更新

> 当使用 React < 18 时使用批量更新。

```javascript
sso.config({
  next: ReactDOM.unstable_batchedUpdates,
});
```
