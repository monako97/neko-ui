import { type TreeData } from '../tree';

export enum DataType {
  string = 'string',
  number = 'number',
  integer = 'integer',
  boolean = 'boolean',
  object = 'object',
  array = 'array',
}
interface BaseSchema {
  type?: keyof typeof DataType;
  name?: string;
  title?: string;
  items?: never;
  [key: string]: Any;
}
interface ArraySchema extends Omit<BaseSchema, 'type' | 'items'> {
  type: 'array';
  items: Schema;
  properties?: Record<string, Schema>;
}

interface ObjectSchema extends Omit<BaseSchema, 'type'> {
  type?: Exclude<keyof typeof DataType, 'array'>;
  properties?: Record<string, Schema>;
}

export type Schema = ObjectSchema | ArraySchema;

function fromSchema(schema: Schema, pid?: string): TreeData[] {
  const treeData: TreeData[] = [];
  const { properties } = schema;

  for (const k in properties) {
    if (Object.prototype.hasOwnProperty.call(properties, k)) {
      const name = k;
      const { properties: _properties, items, type = 'string', ...item } = properties[name];
      const node: TreeData = {
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
                isItems: true,
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
