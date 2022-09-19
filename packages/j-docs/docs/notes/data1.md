[toc]

# 数据结构与算法

## 数据结构

### 栈

| 特征 |
|---|
| 运算受限 |
| 线性 |
| 先进后出 |

#### 例题

链接：`https://leetcode-cn.com/problems/baseball-game/`

```
export default (arr) => {
    let result = []
    let pre1
    let pre2
    arr.forEach(item => {
        switch (item) {
            case 'C':
                result.length && result.pop()
                break;
            case 'D':
                pre1 = result.pop()
                result.push(pre1, pre1 * 2)
                break;
            case '+':
                pre1 = result.pop()
                pre2 = result.pop()
                result.push(pre2, pre1, pre2 + pre1)
                break;
            default:
                result.push(item * 1)
        }
    })
    return result.reduce((total, num) => { return total + num })
};
```

链接：`https://leetcode-cn.com/problems/maximal-rectangle/`

```
export default (arr) => {
  let result = [];
  let reg = /1{2,}/g;
  arr = arr.map( item => {
      let str = item.join( '' )
      let r = reg.exec( str )
      let rs = []
      while( r ) {
          rs.push([ r.index, r.index + r[0].length - 1 ])
          r = reg.exec( str )
      }
      return rs
  } )
  let maxRect = (arr, result, n = 1) => {
      // 弹出第一行
      let top = arr.pop()              
      // 弹出第二行
      let next = arr.pop()
      // 记录第一行的每一个起始点和截止点
      let tt 
      // 记录第二行的每一个起始点和截止点
      let nn
      // 记录交叉的起始索引
      let start 
      // 记录交叉的截止索引
      let end 
      let width = 1
      let maxWidth = 1
      n++
      for ( let i = 0, il = top.length; i < il; i++) {
          tt = top[i]
          for ( let j = 0, jl = next.length; j < jl; j++ ) {
              nn = next[j]      
              width = Math.min(tt[1], nn[1]) - Math.max(tt[0], nn[0])
              if ( width > maxWidth ) {
                  maxWidth = width
                  start = Math.max(tt[0], nn[0])
                  end = Math.min(tt[1], nn[1])
              }
          }
      }
      // 如果没有找到交叉点
      if ( start === undefined || end === undefined ) {
          if ( n < 3 ) {
              return false                         
          } else {
              width =  top[0][1] - top[0][0] + 1      
              if ( width > 1 ) {
                  result.push( (n - 1) * width )
              }
          }
      } else {
          arr.push([[start, end]])      
          maxRect(arr, result, n++)
      }
  }
  while( arr.length > 1 ) {
      maxRect([].concat(arr), result)      
      arr.pop()
  }
  // 取最大值
  let max = 0
  let item = result.pop()
  while( item ){
      if (item > max) {
          max = item
      }
      item = result.pop()
  }
  return max > 0 ? max : -1
};
```


### 队列

| 特征 |
|---|
| 线性 |
| 先进先出 |
| 只允许在表的前端进行删除操作，而在表的后端进行插入操作 |

#### 例题

链接： `https://leetcode-cn.com/problems/design-circular-queue/`

```
class MyCircularQueue {
    constructor (k) {
        // 用来保存数据长度为k的数据结构
        this.list = Array(k)
        // 队首指针
        this.front = 0
        // 队尾指针
        this.rear = 0
        // 队列的长度
        this.max = k
    }
    enQueue ( num ) {
        // 向循环队列插入一个元素
        if ( this.isFull() ) {
            return false
        } else {
            this.list[this.rear] = num    
            // 形成一个环形
            this.rear = (this.rear + 1) % this.max
            return true
        }
    }
    deQueue () {
        // 从循环队列中删除一个元素 
        let v = this.list[this.front]
        this.list[this.front] = ''
        // 形成一个环形
        this.front = (this.front + 1) % this.max
        return v
    }
    isEmpty () {
        // 循环队列是否为空
        return this.front === this.rear && !this.list[this.front]
    }
    isFull () {
        // 循环队列是否已满
        return this.front === this.rear && !!this.list[this.front]
    }
    Front () {
        // 从队首获取元素
        return this.list[this.front]
    }
    Rear () {
        // 获取队尾元素
        let rear = this.rear - 1
        return this.list[rear<0?this.max-1:rear]
    }
}
```

