module.exports = (api) => {
	api.cache(true);

	return {
		presets: [
			[
				'@babel/preset-env',
				{
					useBuiltIns: 'entry',
					corejs: 3,
				},
			],
			'@babel/preset-react',
		],
		plugins: ['@babel/plugin-transform-modules-commonjs'],
	};
};
