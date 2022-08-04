export default ( arg: unknown ): arg is unknown[] => {
    return Array.isArray( arg );
};
