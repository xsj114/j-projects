export default ( arg: unknown ): arg is string => {
    return ( {} ).toString.call( arg ) === '[object String]';
};


