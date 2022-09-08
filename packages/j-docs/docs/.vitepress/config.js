export default {
    title: '许仕杰',
    lastUpdated: true,
    markdown: {
        lineNumbers: true,
        toc: true
    },
    appearance: false,
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
                link: '/notes/'
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
                    items: [
                        {
                            text: 'html',
                            link: '/notes/html'
                        },
                        {
                            text: 'css',
                            link: '/notes/css'
                        },
                        {
                            text: 'javascript',
                            link: '/notes/javascript'
                        },
                        {
                            text: '数据结构与算法',
                            link: '/notes/data'
                        },
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
