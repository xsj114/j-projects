export default {
    title: '许仕杰',
    markdown: {
        lineNumbers: true,
        config: (md) => {
    
        }
    },
    themeConfig: {
        logo: '/assets/logo.png',
        socialLinks: [
            {
                icon: 'github',
                link: 'https://github.com/xsj114/j-projects'
            } 
        ],
        nav: [
            { 
                text: '个人简历', 
                link: '/introduce/'
            },
            { 
                text: '项目', 
                items: [
                    {
                        text: 'j-http-code',
                        link: '/projects/j-http-code',
                    },
                    {
                        text: 'j-is',
                        link: '/projects/j-is',
                    },
                ] 
            },
            {
                text: '个人笔记',
                link: '/notes/html'
            },
            { 
                text: '资源下载', 
                link: '/resources/'
            }
        ],
        sidebar: {
            '/notes/': [
                {
                    text: '学习笔记',
                    collapsible: true,
                    collapsed: false,
                    items: [
                        {
                            text: 'HTML',
                            link: '/notes/html'
                        },
                        {
                            text: 'CSS',
                            link: '/notes/css'
                        },
                        {
                            text: 'JAVASCRIPT',
                            link: '/notes/javascript'
                        },
                        {
                            text: 'REACT',
                            link: '/notes/react'
                        },
                        {
                            text: 'TYPESCRIPT',
                            link: '/notes/typescript'
                        },
                        {
                            text: '设计模式',
                            link: '/notes/design'
                        },
                        {
                            text: '算法',
                            link: '/notes/algorithm'
                        },
                        {
                            text: '计算机基础',
                            link: '/notes/basis'
                        },
                        {
                            text: 'VIM',
                            link: '/notes/vim'
                        }
                    ]
                },
                {
                    text: '备忘录',
                    collapsible: true,
                    collapsed: false,
                    items: [
                        {
                            text: '账号与信息',
                            link: '/notes/xushijie'
                        }
                    ]
                }
            ]
        },
        footer: {
            message: '版权声明',
            copyright: '本文档内容版权为xushijie所有，保留所有权利'
        }
    }
}
