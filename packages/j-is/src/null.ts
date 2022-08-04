export default ( arg: unknown ): arg is null => {
    return ( {} ).toString.call( arg ) === '[object Null]';
};
