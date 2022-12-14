---
title: 算法
titleTemplate: 学习笔记
outline: 'deep'
---

[toc]

# 算法

## 时间复杂度与空间复杂度

::: tip
时间复杂度算的是运行的次数<br/>
空间复杂度算的是占用的内存
:::


| 描述 | 增长数量级|
| ------ | ----- |
| 常数级别  | 1 |
| 对数级别 |  logN |
| 线性级别 | N | 
| 线性对数级别 | NlogN |
| 平方级别 | N² |
| 立方级别 | N³ |
| 指数级别 | 2^N |


## 数据结构

### 优先队列

::: tip
优先队列的各种实现在最坏情况下运行时间的增长数量级

| 数据结构  |  插入元素 |  删除最大元素 |
| --- | ---- | ----- |
| 有序数组  |  N |  1 |
| 无序数组 | 1 | N |
| 堆 | logN | logN |
:::

::: details 无序数组实现优先队列
```js
class MaxPQ {

    constructor () {
        this.n = 0
        this.pq = []
    }

    // 向优先队列中插入一个元素
    insert (v) {
        this.pq[this.n++] = v
    }
    
    // 返回最大元素
    max () {
        let max = 0
        for (let i = 1; i < this.n; i++) {
            if ( this.less(max, i) ) { max = i }
        }
        return this.pq[max]
    }

    // 删除并返回最大元素
    delMax () {
        let max = 0
        for (let i = 1; i < this.n; i++) {
            if ( this.less(max, i) ) { max = i }
        }
        this.exch(max, this.n - 1)
        return this.pq[--this.n]
    }

    // 返回队列是否为空
    isEmpty () {
        return this.n === 0
    }

    // 返回优先队列中的元素个数
    size () {
        return this.n
    }

    less (i, j) {
        return this.pq[i] < this.pq[j]
    }

    exch ( i, j ) {
        let temp = this.pq[i];
        this.pq[i] = this.pq[j];
        this.pq[j] = temp;
    }

}
```
:::


::: details 有序数组实现优先队列
```js
class MaxPQ {

    constructor () {
        this.n = 0
        this.pq = []
    }

    // 向优先队列中插入一个元素
    insert (v) {
        let i = this.n - 1
        while ( i >= 0 && this.less( v, this.pq[i] ) ) {
            this.pq[i+1] = this.pq[i]
            i--
        }
        this.pq[i+1] = v
        this.n++
    }
    
    // 返回最大元素
    max () {
        return this.pq[this.n - 1]
    }

    // 删除并返回最大元素
    delMax () {
        return this.pq[--this.n]
    }

    // 返回队列是否为空
    isEmpty () {
        return this.n === 0
    }

    // 返回优先队列中的元素个数
    size () {
        return this.n
    }

    less (v, w) {
        return v < w
    }

}
```
:::


::: details 堆实现优先队列
在一个堆中，位置k的结点的父结点的位置为`k/2`,而它两个子节点的位置则分别为`2k`和`2k+1`<br/>
```js
class MaxPQ {

    constructor () {
        this.n = 0
        this.pq = []
    }

    // 向优先队列中插入一个元素
    insert (v) {
        this.pq[++this.n] = v
        this.swim(this.n)
    }

    // 上浮
    swim (k) {
        while ( k > 1 && this.less( parseInt( k / 2 ), k ) ) {
            this.exch( parseInt( k / 2 ), k )
            k = parseInt( k / 2 )
        }
    }

    // 下沉
    sink (k) {
        while (2 * k <= this.n) {
            let c = 2 * k
            if ( c < this.n && this.less( c, c + 1 ) ) {
                c++
            }
            if ( !this.less( k, c ) ) break
            this.exch( k, c )
            k = c
        }
    }
    
    // 返回最大元素
    max () {
        return this.pq[1]
    }

    // 删除并返回最大元素
    delMax () {
        let max = this.pq[1]
        this.exch(1, this.n--)
        this.pq[this.n + 1] = null
        this.sink(1)
        return max
    }

    // 返回队列是否为空
    isEmpty () {
        return this.n === 0
    }

    // 返回优先队列中的元素个数
    size () {
        return this.n
    }

    less (v, w) {
        return this.pq[v] < this.pq[w]
    }


    exch ( i, j ) {
        let temp = this.pq[i];
        this.pq[i] = this.pq[j];
        this.pq[j] = temp;
    }

}
```
插入元素原理<br/>
将新元素加到数组末尾，增加堆的大小并让这个新元素上浮到合适的位置<br/>
删除最大元素原理<br/>
从数组顶端删去最大的元素并将数组的最后一个元素放到顶端，减小堆的大小并让这个元素下沉到合适的位置
:::



## 排序


| 算法 | 是否稳定 |  是否为原地排序 | 时间复杂度 | 空间复杂度 | 备注 |
| ---- | ---- | ----- | ----- | ----- | ----- |
| 选择排序  |  否 | 是 | N² | 1  | |
| 冒泡排序 | 是 | 是 | N² | 1 | |
| 插入排序 | 是 | 是 |  介于N和N²之间 | 1 | 取决于输入元素的排列情况 | 
| 希尔排序 | 否 | 是 | | 1 | 时间复杂度无法准确描述，目前最重要的结论是它的运行时间达不到平方级别 |
| 快速排序 | 否 | 是 | NlogN | lgN | 运行效率由概率提供保证 |
| 归并排序 | 是 | 否 | NlogN | N | |
| 堆排序 | 否 | 是 | NlogN | 1 | |

