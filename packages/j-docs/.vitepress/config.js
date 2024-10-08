const Config = {
    title: '许仕杰',
    titleTemplate: false,
    lastUpdated: true,
    base: '/j-projects/',
    markdown: {
        lineNumbers: true,
        config: (md) => {}
    },
    outDir: './dist',
    themeConfig: {
        logo: '/j-projects/logo.png',
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
                            text: 'VUE',
                            link: '/notes/vue'
                        },
                        {
                            text: 'TYPESCRIPT',
                            link: '/notes/typescript'
                        },
                        {
                            text: 'YARN',
                            link: '/notes/yarn'
                        },
                        {
                            text: 'RESTFUL',
                            link: '/notes/resetful'
                        },
                        {
                            text: '设计模式',
                            link: '/notes/design'
                        },
                        {
                            text: 'MYSQL',
                            link: '/notes/mysql'
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
                    text: '面试总结',
                    collapsible: true,
                    collapsed: true,
                    items: [
                        {
                            text: 'css',
                            link: '/notes/interview/css'
                        },
                        {
                            text: 'javascript',
                            link: '/notes/interview/javascript'
                        },
                        {
                            text: '性能优化',
                            link: '/notes/interview/performance'
                        },
                        {
                            text: 'webpack',
                            link: '/notes/interview/webpack'
                        },
                        {
                            text: 'node',
                            link: '/notes/interview/node'
                        },
                        {
                            text: 'code',
                            link: '/notes/interview/code'
                        }
                    ]
                },
                {
                    text: '消费',
                    collapsible: true,
                    collapsed: true,
                    items: [
                        {
                            text: '八字经',
                            link: '/notes/consume/consume'
                        },
                        {
                            text: '低成本创业',
                            link: '/notes/consume/lowcost'
                        }
                    ]
                },
                {
                    text: '管理',
                    collapsible: true,
                    collapsed: true,
                    items: [
                        {
                            text: '管理七剑',
                            link: '/notes/manage/index'
                        },
                    ]
                },
                {
                    text: '模式',
                    collapsible: true,
                    collapsed: true,
                    items: [
                        {
                            text: '盈利模式',
                            link: '/notes/mode/profit'
                        },
                    ]
                },
                {
                    text: '抖音相关',
                    collapsible: true,
                    collapsed: true,
                    items: [
                        {
                            text: '本地生活',
                            link: '/notes/douyin/local_life'
                        },
                        {
                            text: '带劵达人',
                            link: '/notes/douyin/travel'
                        },
                    ]
                },
                {
                    text: '快手相关',
                    collapsible: true,
                    collapsed: true,
                    items: [
                        {
                            text: '快手基础',
                            link: '/notes/kuaishou/basic'
                        },
                        {
                            text: '违规避坑指南',
                            link: '/notes/kuaishou/guide'
                        },
                        {
                            text: '投流',
                            link: '/notes/kuaishou/investmentFlow'
                        },
                        {
                            text: '选品',
                            link: '/notes/kuaishou/product'
                        },
                        {
                            text: '短视频',
                            link: '/notes/kuaishou/video'
                        },
                        {
                            text: '直播',
                            link: '/notes/kuaishou/liveBroadcast'
                        },
                        {
                            text: '商品卡',
                            link: '/notes/kuaishou/card'
                        },
                        {
                            text: '对标账号',
                            link: '/notes/kuaishou/account'
                        },
                    ]
                },
                {
                    text: '视频号相关',
                    collapsible: true,
                    collapsed: true,
                    items: [
                        {
                            text: '视频号基础',
                            link: '/notes/shipinhao/basic'
                        },
                        {
                            text: '对标账号',
                            link: '/notes/shipinhao/account'
                        },
                    ]
                },
                {
                    text: '产品',
                    collapsible: true,
                    collapsed: true,
                    items: process.env.NODE_ENV === 'development' ? [
                        {
                            text: '丝袜',
                            link: '/notes/product/stockings'
                        }
                    ] : []
                },
                {
                    text: '备忘录',
                    collapsible: true,
                    collapsed: true,
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


export default Config;
