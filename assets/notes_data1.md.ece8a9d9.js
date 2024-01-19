import{_ as n,o as s,c as a,g as e}from"./app.3e136681.js";const h='{"title":"\u6570\u636E\u7ED3\u6784\u4E0E\u7B97\u6CD5","description":"","frontmatter":{},"headers":[{"level":2,"title":"\u6570\u636E\u7ED3\u6784","slug":"\u6570\u636E\u7ED3\u6784"},{"level":3,"title":"\u6808","slug":"\u6808"},{"level":3,"title":"\u961F\u5217","slug":"\u961F\u5217"},{"level":3,"title":"\u94FE\u8868","slug":"\u94FE\u8868"},{"level":3,"title":"\u77E9\u9635","slug":"\u77E9\u9635"},{"level":3,"title":"\u4E8C\u53C9\u6811","slug":"\u4E8C\u53C9\u6811"},{"level":3,"title":"\u5806","slug":"\u5806"},{"level":2,"title":"\u6392\u5E8F","slug":"\u6392\u5E8F"},{"level":3,"title":"\u5806\u6392\u5E8F","slug":"\u5806\u6392\u5E8F"},{"level":2,"title":"\u7B97\u6CD5","slug":"\u7B97\u6CD5"},{"level":3,"title":"\u7B80\u5355\u7B97\u6CD5","slug":"\u7B80\u5355\u7B97\u6CD5"},{"level":3,"title":"\u8D2A\u5FC3\u7B97\u6CD5","slug":"\u8D2A\u5FC3\u7B97\u6CD5"},{"level":3,"title":"\u52A8\u6001\u89C4\u5212","slug":"\u52A8\u6001\u89C4\u5212"}],"relativePath":"notes/data1.md","lastUpdated":1705645529000}',r={},l=e(`<nav class="table-of-contents"><ul><li><a href="#\u6570\u636E\u7ED3\u6784">\u6570\u636E\u7ED3\u6784</a><ul><li><a href="#\u6808">\u6808</a><ul></ul></li><li><a href="#\u961F\u5217">\u961F\u5217</a><ul></ul></li><li><a href="#\u94FE\u8868">\u94FE\u8868</a><ul></ul></li><li><a href="#\u77E9\u9635">\u77E9\u9635</a><ul></ul></li><li><a href="#\u4E8C\u53C9\u6811">\u4E8C\u53C9\u6811</a><ul></ul></li><li><a href="#\u5806">\u5806</a><ul></ul></li></ul></li><li><a href="#\u6392\u5E8F">\u6392\u5E8F</a><ul><li><a href="#\u5806\u6392\u5E8F">\u5806\u6392\u5E8F</a></li></ul></li><li><a href="#\u7B97\u6CD5">\u7B97\u6CD5</a><ul><li><a href="#\u7B80\u5355\u7B97\u6CD5">\u7B80\u5355\u7B97\u6CD5</a><ul></ul></li><li><a href="#\u8D2A\u5FC3\u7B97\u6CD5">\u8D2A\u5FC3\u7B97\u6CD5</a><ul></ul></li><li><a href="#\u52A8\u6001\u89C4\u5212">\u52A8\u6001\u89C4\u5212</a><ul></ul></li></ul></li></ul></nav><h1 id="\u6570\u636E\u7ED3\u6784\u4E0E\u7B97\u6CD5" tabindex="-1">\u6570\u636E\u7ED3\u6784\u4E0E\u7B97\u6CD5 <a class="header-anchor" href="#\u6570\u636E\u7ED3\u6784\u4E0E\u7B97\u6CD5" aria-hidden="true">#</a></h1><h2 id="\u6570\u636E\u7ED3\u6784" tabindex="-1">\u6570\u636E\u7ED3\u6784 <a class="header-anchor" href="#\u6570\u636E\u7ED3\u6784" aria-hidden="true">#</a></h2><h3 id="\u6808" tabindex="-1">\u6808 <a class="header-anchor" href="#\u6808" aria-hidden="true">#</a></h3><table><thead><tr><th>\u7279\u5F81</th></tr></thead><tbody><tr><td>\u8FD0\u7B97\u53D7\u9650</td></tr><tr><td>\u7EBF\u6027</td></tr><tr><td>\u5148\u8FDB\u540E\u51FA</td></tr></tbody></table><h4 id="\u4F8B\u9898" tabindex="-1">\u4F8B\u9898 <a class="header-anchor" href="#\u4F8B\u9898" aria-hidden="true">#</a></h4><p>\u94FE\u63A5\uFF1A<code>https://leetcode-cn.com/problems/baseball-game/</code></p><div class="language- line-numbers-mode"><span class="copy"></span><pre><code>export default (arr) =&gt; {
    let result = []
    let pre1
    let pre2
    arr.forEach(item =&gt; {
        switch (item) {
            case &#39;C&#39;:
                result.length &amp;&amp; result.pop()
                break;
            case &#39;D&#39;:
                pre1 = result.pop()
                result.push(pre1, pre1 * 2)
                break;
            case &#39;+&#39;:
                pre1 = result.pop()
                pre2 = result.pop()
                result.push(pre2, pre1, pre2 + pre1)
                break;
            default:
                result.push(item * 1)
        }
    })
    return result.reduce((total, num) =&gt; { return total + num })
};
</code></pre><div class="line-numbers-wrapper"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br></div></div><p>\u94FE\u63A5\uFF1A<code>https://leetcode-cn.com/problems/maximal-rectangle/</code></p><div class="language- line-numbers-mode"><span class="copy"></span><pre><code>export default (arr) =&gt; {
  let result = [];
  let reg = /1{2,}/g;
  arr = arr.map( item =&gt; {
      let str = item.join( &#39;&#39; )
      let r = reg.exec( str )
      let rs = []
      while( r ) {
          rs.push([ r.index, r.index + r[0].length - 1 ])
          r = reg.exec( str )
      }
      return rs
  } )
  let maxRect = (arr, result, n = 1) =&gt; {
      // \u5F39\u51FA\u7B2C\u4E00\u884C
      let top = arr.pop()              
      // \u5F39\u51FA\u7B2C\u4E8C\u884C
      let next = arr.pop()
      // \u8BB0\u5F55\u7B2C\u4E00\u884C\u7684\u6BCF\u4E00\u4E2A\u8D77\u59CB\u70B9\u548C\u622A\u6B62\u70B9
      let tt 
      // \u8BB0\u5F55\u7B2C\u4E8C\u884C\u7684\u6BCF\u4E00\u4E2A\u8D77\u59CB\u70B9\u548C\u622A\u6B62\u70B9
      let nn
      // \u8BB0\u5F55\u4EA4\u53C9\u7684\u8D77\u59CB\u7D22\u5F15
      let start 
      // \u8BB0\u5F55\u4EA4\u53C9\u7684\u622A\u6B62\u7D22\u5F15
      let end 
      let width = 1
      let maxWidth = 1
      n++
      for ( let i = 0, il = top.length; i &lt; il; i++) {
          tt = top[i]
          for ( let j = 0, jl = next.length; j &lt; jl; j++ ) {
              nn = next[j]      
              width = Math.min(tt[1], nn[1]) - Math.max(tt[0], nn[0])
              if ( width &gt; maxWidth ) {
                  maxWidth = width
                  start = Math.max(tt[0], nn[0])
                  end = Math.min(tt[1], nn[1])
              }
          }
      }
      // \u5982\u679C\u6CA1\u6709\u627E\u5230\u4EA4\u53C9\u70B9
      if ( start === undefined || end === undefined ) {
          if ( n &lt; 3 ) {
              return false                         
          } else {
              width =  top[0][1] - top[0][0] + 1      
              if ( width &gt; 1 ) {
                  result.push( (n - 1) * width )
              }
          }
      } else {
          arr.push([[start, end]])      
          maxRect(arr, result, n++)
      }
  }
  while( arr.length &gt; 1 ) {
      maxRect([].concat(arr), result)      
      arr.pop()
  }
  // \u53D6\u6700\u5927\u503C
  let max = 0
  let item = result.pop()
  while( item ){
      if (item &gt; max) {
          max = item
      }
      item = result.pop()
  }
  return max &gt; 0 ? max : -1
};
</code></pre><div class="line-numbers-wrapper"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br><span class="line-number">48</span><br><span class="line-number">49</span><br><span class="line-number">50</span><br><span class="line-number">51</span><br><span class="line-number">52</span><br><span class="line-number">53</span><br><span class="line-number">54</span><br><span class="line-number">55</span><br><span class="line-number">56</span><br><span class="line-number">57</span><br><span class="line-number">58</span><br><span class="line-number">59</span><br><span class="line-number">60</span><br><span class="line-number">61</span><br><span class="line-number">62</span><br><span class="line-number">63</span><br><span class="line-number">64</span><br><span class="line-number">65</span><br><span class="line-number">66</span><br><span class="line-number">67</span><br><span class="line-number">68</span><br><span class="line-number">69</span><br><span class="line-number">70</span><br><span class="line-number">71</span><br></div></div><h3 id="\u961F\u5217" tabindex="-1">\u961F\u5217 <a class="header-anchor" href="#\u961F\u5217" aria-hidden="true">#</a></h3><table><thead><tr><th>\u7279\u5F81</th></tr></thead><tbody><tr><td>\u7EBF\u6027</td></tr><tr><td>\u5148\u8FDB\u5148\u51FA</td></tr><tr><td>\u53EA\u5141\u8BB8\u5728\u8868\u7684\u524D\u7AEF\u8FDB\u884C\u5220\u9664\u64CD\u4F5C\uFF0C\u800C\u5728\u8868\u7684\u540E\u7AEF\u8FDB\u884C\u63D2\u5165\u64CD\u4F5C</td></tr></tbody></table><h4 id="\u4F8B\u9898-1" tabindex="-1">\u4F8B\u9898 <a class="header-anchor" href="#\u4F8B\u9898-1" aria-hidden="true">#</a></h4><p>\u94FE\u63A5\uFF1A <code>https://leetcode-cn.com/problems/design-circular-queue/</code></p><div class="language- line-numbers-mode"><span class="copy"></span><pre><code>class MyCircularQueue {
    constructor (k) {
        // \u7528\u6765\u4FDD\u5B58\u6570\u636E\u957F\u5EA6\u4E3Ak\u7684\u6570\u636E\u7ED3\u6784
        this.list = Array(k)
        // \u961F\u9996\u6307\u9488
        this.front = 0
        // \u961F\u5C3E\u6307\u9488
        this.rear = 0
        // \u961F\u5217\u7684\u957F\u5EA6
        this.max = k
    }
    enQueue ( num ) {
        // \u5411\u5FAA\u73AF\u961F\u5217\u63D2\u5165\u4E00\u4E2A\u5143\u7D20
        if ( this.isFull() ) {
            return false
        } else {
            this.list[this.rear] = num    
            // \u5F62\u6210\u4E00\u4E2A\u73AF\u5F62
            this.rear = (this.rear + 1) % this.max
            return true
        }
    }
    deQueue () {
        // \u4ECE\u5FAA\u73AF\u961F\u5217\u4E2D\u5220\u9664\u4E00\u4E2A\u5143\u7D20 
        let v = this.list[this.front]
        this.list[this.front] = &#39;&#39;
        // \u5F62\u6210\u4E00\u4E2A\u73AF\u5F62
        this.front = (this.front + 1) % this.max
        return v
    }
    isEmpty () {
        // \u5FAA\u73AF\u961F\u5217\u662F\u5426\u4E3A\u7A7A
        return this.front === this.rear &amp;&amp; !this.list[this.front]
    }
    isFull () {
        // \u5FAA\u73AF\u961F\u5217\u662F\u5426\u5DF2\u6EE1
        return this.front === this.rear &amp;&amp; !!this.list[this.front]
    }
    Front () {
        // \u4ECE\u961F\u9996\u83B7\u53D6\u5143\u7D20
        return this.list[this.front]
    }
    Rear () {
        // \u83B7\u53D6\u961F\u5C3E\u5143\u7D20
        let rear = this.rear - 1
        return this.list[rear&lt;0?this.max-1:rear]
    }
}
</code></pre><div class="line-numbers-wrapper"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br><span class="line-number">48</span><br></div></div><p>\u94FE\u63A5\uFF1A <code>https://leetcode-cn.com/problems/task-scheduler/</code></p><div class="language- line-numbers-mode"><span class="copy"></span><pre><code>var leastInterval = function(tasks, n) {
    let q = &#39;&#39;
    let Q = {}
    tasks.forEach(item =&gt; {
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
        // n+1 \u4E3A\u4E00\u7EC4
        let tmp = []
        for (let i =0; i &lt;=n; i++) {
            let max = 0    
            let key
            let pos
            //  \u4ECE\u6240\u6709\u7684\u4EFB\u52A1\u4E2D\u627E\u5230\u672A\u5904\u7406\u6570\u6700\u5927\u7684\u4F18\u5148\u5B89\u6392
            keys.forEach((item, idx)=&gt; {
                if (Q[item] &gt; max) {
                    max = Q[item]
                    key = item
                    pos = idx
                }
            })
            if (key) {
                tmp.push(key)
                keys.splice(pos, 1)
                Q[key]--
                if (Q[key] &lt;  1) {
                    delete Q[key]
                }
            } else {
                break
            }
        }
        q += tmp.join(&#39;&#39;).padEnd(n + 1, &#39;-&#39;)
    } 
    q = q.replace(/-+$/g, &#39;&#39;)
    return q.length
}
</code></pre><div class="line-numbers-wrapper"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br></div></div><h3 id="\u94FE\u8868" tabindex="-1">\u94FE\u8868 <a class="header-anchor" href="#\u94FE\u8868" aria-hidden="true">#</a></h3><h4 id="\u4F8B\u9898-2" tabindex="-1">\u4F8B\u9898 <a class="header-anchor" href="#\u4F8B\u9898-2" aria-hidden="true">#</a></h4><p>\u94FE\u63A5\uFF1A <code>https://leetcode-cn.com/problems/sort-list/</code></p><div class="language- line-numbers-mode"><span class="copy"></span><pre><code>class Node {
    constructor (value) {
        this.val = value
        this.next = undefined
    }
}    
class NodeList {
    constructor (arr) {
        // \u58F0\u660E\u94FE\u8868\u7684\u5934\u90E8\u8282\u70B9
        let head = new Node(arr.shift())    
        let next = head 
        arr.forEach(item =&gt; {
            next.next = new Node(item)
            next = next.next
        })
        return head
    }
}

let swap = (p, q) =&gt; {
    let val = p.val
    p.val = q.val
    q.val = val
}

// \u5BFB\u627E\u57FA\u51C6\u5143\u7D20\u7684\u8282\u70B9
let partion = (begin, end) =&gt; {
    let val = begin.val
    let p = begin
    let q = begin.next
    while ( q!== end) {
        if(q.val &lt; val) {
            p = p.next
            swap(p, q)
        }
        q = q.next
    }
    // \u8BA9\u57FA\u51C6\u5143\u7D20\u8DD1\u5230\u4E2D\u95F4\u53BB
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
</code></pre><div class="line-numbers-wrapper"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br><span class="line-number">48</span><br><span class="line-number">49</span><br></div></div><p>\u94FE\u63A5\uFF1A <code>https://leetcode-cn.com/problems/linked-list-cycle/</code></p><div class="language- line-numbers-mode"><span class="copy"></span><pre><code>class Node {
    constructor (value) {
        this.val = value
        this.next = undefined
    }
}    
class NodeList {
    constructor (arr) {
        // \u58F0\u660E\u94FE\u8868\u7684\u5934\u90E8\u8282\u70B9
        let head = new Node(arr.shift())    
        let next = head 
        arr.forEach(item =&gt; {
            next.next = new Node(item)
            next = next.next
        })
        return head
    }
}    

function isCircle (head) {
    // \u6162\u6307\u9488
    let slow = head
    // \u5FEB\u6307\u9488
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
</code></pre><div class="line-numbers-wrapper"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br></div></div><h3 id="\u77E9\u9635" tabindex="-1">\u77E9\u9635 <a class="header-anchor" href="#\u77E9\u9635" aria-hidden="true">#</a></h3><h4 id="\u4F8B\u9898-3" tabindex="-1">\u4F8B\u9898 <a class="header-anchor" href="#\u4F8B\u9898-3" aria-hidden="true">#</a></h4><p><code>\u94FE\u63A5\uFF1Ahttps://leetcode-cn.com/problems/spiral-matrix/</code></p><div class="language- line-numbers-mode"><span class="copy"></span><pre><code>function matrix (arr) {
    // \u5904\u7406\u6BCF\u4E00\u5708\u7684\u6570\u636E\u904D\u5386\u8FC7\u7A0B
    let map = (arr, r = []) =&gt; {
        for (let i = 0, len = arr.length; i &lt; len; i++) {
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
        for (let i = arr.length - 1; i &gt;= 0; i--) { 
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
</code></pre><div class="line-numbers-wrapper"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br></div></div><p><code>\u94FE\u63A5\uFF1Ahttps://leetcode-cn.com/problems/rotate-image/</code></p><div class="language- line-numbers-mode"><span class="copy"></span><pre><code>function matrix (arr) {
    // \u83B7\u53D6n\u7684\u7EF4\u5EA6
    let vecor = arr.length
    // \u5782\u76F4\u65CB\u8F6C
    for (let i = 0,len = vecor / 2;i &lt; len; i++){
        for (let j = 0, tmp; j &lt; vecor; j++) {
            tmp = arr[i][j]        
            arr[i][j] =  arr[vecor-i-1][j]
            arr[vecor-i-1][j] = tmp
        }
    }
    // \u5BF9\u89D2\u7EBF\u7FFB\u8F6C
    for (let i = 0; i &lt; vecor; i++) {
        for (let j = 0, tmp; j&lt; i; j++) {
            tmp = arr[i][j]    
            arr[i][j] = arr[j][i]
            arr[j][i] = tmp
        }
    }
    return arr
}
</code></pre><div class="line-numbers-wrapper"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br></div></div><h3 id="\u4E8C\u53C9\u6811" tabindex="-1">\u4E8C\u53C9\u6811 <a class="header-anchor" href="#\u4E8C\u53C9\u6811" aria-hidden="true">#</a></h3><h4 id="\u4F8B\u9898-4" tabindex="-1">\u4F8B\u9898 <a class="header-anchor" href="#\u4F8B\u9898-4" aria-hidden="true">#</a></h4><p><code>\u94FE\u63A5\uFF1Ahttps://leetcode-cn.com/problems/symmetric-tree/</code></p><div class="language- line-numbers-mode"><span class="copy"></span><pre><code>// \u4E8C\u53C9\u6811\u7684\u8282\u70B9
class Node {
    constructor (val) {
        this.val = val
        this.left = this.right = undefined
    }
}

class Tree {
    constructor (data) {
        // \u4E34\u65F6\u5B58\u50A8\u6240\u6709\u8282\u70B9\uFF0C\u65B9\u4FBF\u5BFB\u627E\u7236\u5B50\u8282\u70B9
        let nodeList = []
        // \u9876\u8282\u70B9
        let root
        for (let i = 0, len = data.length; i &lt; len; i++) {
            let node = new Node(data[i])
            nodeList.push(node)
            if ( i &gt; 0 ) {
                // \u8BA1\u7B97\u5F53\u524D\u8282\u70B9\u5C5E\u4E8E\u54EA\u4E00\u5C42
                let n = Math.floor( Math.log2(i+1) )
                // \u8BB0\u5F55\u5F53\u524D\u5C42\u7684\u8D77\u59CB\u70B9
                let q = Math.pow(2, n) - 1
                // \u8BB0\u5F55\u4E0A\u4E00\u5C42\u7684\u8D77\u59CB\u70B9
                let p = Math.pow(2, n - 1) -1
                // \u627E\u5230\u5F53\u524D\u8282\u70B9\u7684\u7236\u8282\u70B9
                let parent = nodeList[p + Math.floor( ( i - q ) / 2 )]
                // \u5C06\u5F53\u524D\u8282\u70B9\u548C\u4E0A\u4E00\u5C42\u7684\u7236\u8282\u70B9\u505A\u5173\u8054
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
        let walk = (left, right) =&gt; {
            if ( !left &amp;&amp; !right ) { return true }
            if ( ( left &amp;&amp; !right ) || ( !left &amp;&amp; right ) || ( left.val !== right.val ) ) {
                return false
            }
            return walk(left.left, right.right) &amp;&amp; walk(left.right, right.left)
        }
        return walk(root.left, root.right)
    }
}
</code></pre><div class="line-numbers-wrapper"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br><span class="line-number">48</span><br><span class="line-number">49</span><br><span class="line-number">50</span><br><span class="line-number">51</span><br></div></div><p><code>\u94FE\u63A5\uFF1Ahttps://leetcode-cn.com/problems/validate-binary-search-tree/</code></p><div class="language- line-numbers-mode"><span class="copy"></span><pre><code>class Node {
    constructor (val) {
        this.val = val
        this.left = this.right = undefined
    }
}

class Tree {
    constructor (data) {
        let root = new Node(data.shift())
        // \u904D\u5386\u6240\u6709\u7684\u6570\u636E\uFF0C\u9010\u6E10\u63D2\u5165\u5230\u5F53\u524D\u8FD9\u68F5\u641C\u7D22\u6811\u4E2D\u53BB
        data.forEach(item =&gt;{
            this.insert(root, item)
        })
        return root
    }

    insert (node, data) {
        if (node.val &gt; data) {
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
        if (!root.left &amp;&amp; !root.right) {
            return true
        } else if ( (root.left&amp;&amp; root.val &lt; root.left.val) || (root.rigth &amp;&amp; root.val &gt; root.right.val) ) {
            return false
        } else {
            return Tree.walk(root.left) &amp;&amp; Tree.walk(root.right)
        }    
    }

}
</code></pre><div class="line-numbers-wrapper"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br></div></div><h3 id="\u5806" tabindex="-1">\u5806 <a class="header-anchor" href="#\u5806" aria-hidden="true">#</a></h3><table><thead><tr><th>\u7279\u6027</th></tr></thead><tbody><tr><td>\u5FC5\u987B\u662F\u5B8C\u5168\u4E8C\u53C9\u6811</td></tr><tr><td>\u4EFB\u4E00\u7ED3\u70B9\u7684\u503C\u662F\u5176\u5B50\u6811\u6240\u6709\u7ED3\u70B9\u7684\u6700\u5927\u503C\u6216\u6700\u5C0F\u503C</td></tr></tbody></table><h4 id="\u4F8B\u9898-5" tabindex="-1">\u4F8B\u9898 <a class="header-anchor" href="#\u4F8B\u9898-5" aria-hidden="true">#</a></h4><p><code>\u94FE\u63A5\uFF1Ahttps://leetcode-cn.com/problems/sort-characters-by-frequency/</code></p><div class="language- line-numbers-mode"><span class="copy"></span><pre><code>class Heap {
    constructor (str) {
        let map = new Map()
        str.split(&#39;&#39;).forEach(item =&gt; {
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
        if ( n &lt;= 1) {
            return iArr
        } else {
            for (let i = Math.floor(n/2);i &gt;= 0; i-- ) {
                Heap.maxHeapify(iArr, i, n)
            }     
            for (let j = 0; j &lt; n; j++) {
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
        return str.join(&#39;&#39;)
    }

    // \u6784\u5EFA\u6700\u5927\u5806\u7684\u8FC7\u7A0B
    static maxHeapify (Arr, i, size) {
        // \u5DE6\u8282\u70B9\uFF08\u7D22\u5F15\uFF09
        let l = i * 2 + 1
        // \u53F3\u8282\u70B9\uFF08\u7D22\u5F15\uFF09
        let r = i * 2 + 2
        let largest = i
        // \u7236\u8282\u70B9i\u548C\u5DE6\u8282\u70B9l\u505A\u6BD4\u8F83\u53D6\u6700\u5927
        if ( l &lt;= size &amp;&amp; Arr[l] &gt; Arr[largest] ) {
            largest = l        
        }
        // \u53F3\u8282\u70B9\u548C\u6700\u5927\u503C\u6BD4\u8F83
        if ( r &lt;= size &amp;&amp; Arr[r] &gt; Arr[largest]) {
            largest = r        
        }
        if (largest !== i) {
            Heap.swap(Arr, i, largest)
            Heap.maxHeapify(Arr, largest, size)
        }
    }

    // \u4EA4\u6362\u4E24\u4E2A\u5143\u7D20
    static swap (arr, a, b) {
        if (a === b) { return &#39;&#39;}    
        let c = arr[a]
        arr[a] = arr[b]
        arr[b] = c
    }

}    
</code></pre><div class="line-numbers-wrapper"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br><span class="line-number">48</span><br><span class="line-number">49</span><br><span class="line-number">50</span><br><span class="line-number">51</span><br><span class="line-number">52</span><br><span class="line-number">53</span><br><span class="line-number">54</span><br><span class="line-number">55</span><br><span class="line-number">56</span><br><span class="line-number">57</span><br><span class="line-number">58</span><br><span class="line-number">59</span><br><span class="line-number">60</span><br><span class="line-number">61</span><br><span class="line-number">62</span><br><span class="line-number">63</span><br><span class="line-number">64</span><br><span class="line-number">65</span><br><span class="line-number">66</span><br><span class="line-number">67</span><br><span class="line-number">68</span><br><span class="line-number">69</span><br><span class="line-number">70</span><br><span class="line-number">71</span><br><span class="line-number">72</span><br><span class="line-number">73</span><br><span class="line-number">74</span><br><span class="line-number">75</span><br><span class="line-number">76</span><br><span class="line-number">77</span><br></div></div><p><code>\u94FE\u63A5\uFF1Ahttps://leetcode-cn.com/problems/super-ugly-number/</code></p><p>\u89E3\u9898\u601D\u8DEF \u7B2C\u4E00\u6B65\uFF1A\u6C42\u89E3\u4EFB\u610F\u6574\u6570\u7684\u8D28\u56E0\u6570 \u7B2C\u4E8C\u6B65\uFF1A\u8D28\u56E0\u6570\u662F\u5426\u5728\u6307\u5B9A\u8D28\u56E0\u6570\u8303\u56F4\u5185 \u7B2C\u4E09\u6B65\uFF1A\u662F\u5426\u8FBE\u5230\u6307\u5B9A\u4E2A\u6570n</p><div class="language- line-numbers-mode"><span class="copy"></span><pre><code>class Ugly {
    constructor (n, primes) {
        this.n = n
        this.primes = primes
    }

    getAll () {
        // \u8D85\u7EA7\u4E11\u6570\u5217\u8868
        let res = [1]
        let i = 2
        let primes = this.primes
        while (res.length &lt; this.n) {
            let arr = Ugly.getPrimes(i)
            let k = 0
            let l = arr.length
            for (;k &lt; l;k++) {
                if (!primes.find(item =&gt; item === arr[k])) {
                    break
                }
            }
            // k===l\u6709\u4E24\u79CD\u60C5\u51B5\uFF0C\u4E00\u79CD\u5C31\u662F\u5F53\u524D\u8FD9\u4E2A\u6570\u538B\u6839\u6CA1\u6709\u8D28\u56E0\u6570,\u4E00\u79CD\u662F\u6240\u6709\u8D28\u56E0\u6570\u90FD\u5728\u6307\u5B9A\u5217\u8868\u4E2D
            if (k === l) {
                if (l === 0) {
                    if (primes.find(item =&gt; item === i)) {
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

    // \u8BA1\u7B97\u6307\u5B9A\u6B63\u6574\u6570n\u7684\u8D28\u56E0\u6570
    static getPrimes (n) {
        let prime = (n) =&gt; {
            // \u5B58\u50A8\u6240\u6709\u7684\u8D28\u56E0\u6570
            let arr = []
            for (let i = 2; i &lt; n/2 + 1; i++) {
                if ( n % i === 0 &amp;&amp; !prime(i).length ) {
                    arr.push(i)    
                }
            }
            return arr
        }
        return prime(n)
    }
}
</code></pre><div class="line-numbers-wrapper"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br><span class="line-number">48</span><br><span class="line-number">49</span><br><span class="line-number">50</span><br></div></div><div class="language- line-numbers-mode"><span class="copy"></span><pre><code>class Heap {
    constructor (arr) {
        this.data = arr
        this.max = arr.length
        this.sort()
    }

    sort () {
        let iArr = this.data
        let n = iArr.length
        if ( n &lt;= 1) {
            return iArr
        } else {
            for (let i = Math.floor(n/2);i &gt;= 0; i-- ) {
                Heap.maxHeapify(iArr, i, n)
            }
            return iArr
        }
    }

    find (val, i = 0) {
        let arr = this.data
        if ( val &gt; arr[i] || i &gt; this.max ) {
            return false 
        } else if ( val === arr[i] ) {
            return val
        } else {
            return this.find(val, i * 2 + 1) || this.find(val, i * 2 + 2)        
        }
    }

    // \u6784\u5EFA\u6700\u5927\u5806\u7684\u8FC7\u7A0B
    static maxHeapify (Arr, i, size) {
        // \u5DE6\u8282\u70B9\uFF08\u7D22\u5F15\uFF09
        let l = i * 2 + 1
        // \u53F3\u8282\u70B9\uFF08\u7D22\u5F15\uFF09
        let r = i * 2 + 2
        let largest = i
        // \u7236\u8282\u70B9i\u548C\u5DE6\u8282\u70B9l\u505A\u6BD4\u8F83\u53D6\u6700\u5927
        if ( l &lt;= size &amp;&amp; Arr[l] &gt; Arr[largest] ) {
            largest = l
        }
        // \u53F3\u8282\u70B9\u548C\u6700\u5927\u503C\u6BD4\u8F83
        if ( r &lt;= size &amp;&amp; Arr[r] &gt; Arr[largest]) {
            largest = r
        }
        if (largest !== i) {
            Heap.swap(Arr, i, largest)
            Heap.maxHeapify(Arr, largest, size)
        }
    }

    // \u4EA4\u6362\u4E24\u4E2A\u5143\u7D20
    static swap (arr, a, b) {
        if (a === b) { return &#39;&#39;}
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
        // \u8D85\u7EA7\u4E11\u6570\u5217\u8868
        let res = [1]
        let i = 2
        let primes = this.primes
        while (res.length &lt; this.n) {
            let arr = Ugly.getPrimes(i)
            let k = 0
            let l = arr.length
            for (;k &lt; l;k++) {
                if ( !primes.find( arr[k] ) ) {
                    break
                }
            }
            // k===l\u6709\u4E24\u79CD\u60C5\u51B5\uFF0C\u4E00\u79CD\u5C31\u662F\u5F53\u524D\u8FD9\u4E2A\u6570\u538B\u6839\u6CA1\u6709\u8D28\u56E0\u6570,\u4E00\u79CD\u662F\u6240\u6709\u8D28\u56E0\u6570\u90FD\u5728\u6307\u5B9A\u5217\u8868\u4E2D
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

    // \u8BA1\u7B97\u6307\u5B9A\u6B63\u6574\u6570n\u7684\u8D28\u56E0\u6570
    static getPrimes (n) {
        let prime = (n) =&gt; {
            // \u5B58\u50A8\u6240\u6709\u7684\u8D28\u56E0\u6570
            let arr = []
            for (let i = 2; i &lt; n/2 + 1; i++) {
                if ( n % i === 0 &amp;&amp; !prime(i).length ) {
                    arr.push(i)    
                }
            }
            return arr
        }
        return prime(n)
    }
}
</code></pre><div class="line-numbers-wrapper"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br><span class="line-number">48</span><br><span class="line-number">49</span><br><span class="line-number">50</span><br><span class="line-number">51</span><br><span class="line-number">52</span><br><span class="line-number">53</span><br><span class="line-number">54</span><br><span class="line-number">55</span><br><span class="line-number">56</span><br><span class="line-number">57</span><br><span class="line-number">58</span><br><span class="line-number">59</span><br><span class="line-number">60</span><br><span class="line-number">61</span><br><span class="line-number">62</span><br><span class="line-number">63</span><br><span class="line-number">64</span><br><span class="line-number">65</span><br><span class="line-number">66</span><br><span class="line-number">67</span><br><span class="line-number">68</span><br><span class="line-number">69</span><br><span class="line-number">70</span><br><span class="line-number">71</span><br><span class="line-number">72</span><br><span class="line-number">73</span><br><span class="line-number">74</span><br><span class="line-number">75</span><br><span class="line-number">76</span><br><span class="line-number">77</span><br><span class="line-number">78</span><br><span class="line-number">79</span><br><span class="line-number">80</span><br><span class="line-number">81</span><br><span class="line-number">82</span><br><span class="line-number">83</span><br><span class="line-number">84</span><br><span class="line-number">85</span><br><span class="line-number">86</span><br><span class="line-number">87</span><br><span class="line-number">88</span><br><span class="line-number">89</span><br><span class="line-number">90</span><br><span class="line-number">91</span><br><span class="line-number">92</span><br><span class="line-number">93</span><br><span class="line-number">94</span><br><span class="line-number">95</span><br><span class="line-number">96</span><br><span class="line-number">97</span><br><span class="line-number">98</span><br><span class="line-number">99</span><br><span class="line-number">100</span><br><span class="line-number">101</span><br><span class="line-number">102</span><br><span class="line-number">103</span><br><span class="line-number">104</span><br><span class="line-number">105</span><br><span class="line-number">106</span><br><span class="line-number">107</span><br><span class="line-number">108</span><br><span class="line-number">109</span><br><span class="line-number">110</span><br><span class="line-number">111</span><br><span class="line-number">112</span><br><span class="line-number">113</span><br></div></div><h2 id="\u6392\u5E8F" tabindex="-1">\u6392\u5E8F <a class="header-anchor" href="#\u6392\u5E8F" aria-hidden="true">#</a></h2><h3 id="\u5806\u6392\u5E8F" tabindex="-1">\u5806\u6392\u5E8F <a class="header-anchor" href="#\u5806\u6392\u5E8F" aria-hidden="true">#</a></h3><div class="language- line-numbers-mode"><span class="copy"></span><pre><code>class Heap {
    constructor (data) {
        this.data = data
    }

    sort () {
        let iArr = this.data
        let n = iArr.length
        if ( n &lt;= 1) {
            return iArr
        } else {
            for (let i = Math.floor(n/2);i &gt;= 0; i-- ) {
                Heap.maxHeapify(iArr, i, n)
            }     
            for (let j = 0; j &lt; n; j++) {
                Heap.swap(iArr, 0, n-1-j)
                Heap.maxHeapify(iArr, 0, n-1-j-1)
            }
            return iArr
        }
    }

    // \u6784\u5EFA\u6700\u5927\u5806\u7684\u8FC7\u7A0B
    static maxHeapify (Arr, i, size) {
        // \u5DE6\u8282\u70B9\uFF08\u7D22\u5F15\uFF09
        let l = i * 2 + 1
        // \u53F3\u8282\u70B9\uFF08\u7D22\u5F15\uFF09
        let r = i * 2 + 2
        let largest = i
        // \u7236\u8282\u70B9i\u548C\u5DE6\u8282\u70B9l\u505A\u6BD4\u8F83\u53D6\u6700\u5927
        if ( l &lt;= size &amp;&amp; Arr[l] &gt; Arr[largest] ) {
            largest = l        
        }
        // \u53F3\u8282\u70B9\u548C\u6700\u5927\u503C\u6BD4\u8F83
        if ( r &lt;= size &amp;&amp; Arr[r] &gt; Arr[largest]) {
            largest = r        
        }
        if (largest !== i) {
            Heap.swap(Arr, i, largest)
            Heap.maxHeapify(Arr, largest, size)
        }
    }

    // \u4EA4\u6362\u4E24\u4E2A\u5143\u7D20
    static swap (arr, a, b) {
        if (a === b) { return &#39;&#39;}    
        let c = arr[a]
        arr[a] = arr[b]
        arr[b] = c
    }

} 
</code></pre><div class="line-numbers-wrapper"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br><span class="line-number">48</span><br><span class="line-number">49</span><br><span class="line-number">50</span><br><span class="line-number">51</span><br><span class="line-number">52</span><br></div></div><h2 id="\u7B97\u6CD5" tabindex="-1">\u7B97\u6CD5 <a class="header-anchor" href="#\u7B97\u6CD5" aria-hidden="true">#</a></h2><h3 id="\u7B80\u5355\u7B97\u6CD5" tabindex="-1">\u7B80\u5355\u7B97\u6CD5 <a class="header-anchor" href="#\u7B80\u5355\u7B97\u6CD5" aria-hidden="true">#</a></h3><h4 id="\u5B57\u7B26\u4E32" tabindex="-1">\u5B57\u7B26\u4E32 <a class="header-anchor" href="#\u5B57\u7B26\u4E32" aria-hidden="true">#</a></h4><h5 id="\u4F8B\u9898-6" tabindex="-1">\u4F8B\u9898 <a class="header-anchor" href="#\u4F8B\u9898-6" aria-hidden="true">#</a></h5><p><code>\u94FE\u63A5\uFF1Ahttps://leetcode-cn.com/problems/reverse-words-in-a-string-iii/</code></p><div class="language- line-numbers-mode"><span class="copy"></span><pre><code>const fn = (str) =&gt; {
    return str.split(&#39; &#39;).map(item =&gt; {
        return item.split(&#39;&#39;).reverse().join(&#39;&#39;)
    }).join(&#39; &#39;)
}
</code></pre><div class="line-numbers-wrapper"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><p><code>\u94FE\u63A5\uFF1Ahttps://leetcode-cn.com/problems/count-binary-substrings/</code></p><div class="language- line-numbers-mode"><span class="copy"></span><pre><code>const fn = (str) =&gt; {
    let r = []
    let match = (str) =&gt; {
        let j = str.match(/^(0+|1+)/)[0]        
        let o = (j[0] ^ 1).toString().repeat(j.length)
        let reg = new RegExp(\`^(\${j}\${o})\`)
        if (reg.test(str)) {
            return RegExp.$1
        } else {
            return &#39;&#39;
        }
    }
    for (let i = 0, len = str.length - 1; i &lt; len ;  i++ ) {
        let sub = match(str.slice(i))
        if (sub) {
            r.push(sub)
        }
    }
    return r
}
</code></pre><div class="line-numbers-wrapper"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br></div></div><h4 id="\u6570\u7EC4" tabindex="-1">\u6570\u7EC4 <a class="header-anchor" href="#\u6570\u7EC4" aria-hidden="true">#</a></h4><h5 id="\u4F8B\u9898-7" tabindex="-1">\u4F8B\u9898 <a class="header-anchor" href="#\u4F8B\u9898-7" aria-hidden="true">#</a></h5><p><code>\u94FE\u63A5\uFF1Ahttps://leetcode-cn.com/problems/letter-combinations-of-a-phone-number/</code></p><div class="language- line-numbers-mode"><span class="copy"></span><pre><code>const fn = (str) =&gt; {
    let map = [
        &#39;&#39;,
        1,
        &#39;abc&#39;,
        &#39;def&#39;,
        &#39;ghi&#39;,
        &#39;jkl&#39;,
        &#39;mno&#39;,
        &#39;pqrs&#39;,
        &#39;tuv&#39;,
        &#39;wxyz&#39;
    ]
    let num = str.split(&#39;&#39;)
    let code = []
    num.forEach(item =&gt; {
        if (map[item]) {
            code.push(map[item])
        }
    })
    let comb = (arr) =&gt; {
        let tmp = []
        for (let i = 0, il = arr[0].length; i &lt; il; i++) {
            for (let j = 0, jl = arr[1].length; j &lt; jl; j++) {
                tmp.push(\`\${arr[0][i]}\${arr[1][j]}\`)
            }
        }
        arr.splice(0, 2, tmp)
        if (arr.length &gt; 1) {
            comb(arr)
        } else {
            return tmp
        }
        return arr[0]
    }
    return comb(code)
}
</code></pre><div class="line-numbers-wrapper"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br></div></div><p><code>\u94FE\u63A5\uFF1Ahttps://leetcode-cn.com/problems/x-of-a-kind-in-a-deck-of-cards/</code></p><div class="language- line-numbers-mode"><span class="copy"></span><pre><code>const fn = (arr) =&gt; {
    // \u5361\u724C\u6392\u5E8F\uFF0C\u6392\u5E8F\u7684\u76EE\u7684\u5C31\u662F\u4E3A\u4E86\u8BA9\u76F8\u540C\u7684\u724C\u6392\u5728\u4E00\u8D77\u65B9\u4FBF\u6211\u4EEC\u5206\u7EC4
    let str = arr.sort().join(&#39;&#39;)
    // \u5206\u7EC4\uFF08\u5355\u5F20\u6216\u8005\u591A\u5F20\uFF09
    let group = str.match(/(\\d)\\1+|\\d/g)
    // \u6C42\u4E24\u4E2A\u6570\u7684\u6700\u5927\u516C\u7EA6\u6570
    let gcd = (a, b) =&gt; {
        if (b === 0) {
            return a
        } else {
            return gcd(b, a%b)
        }
    }                    
    while (group.length &gt; 1) {
        let a = group.shift().length    
        let b = group.shift().length
        let v = gcd(a, b)
        if ( v=== 1 ) {
            return false
        } else {
            group.unshift(&#39;0&#39;.repeat(v))
        }
    }
    return group.length ? group[0].length &gt; 1 : false
}
</code></pre><div class="line-numbers-wrapper"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br></div></div><p><code>\u94FE\u63A5\uFF1Ahttps://leetcode-cn.com/problems/can-place-flowers/</code></p><div class="language- line-numbers-mode"><span class="copy"></span><pre><code>const fn = (arr, n) =&gt; {
    let max = 0
    for (let i = 0, len = arr.length -1; i &lt; len; i++) {
        if (arr[i] === 0) {
            if ( i===0 &amp;&amp; arr[1] === 0 ) {
                max++    
                i++
            } else if (arr[i-1] === 0 &amp;&amp; arr[i+1] === 0) {
                max++    
                i++
            }
        }
    }
    return max &gt;= n
}
</code></pre><div class="line-numbers-wrapper"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br></div></div><p><code>\u94FE\u63A5\uFF1Ahttps://leetcode-cn.com/problems/gray-code/</code></p><div class="language- line-numbers-mode"><span class="copy"></span><pre><code>const fn = (n) =&gt; {
    let make = (n) =&gt; {
        if (n === 1) {
            return [&#39;0&#39;, &#39;1&#39;]
        } else {
            let prev = make(n-1)
            let result = []
            let max = Math.pow(2, n) - 1
            for (let i = 0, len = prev.length; i &lt; len; i++) {
                result[i] = \`0\${prev[i]}\`
                result[max-i] = \`1\${prev[i]}\`
            }
            return result
        }
    }
    return make(n)
}  
</code></pre><div class="line-numbers-wrapper"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br></div></div><h4 id="\u9012\u5F52" tabindex="-1">\u9012\u5F52 <a class="header-anchor" href="#\u9012\u5F52" aria-hidden="true">#</a></h4><h5 id="\u4F8B\u9898-8" tabindex="-1">\u4F8B\u9898 <a class="header-anchor" href="#\u4F8B\u9898-8" aria-hidden="true">#</a></h5><p><code>\u94FE\u63A5\uFF1Ahttps://leetcode-cn.com/problems/restore-ip-addresses/</code></p><div class="language- line-numbers-mode"><span class="copy"></span><pre><code>const fn = (str) =&gt; {
    // \u4FDD\u5B58\u6240\u6709\u7B26\u5408\u6761\u4EF6\u7684ip
    let r = [] 
    // \u9012\u5F52\u51FD\u6570
    let search = (cur, sub) =&gt; {
        if (cur.length === 4 &amp;&amp; cur.join(&#39;&#39;) === str) {
            r.push(cur.join(&#39;.&#39;))
        } else {
            for (let i = 0, len = Math.min(3, sub.length), tmp; i&lt;len; i++) {
                tmp = sub.substr(0, i+1)    
                if (tmp &lt; 256) {
                    search(cur.concat([tmp]), sub.substr(i+1))
                }
            }
        }
    }
    search([], str)
    return r
}  
</code></pre><div class="line-numbers-wrapper"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br></div></div><p><code>\u94FE\u63A5\uFF1Ahttps://leetcode-cn.com/problems/substring-with-concatenation-of-all-words/</code></p><div class="language- line-numbers-mode"><span class="copy"></span><pre><code>const fn = (str, words) =&gt; {
    let num = words.length
    let result = []
    let range = (r, _arr) =&gt; {
        if (r.length === num) {
            result.push(r)
        } else {
            _arr.forEach( (item, idx) =&gt; {
                let tmp = [].concat(_arr)
                tmp.splice(idx, 1)
                range(r.concat(item), tmp)
            } )
        } 
    }
    range([], words)
    return result.map(item =&gt; {
        return str.indexOf(item.join(&#39;&#39;))
    }).filter(item =&gt; item!== -1).sort()
}
</code></pre><div class="line-numbers-wrapper"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br></div></div><h4 id="\u6B63\u5219\u8868\u8FBE\u5F0F" tabindex="-1">\u6B63\u5219\u8868\u8FBE\u5F0F <a class="header-anchor" href="#\u6B63\u5219\u8868\u8FBE\u5F0F" aria-hidden="true">#</a></h4><h5 id="\u4F8B\u9898-9" tabindex="-1">\u4F8B\u9898 <a class="header-anchor" href="#\u4F8B\u9898-9" aria-hidden="true">#</a></h5><p><code>\u94FE\u63A5\uFF1Ahttps://leetcode-cn.com/problems/repeated-substring-pattern/</code></p><div class="language- line-numbers-mode"><span class="copy"></span><pre><code>const fn = (str) =&gt; {
    var reg = /^(\\w+)\\1+$/
    return reg.test(str)
}   
</code></pre><div class="line-numbers-wrapper"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><p><code>\u94FE\u63A5\uFF1Ahttps://leetcode-cn.com/problems/regular-expression-matching/</code></p><div class="language- line-numbers-mode"><span class="copy"></span><pre><code>const fn = (s, p) =&gt; {
    let isMatch = (s, p) =&gt; {
        // \u8FB9\u754C\u60C5\u51B5\uFF0C\u5982\u679Cs\u548Cp\u90FD\u4E3A\u7A7A\uFF0C\u8BF4\u660E\u5904\u7406\u7ED3\u675F\u4E86\uFF0C\u8FD4\u56DEtrue\uFF0C\u5426\u5219\u8FD4\u56DEfalse
        if (p.length &lt;= 0) {
            return !s.length
        }
        // \u5224\u65ADp\u6A21\u5F0F\u5B57\u7B26\u4E32\u7684\u7B2C\u4E00\u4E2A\u5B57\u7B26\u548Cs\u5B57\u7B26\u4E32\u7684\u7B2C\u4E00\u4E2A\u5B57\u7B26\u662F\u4E0D\u662F\u5339\u914D
        let match = false
        if (s.length &gt; 0 &amp;&amp; (p[0] === s[0] || p[0] === &#39;.&#39;) ) {
            match = true
        }
        if (p.length &gt; 1 &amp;&amp; p[1] === &#39;*&#39;) {
            // \u7B2C\u4E00\u79CD\u60C5\u51B5\uFF1As*\u5339\u914D0\u4E2A\u5B57\u7B26
            // \u7B2C\u4E8C\u79CD\u60C5\u51B5\uFF1As*\u5339\u914D1\u4E2A\u5B57\u7B26,\u9012\u5F52\u4E0B\u53BB\uFF0C\u7528\u6765\u8868\u793As*\u5339\u914D\u591A\u4E2As
            return isMatch(s, p.slice(2)) || (match &amp;&amp; isMatch(s.slice(1), p)) 
        } else {
            return match &amp;&amp; isMatch(s.slice(1), p.slice(1))
        }
    }
    return isMatch(s, p)
}
</code></pre><div class="line-numbers-wrapper"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br></div></div><h4 id="\u6392\u5E8F-1" tabindex="-1">\u6392\u5E8F <a class="header-anchor" href="#\u6392\u5E8F-1" aria-hidden="true">#</a></h4><h5 id="\u4F8B\u9898-10" tabindex="-1">\u4F8B\u9898 <a class="header-anchor" href="#\u4F8B\u9898-10" aria-hidden="true">#</a></h5><p><code>\u94FE\u63A5\uFF1Ahttps://leetcode-cn.com/problems/sort-array-by-parity-ii/</code></p><div class="language- line-numbers-mode"><span class="copy"></span><pre><code>const fn = (arr) =&gt; {
    arr.sort((a, b) =&gt; a - b)
    let r = []
    let odd = 1
    let even = 0
    arr.forEach(item =&gt; {
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
</code></pre><div class="line-numbers-wrapper"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br></div></div><p><code>\u94FE\u63A5\uFF1Ahttps://leetcode-cn.com/problems/kth-largest-element-in-an-array/</code></p><div class="language- line-numbers-mode"><span class="copy"></span><pre><code>const fn = (arr, k) =&gt; {
    return arr.sort( (a, b) =&gt; b - a )[k-1]
}
</code></pre><div class="line-numbers-wrapper"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><div class="language- line-numbers-mode"><span class="copy"></span><pre><code>const fn = (arr, k) =&gt; {
    let len = arr.length - 1    
    for (let i = len, tmp; i &gt; len - k; i--) {
        for (let j = 0; j &lt; i; j++) {
            if (arr[j] &gt; arr[j+1]) {
                tmp = arr[j]
                arr[j] = arr[j+1]
                arr[j+1] = tmp
            }
        }
    }
    return arr[len-(k-1)]
} 
</code></pre><div class="line-numbers-wrapper"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br></div></div><p><code>\u94FE\u63A5\uFF1Ahttps://leetcode-cn.com/problems/maximum-gap/</code></p><div class="language- line-numbers-mode"><span class="copy"></span><pre><code>const fn = (arr) =&gt; {
    if (arr.length &lt; 2) {
        return 0
    }
    arr.sort()
    let max = 0
    for (let i = 0, len = arr.length - 1, tmp; i &lt; len; i++) {
        tmp = arr[i+1] - arr[i]    
        if (tmp &gt; max) {
            max = tmp
        }
    }
    return max
}
</code></pre><div class="line-numbers-wrapper"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br></div></div><div class="language- line-numbers-mode"><span class="copy"></span><pre><code>const fn = (arr) =&gt; {
    if (arr.length &lt; 2) {
        return 0
    }
    let max = 0
    let len = arr.length - 1
    let space
    for (let i = len,tmp; i &gt; 0; i--) {
        for (let j = 0; j &lt; i; j++) {
            tmp = arr[j]    
            if (tmp &gt; arr[j+1]) {
                arr[j] = arr[j+1]
                arr[j+1] = tmp
            }
        }
        if (i &lt; len) {
            space = arr[i+1] - arr[i]
            if (space &gt; max) {
                max = space
            }
        }
    }
    return Math.max(max, arr[1] - arr[0])
}
</code></pre><div class="line-numbers-wrapper"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br></div></div><p><code>\u94FE\u63A5\uFF1Ahttps://leetcode-cn.com/problems/first-missing-positive/</code></p><div class="language- line-numbers-mode"><span class="copy"></span><pre><code>const fn = (arr) =&gt; {
    arr = arr.filter(item =&gt; item &gt; 0)
    if (arr.length) {
        arr.sort((a,b) =&gt; a - b)
        if (arr[0] !== 1) { 
            return 1 
        } else {
            for (let i = 0, len = arr.length - 1; i &lt; len; i++) {
                if (arr[i+1] - arr[i] &gt; 1) {
                    return arr[i]+1
                }
            }
            return arr.pop() + 1
        }
    } else {
        return 1
    }
} 
</code></pre><div class="line-numbers-wrapper"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br></div></div><div class="language- line-numbers-mode"><span class="copy"></span><pre><code>const fn = (arr) =&gt; {
    arr = arr.filter(item =&gt; item &gt; 0)
    for (let i=0, len = arr.length, min; i &lt; len; i++) {
        min = arr[i]    
        for (let j = i + 1; j &lt; len; j++) {
            if (arr[j] &lt; min) {
                let c = min
                min = arr[j]
                arr[j] = c
            }
        }
        arr[i] = min 
        if (i &gt; 0) {
            if (arr[i] - arr[i-1] &gt; 1) {
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
</code></pre><div class="line-numbers-wrapper"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br></div></div><h3 id="\u8D2A\u5FC3\u7B97\u6CD5" tabindex="-1">\u8D2A\u5FC3\u7B97\u6CD5 <a class="header-anchor" href="#\u8D2A\u5FC3\u7B97\u6CD5" aria-hidden="true">#</a></h3><h4 id="\u4F8B\u9898-11" tabindex="-1">\u4F8B\u9898 <a class="header-anchor" href="#\u4F8B\u9898-11" aria-hidden="true">#</a></h4><p><code>\u94FE\u63A5\uFF1Ahttps://leetcode-cn.com/problems/best-time-to-buy-and-sell-stock-ii/</code></p><p>\u89E3\u9898\u601D\u8DEF \u95EE\u9898\uFF1A\u6700\u5927\u5229\u6DA6 \u7B56\u75651\uFF1A\u4ECE\u6700\u4F4E\u70B9\u4E70\u5165\uFF0C\u5728\u6700\u9AD8\u70B9\u5356\u51FA\uFF08\u8FFD\u6C42\u5355\u6B21\u5229\u76CA\uFF09 \u7B56\u75652\uFF1A\u4ECE\u4F4E\u70B9\u4E70\u5165\uFF0C\u53EA\u8981\u53EF\u4EE5\u8D5A\u94B1\u5C31\u5356\u51FA\uFF0C\u4E0D\u65AD\u4E70\u5356\uFF08\u8FFD\u6C42\u591A\u6B21\u5229\u76CA\uFF0C\u5355\u6B21\u5229\u76CA\u4E0D\u591F\uFF09 \u7B56\u75653\uFF1A\u4ECE\u4F4E\u70B9\u4E70\u5165\uFF0C\u5230\u4EF7\u683C\u9AD8\u70B9\u5356\u51FA\uFF0C\u4E0D\u65AD\u4E70\u5356\uFF08\u5728\u4FDD\u8BC1\u5355\u6B21\u5229\u76CA\u7684\u57FA\u7840\u4E0A\uFF0C\u5B9E\u73B0\u591A\u6B21\u4EA4\u6613\uFF09</p><div class="language- line-numbers-mode"><span class="copy"></span><pre><code>const fn = (prices) =&gt; {
    // \u7528\u6765\u4FDD\u5B58\u5229\u6DA6
    let count = 0
    for (let i=0,len=prices.length;i&lt;len;i++) {
        for (let j = i; j &lt; len - 1; j++) {
            if ( prices[j+1] &gt; prices[j] ) {
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
</code></pre><div class="line-numbers-wrapper"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br></div></div><p><code>\u94FE\u63A5\uFF1Ahttps://leetcode-cn.com/problems/lemonade-change/</code></p><p>\u89E3\u9898\u601D\u8DEF \u95EE\u9898\uFF1A\u627E\u96F6\u94B1 \u7B56\u75651\uFF1A\u7ED9\u94B1\u627E\u96F6\uFF0C\u4E0D\u533A\u5206\u91D1\u989D\u76F4\u5230\u627E\u5230\u8DB3\u591F\u7684\u96F6\u94B1\uFF08\u8FFD\u6C42\u5355\u6B21\u627E\u96F6\uFF09 \u7B56\u75652\uFF1A\u7ED9\u94B1\u627E\u96F6\uFF0C\u4F18\u5148\u7ED9\u91D1\u989D\u5927\u7684\u96F6\u94B1\uFF0C\u5C3D\u91CF\u628A\u96F6\u94B1\u653E\u5728\u624B\u91CC\uFF08\u8FFD\u6C42\u591A\u6B21\u627E\u96F6\uFF09</p><div class="language- line-numbers-mode"><span class="copy"></span><pre><code>const fn = (input) =&gt; {
    // \u8868\u793A\u81EA\u5DF1\u7684\u94B1\u7BB1\uFF08\u7528\u4E8E\u5B58\u50A8\u96F6\u94B1\uFF09
    let hand = []
    // \u5224\u65AD\u662F\u5426\u6709\u987E\u5BA2\u8FD8\u5728
    while (input.length) {
        // \u53D6\u51FA\u5F53\u524D\u6392\u5728\u6700\u524D\u9762\u987E\u5BA2\u7684\u94B1
        let money = input.shift()    
        // \u8FD9\u79CD\u60C5\u51B5\u4E0D\u9700\u8981\u627E\u96F6
        if (money === 5) {
            hand.push(money)    
        } else {
            // \u624B\u91CC\u7684\u96F6\u94B1\u8981\u964D\u5E8F\u6392\u5217\u4E5F\u5C31\u662F\u8BF4\u6700\u5927\u7684\u9762\u503C\u7684\u94B1\u653E\u5728\u6700\u524D\u9762
            hand.sort((a, b) =&gt; b - a )
            // \u987E\u5BA2\u7684\u94B1\u51CF\u53BB\u996E\u6599\u7684\u94B1\u5C31\u662F\u9700\u8981\u627E\u7ED9\u987E\u5BA2\u7684\u96F6\u94B1
            let change = money - 5
            for (let i = 0, len = hand.length; i &lt; len; i++) {
                if (hand[i] &lt;= change) {
                    change -= hand[i]
                    hand.splice(i, 1)
                    // \u5220\u9664\u4E86\u5143\u7D20\uFF0C\u6570\u7EC4\u7684\u957F\u5EA6\u53D1\u751F\u4E86\u53D8\u5316,\u8981\u7EF4\u6301\u521A\u624D\u7684i\u4E0D\u53D8
                    i--
                }    
                if (change === 0) {
                    break
                }
            }
            // \u6CA1\u6709\u8DB3\u591F\u7684\u96F6\u94B1\u627E\u7ED9\u987E\u5BA2
            if (change !== 0) {
                return false 
            } else {
                // \u987E\u5BA2\u7684\u94B1\u5B58\u8D77\u6765
                hand.push(money)      
            }
        }
    }
    return true
}     
</code></pre><div class="line-numbers-wrapper"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br></div></div><h3 id="\u52A8\u6001\u89C4\u5212" tabindex="-1">\u52A8\u6001\u89C4\u5212 <a class="header-anchor" href="#\u52A8\u6001\u89C4\u5212" aria-hidden="true">#</a></h3><p>\u52A8\u6001\u89C4\u5212\u5305\u62EC\u4E09\u4E2A\u91CD\u8981\u6982\u5FF5\uFF1A<code>\u72B6\u6001\u8F6C\u79FB\u65B9\u7A0B\`\`\u6700\u4F18\u5B50\u7ED3\u6784\`\`\u8FB9\u754C</code></p><h4 id="\u4F8B\u9898-12" tabindex="-1">\u4F8B\u9898 <a class="header-anchor" href="#\u4F8B\u9898-12" aria-hidden="true">#</a></h4><p><code>\u94FE\u63A5\uFF1Ahttps://leetcode-cn.com/problems/unique-paths-ii/</code></p><div class="language- line-numbers-mode"><span class="copy"></span><pre><code>const fn = (arr, m, n) =&gt; {
    let dp = (m,n) =&gt; {
        if (m === 2 &amp;&amp; n === 2) {
            return (arr[1][1] === 1 || arr[1][0] + arr[0][1] === 2) ? 0 : (arr[1][0] === 1 || arr[0][1] === 1) ? 1 : 2   
        } else if (m &lt; 2 || n &lt; 2) {
            if (m &lt; 2) {
                // \u5355\u884C\u67091\u5C31\u8FD4\u56DE0,\u6CA1\u67091\u8FD4\u56DE1
                return arr[m-1].includes(1) ? 0 : 1    
            } else {
                // \u5355\u5217\u4E2D\u4E0D\u80FD\u6709\u969C\u788D\u7269(1)\u6709\u5B83\u8FD4\u56DE0,\u6CA1\u6709\u5C31\u8FD4\u56DE1
                for (let i = 0; i &lt; m; i++) {
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
</code></pre><div class="line-numbers-wrapper"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br></div></div><p><code>\u94FE\u63A5\uFF1Ahttps://leetcode-cn.com/problems/cheapest-flights-within-k-stops/</code></p><div class="language- line-numbers-mode"><span class="copy"></span><pre><code>const fn = (src, dst, k) =&gt; {
    // \u5BF9n\u4E2A\u57CE\u5E02,m\u4E2A\u822A\u73ED\u505A\u98DE\u884C\u8BF4\u660E
    let fights = [
        [0, 1, 100],
        [1, 2, 100],
        [0, 2, 500]
    ]
    
    let cheap = (src, dst, k) =&gt; {
        // \u627E\u5230dst\u7684\u524D\u4E00\u7AD9
        let prev = fights.filter(item=&gt;item[1] === dst)
        let min = Math.min.apply(null, prev.map(item =&gt; {
            // \u4ECEdst\u5F80\u524D\u627E,\u627E\u5230\u4E86\u8D77\u59CB\u57CE\u5E02
            if (item[0] === src &amp;&amp; k &gt; -1) {
                return item[2]    
            } else if (k === 0 &amp;&amp; item[0] !== src ) {
                return Number.MAX_SAFE_INTEGER
            } else {
                return item[2] + cheap(src, item[0], k-1)
            }
        }))
        return min
    }
    return cheap(src, dst, k) || -1
}
</code></pre><div class="line-numbers-wrapper"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br></div></div>`,105),p=[l];function b(i,c,m,u,t,d){return s(),a("div",null,p)}var g=n(r,[["render",b]]);export{h as __pageData,g as default};
