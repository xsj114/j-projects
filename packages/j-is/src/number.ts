export default ( arg: unknown ): arg is number => {
    return ( {} ).toString.call( arg ) === '[object Number]';
};
