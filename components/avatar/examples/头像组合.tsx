import { AvatarGroup } from 'neko-ui';

const Demo = () => {
  return (
    <div>
      <AvatarGroup
        data={Array(4).fill({
          src: 'https://gw.alipayobjects.com/zos/alicdn/HJtErOC0O/avatar.png',
        })}
      />
      <br />
      <AvatarGroup
        data={Array(20)
          .fill(0)
          .map((_, i) => {
            if (i % 2) {
              return {
                src: 'https://gw.alipayobjects.com/zos/alicdn/HJtErOC0O/avatar.png',
              };
            }
            return {
              username: ['avatar', 'gw', 'bjec', '#zos'][i % 3],
              color: ['#cabdeb', 'green', '#e9887c', '#e989ua'][i % 3],
            };
          })}
        maxCount={3}
      />
    </div>
  );
};

export default Demo;
