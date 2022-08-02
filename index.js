
// TODO 改为 class 写法

const watermark = (config = {}) => {
  let {
    container,
    content = 'watermark',
    width = 300,
    height = 200,
    zIndex = 1000,
    font = "28px Microsoft Yahei",
    textAlign = 'center',
    textBaseline = 'middle',
    color = 'rgba(0, 0, 0, 0.2)',
    rotate = -34,
  } = config;

  let isFixed = false;
  let observer = null;

  if (!container) {
    container = document.querySelector('body');
    isFixed = true;
  }

  const canvas = document.createElement('canvas');
  canvas.setAttribute('width', width);
  canvas.setAttribute('height', height);

  const ctx = canvas.getContext('2d');
  ctx.font = font;
  ctx.textAlign = textAlign;
  ctx.textBaseline = textBaseline;
  ctx.fillStyle = color;
  ctx.translate(parseFloat(width) / 2, parseFloat(height) / 2);
  ctx.rotate(Math.PI / 180 * rotate);
  ctx.fillText(content, 0, 0);

  const dataUrl = canvas.toDataURL();

  if (!['absolute', 'relative', 'fixed'].includes(container.style.position)) {
    container.style.position = 'relative';
  }

  const wm = document.createElement('div');
  const styleString = `
    position: ${isFixed ? 'fixed' : 'absolute'};
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: ${zIndex};
    pointer-events:none;
    background-repeat:repeat;
    background: url("${dataUrl}");
  `
  wm.setAttribute('style', styleString);
  wm.setAttribute('class', '_watermark');
  container.appendChild(wm);

  const MutationObserver = window.MutationObserver;
  if (MutationObserver) {
    observer = new MutationObserver(
      () => {
        const _watermark = document.querySelector('._watermark');
        if (_watermark && _watermark.getAttribute('style') !== styleString || !_watermark) {
          observer.disconnect();
          observer = null;
          _watermark && _watermark.remove && _watermark.remove();
          watermark(config);
        }
      }
    );

    observer.observe(
      container,
      {
        childList: true,
        attributes: true,
        subtree: true,
      }
    );
  }

  function hidden() {
    observer && observer.disconnect();
    observer = null;
    wm && wm.remove && wm.remove();
  }

  return {
    hidden,
  }
}

// export default watermark;
