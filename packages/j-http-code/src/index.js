const is = require( 'j-is' );

const code = {
    '100': {
        cn: '继续',
        en: 'Continue',
    },
    '101': {
        cn: '交换协议',
        en: 'Switching Protocols',
    },
    '102': {
        cn: '加工',
        en: 'Processing',
    },
    '103': {
        cn: '早期提示',
        en: 'Early Hints',
    },
    '200': {
        cn: '请求成功',
        en: 'OK',
    },
    '201': {
        cn: '已创建',
        en: 'Created',
    },
    '202': {
        cn: '已接收',
        en: 'Accepted',
    },
    '203': {
        cn: '非权威信息',
        en: 'Non-Authoritative Information',
    },
    '204': {
        cn: '无内容',
        en: 'No Content',
    },
    '205': {
        cn: '重置内容',
        en: 'Reset Content',
    },
    '206': {
        cn: '部分内容',
        en: 'Partial Content',
    },
    '207': {
        cn: '多状态',
        en: 'Multi-Status',
    },
    '208': {
        cn: '已报告',
        en: 'Already Reported',
    },
    '226': {
        cn: '使用即时消息',
        en: 'IM Used',
    },
    // 服务器可执行多种操作。 服务器可根据请求者选择一项操作
    '300': {
        cn: '多种选择',
        en: 'Multiple Choice',
    },
    // 请求的网页已永久移动到新位置。服务器返回此响应时，会自动将请求转到新位置
    '301': {
        cn: '永久移动',
        en: 'Moved Permanently',
    },
    '302': {
        cn: '临时移动',
        en: 'Found',
    },
    //  请求者应当对不同的位置使用单独的GET请求来检索响应时，服务器返回此代码
    '303': {
        cn: '查看其他位置',
        en: 'See Other',
    },
    // 自从上次请求后,请求的网页未修改过, 服务器返回此响应时，不会返回网页内容
    '304': {
        cn: '未修改',
        en: 'Not Modified',
    },
    // 请求者只能使用代理访问请求的网页,如果服务器返回此响应，表示请求者应使用代理
    '305': {
        cn: '使用代理',
        en: 'Use Proxy',
    },
    // 此响应代码不再使用,它只是保留。它曾在HTTP/1.1规范的早期版本中使用过
    '306': {
        cn: '不再使用',
        en: 'Unused',
    },
    '307': {
        cn: '临时跳转',
        en: 'Temporary Redirect',
    },
    '308': {
        cn: '永久跳转',
        en: 'Permanent Redirect',
    },
    // 服务器不理解请求的语法
    '400': {
        cn: '错误请求',
        en: 'Bad Request',
    },
    // 请求要求身份验证,对于需要登录的网页,服务器可能返回此响应
    '401': {
        cn: 'Unauthorized',
        en: '未授权',
    },
    '402': {
        cn: 'Payment Required',
        en: '要求支付',
    },
    // 服务器拒绝请求
    '403': {
        cn: '禁止',
        en: 'Forbidden',
    },
    // 服务器找不到请求的网页
    '404': {
        cn: '未找到',
        en: 'Not Found',
    },
    // 禁用请求中指定的方法
    '405': {
        cn: '方法禁用',
        en: 'Method Not Allowed',
    },
    // 无法使用请求的内容特性响应请求的网页
    '406': {
        cn: '不接受',
        en: 'Not Acceptable',
    },
    '407': {
        cn: '需要代理授权',
        en: 'Proxy Authentication Required',
    },
    '408': {
        cn: '请求超时',
        en: 'Request Timeout',
    },
    '409': {
        cn: '冲突',
        en: 'Conflict',
    },
    // 如果请求的资源已永久删除，服务器就会返回此响应
    '410': {
        cn: '已删除',
        en: 'Gone',
    },
    '411': {
        cn: '需要有效长度',
        en: 'Length Required',
    },
    '412': {
        cn: '未满足前提条件',
        en: 'Precondition Failed',
    },
    '413': {
        cn: '请求实体过大',
        en: 'Payload Too Large',
    },
    '414': {
        cn: '请求的URI过长',
        en: 'URI Too Long',
    },
    '415': {
        cn: '不支持的媒体类型',
        en: 'Unsupported Media Type',
    },
    '416': {
        cn: '请求范围不符合要求',
        en: 'Range Not Satisfiable',
    },
    '417': {
        cn: '未满足期望值',
        en: 'Expectation Failed',
    },
    '418': {
        cn: '我就是个杯具',
        en: 'I\'m a teapot',
    },
    '421': {
        cn: '被误导的请求',
        en: 'Misdirected Request',
    },
    '422': {
        cn: '无法处理的实体',
        en: 'Unprocessable Entity',
    },
    '423': {
        cn: '锁定',
        en: 'Locked',
    },
    '424': {
        cn: '失败的依赖',
        en: 'Failed Dependency',
    },
    '425': {
        cn: '太早',
        en: 'Too Early',
    },
    '426': {
        cn: '需要升级',
        en: 'Upgrade Required',
    },
    '428': {
        cn: '需要先决条件',
        en: 'Precondition Required',
    },
    '429': {
        cn: '请求过多',
        en: 'Too Many Requests',
    },
    '431': {
        cn: '请求标头字段太大',
        en: 'Request Header Fields Too Large',
    },
    '451': {
        cn: '因法律原因不可用',
        en: 'Unavailable For Legal Reasons',
    },
    '500': {
        cn: '内部服务器错误',
        en: 'Internal Server Error',
    },
    '501': {
        cn: '未实现',
        en: 'Not Implemented',
    },
    '502': {
        cn: '错误的网关',
        en: 'Bad Gateway',
    },
    '503': {
        cn: '暂停服务',
        en: 'Service Unavailable',
    },
    '504': {
        cn: '网关超时',
        en: 'Gateway Timeout',
    },
    '505': {
        cn: '不支持HTTP版本',
        en: 'HTTP Version Not Supported',
    },
    '506': {
        cn: '变体也协商',
        en: 'Variant Also Negotiates',
    },
    '507': {
        cn: '存储空间不足',
        en: 'Insufficient Storage',
    },
    '508': {
        cn: '检测到循环',
        en: 'Loop Detected',
    },
    '510': {
        cn: '未扩展',
        en: 'Not Extended',
    },
    '511': {
        cn: '需要网络身份验证',
        en: 'Network Authentication Required',
    },
};

