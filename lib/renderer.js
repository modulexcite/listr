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
	let ret = getRendererClass(renderer);

	if (!isRendererSupported(ret)) {
		ret = getRendererClass(fallbackRenderer);

		if (!isRendererSupported(ret)) {
			ret = renderers.default;
		}
	}

	return ret;
};
