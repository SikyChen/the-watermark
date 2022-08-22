/**
 * 比较两次的 config 配置是否相同
 * @param {Object} config 
 * @param {Object} other 
 * @returns Boolean
 */
export const isConfigEqual = (config, other) => {

	if (config === other) return true;

	let configProps = Object.getOwnPropertyNames(config);
	let otherProps = Object.getOwnPropertyNames(other);
	if (configProps.length !== otherProps.length) return false;

	for (let prop in config) {
		if (!other.hasOwnProperty(prop) || other[prop] !== config[prop]) {
			return false;
		}
	}

	return true;
}

/**
 * 获取容器下的水印 DOM 节点
 * @param {HTMLDocumentElement} container 水印所在容器的 DOM 节点
 * @returns 水印 DOM 节点
 */
export const getWatermarkByContainer = (container) => {
  if (!container) return null;
  
  for(let child of container.childNodes.values()) {
    if (child.className === '_watermark') {
      return child;
    }
  }

  return null;
}
