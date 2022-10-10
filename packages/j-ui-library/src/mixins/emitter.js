export default {
    methods: {
        // 使用此函数，必须是当前组件的子组件
        broadcast( componentName, eventName, params ) {
            broadcast.call( this, componentName, eventName, params );
        },
        // 使用此函数，找的是当前组件的父组件
        dispatch( componentName, eventName, params ) {
            let parent = this.$parent;
            let name = parent.$options.name;
            while ( parent && ( !name || name !== componentName ) ) {
                parent = parent.$parent;
                if ( parent ) {
                    name = parent.$options.name;
                }
            }
            if ( parent ) {
                parent.$emit.apply( parent, [ eventName ].concat( params ) );
            }
        },
    },
};


function broadcast( componentName, eventName, params ) {
    this.$children.forEach( ( child ) => {
        const name = child.$options.name;
        if ( name === componentName ) {
            child.$emit( eventName, params );
        } else {
            broadcast.call( child, componentName, eventName, params );
        }
    } );
}
