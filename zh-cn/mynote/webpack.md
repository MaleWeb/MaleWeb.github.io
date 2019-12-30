### 打包原理  
- 识别入口文件  

- 通过逐层识别模块依赖。（Commonjs、amd或者es6的import，webpack都会对其进行分析。来获取代码的依赖）  

- webpack做的就是分析代码。转换代码，编译代码，输出代码  

- 最终形成打包后的代码  

### Loader  
!> 什么是loader  

loader是文件加载器，能够加载资源文件，并对这些文件进行处理，诸如编译、压缩等，最终一起打包到指定的文件中  

- 处理一个文件可以使用多个loader，loader的执行顺序是和本身的顺序是相反的，即最后一个loader最先执行，第一个loader最后执行。  

- 第一个执行的loader接收源文件内容作为参数，其他loader接收前一个执行的loader的返回值作为参数。最后执行的loader会返回此模块的JavaScript源码。  
  
!> 手写一个loader  

- 处理.txt文件  
- 对字符串做反转操作  
- 首写字母大写  
  
例如：bewelam => Maleweb 

```js
//loader1.js
module.exports = function(src) {
    if(src) {
    console.log('****loader1 input:',src);
    //拆分+反转顺序+存入
    src = src.split('').reverse().join('');
    }
    return src;
}
//loader2.js
module.exports = function(src) {
    if(src){
    console.log('****loader2 input:',src);
    //返回第0个位置字母+转化为大写+从第1个位置截取
    src = src.charAt(0).toUpperCase() + src.slice(1);
    }
    return `module.exports = '${src}'`;
}
//test.txt
bewelam  
//配置webpack  
module.exports = {
    entry:{
        index:'./src/js/index.js'
    },
    plugins:[...],
    optimization:{...},
    output:{...},
    module:{
        rules:[
            ...,
            {
                test:/\.txt$/,
                use:[
                    './loader/loader2.js',
                    './loader/loader1.js'
                ]
            }
        ]
    }
}
//在入口文件里面导入txt即可
//package.json配置  常规配置就省略了  
npm run build  
//=>Maleweb
```  
更多详细api参考[loader](https://www.webpackjs.com/api/loaders/)  
### Babel  
babel是一个转码器，目前开发react、vue项目都要使用到它。它可以把es6+的语法转换为es5，也可以转换JSX等语法。
这里手动通过自定义插件的方式实现一下代码的转换`ES6的class转换为es5`  



