import { fromSchema } from 'neko-ui';
import type { Schema } from '..';

describe('fromSchema', () => {
  it('get', () => {
    const schema: Schema = {
      $schema: 'http://json-schema.org/draft-07/schema',
      $id: 'http://example.com/example.json',
      type: 'object',
      additionalProperties: true,
      properties: {
        user: {
          type: 'object',
          title: '用户信息',
          propertyOrder: 12,
        },
        F04doJLEQ$: {
          type: 'array',
          title: 'F04doJLEQ$',
          description: '',
          items: {
            type: 'object',
            title: 'items',
            description: '',
            additionalProperties: true,
            properties: {
              F23KkqKM4P: {
                type: 'string',
                title: 'F23KkqKM4P',
                description: '',
              },
            },
          },
        },
      },
    };

    expect(fromSchema(schema)).toEqual([
      {
        type: 'object',
        title: '用户信息',
        propertyOrder: 12,
        name: 'user',
        subTitle: 'object',
        key: 'user',
        children: [],
      },
      {
        type: 'array',
        title: 'F04doJLEQ$',
        description: '',
        name: 'F04doJLEQ$',
        subTitle: 'array',
        key: 'F04doJLEQ$',
        children: [
          {
            type: 'object',
            title: 'items',
            description: '',
            isItems: true,
            additionalProperties: true,
            name: 'items',
            subTitle: 'object',
            key: 'F04doJLEQ$.items',
            children: [
              {
                type: 'string',
                title: 'F23KkqKM4P',
                description: '',
                name: 'F23KkqKM4P',
                subTitle: 'string',
                key: 'F04doJLEQ$.items.F23KkqKM4P',
              },
            ],
          },
        ],
      },
    ]);
  });
});
