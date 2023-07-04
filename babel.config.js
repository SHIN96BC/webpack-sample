module.exports = {
    presets: [
        ['@babel/preset-env', {
            targets: {
                chrome: '79', // 크롬 79까지 지원하는 코드를 만듭니다.
                ie: '11',     // 인터넷 익스플로러 11까지 지원하는 코드를 만듭니다.
            },
            useBuiltIns: 'usage',  // 기본값이 usage 입니다.('entry', false도 올 수 있습니다.)
            corejs: {
                version: 2, // 기본값이 2입니다. (3도 올 수 있습니다.) 
            }
        }]
    ]
};