链接： `https://leetcode-cn.com/problems/task-scheduler/`

```
var leastInterval = function(tasks, n) {
    let q = ''
    let Q = {}
    tasks.forEach(item => {
        if (Q[item]) {
            Q[item]++
        } else {
            Q[item] = 1
        }    
    })
    while (1) {
        let keys = Object.keys(Q)    
        if (!keys[0]) {
            break    
        }
        // n+1 为一组
        let tmp = []
        for (let i =0; i <=n; i++) {
            let max = 0    
            let key
            let pos
            //  从所有的任务中找到未处理数最大的优先安排
            keys.forEach((item, idx)=> {
                if (Q[item] > max) {
                    max = Q[item]
                    key = item
                    pos = idx
                }
            })
            if (key) {
                tmp.push(key)
                keys.splice(pos, 1)
                Q[key]--
                if (Q[key] <  1) {
                    delete Q[key]
                }
            } else {
                break
            }
        }
        q += tmp.join('').padEnd(n + 1, '-')
    } 
    q = q.replace(/-+$/g, '')
    return q.length
}
```

### 链表

#### 例题

链接： `https://leetcode-cn.com/problems/sort-list/`

```
class Node {
    constructor (value) {
        this.val = value
        this.next = undefined
    }
}    
class NodeList {
    constructor (arr) {
        // 声明链表的头部节点
        let head = new Node(arr.shift())    
        let next = head 
        arr.forEach(item => {
            next.next = new Node(item)
            next = next.next
        })
        return head
    }
}

let swap = (p, q) => {
    let val = p.val
    p.val = q.val
    q.val = val
}

// 寻找基准元素的节点
let partion = (begin, end) => {
    let val = begin.val
    let p = begin
    let q = begin.next
    while ( q!== end) {
        if(q.val < val) {
            p = p.next
            swap(p, q)
        }
        q = q.next
    }
    // 让基准元素跑到中间去
    swap(p, begin)
    return p
}

function sort (begin, end) {
    if (begin !== end) {
        let part = partion(begin, end)
        sort(begin, part)
        sort(part.next, end)
    }
}
```

链接： `https://leetcode-cn.com/problems/linked-list-cycle/`

```
class Node {
    constructor (value) {
        this.val = value
        this.next = undefined
    }
}    
class NodeList {
    constructor (arr) {
        // 声明链表的头部节点
        let head = new Node(arr.shift())    
        let next = head 
        arr.forEach(item => {
            next.next = new Node(item)
            next = next.next
        })
        return head
    }
}    

function isCircle (head) {
    // 慢指针
    let slow = head
    // 快指针
    let fast = head.next
    while (1) {
        if (!fast || !fast.next) {
            return false
        } else if (fast === slow || fast.next === slow) {
            return true
        } else {
            slow = slow.next
            fast = fast.next.next
        }
    }
}
```


### 矩阵

#### 例题

`链接：https://leetcode-cn.com/problems/spiral-matrix/`

```
function matrix (arr) {
    // 处理每一圈的数据遍历过程
    let map = (arr, r = []) => {
        for (let i = 0, len = arr.length; i < len; i++) {
            if ( i === 0 ) {
                r = r.concat(arr[i])
            } else if ( i === len - 1) {
                r = r.concat(arr[i].reverse()) 
            } else {
                r.push(arr[i].pop())
            }
        }    
        arr.shift() 
        arr.pop() 
        for (let i = arr.length - 1; i >= 0; i--) { 
            r.push(arr[i].shift())    
        }
        if (arr.length) {
            return map(arr, r)
        } else {
            return r
        }
    }
    return map(arr, [])
}   
```

`链接：https://leetcode-cn.com/problems/rotate-image/`

```
function matrix (arr) {
    // 获取n的维度
    let vecor = arr.length
    // 垂直旋转
    for (let i = 0,len = vecor / 2;i < len; i++){
        for (let j = 0, tmp; j < vecor; j++) {
            tmp = arr[i][j]        
            arr[i][j] =  arr[vecor-i-1][j]
            arr[vecor-i-1][j] = tmp
        }
    }
    // 对角线翻转
    for (let i = 0; i < vecor; i++) {
        for (let j = 0, tmp; j< i; j++) {
            tmp = arr[i][j]    
            arr[i][j] = arr[j][i]
            arr[j][i] = tmp
        }
    }
    return arr
}
```