::: tip
如果一个排序算法能够保留数组中重复元素的相对位置则可以被称为是稳定的
:::


### 选择排序

::: tip
运行时间和输入无关<br/>
数据移动是最少的
:::

::: details 思路
首先找到数组中最小的那个元素将它和数组的第一个元素交换位置<br/>
再次在剩下的元素中找到最小的元素，将它与数组的第二个元素交换位置<br/>
如此往复，直到将整个数组排序
:::


```js
class Selection {

    sort (a) {

        let N = a.length 

        for ( let i = 0; i < N; i++ ) {
            let min = i
            for (let j = i + 1; j < N; j++) {
                if ( this.less( a[j], a[min] ) ) {
                    min = j
                }
            }
            this.exch( a, i, min )
        }
    }

    less ( v, w ) {
        return v < w
    }

    exch ( a, i, j ) {
        let temp = a[i];
        a[i] = a[j];
        a[j] = temp;
    }
}
```

::: details 为什么选择排序不稳定呢?
假设有一个待排序的序列`2 3 2 1 4`<br/>
我们知道第一次排序后就会选择`第1个元素2`和`元素1`交换，那么原来序列中`两个2`的相对顺序就被破坏了
:::


### 冒泡排序


::: details 思路
比较相邻的元素<br/>
如果第一个比第二个大，就交换他们两个<br/>
对每一对相邻元素作同样的工作，从开始第一对到结尾的最后一对<br/>
这步做完后，最后的元素会是最大的数<br/>
针对所有的元素重复以上的步骤，除了最后一个<br/>
持续每次对越来越少的元素重复上面的步骤，直到没有任何一对数字需要比较
::: 

```js
class Bubble {

    sort (a) {

        let N = a.length 

        for ( let i = N - 1; i > 0; i-- ) {
            for ( let j = 0 ; j < i; j++ ) {
                if ( !this.less( a[j], a[j+1] ) ) {
                    this.exch( a, j, j + 1 )
                }
            }
        }
    }

    less ( v, w ) {
        return v < w
    }

    exch ( a, i, j ) {
        let temp = a[i];
        a[i] = a[j];
        a[j] = temp;
    }
}
```

### 插入排序

::: tip
所需的时间取决于输入中元素的初始顺序<br/>
插入排序对于部分有序的数组十分高效，也很适合小规模数组
:::


::: details 思路
将当前元素和前一个元素做比较<br/>
如果小于前一个元素则交换位置<br/>
并将交换好位置的元素和它前一个元素做比较,直到此元素不小于前一个元素<br/>
当遍历完整个数组，排序完成
:::

```js
class Insertion {

    sort ( a ) {
        let N = a.length;
        for ( let i = 0; i < N; i++ ) {
            for ( let j = i; j > 0 && this.less( a[j], a[j-1] ); j-- ) {
                this.exch( a, j, j - 1 )
            }
        }
    }

    less ( v, w ) {
        return v < w
    }

    exch ( a, i, j ) {
        let temp = a[i];
        a[i] = a[j];
        a[j] = temp;
    }
}
```

::: info
要大幅度提高插入排序的速度<br/>
只需要在内循环中将较大的元素都向右移动而不总是交换两个元素
:::

```js
class InsertionX {

    sort ( a ) {
         
        let exchanges = 0
        let N = a.length;
        for ( let i = N - 1; i > 0; i-- ) {
            if ( this.less( a[i], a[i-1] ) ) {
                this.exch( a, i, i-1 )
                exchanges++
            }
        }

        if (exchanges === 0) return

        for (let i = 2; i < N; i++ ) {
            let v = a[i]
            let j = i
            while ( this.less( v, a[j-1] ) ) {
                a[j] = a[j-1]
                j--
            }
            a[j] = v
        }

    }

    less ( v, w ) {
        return v < w
    }

    exch ( a, i, j ) {
        let temp = a[i];
        a[i] = a[j];
        a[j] = temp;
    }
}
```


### 希尔排序


::: tip
对于中等大小的数组,它的运行时间是可以接受的<br/>
除了对于很大的N，其他更加高效的排序算法可能只会比希尔排序快两倍（可能还达不到）
:::

::: details 思路
使数组中任意间隔为h的元素都是有序的<br/>
对于任意以1结尾的h序列，我们都能够将数组排序
:::


```js
class Shell {

    sort (a) {
        let N = a.length;
        let h = 1;
        while ( h < parseInt( N / 3 ) ) {
            h = 3 * h + 1    
        }
        while ( h >= 1 ) {
            for ( let i = h; i < N; i++ ) {
                for ( let j = i; j >= h && this.less( a[j], a[j-h] ); j-=h ) {
                    this.exch( a, j, j-h )
                }
            }    
            h = parseInt( h / 3 )
        }
    }
    
    less ( v, w ) {
        return v < w
    }

    exch ( a, i, j ) {
        let temp = a[i];
        a[i] = a[j];
        a[j] = temp;
    }
}
```


### 归并排序

::: tip
能够保证将任意长度为N的数组排序所需时间和NlogN成正比<br/>
缺点是所需的额外空间和N成正比
:::


