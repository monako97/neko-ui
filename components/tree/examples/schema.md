---
title: 渲染JSON Schema结构
description: 通过设置 `fromSchema` 属性渲染来支持 `JSONSchema` 的数据源。
order: 5
---

```html
<n-tree from-schema="true"></n-tree>
<script>
  const el = container.querySelector('n-tree');
  el.onchange = function (e) {
    const [key, item] = e.detail;

    el.value = key;
    console.log(item);
  };
  el.data = {
    $schema: 'http://json-schema.org/draft-07/schema',
    $id: 'http://example.com/example.json',
    type: 'object',
    additionalProperties: true,
    properties: {
      user: {
        type: 'object',
        title: '用户信息',
        propertyOrder: 12,
        required: ['name', 'email'],
        properties: {
          name: {
            type: 'string',
            title: '姓名',
            description: '',
            default: '',
          },
          works: {
            type: 'object',
            title: '履历',
            description: '',
            required: ['desgin'],
            properties: {
              desgin: {
                type: 'string',
                title: '设计',
                description: '',
              },
            },
          },
        },
      },
      tags: {
        type: 'array',
        title: '标签',
        description: '',
        items: {
          type: 'object',
          title: 'items',
          description: '',
          additionalProperties: true,
          properties: {
            s: {
              type: 'string',
              title: 's',
              description: '',
            },
          },
        },
      },
    },
  };
</script>
```

```jsx
<n-tree
  data={{
    $schema: 'http://json-schema.org/draft-07/schema',
    $id: 'http://example.com/example.json',
    type: 'object',
    additionalProperties: true,
    properties: {
      user: {
        type: 'object',
        title: '用户信息',
        propertyOrder: 12,
        required: ['name', 'email'],
        properties: {
          name: {
            type: 'string',
            title: '姓名',
            description: '',
            default: '',
          },
          works: {
            type: 'object',
            title: '履历',
            description: '',
            required: ['desgin'],
            properties: {
              desgin: {
                type: 'string',
                title: '设计',
                description: '',
              },
            },
          },
        },
      },
      tags: {
        type: 'array',
        title: '标签',
        description: '',
        items: {
          type: 'object',
          title: 'items',
          description: '',
          additionalProperties: true,
          properties: {
            s: {
              type: 'string',
              title: 's',
              description: '',
            },
          },
        },
      },
    },
  }}
  from-schema
/>
```
