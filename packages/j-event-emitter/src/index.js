import is from 'j-is';

class EventEmitter {
    constructor() {
        this._listeners = new Map();
    }


    on( evt, handler ) {
        let handlers = this._listeners.get( evt );
        if ( !handlers ) {
            handlers = new Set();
            this._listeners.set( evt, handlers );
        }

        handlers.add( handler );
        return this;
    }

    emit( evt, ...args ) {
        const handlers = this._listeners.get( evt );
        if ( !handlers ) return false;
        handlers.forEach( ( handler ) => handler.call( this, ...args ) );
        return this;
    }

    once( evt, handler ) {
        const fallback = ( ...args ) => {
            handler.call( this, ...args );
            this.removeListener( evt, fallback );
        };
        return this.on( evt, fallback );
    }

    removeListener( evt, handler ) {
        const handlers = this._listeners.get( evt );
        if ( !handlers ) return false;
        handlers.delete( handler );
        return this;
    }


    removeAllListeners( rule ) {
        if ( rule === 'all' ) {
            this._listeners.clear();
            return;
        }

        let checker;

        if ( is.string( rule ) ) {
            checker = ( name ) => name === rule;
        } else if ( is.function( rule ) ) {
            checker = rule;
        } else if ( is.array( rule ) ) {
            checker = ( name ) => rule.includes( name );
        }

        this._listeners.forEach( ( handlers, evt ) => {
            checker( evt ) && this._listeners.delete( evt );
        } );
        return this;
    }
}

export default EventEmitter;