::: details 归并
将两个有序的数组归并成一个更大的有序数组
```js
// 原地归并
const merge = (a, lo, mid, hi) => {
    let aux = []
    let i = lo;
    let j = mid + 1;
    for (let k = lo; k <= hi; k++ ) {
        aux[k] = a[k]
    }

    for (let k = lo; k <= hi; k++) {
        if ( i > mid ) { a[k] = aux[j++] } // 左半边用尽取右半边的元素
        else if ( j > hi) { a[k] = aux[i++] }   // 右半边用尽取左半边的元素
        else if ( less( aux[j], aux[i] ) ) { a[k] = aux[j++] } // 右半边的当前元素小于左半边的当前元素
        else { a[k] = aux[i++] } // 右半边的当前元素大于等于左半边的当前元素
    }
}

const less = ( v, w ) => {
    return v < w
}
```
:::


#### 自顶向下的归并排序

```js
class Merge {

    constructor () {
        this.aux = []
    }

    sort (a) {
        this._sort(a, 0, a.length - 1)    
    }

    _sort (a, lo, hi) {
        if ( hi <= lo ) return
        let mid = lo + parseInt( ( hi - lo ) / 2 ) 
        this._sort( a, lo, mid )
        this._sort( a, mid + 1,  hi )
        this.merge( a, lo, mid, hi )
    }

    merge ( a, lo, mid, hi ) {
        let i = lo;
        let j = mid + 1;
        for (let k = lo; k <= hi; k++ ) {
            this.aux[k] = a[k]
        }

        for (let k = lo; k <= hi; k++) {
            if ( i > mid ) { a[k] = this.aux[j++] } // 左半边用尽取右半边的元素
            else if ( j > hi) { a[k] = this.aux[i++] }   // 右半边用尽取左半边的元素
            else if ( this.less( this.aux[j], this.aux[i] ) ) { a[k] = this.aux[j++] } // 右半边的当前元素小于左半边的当前元素
            else { a[k] = this.aux[i++] } // 右半边的当前元素大于等于左半边的当前元素
        }
    }

    less ( v, w ) {
        return v < w
    }
}
```

::: details  自顶向下的归并排序优化
使用插入排序处理小规模的子数组（因为插入排序非常简单，因此很可能在小数组上比归并排序更快）<br/>
测试数组是否已经有序
:::

```js
class MergeX {

    constructor () {
        this.aux = []
        this.cutoff = 15
    }

    sort (a) {
        this._sort(a, 0, a.length - 1)    
    }

    _sort (a, lo, hi) {
        if ( hi <= lo + this.cutoff ) {
            this.insertSort(a, lo, hi)
            return
        }
        let mid = lo + parseInt( ( hi - lo ) / 2 ) 
        this._sort( a, lo, mid )
        this._sort( a, mid + 1,  hi )
        if ( !( this.less( a[mid + 1], a[mid] ) ) ) { return }
        this.merge( a, lo, mid, hi )
    }

    merge ( a, lo, mid, hi ) {
        let i = lo;
        let j = mid + 1;
        for (let k = lo; k <= hi; k++ ) {
            this.aux[k] = a[k]
        }

        for (let k = lo; k <= hi; k++) {
            if ( i > mid ) { a[k] = this.aux[j++] } // 左半边用尽取右半边的元素
            else if ( j > hi) { a[k] = this.aux[i++] }   // 右半边用尽取左半边的元素
            else if ( this.less( this.aux[j], this.aux[i] ) ) { a[k] = this.aux[j++] } // 右半边的当前元素小于左半边的当前元素
            else { a[k] = this.aux[i++] } // 右半边的当前元素大于等于左半边的当前元素
        }
    }

    insertSort ( a, lo, hi ) {
        for ( let i = lo; i <= hi; i++ ) {
            for ( let j = i; j > lo && this.less( a[j], a[j-1] ); j-- ) {
                this.exch( a, j, j - 1 )
            }
        }
    }

    less ( v, w ) {
        return v < w
    }

    exch ( a, i, j ) {
        let temp = a[i];
        a[i] = a[j];
        a[j] = temp;
    }
}
```

#### 自底向上的归并排序

```js
class MergeBU {

    constructor () {
        this.aux = []
    }

    sort (a) {
        let N = a.length
        for ( let sz = 1; sz < N; sz = sz + sz ) {
            for ( let lo = 0; lo < N - sz; lo += sz + sz) {
                this.merge( a, lo, lo + sz - 1, Math.min( lo + sz + sz - 1, N - 1) )
            }
        }
    }


    merge ( a, lo, mid, hi ) {
        let i = lo;
        let j = mid + 1;
        for (let k = lo; k <= hi; k++ ) {
            this.aux[k] = a[k]
        }

        for (let k = lo; k <= hi; k++) {
            if ( i > mid ) { a[k] = this.aux[j++] } // 左半边用尽取右半边的元素
            else if ( j > hi) { a[k] = this.aux[i++] }   // 右半边用尽取左半边的元素
            else if ( this.less( this.aux[j], this.aux[i] ) ) { a[k] = this.aux[j++] } // 右半边的当前元素小于左半边的当前元素
            else { a[k] = this.aux[i++] } // 右半边的当前元素大于等于左半边的当前元素
        }
    }

    less ( v, w ) {
        return v < w
    }
}
```


