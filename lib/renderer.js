'use strict';
const renderers = {
	silent: require('listr-silent-renderer'),
	verbose: require('listr-verbose-renderer'),
	default: require('listr-update-renderer')
};

const isRendererSupported = renderer => process.stdout.isTTY || renderer.nonTTY === true;

const getRendererClass = renderer => {
	if (typeof renderer === 'string') {
		return renderers[renderer] || renderers.default;
	}

	return typeof renderer === 'function' ? renderer : renderers.default;
};

exports.getRenderer = (renderer, fallbackRenderer) => {
	console.log('Check for renderer: ', renderer);

	let ret = getRendererClass(renderer);

	console.log('Is renderer supported? ', isRendererSupported(ret));

	if (!isRendererSupported(ret)) {
		ret = getRendererClass(fallbackRenderer);

		if (!isRendererSupported(ret)) {
			ret = renderers.default;
		}
	}

	console.log('Renderer returned: ', ret);

	return ret;
};
