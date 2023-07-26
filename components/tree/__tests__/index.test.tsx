import { fireEvent, render, waitFor } from '@solidjs/testing-library';
import { screen } from 'shadow-dom-testing-library';

describe('Tree', () => {
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

    render(() => (
      <n-tree value={[]} multiple={true} onRowClick={onRowClick} data={data} onChange={change} />
    ));

    fireEvent.click(screen.getByShadowText('文件名称'));
    fireEvent.click(screen.getByShadowText('文件名称'));
    expect(onRowClick).toHaveBeenCalled();
    expect(change).toHaveBeenCalled();
  });

  it('toggle', async () => {
    const onRowDoubleClick = jest.fn();

    render(() => <n-tree toggle={true} onRowDoubleClick={onRowDoubleClick} data={data} />);

    fireEvent.click(screen.getByShadowText('是否有效'));
    fireEvent.dblClick(screen.getByShadowText('是否有效'));
    fireEvent.click(screen.getByShadowText('是否有效'));
    expect(onRowDoubleClick).toHaveBeenCalled();
  });

  it('one item', async () => {
    render(() => (
      <>
        <n-tree
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
        <n-tree
          data={[
            {
              title: 'one',
              key: 'one',
            },
          ]}
        />
        <n-tree
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
    ));
  });
  it('readonly', async () => {
    const val: string | undefined = 'a';

    render(() => <n-tree value={val} data={data} readonly={true} direction="rtl" />);

    fireEvent.click(screen.getByShadowText('编号'));
    await waitFor(() => screen.getByShadowText('编号'));
    expect(val).toEqual('a');
  });
  it('fromSchema', async () => {
    render(() => (
      <n-tree
        from-schema={true}
        fromSchema={true}
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
    ));

    fireEvent.click(screen.getByShadowText('works'));
  });
  it('fromString', async () => {
    render(() => (
      <n-tree
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
    ));

    expect(screen.getAllByShadowText('wave-circle').length).toBe(3);
  });
  it('Invalid file tree structure', async () => {
    render(() => <n-tree data={'\n/\n/'} />);
    render(() => <n-tree data={'\n/\n||\n'} size="large" />);
  });
});
