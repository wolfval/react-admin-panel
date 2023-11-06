const gulp = require("gulp"); 
const webpack = require("webpack-stream");

const dist = "C:\\MAMP\\htdocs\\react_admin\\admin"; 

gulp.task("copy-html", () => {
  return gulp.src("./app/src/index.html") 
              .pipe(gulp.dest(dist))
})

gulp.task("build-js", () => {
  return gulp.src("./app/src/main.js")
              .pipe(webpack({ 
                mode: 'development', 
                output: { 
                  filename: 'script.js'
                },
                watch: false,
                devtool: "source-map", 
                module: { 
                  rules: [
                    {
                      test: /\.(?:js|mjs|cjs)$/,
                      exclude: /node_modules/,
                      use: {
                        loader: 'babel-loader',
                        options: {
                          presets: [
                            ['@babel/preset-env', { 
                              debug: true, 
                              corejs: 3, 
                              useBuiltIns: "usage",  
                              targets: "defaults" 
                            }],
                            "@babel-react"
                          ]
                        }
                      }
                    }
                  ]
                }
              }))
              .pipe(gulp.dest(dist))
})