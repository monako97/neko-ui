const doc = document.documentElement;

export const defaultPosi = {
  x: 0,
  y: 0,
  width: 0,
  height: 0,
};

function point(e: MouseEvent) {
  Object.assign(defaultPosi, {
    x: doc.clientWidth / 2 - e.clientX,
    y: doc.clientHeight / 2 - e.clientY,
  });
}
doc.addEventListener('click', point, true);