### 二叉树

#### 例题

`链接：https://leetcode-cn.com/problems/symmetric-tree/`

```
// 二叉树的节点
class Node {
    constructor (val) {
        this.val = val
        this.left = this.right = undefined
    }
}

class Tree {
    constructor (data) {
        // 临时存储所有节点，方便寻找父子节点
        let nodeList = []
        // 顶节点
        let root
        for (let i = 0, len = data.length; i < len; i++) {
            let node = new Node(data[i])
            nodeList.push(node)
            if ( i > 0 ) {
                // 计算当前节点属于哪一层
                let n = Math.floor( Math.log2(i+1) )
                // 记录当前层的起始点
                let q = Math.pow(2, n) - 1
                // 记录上一层的起始点
                let p = Math.pow(2, n - 1) -1
                // 找到当前节点的父节点
                let parent = nodeList[p + Math.floor( ( i - q ) / 2 )]
                // 将当前节点和上一层的父节点做关联
                if (parent.left) {
                    parent.right = node
                } else {
                    parent.left = node
                }
            }
        }
        root = nodeList.shift()
        nodeList.length = 0
        return root
    }

    static isSymmetry (root) {
        if (!root) return true
        let walk = (left, right) => {
            if ( !left && !right ) { return true }
            if ( ( left && !right ) || ( !left && right ) || ( left.val !== right.val ) ) {
                return false
            }
            return walk(left.left, right.right) && walk(left.right, right.left)
        }
        return walk(root.left, root.right)
    }
}
```

`链接：https://leetcode-cn.com/problems/validate-binary-search-tree/`

```
class Node {
    constructor (val) {
        this.val = val
        this.left = this.right = undefined
    }
}

class Tree {
    constructor (data) {
        let root = new Node(data.shift())
        // 遍历所有的数据，逐渐插入到当前这棵搜索树中去
        data.forEach(item =>{
            this.insert(root, item)
        })
        return root
    }

    insert (node, data) {
        if (node.val > data) {
            if (node.left === undefined) {
                node.left = new Node(data)
            } else {
                this.insert(node.left, data)
            }
        } else {
            if (node.right === undefined) {
                node.right = new Node(data)
            } else {
                this.insert(node.right, data)
            }
        }    
    }

    static walk(root) {
        if (!root.left && !root.right) {
            return true
        } else if ( (root.left&& root.val < root.left.val) || (root.rigth && root.val > root.right.val) ) {
            return false
        } else {
            return Tree.walk(root.left) && Tree.walk(root.right)
        }    
    }

}
```

### 堆

| 特性 |
| --- |
| 必须是完全二叉树 |
| 任一结点的值是其子树所有结点的最大值或最小值 |


#### 例题


`链接：https://leetcode-cn.com/problems/sort-characters-by-frequency/`


```
class Heap {
    constructor (str) {
        let map = new Map()
        str.split('').forEach(item => {
            if (map.has(item)) {
                map.set(item, map.get(item) + 1)
            } else {
                map.set(item, 1)
            }
        })
        this.map = map 
        this.data = Array.from(map.values())
    }

    sort () {
        let iArr = this.data
        let n = iArr.length
        if ( n <= 1) {
            return iArr
        } else {
            for (let i = Math.floor(n/2);i >= 0; i-- ) {
                Heap.maxHeapify(iArr, i, n)
            }     
            for (let j = 0; j < n; j++) {
                Heap.swap(iArr, 0, n-1-j)
                Heap.maxHeapify(iArr, 0, n-1-j-1)
            }
            return iArr
        }
    }

    toString () {
        let arr = this.sort()
        let str = []
        while (arr.length) {
            let top = arr.pop()
            for (let [k, v] of this.map) {
                if ( v===top ) {
                    str.push(k.repeat(v))
                    this.map.delete(k)
                    break
                }
            }
        }
        return str.join('')
    }

    // 构建最大堆的过程
    static maxHeapify (Arr, i, size) {
        // 左节点（索引）
        let l = i * 2 + 1
        // 右节点（索引）
        let r = i * 2 + 2
        let largest = i
        // 父节点i和左节点l做比较取最大
        if ( l <= size && Arr[l] > Arr[largest] ) {
            largest = l        
        }
        // 右节点和最大值比较
        if ( r <= size && Arr[r] > Arr[largest]) {
            largest = r        
        }
        if (largest !== i) {
            Heap.swap(Arr, i, largest)
            Heap.maxHeapify(Arr, largest, size)
        }
    }

    // 交换两个元素
    static swap (arr, a, b) {
        if (a === b) { return ''}    
        let c = arr[a]
        arr[a] = arr[b]
        arr[b] = c
    }

}    
```