### 快速排序

::: tip
缺点是在切分不平衡时这个程序可能会极为低效（例如第一次从最小的元素切分，第二次从第二小的元素切分,如此这般，这会导致一个大子数组需要切分很多次）<br/>
避免这种情况的方法是在快速排序前将数组随机排序
:::


::: details 思路
关键在于切分<br/>
对于某个切分元素`a[j]`已经排定<br/>
`a[lo]`到`a[j-1]`中的所有元素都不大于`a[j]`<br/>
`a[j+1]`到`a[hi]`中的所有元素都不小于`a[j]`<br/>
通过递归的调用切分来排序
:::


```js
class Quick {


    sort (a) {
        this._sort(a, 0, a.length - 1)
    }

    _sort (a, lo, hi) {
        if ( hi <= lo ) { return }
        let j = this.partition(a, lo, hi)             
        this._sort(a, lo, j - 1 )
        this._sort(a, j + 1, hi)
           
    }

    partition (a, lo, hi) {
        let i = lo
        let j = hi + 1
        let v = a[lo]
        while (true) {
            // 为了找到一个大于v的元素
            while ( this.less( a[++i], v ) ) {
                if ( i === hi ) break
            } 
            // 为了找到一个不大于v的元素
            while ( this.less( v, a[--j] ) ) {
                if ( j === lo ) break
            } 
            if ( i >= j ) { break }
            this.exch( a, i, j )
        }
        this.exch( a, lo, j )
        return j
    }

    less ( v, w ) {
        return v < w
    }

    exch ( a, i, j ) {
        let temp = a[i];
        a[i] = a[j];
        a[j] = temp;
    }

}

```


::: details 快速排序优化
切换到插入排序（对于小数组，快速排序比插入排序慢）<br/>
三取样切分
```js
class QuickX {

    constructor () {
        this.cutoff = 15
    }


    sort (a) {
        this._sort(a, 0, a.length - 1)
    }

    _sort (a, lo, hi) {
        let n = hi - lo + 1
        if ( n <= this.cutoff ) { 
            this.insertSort(a, lo, hi)
            return
        }
        let m = this.medianThree(a, lo, lo + parseInt( n / 2 ), hi)
        this.exch(a, m, lo)
        let j = this.partition(a, lo, hi)             
        this._sort(a, lo, j - 1 )
        this._sort(a, j + 1, hi)
           
    }

    medianThree ( a, i, j, k ) {
        return ( this.less( a[i], a[j] ) ) ?
               ( this.less( a[j], a[k] ) ? j : this.less( a[i], a[k] ) ? k : i ) :
               ( this.less( a[k], a[j] ) ? j : this.less( a[k], a[i] ) ? k : i ) ;
    }

    insertSort ( a, lo, hi ) {
        for ( let i = lo; i <= hi; i++ ) {
            for ( let j = i; j > lo && this.less( a[j], a[j-1] ); j-- ) {
                this.exch( a, j, j - 1 )
            }
        }
    }

    partition (a, lo, hi) {
        let i = lo
        let j = hi + 1
        let v = a[lo]
        while (true) {
            // 为了找到一个大于v的元素
            while ( this.less( a[++i], v ) ) {
                if ( i === hi ) break
            } 
            // 为了找到一个不大于v的元素
            while ( this.less( v, a[--j] ) ) {
                if ( j === lo ) break
            } 
            if ( i >= j ) { break }
            this.exch( a, i, j )
        }
        this.exch( a, lo, j )
        return j
    }

    less ( v, w ) {
        return v < w
    }

    exch ( a, i, j ) {
        let temp = a[i];
        a[i] = a[j];
        a[j] = temp;
    }

}
```
:::


#### 三向切分的快速排序

::: tip
对于存在大量重复元素的数组<br/>
三向切分的快速排序比标准的快速排序的效率高得多
:::

::: details 思路
从左到右遍历数组一次<br/>
维护一个指针`lt`使得`a[lo..lt-1]`中的元素都小于`v`<br/>
维护一个指针`gt`使得`a[gt+1..hi]`中的元素都大于`v`<br/>
维护一个指针`i`使得`a[lt..i-1]`中的元素都等于`v`
:::

```js
class Quick3way {

    sort (a) {
        this._sort(a, 0, a.length - 1)
    }

    _sort (a, lo, hi) {
        if (hi <= lo) return
        let lt = lo;
        let gt = hi;
        let i = lo + 1;
        let v = a[lo];
        while (i <= gt) {
            if (a[i] < v) {
                this.exch(a, lt++, i++)    
            } else if (a[i] > v) {
                this.exch(a, i, gt--)    
            } else {
                i++
            }
        }
        this._sort(a, lo, lt - 1)
        this._sort(a, gt + 1, hi)
    }

    exch ( a, i, j ) {
        let temp = a[i];
        a[i] = a[j];
        a[j] = temp;
    }

}
```


### 堆排序



::: details 思路
堆排序分为两个阶段,一个是堆的构造阶段,一个是下沉排序阶段<br/>
堆的构造阶段中，将原始数组重新组织安排进一个堆中<br/>
下沉排序阶段中，从堆中按顺序取出所有元素并得到排序结果
:::


