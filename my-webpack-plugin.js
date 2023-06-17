class MyWebpackPlugin {
	apply(compiler) {
		// compiler.hooks.done.tap('My Plugin', stats => {
		// 	console.log('MyPlugin: done');
		// });

        compiler.hooks.emit.tapAsync('emit', (compilation, callback) => {
            const source = compilation.assets['main.js'].source();

            // 빌드된 결과물에 주석으로 빌드된 날짜를 추가
            compilation.assets['main.js'].source = () => {
                const banner = [
                    '/**',
                    ' * 이것은 BannerPlugin이 처리한 결과입니다.',
                    ' * Build Date: 2023-06-17',
                    ' */'
                ].join('\n');
                return banner + '\n\n' + source;
            };

            console.log(compilation.assets['main.js'].source());

            callback();
        });
	};
};

module.exports = MyWebpackPlugin;