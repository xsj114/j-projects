export default {
    markdown: {
        lineNumbers: true,
        toc: true
    },
    themeConfig: {
        siteTitle: 'My Custom Title',
        nav: [
            { 
                text: '项目', 
                items: [
                    {
                        text: 'j-http-code',
                        link: '/j-http-code',
                    },
                    {
                        text: 'j-is',
                        link: '/j-is',
                    },
                ] 
            },
            { 
                text: '资源下载', 
                link: '/resources'
            },
            { 
                text: '常见问题', 
                link: 'problem' 
            },
            {
                text: 'GitHub',
                link: 'https://github.com/xsj114/j-projects'
            }
        ]
    }
}