```js
class Heap {

    constructor () {
        this.n = 0
        this.heap = null
    }

    sort (a) {
        this.heap = a
        this.n = a.length
        for (let k = parseInt( this.n / 2 ); k >= 1; k--) {
            this.sink(k, this.n)
        }
        let k = this.n
        while (k > 1) {
            this.exch( 1, k-- )
            this.sink( 1, k )
        }
    }

    exch ( i, j ) {
        let temp = this.heap[i-1];
        this.heap[i-1] = this.heap[j-1];
        this.heap[j-1] = temp;
    }

     sink (k, n) {
        while (2 * k <= n) {
            let c = 2 * k
            if ( c < n && this.less( c, c + 1 ) ) {
                c++
            }
            if ( !this.less( k, c ) ) break
            this.exch( k, c )
            k = c
        }
    }

    less (i, j) {
        return this.heap[i-1] < this.heap[j-1]
    }
}
```

#### 堆的构造

```js
// 使用下沉构造堆
const arr = [ , 'S', 'O', 'R', 'T', 'E', 'X', 'A', 'M', 'P', 'L', 'E']
const createHeap = (a) => {
    let N = a.length
    const sink = (k) => {
        while (2 * k <= N) {
            let c = 2 * k
            if ( c < N && less( c, c + 1 ) ) {
                c++
            }
            if ( !less( k, c ) ) break
            exch( k, c )
            k = c
        }
    }
    const less = (i, j ) => {
        return a[i] < a[j]
    }
    const exch = (i, j ) => {
        let temp = a[i];
        a[i] = a[j];
        a[j] = temp;
    }
    for (let k = parseInt( N / 2 ); k >= 1; k-- ) {
        sink(k)
    }
}
createHeap(arr)
```

```js
// 使用上浮构造堆
const arr = [ , 'S', 'O', 'R', 'T', 'E', 'X', 'A', 'M', 'P', 'L', 'E']
const createHeap = (a) => {
    let N = a.length
    const swim = (k) => {
        while ( k > 1 && less( parseInt( k / 2 ), k ) ) {
            exch( parseInt( k / 2 ), k )
            k = parseInt( k / 2 )
        }
    }
    const less = (i, j ) => {
        return a[i] < a[j]
    }
    const exch = (i, j ) => {
        let temp = a[i];
        a[i] = a[j];
        a[j] = temp;
    }
    for (let i = 2; i < N; i++) {
        swim(i)
    }
}
createHeap(arr)
```



## 查找


### 符号表

::: tip
符号表是一种存储键值对的数据结构，支持插入和查找两种操作
:::


| 使用的数据结构 | 实现 | 优点 |  缺点 |
| ----- | ---- | ---- | ----- |
| 链表（顺序查找）| SequentialSearchST |  适用于小型问题 | 对于大型符号表很慢 |
| 有序数组（二分查找）| BinarySearchST | 最优的查找效率和空间需求，能够进行有序性相关的操作 | 插入操作很慢|
| 二叉查找树 | BST | 实现简单，能够进行有序性相关的操作 | 没有性能上界的保证<br/><br/>链接需要额外的空间 |
| 平衡二叉查找树 | RedBlackBST | 最优的查找和插入效率，能够进行有序性相关的操作| 链接需要额外的空间 |
| 散列表 | SeparateChainHashST<br/>LinearProbingHashST  | 能够快速地查找和插入常见类型的数据 | 需要计算每种类型的数据的散列<br/><br/>无法进行有序性相关的操作<br/><br/>链接和空节点需要额外的空间 |


#### 基于链表的符号表

```js
class Node {
    
    constructor (key, val, next) {
        this.key = key
        this.val = val
        this.next = next
    }

}
```


```js
class SequentialSearchST {

    constructor () {
        this.first = null
        this.n = 0
    }

    put (key, val) {

        if ( key === null ) throw "key cannot be null" 

        if (val === null) {
            this.delete(key)
            return
        }


        for ( let x = this.first; x !== null; x = x.next ) {
            if ( key === x.key ) {
                x.val = val
                return
            }
        }

        this.first = new Node(key, val , this.first)
        this.n++

    }


    get (key) {
        if ( key === null ) throw "key cannot be null" 
        for ( let x = this.first; x !== null; x = x.next ) {
            if ( key === x.key ) return x.val
        }
        return null
    }


    delete (key) {
        if ( key === null ) throw "key cannot be null" 
        this.first = this._delete(this.first, key)
    }

    _delete (node, key) {
        if ( node === null ) return null
        if ( node.key === key ) {
            this.n--
            return node.next
        }
        node.next = this._delete(node.next, key)
        return node
    }

    contains (key) {
        if ( key === null ) throw "key cannot be null" 
        return this.get(key) !== null
    }

    isEmpty () {
        return this.size() === 0
    }

    size () {
        return this.n
    }

    keys () {
        const arr = []
        for ( let x = this.first; x !== null; x = x.next ) {
            arr.push(x.key)
        }
        return arr
    }

}
```

#### 基于有序数组的符号表


