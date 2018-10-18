module.exports = {
	plugins: [
		require("autoprefixer")({browsers: "cover 95%"}),
		require("postcss-preset-env")({browsers: "cover 95%"})
	]
}