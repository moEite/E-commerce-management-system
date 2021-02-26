module.export = {
  rules:[
    {
      test: /\.vue$/,
      loader: 'vue-loader',
    },
    {
      test: /\.less$/,
      loader: 'style-loader!css-loader!less-loader'
    }
  ]

}