`链接：https://leetcode-cn.com/problems/super-ugly-number/`

解题思路
第一步：求解任意整数的质因数
第二步：质因数是否在指定质因数范围内
第三步：是否达到指定个数n

```
class Ugly {
    constructor (n, primes) {
        this.n = n
        this.primes = primes
    }

    getAll () {
        // 超级丑数列表
        let res = [1]
        let i = 2
        let primes = this.primes
        while (res.length < this.n) {
            let arr = Ugly.getPrimes(i)
            let k = 0
            let l = arr.length
            for (;k < l;k++) {
                if (!primes.find(item => item === arr[k])) {
                    break
                }
            }
            // k===l有两种情况，一种就是当前这个数压根没有质因数,一种是所有质因数都在指定列表中
            if (k === l) {
                if (l === 0) {
                    if (primes.find(item => item === i)) {
                        res.push(i)
                    }    
                } else {
                    res.push(i)
                }
            }
            i++
        }
        return res[this.n - 1]
    }

    // 计算指定正整数n的质因数
    static getPrimes (n) {
        let prime = (n) => {
            // 存储所有的质因数
            let arr = []
            for (let i = 2; i < n/2 + 1; i++) {
                if ( n % i === 0 && !prime(i).length ) {
                    arr.push(i)    
                }
            }
            return arr
        }
        return prime(n)
    }
}
```

```
class Heap {
    constructor (arr) {
        this.data = arr
        this.max = arr.length
        this.sort()
    }

    sort () {
        let iArr = this.data
        let n = iArr.length
        if ( n <= 1) {
            return iArr
        } else {
            for (let i = Math.floor(n/2);i >= 0; i-- ) {
                Heap.maxHeapify(iArr, i, n)
            }
            return iArr
        }
    }

    find (val, i = 0) {
        let arr = this.data
        if ( val > arr[i] || i > this.max ) {
            return false 
        } else if ( val === arr[i] ) {
            return val
        } else {
            return this.find(val, i * 2 + 1) || this.find(val, i * 2 + 2)        
        }
    }

    // 构建最大堆的过程
    static maxHeapify (Arr, i, size) {
        // 左节点（索引）
        let l = i * 2 + 1
        // 右节点（索引）
        let r = i * 2 + 2
        let largest = i
        // 父节点i和左节点l做比较取最大
        if ( l <= size && Arr[l] > Arr[largest] ) {
            largest = l
        }
        // 右节点和最大值比较
        if ( r <= size && Arr[r] > Arr[largest]) {
            largest = r
        }
        if (largest !== i) {
            Heap.swap(Arr, i, largest)
            Heap.maxHeapify(Arr, largest, size)
        }
    }

    // 交换两个元素
    static swap (arr, a, b) {
        if (a === b) { return ''}
        let c = arr[a]
        arr[a] = arr[b]
        arr[b] = c
    }

}


class Ugly {
    constructor (n, primes) {
        this.n = n
        this.primes = new Heap(primes)
    }

    getAll () {
        // 超级丑数列表
        let res = [1]
        let i = 2
        let primes = this.primes
        while (res.length < this.n) {
            let arr = Ugly.getPrimes(i)
            let k = 0
            let l = arr.length
            for (;k < l;k++) {
                if ( !primes.find( arr[k] ) ) {
                    break
                }
            }
            // k===l有两种情况，一种就是当前这个数压根没有质因数,一种是所有质因数都在指定列表中
            if (k === l) {
                if (l === 0) {
                    if ( primes.find( i ) ) {
                        res.push(i)
                    }    
                } else {
                    res.push(i)
                }
            }
            i++
        }
        return res[this.n - 1]
    }

    // 计算指定正整数n的质因数
    static getPrimes (n) {
        let prime = (n) => {
            // 存储所有的质因数
            let arr = []
            for (let i = 2; i < n/2 + 1; i++) {
                if ( n % i === 0 && !prime(i).length ) {
                    arr.push(i)    
                }
            }
            return arr
        }
        return prime(n)
    }
}
```

