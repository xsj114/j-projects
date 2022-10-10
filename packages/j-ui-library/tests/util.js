export const triggerClick = function( el ) {
    triggerEvent( el, 'mousedown' );
    triggerEvent( el, 'mouseup' );
};


export const triggerEvent = function( el, name ) {
    const event = document.createEvent( 'MouseEvents' );
    event.initEvent( name );
    el.dispatchEvent( event );
    return el;
};
