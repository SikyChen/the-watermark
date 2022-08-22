# the-watermark

在网页中添加水印。

基本原理是通过 canvas 生成一张水印图片并转为 dataUrl ，通过 background-image 的方式挂到水印 dom 元素上。最后 append 到指定的容器中。

## 使用

``` html
<script src="./lib/the-watermark.js"></script>

<script>
  new Watermark();
</script>
```

``` javascript
import Watermark from "the-watermark";

new Watermark({
  container: document.querySelector('.section'),
  content: 'the-watermark',
});
```

## 配置

| Name          | Describe  | Type | Default |
| ----          | ----      | :--: | :--: |
| container     | 待挂载的容器，如果不指定，则默认为 body | DOM | body |
| content       | 水印需要显示的文本 | string | "watermark" |
| width         | 每个水印文本所占空间的宽度。可以理解为用于控制水印横向的密度 | number | 300 |
| height        | 每个水印文本所占空间的高度。可以理解为用于控制水印纵向的密度 | number | 200 |
| zIndex        | CSS 的 zIndex | number | 1000 |
| font          | 同 canvas 用法的 font，控制水印文本的文字样式 | string | "28px auto" |
| textAlign     | 同 canvas 用法的 textAlign，控制文本显示位置， | string | "center" |
| textBaseline  | 同 canvas 用法的 textBaseline，控制文本显示位置 | string | "middle" |
| color         | 同 canvas 用法的 color，控制文本颜色和透明度 | string | "rgba(0, 0, 0, 0.2)" |
| rotate        | 文本旋转角度 | number | -34 |