## 排序


### 快速排序

`本质：在遍历的时候，先选一个基准元素，选中这个基准元素的目的是，把所有小于基准元素的放在左边，大于基准元素的放在右边，在对基本元素左边的第一个元素做为左边的基准元素，重复上述过程，以此类推`

```
const fn = (arr) => {
    let quickSort = (arr) => {
        let len = arr.length
        if (len < 2) {
            return arr
        } else {
            let flag = arr[0]
            let left = []
            let right = []
            for (let i=1, tmp; i < len; i++) {
                tmp = arr[i]
                if (tmp<flag) {
                    left.push(tmp)
                } else {
                    right.push(tmp)
                }
            }
            return quickSort(left).concat(flag, quickSort(right))
        }
    }
    return quickSort(arr)
}
```

```
const fn = (arr) => {
    let swap = (arr, i, j) => {
        let tmp = arr[i]
        arr[i] = arr[j]
        arr[j] = tmp
    }
    let findCenter = (arr, left, right) => {
        let flag = arr[left]
        let idx = left + 1
        for (let i = idx; i <= right; i++) {
            if (arr[i] < flag) {
                swap(arr, idx, i)
                idx++
            }
        }
        swap(arr, left, idx - 1)
        return idx
    }
    let sort = (arr, left, right) => {
        if (left < right) {
            let center = findCenter(arr, left, right)
            sort(arr, left, center - 1)
            sort(arr, center, right)
        }  
    }
    sort(arr, 0, arr.length - 1)
    return arr
}
```

### 堆排序

```
class Heap {
    constructor (data) {
        this.data = data
    }

    sort () {
        let iArr = this.data
        let n = iArr.length
        if ( n <= 1) {
            return iArr
        } else {
            for (let i = Math.floor(n/2);i >= 0; i-- ) {
                Heap.maxHeapify(iArr, i, n)
            }     
            for (let j = 0; j < n; j++) {
                Heap.swap(iArr, 0, n-1-j)
                Heap.maxHeapify(iArr, 0, n-1-j-1)
            }
            return iArr
        }
    }

    // 构建最大堆的过程
    static maxHeapify (Arr, i, size) {
        // 左节点（索引）
        let l = i * 2 + 1
        // 右节点（索引）
        let r = i * 2 + 2
        let largest = i
        // 父节点i和左节点l做比较取最大
        if ( l <= size && Arr[l] > Arr[largest] ) {
            largest = l        
        }
        // 右节点和最大值比较
        if ( r <= size && Arr[r] > Arr[largest]) {
            largest = r        
        }
        if (largest !== i) {
            Heap.swap(Arr, i, largest)
            Heap.maxHeapify(Arr, largest, size)
        }
    }

    // 交换两个元素
    static swap (arr, a, b) {
        if (a === b) { return ''}    
        let c = arr[a]
        arr[a] = arr[b]
        arr[b] = c
    }

} 
```

## 算法

### 简单算法

#### 字符串

##### 例题

`链接：https://leetcode-cn.com/problems/reverse-words-in-a-string-iii/` 

```
const fn = (str) => {
    return str.split(' ').map(item => {
        return item.split('').reverse().join('')
    }).join(' ')
}
```

`链接：https://leetcode-cn.com/problems/count-binary-substrings/`

```
const fn = (str) => {
    let r = []
    let match = (str) => {
        let j = str.match(/^(0+|1+)/)[0]        
        let o = (j[0] ^ 1).toString().repeat(j.length)
        let reg = new RegExp(`^(${j}${o})`)
        if (reg.test(str)) {
            return RegExp.$1
        } else {
            return ''
        }
    }
    for (let i = 0, len = str.length - 1; i < len ;  i++ ) {
        let sub = match(str.slice(i))
        if (sub) {
            r.push(sub)
        }
    }
    return r
}
```

