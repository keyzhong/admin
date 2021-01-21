module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: ['plugin:vue/essential', '@vue/standard'],
  parserOptions: {
    parser: 'babel-eslint'
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off'
    // 'space-before-function-paren': ‘off’ 函数后没空格不报错
    // vscode 配置  "javascript.format.insertSpaceBeforeFunctionParenthesis": true, 格式化后不删除函数后空格
  }
}
