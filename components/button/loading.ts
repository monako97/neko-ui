import icon from '../icon';

const loadingIcon = () =>
  icon({
    children: [
      {
        qualifiedName: 'g',
        style: 'transform-box:fill-box; transform-origin:center;',
        children: [
          {
            qualifiedName: 'path',
            d: 'M512 64c247.2 0 448 200.8 448 448h-64c0-212-172-384-384-384V64zm0 832c-212 0-384-172-384-384H64c0 247.2 200.8 448 448 448v-64z',
          },
          {
            qualifiedName: 'animateTransform',
            attributeName: 'transform',
            type: 'rotate',
            form: '0',
            to: '360',
            dur: '1s',
            repeatCount: 'indefinite',
          },
        ],
      },
    ],
  });

export default loadingIcon;
