import { type TreeData } from '../tree';

enum Type {
  string = 'string',
  number = 'number',
  integer = 'integer',
  boolean = 'boolean',
  object = 'object',
  array = 'array',
}
interface BaseSchema {
  type?: keyof typeof Type;
  name?: string;
  title?: string;
  items?: never;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}
interface ArraySchema extends Omit<BaseSchema, 'type' | 'items'> {
  type: 'array';
  items: Schema;
  properties?: Record<string, Schema>;
}

interface ObjectSchema extends Omit<BaseSchema, 'type'> {
  type?: Exclude<keyof typeof Type, 'array'>;
  properties?: Record<string, Schema>;
}

export type Schema = ObjectSchema | ArraySchema;

function fromSchema(schema: Schema, pid?: string): TreeData<string>[] {
  const treeData: TreeData<string>[] = [];
  const { properties } = schema;

  for (const k in properties) {
    if (Object.prototype.hasOwnProperty.call(properties, k)) {
      const name = k as keyof typeof properties;
      const { properties: _properties, items, type = 'string', ...item } = properties[name];

      const node: TreeData<string> = {
        ...item,
        name: name,
        type,
        subTitle: type,
        key: `${pid ? `${pid}.` : ''}${name}`,
      };

      if (type === 'object') {
        node.children = fromSchema({ properties: _properties }, node.key);
      } else if (type === 'array') {
        node.children = fromSchema(
          {
            properties: {
              items: {
                ...(items as Schema),
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