::: details API
| 方法  |  描述 |  运行所需时间的增长数量级 |
| ---- | ---- | ----- |
| put(key,val) | 将键值对存入表中（若值为空则将键key从表中删除） |  N |
| get(key) | 获取键key对应的值（若键key不存在则返回空） | logN |
| delete(key) | 从表中删去键key（及其对应的值） | N |
| contains(key) | 键key是否存在于表中 | logN |
| isEmpty() | 表是否为空 | 1 |
| size() | 表中的键值对数量 | 1 |
| min() | 最小的键 | 1 |
| max() | 最大的键 | 1 |
| floor(key) | 小于等于key的最大键 | logN |
| ceiling(key) | 大于等于key的最小键 | logN |
| rank(key) | 小于key的键的数量 | logN |
| select(k) | 排名为k的键 | 1 |
| deleteMin() | 删除最小的键 | N |
| deleteMax() | 删除最大的键 | 1 |
| size(lo, hi) | [lo..hi]之间键的数量 | |
| keys(lo, hi) | [lo..hi]之间的所有键,已排序 | |
| keysAll() | 表中的所有键的集合,已排序 | |
:::

```js
class BinarySearchST {

    constructor () {
        
        this.keys = []
        this.vals = []
        this.n = 0
    }

    put (key, val) {

        if ( key === null ) throw "key cannot be null" 

        if (val === null) {
            this.delete(key)
            return
        }

        let i = this.rank( key )
        if ( i < this.n && this.keys[i] === key ) {
            this.vals[i] = val
            return
        }
        for ( let j = this.n; j > i; j-- ) {
            this.keys[j] = this.keys[j-1];       
            this.vals[j] = this.vals[j-1];
        }
        this.keys[i] = key
        this.vals[i] = val
        this.n++
    }


    get (key) {

        if ( key === null ) throw "key cannot be null" 

        if ( this.isEmpty() ) return null
        let i = this.rank( key )
        if ( i < this.n && this.keys[i] === key ) {
            return this.vals[i]
        }
        return null
    }


    delete (key) {

        if ( key === null ) throw "key cannot be null" 

        if ( this.isEmpty() ) return

        let i = this.rank( key )             

        // key not in table
        if ( i === this.n || this.keys[i] !== key ) {
            return
        }

        for ( let j = i; j < this.n - 1; j++ ) {
            this.keys[j] = this.keys[j+1];
            this.vals[j] = this.vals[j+1];
        }

        this.n--

        this.keys[this.n] = null
        this.vals[this.n] = null

    }

    contains (key) {

        if ( key === null ) throw "key cannot be null" 

        return this.get(key) !== null
    }

    isEmpty () {
        return this.size() === 0
    }

    size () {
        return this.n
    }

    min () {
        return this.keys[0]
    }

    max () {
        return this.keys[this.n-1]
    }


    floor (key) {
        if ( key === null ) throw "key cannot be null" 
        let i = this.rank(key)
        if ( i < this.n && key === this.keys[i] ) return this.keys[i] 
        if ( i === 0 ) throw "no such element"
        return this.keys[i-1]
    }

    ceiling (key) {
        if ( key === null ) throw "key cannot be null" 
        let i = this.rank(key)
        if ( i === this.n ) throw "no such element"
        return this.keys[i]
    }

    rank (key) {

        if ( key === null ) throw "key cannot be null" 

        let lo = 0
        let hi = this.n - 1
        while ( lo <= hi ) {
            let mid = lo + parseInt( ( hi - lo ) / 2 )
            if ( key < this.keys[mid] ) {
                hi = mid - 1
            } else if ( key > this.keys[mid] ) {
                lo = mid + 1
            } else {
                return mid
            }
        }
        return lo
    }

    select (k) {
        if ( k < 0 || k >= this.size() ) return
        return this.keys[k]
    }

    deleteMin () {
        this.delete( this.min() )
    }


    deleteMax () {
        this.delete( this.max() )
    }


    sizeRange (lo, hi) {
        
        if ( lo > hi ) return 0
        if ( this.contains(hi) ) return this.rank(hi) - this.rank(lo) + 1        
        return this.rank(hi) - this.rank(lo)
    }

    keysRange (lo, hi) {
        const arr = []
        if ( lo > hi ) return arr
        for ( let i = this.rank( [lo] ); i < this.rank( hi ); i++) {
            arr.push( this.keys[i] )
        }
        if ( this.contains( hi ) ) {
            arr.push( this.keys[ this.rank( hi ) ] )
        }
        return arr
    }


    keysAll () {
        return this.keysRange( this.min(), this.max() )
    }

}

```


#### 基于二叉查找树的符号表


::: tip
一棵二叉查找树是一棵二叉树，其中每个结点都含有一个键，且每个结点的键都大于其左子树中的任意结点的键而小于右子树的任意结点的键
:::


::: details API
| 方法  |  描述 |  运行所需时间的增长数量级 |
| ---- | ---- | ----- |
| put(key,val) | 将键值对存入表中（若值为空则将键key从表中删除） |   |
| get(key) | 获取键key对应的值（若键key不存在则返回空） |  |
| delete(key) | 从表中删去键key（及其对应的值） |  |
| contains(key) | 键key是否存在于表中 |  |
| isEmpty() | 表是否为空 |  |
| size() | 表中的键值对数量 |  |
| min() | 最小的键 |  |
| max() | 最大的键 |  |
| floor(key) | 小于等于key的最大键 |  |
| ceiling(key) | 大于等于key的最小键 |  |
| rank(key) | 小于key的键的数量 |  |
| select(k) | 排名为k的键 |  |
| deleteMin() | 删除最小的键 |  |
| deleteMax() | 删除最大的键 |  |
| size(lo, hi) | [lo..hi]之间键的数量 | |
| keys(lo, hi) | [lo..hi]之间的所有键,已排序 | |
| keys() | 表中的所有键的集合,已排序 | |
:::

