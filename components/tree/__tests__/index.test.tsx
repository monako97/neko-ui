import React, { useState } from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { Tree } from 'neko-ui';

/**
 * @jest-environment jsdom
 */
describe('test Tree', () => {
  const data = [
    {
      title: '文件名称',
      subTitle: 'object',
      key: 'a',
      children: [
        {
          title: '备注',
          subTitle: 'object',
          key: 'a.b',
          children: [
            {
              title: '备注',
              subTitle: 'string',
              key: 'a.b.x',
            },
          ],
        },
      ],
    },
    {
      title: '编号',
      subTitle: 'object',
      key: 'b',
      children: [
        {
          title: '备注',
          subTitle: 'string',
          key: 'b2',
        },
        {
          title: '是否有效',
          subTitle: 'boolean',
          key: 'c2',
        },
      ],
    },
  ];

  it('normal', async () => {
    const change = jest.fn();
    const onRowClick = jest.fn();
    const Demo = () => {
      const [val, setVal] = useState<string[]>([]);

      return (
        <Tree
          value={val}
          multiple
          onRowClick={onRowClick}
          data={data}
          onChange={(v: string[]) => {
            setVal(v);
            change();
          }}
        />
      );
    };
    const { getByText } = render(<Demo />);

    fireEvent.click(getByText('文件名称'));
    fireEvent.click(getByText('文件名称'));
    expect(onRowClick).toHaveBeenCalled();
    expect(change).toHaveBeenCalled();
  });

  it('toggle', async () => {
    const onRowDoubleClick = jest.fn();
    const Demo = () => {
      const [val, setVal] = useState<string>();

      return (
        <Tree
          value={val}
          toggle
          onRowDoubleClick={onRowDoubleClick}
          data={data}
          onChange={(v: string) => {
            setVal(v);
          }}
        />
      );
    };
    const { getByText } = render(<Demo />);

    fireEvent.click(getByText('是否有效'));
    fireEvent.dblClick(getByText('是否有效'));
    fireEvent.click(getByText('是否有效'));
    expect(onRowDoubleClick).toHaveBeenCalled();
  });

  it('one item', async () => {
    render(
      <>
        <Tree
          data={[
            {
              title: 'oneb',
              key: 'oneb',
              children: [
                {
                  title: 'sa',
                  key: 'ss',
                },
                {
                  title: 'saa',
                  key: 'ss2',
                },
              ],
            },
          ]}
        />
        <Tree
          data={[
            {
              title: 'one',
              key: 'one',
            },
          ]}
        />
        <Tree
          data={[
            {
              title: 'one11',
              key: 'one11',
              children: [
                {
                  title: 'one12',
                  key: 'one12',
                },
              ],
            },
            {
              title: 'bo',
              key: 'bo',
            },
          ]}
        />
      </>
    );
  });
  it('readonly', async () => {
    let val: string | undefined = 'a';

    const { getByText } = render(
      <Tree value={val} data={data} readonly onChange={(v: string) => (val = v)} direction="rtl" />
    );

    fireEvent.click(getByText('编号'));
    await waitFor(() => getByText('编号'));
    expect(val).toEqual('a');
  });
  it('fromSchema', async () => {
    const { getByText } = render(
      <Tree
        fromSchema
        data={{
          $schema: 'http://json-schema.org/draft-07/schema',
          $id: 'http://example.com/example.json',
          type: 'object',
          properties: {
            user: {
              type: 'object',
              title: '用户信息',
              properties: {
                name: {
                  type: 'string',
                  title: '姓名',
                },
                works: {
                  type: 'object',
                  title: 'works',
                  properties: {
                    desgin: {
                      type: 'string',
                      title: '设计',
                    },
                  },
                },
              },
            },
          },
        }}
      />
    );

    fireEvent.click(getByText('works'));
  });
  it('fromString', async () => {
    const { getAllByText } = render(
      <Tree
        data={`root_folder/
    |-- components
    |   |-- index.ts
    |   \`-- wave-circle
    |       |-- examples
    |       |   |-- api.md
    |       |   \`-- demo.mdx
    |       |-- index.tsx
    |       \`-- README.mdx
    |-- config
    |   |-- index.ts
    |   \`-- prod.ts
    |-- docs
    |   |-- index.js
    |   \`-- index.html
    |-- es
    |   |-- index.js
    |   \`-- wave-circle
    |       \`-- index.js
    |-- lib
    |   |-- index.js
    |   \`-- wave-circle
    |       \`-- index.js
    |-- .eslintrc.yaml
    |-- .gitattributes
    |-- .prettierrc.yaml
    |-- .stylelintrc.yaml
    |-- package.json
    |-- README.md
    |-- site
    |-- tsconfig.json
    \`-- typings
        \`-- typings.d.ts`}
      />
    );

    expect(getAllByText('wave-circle').length).toBe(3);
  });
  it('Invalid file tree structure', async () => {
    render(<Tree data={`\n/\n/`} />);
    render(<Tree data={`\n/\n||\n`} size="large" />);
  });
});