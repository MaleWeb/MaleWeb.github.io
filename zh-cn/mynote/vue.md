# Vue 

## Interview

### Vue实现数据双向绑定  
ES6语法，[Object.defineProperty](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty)(obj,prop,descriptor)  

对set/get方法的重写，一种订阅者和发布车的模式；  

实现原理三步走：  

1.实现一个监听器Observer，用来劫持并监听所有属性，如果有变动的，就通知订阅者。  

2.实现一个订阅者Watcher，可以收到属性的变化通知并执行相应的函数，从而更新视图。  

3.实现一个解析器Compile，可以扫描和解析每个节点的相关指令，并根据初始化模板数据以及初始化相应的订阅器。  

[详细文档](https://www.cnblogs.com/zhouyideboke/p/9626804.html)  

### Vue路由的模式？与后端的路由通信？

- hash，URL中的#符号，这种方式hash不会重载页面
- history，利用了HTML5 History Interface 中增加pushState()和replaceState()方法  

重点说下History模式： 
路径匹配不到，服务端会返回404，需要后台进行特殊处理一下  

Nginx:  
```
location /{
    try_files $url $uri/ /index.html
}
```
Apache:  
```
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>
```  
Node:  
```
const http = require('http')
const fs = require('fs')
const httpPort = 80

http.createServer((req, res) => {
  fs.readFile('index.htm', 'utf-8', (err, content) => {
    if (err) {
      console.log('We cannot open "index.htm" file.')
    }

    res.writeHead(200, {
      'Content-Type': 'text/html; charset=utf-8'
    })

    res.end(content)
  })
}).listen(httpPort, () => {
  console.log('Server listening on: http://localhost:%s', httpPort)
})

```  

