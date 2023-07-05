function getLastJsx(str: string) {
  const matchArr = str.match(
    // /<(\w+)(?:(?!\/>|>)[\s\S])*?(?:(\/>|>((?:(?!<\1(?:(?!\/>|>)[\s\S])*?>)[\s\S])*?)<\/\1\s*>))/gms
    /<(\w+)(?:(?!\/>|>)[\s\S])*?(?:(\/>|>((?:(?!<\1(?:(?!\/>|>|\s)[\s\S])*?(?:\/\s*)?>)[\s\S])*?)<\/\1\s*>))/gms
  );

  if (matchArr !== null) {
    const lastMatch = matchArr[matchArr.length - 1];

    return lastMatch;
  }
  return '';
}
describe('test get last tag', () => {
  it('闭合', () => {
    const lastStr = `\`\`\`typescript
<div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
    <Button disabled>normal [disabled]</Button>
    <Button disabled>normal [disabled]</Button>
</div>
\`\`\``;
    const str = `## zh-CN

<Button disabled>normal [disabled]</Button>

添加 \`disabled\` 属性即可让按钮处于不可用状态，同时按钮样式也会改变

${lastStr}`;

    const m = str.matchAll(/```([^\r\n]+)?\r?\n([\s\S]*?)\r?\n```/g);

    for (const match of m) {
      // console.log(match[2]);
      expect(match[0]).toBe(lastStr);
    }
  });
  it('自闭合1', () => {
    const lastStr = `<Button />`;
    const str = `## zh-CN

<Button disabled>normal [disabled]</Button>

添加 \`disabled\` 属性即可让按钮处于不可用状态，同时按钮样式也会改变

<div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
  <Button disabled>normal [disabled]</Button>
</div>
${lastStr}`;

    expect(getLastJsx(str)).toBe(lastStr);
  });
  it('自闭合2', () => {
    const lastStr = `<Button color="red" />`;
    const str = `## zh-CN
    
添加 \`disabled\` 属性即可让按钮处于不可用状态，同时按钮样式也会改变

<div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
    <Button />
    <Button type="primary" disabled>
    primary
    </Button>
<div style={{ backgroundColor: '#827f7f', padding: 8 }}>
    <Button type="primary" disabled ghost>
        ghost
    </Button>
    </div>
</div>
    
${lastStr}`;

    expect(getLastJsx(str)).toBe(lastStr);
  });
  it('多层嵌套1', () => {
    const lastStr = `<p style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
      <Button />
      <Button type="primary" disabled>
          primary
      </Button>
<div style={{ backgroundColor: '#827f7f', padding: 8 }}>
      <Button type="primary" disabled ghost>
          ghost
      </Button>
      {/* 注释 */}
  </div>
  </p>`;
    const str = `## zh-CN

  <Button disabled>normal [disabled]</Button>

  添加 \`disabled\` 属性即可让按钮处于不可用状态，同时按钮样式也会改变

  ${lastStr}`;

    expect(getLastJsx(str)).toBe(lastStr);
  });
  it('多层嵌套2', () => {
    const lastStr = `<a style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
      <Button disabled>normal [disabled]</Button>
        <Button type="primary" disabled>
          primary
        </Button>
        <Button disabled fill>
          fill
        </Button>
        <Button disabled link>
          link
        </Button>
        <Button disabled flat>
          flat
        </Button>
        <Button disabled dashed>
          dashed
        </Button>
<div style={{ backgroundColor: '#827f7f', padding: 8 }}>
          <Button type="primary" disabled ghost>
            ghost
            <Button type="primary" disabled ghost>
              ghost
              <Button type="primary" disabled ghost>
                ghost
              </Button>
            </Button>
            {/* 注释 */}
          </Button>
        </div>
      </a>`;
    const str = `## zh-CN

  添加 \`disabled\` 属性即可让按钮处于不可用状态，同时按钮样式也会改变

  ${lastStr}`;

    expect(getLastJsx(str)).toBe(lastStr);
  });
});