#### 数组

##### 例题

`链接：https://leetcode-cn.com/problems/letter-combinations-of-a-phone-number/`

```
const fn = (str) => {
    let map = [
        '',
        1,
        'abc',
        'def',
        'ghi',
        'jkl',
        'mno',
        'pqrs',
        'tuv',
        'wxyz'
    ]
    let num = str.split('')
    let code = []
    num.forEach(item => {
        if (map[item]) {
            code.push(map[item])
        }
    })
    let comb = (arr) => {
        let tmp = []
        for (let i = 0, il = arr[0].length; i < il; i++) {
            for (let j = 0, jl = arr[1].length; j < jl; j++) {
                tmp.push(`${arr[0][i]}${arr[1][j]}`)
            }
        }
        arr.splice(0, 2, tmp)
        if (arr.length > 1) {
            comb(arr)
        } else {
            return tmp
        }
        return arr[0]
    }
    return comb(code)
}
```

`链接：https://leetcode-cn.com/problems/x-of-a-kind-in-a-deck-of-cards/`

```
const fn = (arr) => {
    // 卡牌排序，排序的目的就是为了让相同的牌排在一起方便我们分组
    let str = arr.sort().join('')
    // 分组（单张或者多张）
    let group = str.match(/(\d)\1+|\d/g)
    // 求两个数的最大公约数
    let gcd = (a, b) => {
        if (b === 0) {
            return a
        } else {
            return gcd(b, a%b)
        }
    }                    
    while (group.length > 1) {
        let a = group.shift().length    
        let b = group.shift().length
        let v = gcd(a, b)
        if ( v=== 1 ) {
            return false
        } else {
            group.unshift('0'.repeat(v))
        }
    }
    return group.length ? group[0].length > 1 : false
}
```

`链接：https://leetcode-cn.com/problems/can-place-flowers/`

```
const fn = (arr, n) => {
    let max = 0
    for (let i = 0, len = arr.length -1; i < len; i++) {
        if (arr[i] === 0) {
            if ( i===0 && arr[1] === 0 ) {
                max++    
                i++
            } else if (arr[i-1] === 0 && arr[i+1] === 0) {
                max++    
                i++
            }
        }
    }
    return max >= n
}
```

`链接：https://leetcode-cn.com/problems/gray-code/`

```
const fn = (n) => {
    let make = (n) => {
        if (n === 1) {
            return ['0', '1']
        } else {
            let prev = make(n-1)
            let result = []
            let max = Math.pow(2, n) - 1
            for (let i = 0, len = prev.length; i < len; i++) {
                result[i] = `0${prev[i]}`
                result[max-i] = `1${prev[i]}`
            }
            return result
        }
    }
    return make(n)
}  
```

#### 递归

##### 例题

`链接：https://leetcode-cn.com/problems/restore-ip-addresses/`

```
const fn = (str) => {
    // 保存所有符合条件的ip
    let r = [] 
    // 递归函数
    let search = (cur, sub) => {
        if (cur.length === 4 && cur.join('') === str) {
            r.push(cur.join('.'))
        } else {
            for (let i = 0, len = Math.min(3, sub.length), tmp; i<len; i++) {
                tmp = sub.substr(0, i+1)    
                if (tmp < 256) {
                    search(cur.concat([tmp]), sub.substr(i+1))
                }
            }
        }
    }
    search([], str)
    return r
}  
```

`链接：https://leetcode-cn.com/problems/substring-with-concatenation-of-all-words/`

```
const fn = (str, words) => {
    let num = words.length
    let result = []
    let range = (r, _arr) => {
        if (r.length === num) {
            result.push(r)
        } else {
            _arr.forEach( (item, idx) => {
                let tmp = [].concat(_arr)
                tmp.splice(idx, 1)
                range(r.concat(item), tmp)
            } )
        } 
    }
    range([], words)
    return result.map(item => {
        return str.indexOf(item.join(''))
    }).filter(item => item!== -1).sort()
}
```

#### 正则表达式

