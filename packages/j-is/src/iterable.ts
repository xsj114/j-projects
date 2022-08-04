import isFunction from './function';
export default ( arg: unknown ): boolean => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return isFunction( ( arg as any )[ Symbol.iterator ] );
};
