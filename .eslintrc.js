module.exports = {
    env: {
        browser: true,
        node: true,
        es6: true,
    },
    plugins: ['import'],
    extends: ['airbnb-base', 'prettier', 'plugin:import/recommended'],
    rules: {
        'no-console': 'off',
    },
};