class HttpCode {
    static lang = 'cn';

    constructor() {
        this.codes = new Map( Object.entries( code ) );
    }

    get( code ) {
        if ( !( is.string( code ) || is.number( code ) ) ) {
            throw new Error( 'first param must be string or number' );
        }
        const result = this.codes.get( String( code ) );
        if ( is.string( result ) ) return result;
        return result[ HttpCode.lang ];
    }

    set( code, message ) {
        if ( !( is.string( code ) || is.number( code ) ) ) {
            throw new Error( 'first param must be string or number' );
        }
        if ( !( is.string( message ) || is.object( message ) ) ) {
            throw new Error( 'second param must be string or object' );
        };
        if ( is.object( message ) ) {
            message = Object.assign( {}, this.codes.get( String( code ) ), message );
        };
        this.codes.set( String( code ), message );
    }
}

module.exports = HttpCode;

/*
 * 通用库的封装流程
   1.目前有什么问题
   2.做个什么来解决这些问题
   3.查看资料

   封装库的思考和抉择
   1.我到底要解决哪些问题，如何解决？
   2.我要做一个什么级别的通用库？
   3.我做的封装被应用之后，业务开发会有哪些变化？我希望有哪些变化？
   4.如何能让历史代码更简单的迁移到新的封装？
   5.我是不是该支持业务上对此的二次封装？
   6.应用我的封装之后，会不会对长期产生负面影响，例如有些本身可以实现的功能无法实现？
   7.如何让大家在写代码的时候，能更自然的使用封装，不容易忘了用，而使用原生的方法。
 * */