```js
class Node {

    constructor (key, val, n) {
        this.n = n
        this.key = key
        this.val = val
        this.left = null
        this.right = null
    }

}
```

```js
class BST {

    constructor () {
        this.root = null
    }


    put (key, val) {
        this.root = this._put(this.root, key, val)
    }

    _put (node, key, val) {
        if ( node === null ) return new Node( key, val, 1 )
        if ( key < node.key ) {
            node.left = this._put( node.left, key, val )
        } else if ( key > node.key ) {
            node.right = this._put( node.right, key, val )
        } else {
            node.val = val
        }
        node.n = this.size( node.left ) + this.size( node.right ) + 1
        return node
    }


    get (key) {
        return this._get(this.root, key)
    }

    _get (node, key) {
        if ( node === null ) return null
        if ( key < node.key ) {
            return this._get(node.left, key)
        } else if ( key > node.key ) {
            return this._get(node.right, key)
        } else {
            return node.val    
        }
    }



    contains (key) {
        return this.get( key ) !== null
    }

    isEmpty () {
        return this.size() === 0
    }

    size ( node = this.root ) {
        if ( node === null ) return 0
        return node.n
    }

    min () {
        return this._min( this.root ).key
    }

    _min (node) {
        if ( node.left === null ) return node
        return this._min( node.left )
    }

    max () {
        return this._max( this.root ).key
    }

    _max (node) {
        if ( node.right === null ) return node
        return this._max( node.right )
    }


    floor (key) {
        let node = this._floor( this.root, key )
        if ( node === null ) return null
        return node.key
    }

    _floor (node, key) {
        if ( node === null ) return null
        if ( key === node.key ) { return node }
        // 给定的key小于二叉查找树的根节点，那么小于等于key的最大键一定在根节点的左子树中
        if ( key < node.key ) { return this._floor( node.left, key ) }
        // 给定的key大于二叉查找树的根节点，那么只有当根节点右子树中存在小于等于key的节点时，小于等于key的最大键才会出现在右子树中，否则根节点就是小于等于key的最大键
        let t = this._floor( node.right, key ) 
        if ( t !== null ) return t
        return node
    }

    ceiling (key) {
        let node = this._ceiling( this.root, key )
        if ( node === null ) { return null }
        return node.key
    }

    _ceiling ( node, key ) {
        if ( node === null ) { return null }
        if ( key === node.key ) return node
        // 给定的key小于二叉查找树的根节点，那么只有当根节点左子树中存在大于等于key的节点时，大于等于key的最小键才会出现在左子树中，否则根节点就是大于等于key的最小键
        if ( key < node.key ) { 
            let t = this._ceiling( node.left, key )
            if ( t !== null ) return t
            return node
        }
        // 给定的key大于二叉查找树的根节点，那么大于等于key的最小键一定在根节点的右子树中
        return this._ceiling( node.right, key )
    }

    rank ( key ) {
        return this._rank( this.root, key )
    }

    _rank ( node, key ) {
        if ( node === null ) return 0
        if ( key < node.key ) { return this._rank( node.left, key ) }
        else if ( key > node.key ) { return 1 + this.size( node.left ) + this.rank( node.right, key ) }
        else return this.size( node.left )
    }

    select ( k ) {
        return this._select( this.root, k ).key
    }

    _select ( node, k ) {
        if ( node === null ) return null
        let t = this.size(node.left)
        if ( t > k ) return this._select( node.left, k )
        else if ( t < k ) return this._select( node.right, k - t- 1 )
        else return node
    }


    delete (key) {
        this.root = this._delete( this.root, key )
    }

    _delete ( node, key ) {
        
        if ( node === null ) return null
        if ( key < node.key ) { node.left = this._delete( node.left, key ) }
        else if ( key > node.key ) { node.right = this._delete( node.right, key ) }
        else {
            if ( node.right === null ) { return node.left }
            if ( node.left === null ) { return node.right }
            let t = node
            node = this._min( t.right )
            node.right = this._deleteMin( t.right )
            node.left = t.left
        }
        node.n = this.size( node.left ) + this.size( node.right ) + 1
        return node
    }


    deleteMin () {
        this.root = this._deleteMin( this.root )
    }

    _deleteMin ( node ) {
        if ( node.left === null ) return node.right
        node.left = this._deleteMin( node.left ) 
        node.n = this.size( node.left ) + this.size( node.right ) + 1
        return node
    }


    deleteMax () {
        this.root = this._deleteMax( this.root )
    }

    _deleteMax ( node ) {
        if ( node.right === null ) return node.left
        node.right = this._deleteMax( node.right ) 
        node.n = this.size( node.left ) + this.size( node.right ) + 1
        return node
    }


    sizeRange (lo, hi) {
        if ( this.contains( hi ) ) return this.rank( hi ) - this.rank( lo ) + 1
        else { return this.rank( hi ) - this.rank( lo ) }
    }

    keysRange (lo, hi) {
        const arr = []
        this._keysRange( this.root, arr, lo, hi )
        return arr
    }

    _keysRange ( node, arr, lo, hi ) {
        if ( node === null ) return
        if ( lo < node.key ) { this._keysRange( node.left, arr, lo, hi ) }
        if ( lo <= node.key && hi >= node.key ) { arr.push( node.key ) }
        if ( hi > node.key ) { this._keysRange( node.right, arr, lo, hi ) }
    }


    keys () {
        this.keysRange( this.min(), this.max() )
    }

}
```

