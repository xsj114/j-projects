---
title: VIM
titleTemplate: 学习笔记
outline: 'deep'
---

[toc]

# VIM

##  常用快捷键

### insert模式下常用的快捷键

| 快捷键 | 描述 |
| ---- | ---- |
| `ctrl+h` | 删除上一个字符 |
| `ctrl+w` |  删除上一个单词 |
| `ctrl+u` |  删除当前行 |
| `ctrl+n` |  搜索当前文件的关键词将单词以前缀匹配的方式进行补全 |
| `ctrl+x ctrl+f` |  文件路径补全 |
| `ctrl+x ctrl+o` |  全能补全 |


### normal模式下常用的快捷键


| 快捷键 | 描述 |
| ---- | ---- |
| `gi` | 快速跳转到你最后一次编辑的地方并进入插入模式 |
| `w/W` | 移到下一个单词开头 |  
| `e/E` | 移到下一个单词结尾 | 
| `b/B` | 回到上一个单词开头 | 
| `H/M/L` | 跳转到屏幕的开头，中间，结尾 | 
| `daw` | 快速删除一个单词 |  
| `dt"` | 删除到" |   
| `r` | 替换一个字符 |   
| `s` | 替换并进入插入模式 |
| `c` |  配合文本对象，快速进行修改 |
| `n/N` | 跳转到下一个或者上一个匹配 |
| `/`或者`?` | 进行前向或者反向搜索 |
| `*`或者`#` | 进行当前单词的前向和后向匹配 |

### command模式下常用的快捷键

> 搜索替换

`:[range]s[ubstitute]/{pattern}/{string}/[flags]`

```
range表示范围
    :10,20  表示10-20行
    %       表示当前这个文件
substitute命令允许我们查找并且替换掉文本，并且支持正则表达式
pattern表示搜索的模式
string表示要替换的字符串
flags表示标志
    g表示全局范围内执行
    c表示确认，可以确认或者拒绝修改
    n报告匹配到的次数而不替换，可以用来查询匹配次数
```
        
      
        
> Buffer缓冲区之间切换

```
:ls 列举当前缓冲区
:bn 跳转到第n个缓冲区
:bpre 跳转到前一个缓冲区
:bnext 跳转到后一个缓冲区
:bfirst 跳转到第一个缓冲区
:blast 跳转到最后一个缓冲区
```
        
## 文本对象

`[number]<command>[text object]`

```
number表示次数
command是命令
    d(elete)
    c(hange)
    y(yank)
text object是要操作的文本对象
    单词w
    句子s
    段落p 
```

## 宏
使用`q`来录制同时也是`q`结束录制

## 个人配置文件

```vim
" vim的插件网站 https://vimawesome.com/

" vim的主题网站 https://github.com/mbadolato/iTerm2-Color-Schemes/tree/master/schemes（可复制文件到本地，在iTerm配置中import）

let mapleader = ','

" 设置行号
set number

" 高亮搜索
set hlsearch

" 语法高亮
syntax on

" 1tab == 4 spaces
set shiftwidth=4
set tabstop=4

" 自动索引
set smartindent

" 使用空格来代替tab键
set expandtab

" 设置编码
set encoding=UTF-8

" leader加w 进行保存
inoremap <leader>w <Esc>:w<cr>

" 选中列高亮
set cursorcolumn

" 选中行高亮
set cursorline

" 切换窗口
noremap <C-h> <C-w>h
noremap <C-j> <C-w>j
noremap <C-k> <C-w>k
noremap <C-l> <C-w>l

" vim-plug 插件下载器
call plug#begin('~/.vim/plugged')

" vim 的开屏插件
Plug 'mhinz/vim-startify'

" vim 的状态行插件
Plug 'vim-airline/vim-airline'
Plug 'vim-airline/vim-airline-themes'

" vim 的背景色插件
Plug 'altercation/vim-colors-solarized'

" vim 的主题色插件
Plug 'w0ng/vim-hybrid'

" vim nerdTree目录树
" 安装好后，icon不能显示，需要执行以下两条命令，下载字体
" brew tap homebrew/cask-fonts
" brew install --cask font-hack-nerd-font
Plug 'scrooloose/nerdtree'

" vim 的模糊搜索器
Plug 'ctrlpvim/ctrlp.vim'

" vim 的快速定位插件 https://github.com/easymotion/vim-easymotion
Plug 'easymotion/vim-easymotion'

" vim 的快速编辑插件 https://github.com/tpope/vim-surround
" ys 增加成对内容  normal模式下
" cs 修改成对内容  normal模式下
" ds 删除成对内容  normal模式下
Plug 'tpope/vim-surround'

" vim的模糊搜索工具
" 使用Ag[PATTERN] 模糊搜索字符串
" 使用Files[PATH] 模糊搜索目录
Plug 'junegunn/fzf', { 'dir': '~/.fzf', 'do': './install --all' }
Plug 'junegunn/fzf.vim'

" vim的搜索替换插件
Plug 'brooth/far.vim'

" vim的高亮插件
Plug 'lfv89/vim-interestingwords'

" vim的注释插件
" gc注释和取消注释
Plug 'tpope/vim-commentary'

" vim的自动格式化插件
Plug 'sbdchd/neoformat'

" vim的js语言格式化库 配合neoformat,ale
Plug 'prettier/vim-prettier'

" vim的静态检查插件
Plug 'w0rp/ale'

" vim里使用git的插件
Plug 'tpope/vim-fugitive'

" vim里显示git的变更插件
Plug 'airblade/vim-gitgutter'

" vim里查看git的代码提交记录插件
Plug 'junegunn/gv.vim'

" vim的浏览插件
Plug 'majutsushi/tagbar'

" vim 的图标插件
Plug 'ryanoasis/vim-devicons'

" vim 的css颜色插件
Plug 'ap/vim-css-color'

"vim 的主题色插件 
Plug 'arcticicestudio/nord-vim'

" vim 的语法和缩进插件
Plug 'lepture/vim-jinja'

" vim 的快速编辑大文件插件
Plug 'vim-scripts/LargeFile'

" vim 的缩进线插件
Plug 'nathanaelkane/vim-indent-guides'
Plug 'Yggdroot/indentLine'

" vim 的vue插件
Plug 'posva/vim-vue'

call plug#end()


" vim的背景色配置
" syntax enable
" set background=dark
" colorscheme solarized
" let g:solarized_termcolors=256

" vim 的主题色配置
" set background=dark
" colorscheme hybrid

" vim 使用nord-vim的主题色配置
colorscheme nord

" nerdTree的配置
let NERDTreeShowHidden = 1
nnoremap <C-v> :NERDTreeFind<cr>
nnoremap <C-m> :NERDTreeToggle<cr>

" 模糊搜索器配置
let g:ctrlp_map = '<c-p>'

" 快速定位插件配置
nmap ss <Plug>(easymotion-s2)

" vim 的图片插件配置
let g:webdevicons_enable = 1
let g:webdevicons_enable_nerdtree = 1
let g:webdevicons_enable_ctrlp = 1

" vim-airline 字体设置
let g:airline_powerline_fonts = 1 

" tagbar 配置
nnoremap <C-t> :TagbarToggle<cr>
```

