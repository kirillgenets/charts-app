const path = require('path');
const autoprefixer = require('autoprefixer');

module.exports = async ({ config }) => {
	config.module.rules.push({
		enforce: 'pre',
		test: /\.jsx?$/,
		include: [
			path.resolve(__dirname, '../../../src'),
			path.resolve(__dirname, '../../../node_modules/babel-preset-react-app'),
		],
		exclude: [/\.stories\.js$/],
		loaders: ['babel-loader'],
	});

	config.module.rules.push({
		test: /\.scss$/,
		use: [
			'style-loader',
			'css-loader',
			'sass-loader',
			{
				loader: 'postcss-loader',
				options: {
					plugins: [autoprefixer()],
					sourceMap: true,
				},
			},
		],
		include: path.resolve(__dirname, '../../../'),
	});

	// eslint-disable-next-line no-param-reassign
	config.optimization.minimize = false;

	return config;
};
