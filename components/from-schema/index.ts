import { type TreeData } from '../tree';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function fromSchema(schema: Record<string, any>, pid?: string): TreeData<string>[] {
  const treeData: TreeData<string>[] = [];
  const { properties } = schema;

  for (const name in properties) {
    if (Object.prototype.hasOwnProperty.call(properties, name)) {
      const { properties: _properties, items, ...item } = properties[name];

      const node: TreeData<string> = {
        ...item,
        name: name,
        subTitle: item.type,
        key: `${pid ? `${pid}.` : ''}${name}`,
      };

      if (item.type === 'object') {
        node.children = fromSchema({ properties: _properties }, node.key);
      } else if (item.type === 'array') {
        node.children = fromSchema(
          {
            properties: {
              items: {
                ...items,
                title: 'items',
              },
            },
          },
          node.key,
        );
      }
      treeData.push(node);
    }
  }

  return treeData;
}

export default fromSchema;