#### 基于平衡查找树的符号表


:::details 2-3查找树
2-结点（含有一个键和两条链接）,左链接指向的键都小于该结点，右链接指向的键都大于该结点<br/>

3-结点（含有两个键和三条链接）,左链接指向的键都小于该结点，中链接指向的键都位于该结点的两个键之间，右链接指向的键都大于该结点<br/>
:::


::: details 2-3查找树插入操作的核心思想
向2-结点中插入新建,只需把2-结点替换为3-结点
![An image](../assets/23tree-insert2.png)

向一棵只含有一个3-结点的树中插入新键,需将它临时变为4-结点，然后将它转换为一棵由3个2-结点组成的2-3树
![An image](../assets/23tree-insert3a.png)

向一个父结点为2-结点的3-结点中插入新键,需将它临时变为4-结点，然后将其分解，但我们会将中键移动至父结点中
![An image](../assets/23tree-insert3b.png)


向一个父结点为3-结点的3-结点中插入新键,需将它临时变为4-结点，然后将其分解，将中键移动至父结点中,但父结点也是一个3-结点，我们在用这个中键构造一个新的临时4-结点，然后在这个结点上进行相同的变换，直至遇到一个2-结点并将它替换为一个不需要继续分解的3-结点或者是到达3-结点的根
![An image](../assets/23tree-insert3c.png)


如果根结点变成一个临时的4-结点，需将临时的4-结点分解为3个2-结点，使得树高加一
![An image](../assets/23tree-split.png)
:::


::: details 红黑树定义
含有红黑链接并满足下列条件的二叉查找树<br/>
红链接均为左链接<br/>
没有任何一个结点同时和两条红链接相连<br/>
该树是完美黑色平衡的，即任意空链接到根结点的路径上的黑链接数量相同
:::



:::details 红黑树插入操作的核心思想
向2-结点中插入新键，如果新键小于老健，我们只需要新增一个红色的结点即可。如果新键大于老键，那么新增的红色结点将会产生一条红色的右链接，我们需要将其旋转为红色左链接并修正根结点的链接<br/>
![An image](../assets/redBlackTree-insert2.jpg)

向3-结点中插入新键，分为三种子情况<br/>
如果新键大于原树中的两个键，它被连接到3-结点的右链接，3-结点有两条红链接，分别和较小和较大的结点相连，我们将这两条链接的颜色都由红变黑即可<br/>
如果新键小于原树中的两个键，它被连接到3-结点的左链接,这样就产生了两条连续的红链接，这时我们只需要将上层的红链接右旋转，然后将这两条链接的颜色都由红变黑即可<br/>
如果新键介于原树中的两个键之间，这又会产生两条连续的红链接，此时我们只需要将下层的红链接左旋转，然后将上层的红链接右旋转,最后将这两条链接的颜色都由红变黑即可<br/>
![An image](../assets/redBlackTree-insert3.jpg)
:::


```js
class Node {

    constructor ( key, val, n, color ) {
        this.key = key
        this.val = val
        this.left = null
        this.right = null
        this.n = n
        this.color = color
    }

}
```

```js
class RedBlackBST {

    constructor () {
        this.root = null
    }

    isRed ( node ) {
        if ( node === null ) return false
        return x.color === 'RED'        
    }

    rotateLeft ( node ) {
        let x = node.right
        node.right = x.left
        x.left = node
        x.color = node.color
        node.color = 'RED'
        x.n = node.n
        node.n = 1 + this.size( node.left ) + this.size( node.right )
        return x
    }

    rotateRight ( node ) {
        let x = node.left
        node.left = x.right
        x.right = node
        x.color = node.color
        node.color = 'RED'
        x.n = node.n
        node.n = 1 + this.size( node.left ) + this.size( node.right )
        return x
    }

    flipColors ( node ) {
        node.color = 'RED'
        node.left.color = 'BLACK'
        node.right.color = 'BLACK'
    }

    size ( node = this.root ) {
        if ( node === null ) return 0
        return node.n
    }

    put ( key, val ) {
        this.root = this._put( this.root, key, val )
        this.root.color = 'BLACK'
    }

    _put ( node, key, val ) {
        if ( node === null ) return new Node( key, val, 1, 'RED' )
        if ( key < node.key ) {
            node.left = this._put( node.left, key, val )
        } else if ( key > node.key ) {
            node.right = this._put( node.right, key, val )
        } else {
            node.val = val
        }

        if ( this.isRed( node.right ) && !this.isRed( node.left ) ) node = this.rotateLeft( node )
        if ( this.isRed( node.left ) && this.isRed( node.left.left ) ) node = this.rotateRight( node )
        if ( this.isRed( node.left ) && this.isRed( node.right ) ) this.flipColors( node )
        node.n = this.size( node.left ) + this.size( node.right ) + 1
        return node
    }

}
```
