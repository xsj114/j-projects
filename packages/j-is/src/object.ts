export default ( arg: unknown ): boolean => {
    return ( {} ).toString.call( arg ) === '[object Object]';
};
