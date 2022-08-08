class Node {
    constructor( val, next ) {
        this.val = val;
        this.next = next;
    }
}

class Stack {
    constructor( options ) {
        this.config = options;
        this.config.type === 'node' ? this.head = null : this.stack = new Array( 1 );
        this.count = 0;
    }

    isEmpty() {
        return this.count === 0;
    }

    size() {
        return this.count;
    }

    resize( max ) {
        const tempStack = new Array( max );
        for ( let i = 0; i < this.stack.length; i++ ) {
            tempStack[ i ] = this.stack[ i ];
        }
        this.stack = tempStack;
    }

    push( item ) {
        if ( this.config.options === 'node' ) {
            const oldNode = this.first;
            this.head = new Node( item, oldNode );
            this.count++;
        } else {
            if ( this.count === this.stack.length ) {
                this.resize( this.stack.length * 2 );
            }
            this.stack[ this.count++ ] = item;
        }
    }

    pop() {
        if ( this.config.options === 'node' ) {
            const item = this.head.item;
            this.head = this.head.next;
            this.count--;
            return item;
        } else {
            const item = this.stack[ --this.count ];
            this.stack[ this.count ] = null;
            if ( this.count > 0 && this.count === this.stack.length / 4 ) {
                this.resize( this.stack.length / 2 );
            }
            return item;
        }
    }
}


class Queue {
    constructor() {
        this.head = null;
        this.last = null;
        this.count = 0;
    }

    isEmpty() {
        return this.count === 0;
    }

    size() {
        return this.count;
    }

    enqueue( item ) {
        const oldLast = this.last;
        this.last = new Node( item, null );
        if ( this.isEmpty() ) {
            this.head = this.last;
        } else {
            oldLast.next = this.last;
        }
        this.count++;
    }

    dequeue() {
        const item = this.head.val;
        this.head = this.head.next;
        if ( this.isEmpty() ) {
            this.last = null;
        }
        this.count--;
        return item;
    }
}


class Bag {
    constructor() {
        this.head = null;
        this.count = 0;
    }

    isEmpty() {
        return this.count === 0;
    }

    size() {
        return this.count;
    }

    add( item ) {
        const oldHead = this.head;
        this.head = new Node( item, oldHead );
    }
}

class CustomIterator {
    constructor() {
        this.current = this.head;
    }

    hasNext() {
        return this.current !== null;
    }

    next() {
        const item = this.current.val;
        this.current = this.current.next;
        return item;
    }
}

console.log( new Bag() );
console.log( new Queue() );
console.log( new Stack() );
console.log( new CustomIterator() );
