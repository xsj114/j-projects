---
title: 算法
titleTemplate: 学习笔记
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

