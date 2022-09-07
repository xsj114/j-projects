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
                text: '资源下载', 
                link: '/resources/'
            }
        ],
        footer: {
            message: '版权声明',
            copyright: '本文档内容版权为xushijie所有，保留所有权利'
        },
        carbonAds: {
            code: 'your-carbon-code',
            placement: 'your-carbon-placement'
        },
        editLink: {
            pattern: 'https://github.com/vuejs/vitepress/edit/main/docs/:path',
            text: 'Edit this page on GitHub'
        },
        lastUpdatedText: 'Updated Date',
        docFooter: {
            prev: 'Pagina prior',
            next: 'Proxima pagina'
        }
    }
}
