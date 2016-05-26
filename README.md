# Webpack+React多页面应用探索

## 前言

Webpack非常适用单页面的应用，官方和网上都有大量的例子，对于在多页面的应用和实践比较少见。	
本文主要以Webpack+React为例来探索在多页面下的开发模式。
主要实现以下几点：

- 独立的开发服务器
- 每个页面对应一个入口文件，页面根据入口文件自动生成，并插入对应的css和js
- 采用React + Es6的方式进行组件模块化开发
- 资源文件自动打包到对应的目录里

## 目录结构说明

```

│ web 
        ├─mock<—————测试数据
        ├─dist<—————编译后的文件
        ├─view<—————生成的html文件
        └─src 开发目录
           ├─app.js<—————全局样式,全局方法
           ├─template.html<—————html模板文件
           ├─common<—————公共资源
           └─view<—————页面资源，每个页面都有独立的img,css,js
			├─index
			└─about
```

## 开发环境

安装Node和NPM，新版本Node已经继承NPM     
安装Webpack ``npm install webpack -g``  [http://webpack.github.io/](http://webpack.github.io/)  
安装Babel ``npm install --global babel-cli``

## 安装npm插件

``npm install``

## 相关命令

- ``npm run dev`` 开发模式,访问``127.0.0.1:3000/dist/index``
- ``npm run build`` 将文件编译,压缩,打包,访问``127.0.0.1:3000/view/index``查看效果
