// module.exports = {
//   plugins: {
//     autoprefixer: {},
//     'postcss-pxtorem': {
//       rootValue: 37.5,
//       propList: ['*']
//     }
//   }
// }
const { sep } = require('path')

module.exports = ({ file }) => {
  let rootValue = file.dirname.indexOf(`node_modules${sep}vant`) !== -1
    ? 37.5
    : 75
    // vant  按照   375
    // 设计图按照    750
    // ${sep}   各个系统的 ‘/’  不一样

  return {
    plugins: {
      autoprefixer: {},
      'postcss-pxtorem': {
        rootValue,
        propList: ['*']
      }
    }
  }
}
