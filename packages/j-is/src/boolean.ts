export default ( arg: unknown ): arg is boolean => {
    return ( {} ).toString.call( arg ) === '[object Boolean]';
};
