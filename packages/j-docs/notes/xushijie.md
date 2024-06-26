---
title: 个人信息及配置 
titleTemplate: 备忘录
outline: 'deep'
---
[toc]
   
# 个人信息及配置


## 短视频帐号

::: tip 蝴蝶号
`人设号：17278084162`
:::

::: tip 抖音
`人设号：18301036993`
:::

::: tip 快手
`人设号：18301036993`<br/>
`卖货号：17278084162`
:::

## 网址及账号


### 购买虚拟手机号网址

购买官网地址：https://sms-activate.org/cn<br/>
账号： 15101587790@163.com
密码：常用(首字母需大写)

### 国外服务器

购买官网地址：https://www.linode.com<br/>
账号：xushijie<br/>


配置

```shell
vim /etc/shadowsocks-libev/config.json
```

```json
{
    "server": "45.33.88.93",
    "mode": "tcp_and_udp",
    "server_port": 8333,
    "local_port": 1080,
    "password": "xushijie",
    "timeout": 60,
    "method": "chacha20"
}
```

重新启动服务

```shell
service shadowsocks-libev restart -c /etc/shadowsocks-libev/config.json
```

### 信云领创

网站地址：http://115.28.205.4:8002/cdist/index.html#/home<br/>
账号：`手机号`<br/>
密码：2302246

### Google

账号：xushijie114710@gmail.com

### Npm

账号：xu-shijie

账号：j-xushijie


### 谷歌上网助手

账号：15101587790@163.com

### onenov

账号：15101587790@163.com<br/>
网站地址：`https://onenov.net/#/login`<br/>
工具地址：`https://github.com/yichengchen/clashX/releases`


### 阿里云

账号：xushijie114


## mac系统重零搭建


### 代理配置

虽然有了代理服务器，但是在命令行中，还是不能进行翻墙下载，如果想要在命令行中翻墙，需要如下配置

```shell
export http_proxy=http://127.0.0.1:1087;
export https_proxy=http://127.0.0.1:1087;
```

### 安装brew和git

```shell
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

```shell
brew install git
```

### vim搭建


#### 安装`vim-plug`插件管理器
```shell
curl -fLo ~/.vim/autoload/plug.vim --create-dirs \
    https://raw.githubusercontent.com/junegunn/vim-plug/master/plug.vim
```

#### 下载`iTerm2`的`nordtheme`

`https://github.com/nordtheme/iterm2`


### 安装`iTerm2`的字体

```shell
brew tap homebrew/cask-fonts
brew install font-hack-nerd-font --cask
```