##### 例题

`链接：https://leetcode-cn.com/problems/repeated-substring-pattern/`

```
const fn = (str) => {
    var reg = /^(\w+)\1+$/
    return reg.test(str)
}   
```

`链接：https://leetcode-cn.com/problems/regular-expression-matching/`

```
const fn = (s, p) => {
    let isMatch = (s, p) => {
        // 边界情况，如果s和p都为空，说明处理结束了，返回true，否则返回false
        if (p.length <= 0) {
            return !s.length
        }
        // 判断p模式字符串的第一个字符和s字符串的第一个字符是不是匹配
        let match = false
        if (s.length > 0 && (p[0] === s[0] || p[0] === '.') ) {
            match = true
        }
        if (p.length > 1 && p[1] === '*') {
            // 第一种情况：s*匹配0个字符
            // 第二种情况：s*匹配1个字符,递归下去，用来表示s*匹配多个s
            return isMatch(s, p.slice(2)) || (match && isMatch(s.slice(1), p)) 
        } else {
            return match && isMatch(s.slice(1), p.slice(1))
        }
    }
    return isMatch(s, p)
}
```

#### 排序

##### 例题

`链接：https://leetcode-cn.com/problems/sort-array-by-parity-ii/`

```
const fn = (arr) => {
    arr.sort((a, b) => a - b)
    let r = []
    let odd = 1
    let even = 0
    arr.forEach(item => {
        if ( item%2 === 1 ) {
            r[odd] = item
            odd += 2
        } else {
            r[even] = item
            even += 2
        }
    })
    return r
}
```

`链接：https://leetcode-cn.com/problems/kth-largest-element-in-an-array/`

```
const fn = (arr, k) => {
    return arr.sort( (a, b) => b - a )[k-1]
}
```

```
const fn = (arr, k) => {
    let len = arr.length - 1    
    for (let i = len, tmp; i > len - k; i--) {
        for (let j = 0; j < i; j++) {
            if (arr[j] > arr[j+1]) {
                tmp = arr[j]
                arr[j] = arr[j+1]
                arr[j+1] = tmp
            }
        }
    }
    return arr[len-(k-1)]
} 
```

`链接：https://leetcode-cn.com/problems/maximum-gap/`

```
const fn = (arr) => {
    if (arr.length < 2) {
        return 0
    }
    arr.sort()
    let max = 0
    for (let i = 0, len = arr.length - 1, tmp; i < len; i++) {
        tmp = arr[i+1] - arr[i]    
        if (tmp > max) {
            max = tmp
        }
    }
    return max
}
```

```
const fn = (arr) => {
    if (arr.length < 2) {
        return 0
    }
    let max = 0
    let len = arr.length - 1
    let space
    for (let i = len,tmp; i > 0; i--) {
        for (let j = 0; j < i; j++) {
            tmp = arr[j]    
            if (tmp > arr[j+1]) {
                arr[j] = arr[j+1]
                arr[j+1] = tmp
            }
        }
        if (i < len) {
            space = arr[i+1] - arr[i]
            if (space > max) {
                max = space
            }
        }
    }
    return Math.max(max, arr[1] - arr[0])
}
```

`链接：https://leetcode-cn.com/problems/first-missing-positive/`

```
const fn = (arr) => {
    arr = arr.filter(item => item > 0)
    if (arr.length) {
        arr.sort((a,b) => a - b)
        if (arr[0] !== 1) { 
            return 1 
        } else {
            for (let i = 0, len = arr.length - 1; i < len; i++) {
                if (arr[i+1] - arr[i] > 1) {
                    return arr[i]+1
                }
            }
            return arr.pop() + 1
        }
    } else {
        return 1
    }
} 
```

```
const fn = (arr) => {
    arr = arr.filter(item => item > 0)
    for (let i=0, len = arr.length, min; i < len; i++) {
        min = arr[i]    
        for (let j = i + 1; j < len; j++) {
            if (arr[j] < min) {
                let c = min
                min = arr[j]
                arr[j] = c
            }
        }
        arr[i] = min 
        if (i > 0) {
            if (arr[i] - arr[i-1] > 1) {
                return arr[i-1] + 1
            }        
        } else {
            if (min !== 1) {
                return 1
            }
        }
    }
    return arr.length ? arr.pop() + 1 : 1
}
```


