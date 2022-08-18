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


class QuickFind {
    constructor( counts ) {
        this.counts = counts;
        this.id = [];
        this.init();
    }

    init() {
        for ( let i = 0; i < this.counts; i++ ) {
            this.id[ i ] = i;
        }
    }

    count() {
        return this.counts;
    }

    connected( p, q ) {
        return this.find( p ) === this.find( q );
    }

    find( p ) {
        return this.id[ p ];
    }

    union( p, q ) {
        const pId = this.find( p );
        const qId = this.find( q );
        if ( pId === qId ) return;
        for ( let i = 0; i < this.id.length; i++ ) {
            if ( this.id[ i ] === pId ) {
                this.id[ i ] = qId;
            }
        }
        this.counts--;
    }
}

class QuickUnion {
    constructor( counts ) {
        this.counts = counts;
        this.id = [];
        this.init();
    }

    init() {
        for ( let i = 0; i < this.counts; i++ ) {
            this.id[ i ] = i;
        }
    }

    count() {
        return this.counts;
    }

    connected( p, q ) {
        return this.find( p ) === this.find( q );
    }

    find( p ) {
        while ( p !== this.id[ p ] ) {
            p = this.id[ p ];
        }
        return p;
    }

    union( p, q ) {
        const pRoot = this.find( p );
        const qRoot = this.find( q );
        if ( pRoot === qRoot ) return;
        this.id[ pRoot ] = qRoot;
        this.counts--;
    }
}

class WeightedQuickUnionUf {
    constructor( counts ) {
        this.counts = counts;
        this.sz = [];
        this.id = [];
        this.init();
    }

    init() {
        for ( let i = 0; i < this.counts; i++ ) {
            this.id[ i ] = i;
            this.sz[ i ] = 1;
        }
    }

    count() {
        return this.counts;
    }

    connected( p, q ) {
        return this.find( p ) === this.find( q );
    }

    find( p ) {
        while ( p !== this.id[ p ] ) {
            p = this.id[ p ];
        }
        return p;
    }

    union( p, q ) {
        const pRoot = this.find( p );
        const qRoot = this.find( q );
        if ( pRoot === qRoot ) return;
        if ( this.sz[ pRoot ] < this.sz[ qRoot ] ) {
            this.id[ pRoot ] = qRoot;
            this.sz[ qRoot ] += this.sz[ pRoot ];
        } else {
            this.id[ qRoot ] = pRoot;
            this.sz[ pRoot ] += this.sz[ qRoot ];
        }
        this.counts--;
    }
}


// 选择排序
class Selection {
    sort( a ) {
        for ( let i = 0; i < a.length; i++ ) {
            let min = i;
            for ( let j = i + 1; j < a.length; j++ ) {
                if ( this.less( a[ j ], a[ min ] ) ) {
                    min = j;
                }
            }
            this.exch( a, i, min );
        }
    }

    less( v, w ) {
        return v.compareTo( w ) < 0;
    }

    exch( a, i, j ) {
        const t = a[ i ];
        a[ i ] = a[ j ];
        a[ j ] = t;
    }

    show( a ) {
        for ( let i = 0; i < a.length; i++ ) {
            console.log( a[ i ] );
        }
    }

    isSorted( a ) {
        for ( let i = 1; i < a.length; i++ ) {
            if ( this.less( a[ i ], a[ i - 1 ] ) ) return false;
        }
        return true;
    }
}


// 希尔排序
class Shell {
    sort( a ) {
        let n = a.length;
        let h = 1
        while (h < n/3) {
            h = 3 *h +1 
        }
        while (h>=1) {
            for (let i = h; i < n; i++) {
                for (let j = h; j >=h && this.less(a[j], a[j-h]); j-=h) {
                    this.exch(a, j , j-h) 
                } 
            } 
            h = h/3
        }
    }

    less( v, w ) {
        return v.compareTo( w ) < 0;
    }

    exch( a, i, j ) {
        const t = a[ i ];
        a[ i ] = a[ j ];
        a[ j ] = t;
    }

    show( a ) {
        for ( let i = 0; i < a.length; i++ ) {
            console.log( a[ i ] );
        }
    }

    isSorted( a ) {
        for ( let i = 1; i < a.length; i++ ) {
            if ( this.less( a[ i ], a[ i - 1 ] ) ) return false;
        }
        return true;
    }
}

console.log( new Bag() );
console.log( new Queue() );
console.log( new Stack() );
console.log( new CustomIterator() );
console.log( new QuickFind() );
console.log( new QuickUnion() );
console.log( new WeightedQuickUnionUf() );
console.log( new Selection() );
console.log( new Shell() );