### 贪心算法

#### 例题

`链接：https://leetcode-cn.com/problems/best-time-to-buy-and-sell-stock-ii/`

解题思路
问题：最大利润
策略1：从最低点买入，在最高点卖出（追求单次利益）
策略2：从低点买入，只要可以赚钱就卖出，不断买卖（追求多次利益，单次利益不够）
策略3：从低点买入，到价格高点卖出，不断买卖（在保证单次利益的基础上，实现多次交易）

```
const fn = (prices) => {
    // 用来保存利润
    let count = 0
    for (let i=0,len=prices.length;i<len;i++) {
        for (let j = i; j < len - 1; j++) {
            if ( prices[j+1] > prices[j] ) {
                count += prices[j + 1] - prices[j]
                i = j
            } else {
                i = j
                break
            }
        }
    }
    return count
}
```

`链接：https://leetcode-cn.com/problems/lemonade-change/`

解题思路
问题：找零钱
策略1：给钱找零，不区分金额直到找到足够的零钱（追求单次找零）
策略2：给钱找零，优先给金额大的零钱，尽量把零钱放在手里（追求多次找零）

```
const fn = (input) => {
    // 表示自己的钱箱（用于存储零钱）
    let hand = []
    // 判断是否有顾客还在
    while (input.length) {
        // 取出当前排在最前面顾客的钱
        let money = input.shift()    
        // 这种情况不需要找零
        if (money === 5) {
            hand.push(money)    
        } else {
            // 手里的零钱要降序排列也就是说最大的面值的钱放在最前面
            hand.sort((a, b) => b - a )
            // 顾客的钱减去饮料的钱就是需要找给顾客的零钱
            let change = money - 5
            for (let i = 0, len = hand.length; i < len; i++) {
                if (hand[i] <= change) {
                    change -= hand[i]
                    hand.splice(i, 1)
                    // 删除了元素，数组的长度发生了变化,要维持刚才的i不变
                    i--
                }    
                if (change === 0) {
                    break
                }
            }
            // 没有足够的零钱找给顾客
            if (change !== 0) {
                return false 
            } else {
                // 顾客的钱存起来
                hand.push(money)      
            }
        }
    }
    return true
}     
```

### 动态规划

动态规划包括三个重要概念：`状态转移方程``最优子结构``边界`



#### 例题

`链接：https://leetcode-cn.com/problems/unique-paths-ii/`

```
const fn = (arr, m, n) => {
    let dp = (m,n) => {
        if (m === 2 && n === 2) {
            return (arr[1][1] === 1 || arr[1][0] + arr[0][1] === 2) ? 0 : (arr[1][0] === 1 || arr[0][1] === 1) ? 1 : 2   
        } else if (m < 2 || n < 2) {
            if (m < 2) {
                // 单行有1就返回0,没有1返回1
                return arr[m-1].includes(1) ? 0 : 1    
            } else {
                // 单列中不能有障碍物(1)有它返回0,没有就返回1
                for (let i = 0; i < m; i++) {
                    if (arr[i][0] === 1) {
                        return 0
                    }
                }    
                return 1
            }
        } else {
            return dp( m-1, n ) + dp(m, n-1)
        }
    }
    return dp(m, n)
}
```

`链接：https://leetcode-cn.com/problems/cheapest-flights-within-k-stops/`

```
const fn = (src, dst, k) => {
    // 对n个城市,m个航班做飞行说明
    let fights = [
        [0, 1, 100],
        [1, 2, 100],
        [0, 2, 500]
    ]
    
    let cheap = (src, dst, k) => {
        // 找到dst的前一站
        let prev = fights.filter(item=>item[1] === dst)
        let min = Math.min.apply(null, prev.map(item => {
            // 从dst往前找,找到了起始城市
            if (item[0] === src && k > -1) {
                return item[2]    
            } else if (k === 0 && item[0] !== src ) {
                return Number.MAX_SAFE_INTEGER
            } else {
                return item[2] + cheap(src, item[0], k-1)
            }
        }))
        return min
    }
    return cheap(src, dst, k) || -1
}
```










