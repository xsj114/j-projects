import{_ as n,o as s,c as e,g as a}from"./app.8d26e041.js";const h='{"title":"Vue\u6E90\u7801\u7B14\u8BB0","description":"","frontmatter":{},"headers":[{"level":2,"title":"\u6570\u636E\u9A71\u52A8","slug":"\u6570\u636E\u9A71\u52A8"},{"level":3,"title":"\u6E90\u7801\u6458\u8981","slug":"\u6E90\u7801\u6458\u8981"},{"level":2,"title":"\u7EC4\u4EF6\u5316","slug":"\u7EC4\u4EF6\u5316"},{"level":3,"title":"\u6E90\u7801\u6458\u8981","slug":"\u6E90\u7801\u6458\u8981-1"},{"level":2,"title":"\u54CD\u5E94\u5F0F\u539F\u7406","slug":"\u54CD\u5E94\u5F0F\u539F\u7406"},{"level":3,"title":"\u6E90\u7801\u6458\u8981","slug":"\u6E90\u7801\u6458\u8981-2"}],"relativePath":"notes/vue.md","lastUpdated":1665660223000}',r={},p=a(`<nav class="table-of-contents"><ul><li><a href="#\u6570\u636E\u9A71\u52A8">\u6570\u636E\u9A71\u52A8</a><ul><li><a href="#\u6E90\u7801\u6458\u8981">\u6E90\u7801\u6458\u8981</a><ul></ul></li></ul></li><li><a href="#\u7EC4\u4EF6\u5316">\u7EC4\u4EF6\u5316</a><ul><li><a href="#\u6E90\u7801\u6458\u8981-1">\u6E90\u7801\u6458\u8981</a><ul></ul></li></ul></li><li><a href="#\u54CD\u5E94\u5F0F\u539F\u7406">\u54CD\u5E94\u5F0F\u539F\u7406</a><ul><li><a href="#\u6E90\u7801\u6458\u8981-2">\u6E90\u7801\u6458\u8981</a><ul></ul></li></ul></li></ul></nav><h1 id="vue\u6E90\u7801\u7B14\u8BB0" tabindex="-1">Vue\u6E90\u7801\u7B14\u8BB0 <a class="header-anchor" href="#vue\u6E90\u7801\u7B14\u8BB0" aria-hidden="true">#</a></h1><h2 id="\u6570\u636E\u9A71\u52A8" tabindex="-1">\u6570\u636E\u9A71\u52A8 <a class="header-anchor" href="#\u6570\u636E\u9A71\u52A8" aria-hidden="true">#</a></h2><h3 id="\u6E90\u7801\u6458\u8981" tabindex="-1">\u6E90\u7801\u6458\u8981 <a class="header-anchor" href="#\u6E90\u7801\u6458\u8981" aria-hidden="true">#</a></h3><div class="language- line-numbers-mode"><span class="copy"></span><pre><code>...\u7701\u7565
function Vue (options) {
  if (process.<wbr>env.NODE_ENV !== &#39;production&#39; &amp;&amp;
    !(this instanceof Vue)
  ) {
    warn(&#39;Vue is a constructor and should be called with the \`new\` keyword&#39;)
  }
  this._init(options)
}

initMixin(Vue)
...\u7701\u7565

export default Vue
</code></pre><div class="line-numbers-wrapper"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br></div></div><div class="language- line-numbers-mode"><span class="copy"></span><pre><code>export function initMixin (Vue: Class&lt;Component&gt;) {
    Vue.prototype._init = function (options?: Object) {
      const vm: Component = this
      ...\u7701\u7565
      if (options &amp;&amp; options._isComponent) {
          // optimize internal component instantiation
          // since dynamic options merging is pretty slow, and none of the
          // internal component options needs special treatment.
          initInternalComponent(vm, options)
      } else {
          vm.$options = mergeOptions(
            resolveConstructorOptions(vm.constructor),
            options || {},
            vm
          )
      }
      ...\u7701\u7565
      initState(vm)
      ...\u7701\u7565
  
      if (vm.$options.el) {
        vm.$mount(vm.$options.el)
      }
    }
}
</code></pre><div class="line-numbers-wrapper"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br></div></div><div class="language- line-numbers-mode"><span class="copy"></span><pre><code>
export function initState (vm: Component) {
  vm._watchers = []
  const opts = vm.$options
  if (opts.props) initProps(vm, opts.props)
  if (opts.methods) initMethods(vm, opts.methods)
  if (opts.data) {
    initData(vm)
  } else {
    observe(vm._data = {}, true /* asRootData */)
  }
  ...\u7701\u7565
}
</code></pre><div class="line-numbers-wrapper"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br></div></div><div class="language- line-numbers-mode"><span class="copy"></span><pre><code>function initData (vm: Component) {
  let data = vm.$options.data
  data = vm._data = typeof data === &#39;function&#39;
    ? getData(data, vm)
    : data || {}
  if (!isPlainObject(data)) {
    data = {}
    process.<wbr>env.NODE_ENV !== &#39;production&#39; &amp;&amp; warn(
      &#39;data functions should return an object:\\n&#39; +
      &#39;https://vuejs.org/v2/guide/components.html#data-Must-Be-a-Function&#39;,
      vm
    )
  }
  // proxy data on instance
  const keys = Object.keys(data)
  const props = vm.$options.props
  const methods = vm.$options.methods
  let i = keys.length
  while (i--) {
    const key = keys[i]
    if (process.<wbr>env.NODE_ENV !== &#39;production&#39;) {
      if (methods &amp;&amp; hasOwn(methods, key)) {
        warn(
          \`Method &quot;\${key}&quot; has already been defined as a data property.\`,
          vm
        )
      }
    }
    if (props &amp;&amp; hasOwn(props, key)) {
      process.<wbr>env.NODE_ENV !== &#39;production&#39; &amp;&amp; warn(
        \`The data property &quot;\${key}&quot; is already declared as a prop. \` +
        \`Use prop default value instead.\`,
        vm
      )
    } else if (!isReserved(key)) {
      proxy(vm, \`_data\`, key)
    }
  }
  // observe data
  observe(data, true /* asRootData */)
}
</code></pre><div class="line-numbers-wrapper"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br></div></div><div class="language- line-numbers-mode"><span class="copy"></span><pre><code>export function getData (data: Function, vm: Component): any {
  // #7573 disable dep collection when invoking data getters
  pushTarget()
  try {
    return data.call(vm, vm)
  } catch (e) {
    handleError(e, vm, \`data()\`)
    return {}
  } finally {
    popTarget()
  }
}
</code></pre><div class="line-numbers-wrapper"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br></div></div><div class="language- line-numbers-mode"><span class="copy"></span><pre><code>const sharedPropertyDefinition = {
  enumerable: true,
  configurable: true,
  get: noop,
  set: noop
}

export function proxy (target: Object, sourceKey: string, key: string) {
  sharedPropertyDefinition.get = function proxyGetter () {
    return this[sourceKey][key]
  }
  sharedPropertyDefinition.set = function proxySetter (val) {
    this[sourceKey][key] = val
  }
  Object.defineProperty(target, key, sharedPropertyDefinition)
}
</code></pre><div class="line-numbers-wrapper"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br></div></div><h4 id="vue-mount" tabindex="-1">Vue.$mount <a class="header-anchor" href="#vue-mount" aria-hidden="true">#</a></h4><div class="language- line-numbers-mode"><span class="copy"></span><pre><code>Vue.prototype.$mount = function (
  el?: string | Element,
  hydrating?: boolean
): Component {
  el = el &amp;&amp; query(el)

  /* istanbul ignore if */
  if (el === document.body || el === document.documentElement) {
    process.<wbr>env.NODE_ENV !== &#39;production&#39; &amp;&amp; warn(
      \`Do not mount Vue to &lt;html&gt; or &lt;body&gt; - mount to normal elements instead.\`
    )
    return this
  }

  const options = this.$options
  // resolve template/el and convert to render function
  if (!options.render) {
    let template = options.template
    if (template) {
      if (typeof template === &#39;string&#39;) {
        if (template.charAt(0) === &#39;#&#39;) {
          template = idToTemplate(template)
          /* istanbul ignore if */
          if (process.<wbr>env.NODE_ENV !== &#39;production&#39; &amp;&amp; !template) {
            warn(
              \`Template element not found or is empty: \${options.template}\`,
              this
            )
          }
        }
      } else if (template.nodeType) {
        template = template.innerHTML
      } else {
        if (process.<wbr>env.NODE_ENV !== &#39;production&#39;) {
          warn(&#39;invalid template option:&#39; + template, this)
        }
        return this
      }
    } else if (el) {
      template = getOuterHTML(el)
    }
    if (template) {
      /* istanbul ignore if */
      if (process.<wbr>env.NODE_ENV !== &#39;production&#39; &amp;&amp; config.performance &amp;&amp; mark) {
        mark(&#39;compile&#39;)
      }

      const { render, staticRenderFns } = compileToFunctions(template, {
        shouldDecodeNewlines,
        shouldDecodeNewlinesForHref,
        delimiters: options.delimiters,
        comments: options.comments
      }, this)
      options.render = render
      options.staticRenderFns = staticRenderFns

      /* istanbul ignore if */
      if (process.<wbr>env.NODE_ENV !== &#39;production&#39; &amp;&amp; config.performance &amp;&amp; mark) {
        mark(&#39;compile end&#39;)
        measure(\`vue \${this._name} compile\`, &#39;compile&#39;, &#39;compile end&#39;)
      }
    }
  }
  return mount.call(this, el, hydrating)
}
</code></pre><div class="line-numbers-wrapper"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br><span class="line-number">48</span><br><span class="line-number">49</span><br><span class="line-number">50</span><br><span class="line-number">51</span><br><span class="line-number">52</span><br><span class="line-number">53</span><br><span class="line-number">54</span><br><span class="line-number">55</span><br><span class="line-number">56</span><br><span class="line-number">57</span><br><span class="line-number">58</span><br><span class="line-number">59</span><br><span class="line-number">60</span><br><span class="line-number">61</span><br><span class="line-number">62</span><br><span class="line-number">63</span><br><span class="line-number">64</span><br><span class="line-number">65</span><br></div></div><div class="language- line-numbers-mode"><span class="copy"></span><pre><code>const mount = Vue.prototype.$mount

Vue.prototype.$mount = function (
  el?: string | Element,
  hydrating?: boolean
): Component {
  el = el &amp;&amp; inBrowser ? query(el) : undefined
  return mountComponent(this, el, hydrating)
}
</code></pre><div class="line-numbers-wrapper"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br></div></div><div class="language- line-numbers-mode"><span class="copy"></span><pre><code>export function mountComponent (
    vm: Component,
    el: ?Element,
    hydrating?: boolean
  ): Component {
    vm.$el = el
    if (!vm.$options.render) {
      vm.$options.render = createEmptyVNode
      if (process.<wbr>env.NODE_ENV !== &#39;production&#39;) {
        /* istanbul ignore if */
        if ((vm.$options.template &amp;&amp; vm.$options.template.charAt(0) !== &#39;#&#39;) ||
          vm.$options.el || el) {
          warn(
            &#39;You are using the runtime-only build of Vue where the template &#39; +
            &#39;compiler is not available. Either pre-compile the templates into &#39; +
            &#39;render functions, or use the compiler-included build.&#39;,
            vm
          )
        } else {
          warn(
            &#39;Failed to mount component: template or render function not defined.&#39;,
            vm
          )
        }
      }
    }
    callHook(vm, &#39;beforeMount&#39;)
  
    let updateComponent
    /* istanbul ignore if */
    if (process.<wbr>env.NODE_ENV !== &#39;production&#39; &amp;&amp; config.performance &amp;&amp; mark) {
      ...\u7701\u7565
    } else {
      updateComponent = () =&gt; {
        vm._update(vm._render(), hydrating)
      }
    }
  
    // we set this to vm._watcher inside the watcher&#39;s constructor
    // since the watcher&#39;s initial patch may call $forceUpdate (e.g. inside child
    // component&#39;s mounted hook), which relies on vm._watcher being already defined
    new Watcher(vm, updateComponent, noop, {
      before () {
        if (vm._isMounted) {
          callHook(vm, &#39;beforeUpdate&#39;)
        }
      }
    }, true /* isRenderWatcher */)
    hydrating = false
  
    // manually mounted instance, call mounted on self
    // mounted is called for render-created child components in its inserted hook
    if (vm.$vnode == null) {
      vm._isMounted = true
      callHook(vm, &#39;mounted&#39;)
    }
    return vm
}
</code></pre><div class="line-numbers-wrapper"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br><span class="line-number">48</span><br><span class="line-number">49</span><br><span class="line-number">50</span><br><span class="line-number">51</span><br><span class="line-number">52</span><br><span class="line-number">53</span><br><span class="line-number">54</span><br><span class="line-number">55</span><br><span class="line-number">56</span><br><span class="line-number">57</span><br><span class="line-number">58</span><br></div></div><div class="language- line-numbers-mode"><span class="copy"></span><pre><code>export default class Watcher {
    vm: Component;
    expression: string;
    cb: Function;
    id: number;
    deep: boolean;
    user: boolean;
    computed: boolean;
    sync: boolean;
    dirty: boolean;
    active: boolean;
    dep: Dep;
    deps: Array&lt;Dep&gt;;
    newDeps: Array&lt;Dep&gt;;
    depIds: SimpleSet;
    newDepIds: SimpleSet;
    before: ?Function;
    getter: Function;
    value: any;
  
    constructor (
      vm: Component,
      expOrFn: string | Function,
      cb: Function,
      options?: ?Object,
      isRenderWatcher?: boolean
    ) {
      this.vm = vm
      if (isRenderWatcher) {
        vm._watcher = this
      }
      vm._watchers.push(this)
      // options
      if (options) {
        this.deep = !!options.deep
        this.user = !!options.user
        this.computed = !!options.computed
        this.sync = !!options.sync
        this.before = options.before
      } else {
        this.deep = this.user = this.computed = this.sync = false
      }
      ...\u7701\u7565
      this.expression = process.<wbr>env.NODE_ENV !== &#39;production&#39;
        ? expOrFn.toString()
        : &#39;&#39;
      // parse expression for getter
      if (typeof expOrFn === &#39;function&#39;) {
        this.getter = expOrFn
      } else {
        ...\u7701\u7565
      }
      if (this.computed) {
        this.value = undefined
        this.dep = new Dep()
      } else {
        this.value = this.get()
      }
    }
  
    /**
     * Evaluate the getter, and re-collect dependencies.
     */
    get () {
      pushTarget(this)
      let value
      const vm = this.vm
      try {
        value = this.getter.call(vm, vm)
      } catch (e) {
        if (this.user) {
          handleError(e, vm, \`getter for watcher &quot;\${this.expression}&quot;\`)
        } else {
          throw e
        }
      } finally {
        // &quot;touch&quot; every property so they are all tracked as
        // dependencies for deep watching
        if (this.deep) {
          traverse(value)
        }
        popTarget()
        this.cleanupDeps()
      }
      return value
    }
  
    ...\u7701\u7565
}
</code></pre><div class="line-numbers-wrapper"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br><span class="line-number">48</span><br><span class="line-number">49</span><br><span class="line-number">50</span><br><span class="line-number">51</span><br><span class="line-number">52</span><br><span class="line-number">53</span><br><span class="line-number">54</span><br><span class="line-number">55</span><br><span class="line-number">56</span><br><span class="line-number">57</span><br><span class="line-number">58</span><br><span class="line-number">59</span><br><span class="line-number">60</span><br><span class="line-number">61</span><br><span class="line-number">62</span><br><span class="line-number">63</span><br><span class="line-number">64</span><br><span class="line-number">65</span><br><span class="line-number">66</span><br><span class="line-number">67</span><br><span class="line-number">68</span><br><span class="line-number">69</span><br><span class="line-number">70</span><br><span class="line-number">71</span><br><span class="line-number">72</span><br><span class="line-number">73</span><br><span class="line-number">74</span><br><span class="line-number">75</span><br><span class="line-number">76</span><br><span class="line-number">77</span><br><span class="line-number">78</span><br><span class="line-number">79</span><br><span class="line-number">80</span><br><span class="line-number">81</span><br><span class="line-number">82</span><br><span class="line-number">83</span><br><span class="line-number">84</span><br><span class="line-number">85</span><br><span class="line-number">86</span><br><span class="line-number">87</span><br><span class="line-number">88</span><br><span class="line-number">89</span><br></div></div><h4 id="vue-render" tabindex="-1">Vue._render <a class="header-anchor" href="#vue-render" aria-hidden="true">#</a></h4><div class="language- line-numbers-mode"><span class="copy"></span><pre><code>Vue.prototype._render = function (): VNode {
    const vm: Component = this
    const { render, _parentVnode } = vm.$options

    ...\u7701\u7565

    let vnode
    try {
      vnode = render.call(vm._renderProxy, vm.$createElement)
    } catch (e) {
      handleError(e, vm, \`render\`)
      // return error render result,
      // or previous vnode to prevent render error causing blank component
      /* istanbul ignore else */
      if (process.<wbr>env.NODE_ENV !== &#39;production&#39;) {
        if (vm.$options.renderError) {
          try {
            vnode = vm.$options.renderError.call(vm._renderProxy, vm.$createElement, e)
          } catch (e) {
            handleError(e, vm, \`renderError\`)
            vnode = vm._vnode
          }
        } else {
          vnode = vm._vnode
        }
      } else {
        vnode = vm._vnode
      }
    }
    // return empty vnode in case the render function errored out
    if (!(vnode instanceof VNode)) {
      if (process.<wbr>env.NODE_ENV !== &#39;production&#39; &amp;&amp; Array.isArray(vnode)) {
        warn(
          &#39;Multiple root nodes returned from render function. Render function &#39; +
          &#39;should return a single root node.&#39;,
          vm
        )
      }
      vnode = createEmptyVNode()
    }
    // set parent
    vnode.parent = _parentVnode
    return vnode
}
</code></pre><div class="line-numbers-wrapper"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br></div></div><div class="language- line-numbers-mode"><span class="copy"></span><pre><code>export function initRender (vm: Component) {
    ...\u7701\u7565
    vm._c = (a, b, c, d) =&gt; createElement(vm, a, b, c, d, false)
    // normalization is always applied for the public version, used in
    // user-written render functions.
    vm.$createElement = (a, b, c, d) =&gt; createElement(vm, a, b, c, d, true)
    ...\u7701\u7565
}
</code></pre><div class="line-numbers-wrapper"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br></div></div><h4 id="createelement" tabindex="-1">createElement <a class="header-anchor" href="#createelement" aria-hidden="true">#</a></h4><div class="language- line-numbers-mode"><span class="copy"></span><pre><code>export function createElement (
  context: Component,
  tag: any,
  data: any,
  children: any,
  normalizationType: any,
  alwaysNormalize: boolean
): VNode | Array&lt;VNode&gt; {
  if (Array.isArray(data) || isPrimitive(data)) {
    normalizationType = children
    children = data
    data = undefined
  }
  if (isTrue(alwaysNormalize)) {
    normalizationType = ALWAYS_NORMALIZE
  }
  return _createElement(context, tag, data, children, normalizationType)
}
</code></pre><div class="line-numbers-wrapper"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br></div></div><div class="language- line-numbers-mode"><span class="copy"></span><pre><code>export function _createElement (
  context: Component,
  tag?: string | Class&lt;Component&gt; | Function | Object,
  data?: VNodeData,
  children?: any,
  normalizationType?: number
): VNode | Array&lt;VNode&gt; {
  if (isDef(data) &amp;&amp; isDef((data: any).__ob__)) {
    process.<wbr>env.NODE_ENV !== &#39;production&#39; &amp;&amp; warn(
      \`Avoid using observed data object as vnode data: \${JSON.stringify(data)}\\n\` +
      &#39;Always create fresh vnode data objects in each render!&#39;,
      context
    )
    return createEmptyVNode()
  }
  // object syntax in v-bind
  if (isDef(data) &amp;&amp; isDef(data.is)) {
    tag = data.is
  }
  if (!tag) {
    // in case of component :is set to falsy value
    return createEmptyVNode()
  }
  // warn against non-primitive key
  if (process.<wbr>env.NODE_ENV !== &#39;production&#39; &amp;&amp;
    isDef(data) &amp;&amp; isDef(data.key) &amp;&amp; !isPrimitive(data.key)
  ) {
    if (!__WEEX__ || !(&#39;@binding&#39; in data.key)) {
      warn(
        &#39;Avoid using non-primitive value as key, &#39; +
        &#39;use string/number value instead.&#39;,
        context
      )
    }
  }
  // support single function children as default scoped slot
  if (Array.isArray(children) &amp;&amp;
    typeof children[0] === &#39;function&#39;
  ) {
    data = data || {}
    data.scopedSlots = { default: children[0] }
    children.length = 0
  }
  if (normalizationType === ALWAYS_NORMALIZE) {
    children = normalizeChildren(children)
  } else if (normalizationType === SIMPLE_NORMALIZE) {
    children = simpleNormalizeChildren(children)
  }
  let vnode, ns
  if (typeof tag === &#39;string&#39;) {
    let Ctor
    ns = (context.$vnode &amp;&amp; context.$vnode.ns) || config.getTagNamespace(tag)
    // config.isReservedTag\u662F\u770B\u8FD9\u4E2A\u6807\u7B7E\u662F\u4E0D\u662Fhtml\u539F\u751F\u7684\u4FDD\u7559\u6807\u7B7E
    if (config.isReservedTag(tag)) {
      // platform built-in elements
      vnode = new VNode(
        config.parsePlatformTagName(tag), data, children,
        undefined, undefined, context
      )
    } else if (isDef(Ctor = resolveAsset(context.$options, &#39;components&#39;, tag))) {
      // component
      vnode = createComponent(Ctor, data, context, children, tag)
    } else {
      // unknown or unlisted namespaced elements
      // check at runtime because it may get assigned a namespace when its
      // parent normalizes children
      vnode = new VNode(
        tag, data, children,
        undefined, undefined, context
      )
    }
  } else {
    // direct component options / constructor
    vnode = createComponent(tag, data, context, children)
  }
  if (Array.isArray(vnode)) {
    return vnode
  } else if (isDef(vnode)) {
    if (isDef(ns)) applyNS(vnode, ns)
    if (isDef(data)) registerDeepBindings(data)
    return vnode
  } else {
    return createEmptyVNode()
  }
}
</code></pre><div class="line-numbers-wrapper"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br><span class="line-number">48</span><br><span class="line-number">49</span><br><span class="line-number">50</span><br><span class="line-number">51</span><br><span class="line-number">52</span><br><span class="line-number">53</span><br><span class="line-number">54</span><br><span class="line-number">55</span><br><span class="line-number">56</span><br><span class="line-number">57</span><br><span class="line-number">58</span><br><span class="line-number">59</span><br><span class="line-number">60</span><br><span class="line-number">61</span><br><span class="line-number">62</span><br><span class="line-number">63</span><br><span class="line-number">64</span><br><span class="line-number">65</span><br><span class="line-number">66</span><br><span class="line-number">67</span><br><span class="line-number">68</span><br><span class="line-number">69</span><br><span class="line-number">70</span><br><span class="line-number">71</span><br><span class="line-number">72</span><br><span class="line-number">73</span><br><span class="line-number">74</span><br><span class="line-number">75</span><br><span class="line-number">76</span><br><span class="line-number">77</span><br><span class="line-number">78</span><br><span class="line-number">79</span><br><span class="line-number">80</span><br><span class="line-number">81</span><br><span class="line-number">82</span><br><span class="line-number">83</span><br><span class="line-number">84</span><br><span class="line-number">85</span><br></div></div><div class="language- line-numbers-mode"><span class="copy"></span><pre><code>export function isDef (v: any): boolean %checks {
  return v !== undefined &amp;&amp; v !== null
}
</code></pre><div class="line-numbers-wrapper"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><div class="language- line-numbers-mode"><span class="copy"></span><pre><code>export function simpleNormalizeChildren (children: any) {
  for (let i = 0; i &lt; children.length; i++) {
    if (Array.isArray(children[i])) {
      return Array.prototype.concat.apply([], children)
    }
  }
  return children
}
</code></pre><div class="line-numbers-wrapper"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br></div></div><div class="language- line-numbers-mode"><span class="copy"></span><pre><code>export function normalizeChildren (children: any): ?Array&lt;VNode&gt; {
  return isPrimitive(children)
    ? [createTextVNode(children)]
    : Array.isArray(children)
      ? normalizeArrayChildren(children)
      : undefined
}
</code></pre><div class="line-numbers-wrapper"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><div class="language- line-numbers-mode"><span class="copy"></span><pre><code>function normalizeArrayChildren (children: any, nestedIndex?: string): Array&lt;VNode&gt; {
  const res = []
  let i, c, lastIndex, last
  for (i = 0; i &lt; children.length; i++) {
    c = children[i]
    if (isUndef(c) || typeof c === &#39;boolean&#39;) continue
    lastIndex = res.length - 1
    last = res[lastIndex]
    //  nested
    if (Array.isArray(c)) {
      if (c.length &gt; 0) {
        c = normalizeArrayChildren(c, \`\${nestedIndex || &#39;&#39;}_\${i}\`)
        // merge adjacent text nodes
        if (isTextNode(c[0]) &amp;&amp; isTextNode(last)) {
          res[lastIndex] = createTextVNode(last.text + (c[0]: any).text)
          c.shift()
        }
        res.push.apply(res, c)
      }
    } else if (isPrimitive(c)) {
      if (isTextNode(last)) {
        // merge adjacent text nodes
        // this is necessary for SSR hydration because text nodes are
        // essentially merged when rendered to HTML strings
        res[lastIndex] = createTextVNode(last.text + c)
      } else if (c !== &#39;&#39;) {
        // convert primitive to vnode
        res.push(createTextVNode(c))
      }
    } else {
      if (isTextNode(c) &amp;&amp; isTextNode(last)) {
        // merge adjacent text nodes
        res[lastIndex] = createTextVNode(last.text + c.text)
      } else {
        // default key for nested array children (likely generated by v-for)
        if (isTrue(children._isVList) &amp;&amp;
          isDef(c.tag) &amp;&amp;
          isUndef(c.key) &amp;&amp;
          isDef(nestedIndex)) {
          c.key = \`__vlist\${nestedIndex}_\${i}__\`
        }
        res.push(c)
      }
    }
  }
  return res
}
</code></pre><div class="line-numbers-wrapper"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br></div></div><h4 id="update" tabindex="-1">_update <a class="header-anchor" href="#update" aria-hidden="true">#</a></h4><div class="language- line-numbers-mode"><span class="copy"></span><pre><code>Vue.prototype._update = function (vnode: VNode, hydrating?: boolean) {
    const vm: Component = this
    const prevEl = vm.$el
    const prevVnode = vm._vnode
    const prevActiveInstance = activeInstance
    activeInstance = vm
    vm._vnode = vnode
    // Vue.prototype.__patch__ is injected in entry points
    // based on the rendering backend used.
    if (!prevVnode) {
      // initial render
      vm.$el = vm.__patch__(vm.$el, vnode, hydrating, false /* removeOnly */)
    } else {
      // updates
      vm.$el = vm.__patch__(prevVnode, vnode)
    }
    activeInstance = prevActiveInstance
    // update __vue__ reference
    if (prevEl) {
      prevEl.__vue__ = null
    }
    if (vm.$el) {
      vm.$el.__vue__ = vm
    }
    // if parent is an HOC, update its $el as well
    if (vm.$vnode &amp;&amp; vm.$parent &amp;&amp; vm.$vnode === vm.$parent._vnode) {
      vm.$parent.$el = vm.$el
    }
    // updated hook is called by the scheduler to ensure that children are
    // updated in a parent&#39;s updated hook.
}
</code></pre><div class="line-numbers-wrapper"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br></div></div><div class="language- line-numbers-mode"><span class="copy"></span><pre><code>const patch: Function = createPatchFunction({ nodeOps, modules })
</code></pre><div class="line-numbers-wrapper"><span class="line-number">1</span><br></div></div><div class="language- line-numbers-mode"><span class="copy"></span><pre><code>const hooks = [&#39;create&#39;, &#39;activate&#39;, &#39;update&#39;, &#39;remove&#39;, &#39;destroy&#39;]

export function createPatchFunction (backend) {
    let i, j
    const cbs = {}
  
    const { modules, nodeOps } = backend
  
    for (i = 0; i &lt; hooks.length; ++i) {
      cbs[hooks[i]] = []
      for (j = 0; j &lt; modules.length; ++j) {
        if (isDef(modules[j][hooks[i]])) {
          cbs[hooks[i]].push(modules[j][hooks[i]])
        }
      }
    }
    
    function createElm (
        vnode,
        insertedVnodeQueue,
        parentElm,
        refElm,
        nested,
        ownerArray,
        index
      ) {
        if (isDef(vnode.elm) &amp;&amp; isDef(ownerArray)) {
            ...\u7701\u7565
        }
    
        vnode.isRootInsert = !nested // for transition enter check
        if (createComponent(vnode, insertedVnodeQueue, parentElm, refElm)) {
          return
        }
    
        const data = vnode.data
        const children = vnode.children
        const tag = vnode.tag
        if (isDef(tag)) {
          if (process.<wbr>env.NODE_ENV !== &#39;production&#39;) {
            if (data &amp;&amp; data.pre) {
              creatingElmInVPre++
            }
            if (isUnknownElement(vnode, creatingElmInVPre)) {
              warn(
                &#39;Unknown custom element: &lt;&#39; + tag + &#39;&gt; - did you &#39; +
                &#39;register the component correctly? For recursive components, &#39; +
                &#39;make sure to provide the &quot;name&quot; option.&#39;,
                vnode.context
              )
            }
          }
    
          vnode.elm = vnode.ns
            ? nodeOps.createElementNS(vnode.ns, tag)
            : nodeOps.createElement(tag, vnode)
          setScope(vnode)
    
          /* istanbul ignore if */
          if (__WEEX__) {
            ...\u7701\u7565
          } else {
            createChildren(vnode, children, insertedVnodeQueue)
            if (isDef(data)) {
              invokeCreateHooks(vnode, insertedVnodeQueue)
            }
            insert(parentElm, vnode.elm, refElm)
          }
    
          if (process.<wbr>env.NODE_ENV !== &#39;production&#39; &amp;&amp; data &amp;&amp; data.pre) {
            creatingElmInVPre--
          }
        } else if (isTrue(vnode.isComment)) {
          vnode.elm = nodeOps.createComment(vnode.text)
          insert(parentElm, vnode.elm, refElm)
        } else {
          vnode.elm = nodeOps.createTextNode(vnode.text)
          insert(parentElm, vnode.elm, refElm)
        }
    }
    
    function emptyNodeAt (elm) {
        return new VNode(nodeOps.tagName(elm).toLowerCase(), {}, [], undefined, elm)
    }
    
    function insert (parent, elm, ref) {
        if (isDef(parent)) {
          if (isDef(ref)) {
            if (ref.parentNode === parent) {
              nodeOps.insertBefore(parent, elm, ref)
            }
          } else {
            nodeOps.appendChild(parent, elm)
          }
        }
    }
    
    
    function createChildren (vnode, children, insertedVnodeQueue) {
        if (Array.isArray(children)) {
          if (process.<wbr>env.NODE_ENV !== &#39;production&#39;) {
            checkDuplicateKeys(children)
          }
          for (let i = 0; i &lt; children.length; ++i) {
            createElm(children[i], insertedVnodeQueue, vnode.elm, null, true, children, i)
          }
        } else if (isPrimitive(vnode.text)) {
          nodeOps.appendChild(vnode.elm, nodeOps.createTextNode(String(vnode.text)))
        }
    }
  
    ...\u7701\u7565
  
    return function patch (oldVnode, vnode, hydrating, removeOnly) {
      // \u5220\u9664\u65F6\u5019\u7684\u903B\u8F91
      if (isUndef(vnode)) {
        if (isDef(oldVnode)) invokeDestroyHook(oldVnode)
        return
      }
  
      let isInitialPatch = false
      const insertedVnodeQueue = []
  
      if (isUndef(oldVnode)) {
        ...\u7701\u7565
      } else {
        const isRealElement = isDef(oldVnode.nodeType)
        if (!isRealElement &amp;&amp; sameVnode(oldVnode, vnode)) {
            ...\u7701\u7565
        } else {
          if (isRealElement) {
            // mounting to a real element
            // check if this is server-rendered content and if we can perform
            // a successful hydration.
            if (oldVnode.nodeType === 1 &amp;&amp; oldVnode.hasAttribute(SSR_ATTR)) {
                ...\u7701\u7565
            }
            if (isTrue(hydrating)) {
                ...\u7701\u7565
            }
            // either not server-rendered, or hydration failed.
            // create an empty node and replace it
            oldVnode = emptyNodeAt(oldVnode)
          }
  
          // replacing existing element
          const oldElm = oldVnode.elm
          const parentElm = nodeOps.parentNode(oldElm)
  
          // create new node
          createElm(
            vnode,
            insertedVnodeQueue,
            // extremely rare edge case: do not insert if old element is in a
            // leaving transition. Only happens when combining transition +
            // keep-alive + HOCs. (#4590)
            oldElm._leaveCb ? null : parentElm,
            nodeOps.nextSibling(oldElm)
          )
  
          // update parent placeholder node element, recursively
          if (isDef(vnode.parent)) {
            ...\u7701\u7565
          }
  
          // destroy old node
          if (isDef(parentElm)) {
            removeVnodes(parentElm, [oldVnode], 0, 0)
          } else if (isDef(oldVnode.tag)) {
            invokeDestroyHook(oldVnode)
          }
        }
      }
  
      invokeInsertHook(vnode, insertedVnodeQueue, isInitialPatch)
      return vnode.elm
    }
}
</code></pre><div class="line-numbers-wrapper"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br><span class="line-number">48</span><br><span class="line-number">49</span><br><span class="line-number">50</span><br><span class="line-number">51</span><br><span class="line-number">52</span><br><span class="line-number">53</span><br><span class="line-number">54</span><br><span class="line-number">55</span><br><span class="line-number">56</span><br><span class="line-number">57</span><br><span class="line-number">58</span><br><span class="line-number">59</span><br><span class="line-number">60</span><br><span class="line-number">61</span><br><span class="line-number">62</span><br><span class="line-number">63</span><br><span class="line-number">64</span><br><span class="line-number">65</span><br><span class="line-number">66</span><br><span class="line-number">67</span><br><span class="line-number">68</span><br><span class="line-number">69</span><br><span class="line-number">70</span><br><span class="line-number">71</span><br><span class="line-number">72</span><br><span class="line-number">73</span><br><span class="line-number">74</span><br><span class="line-number">75</span><br><span class="line-number">76</span><br><span class="line-number">77</span><br><span class="line-number">78</span><br><span class="line-number">79</span><br><span class="line-number">80</span><br><span class="line-number">81</span><br><span class="line-number">82</span><br><span class="line-number">83</span><br><span class="line-number">84</span><br><span class="line-number">85</span><br><span class="line-number">86</span><br><span class="line-number">87</span><br><span class="line-number">88</span><br><span class="line-number">89</span><br><span class="line-number">90</span><br><span class="line-number">91</span><br><span class="line-number">92</span><br><span class="line-number">93</span><br><span class="line-number">94</span><br><span class="line-number">95</span><br><span class="line-number">96</span><br><span class="line-number">97</span><br><span class="line-number">98</span><br><span class="line-number">99</span><br><span class="line-number">100</span><br><span class="line-number">101</span><br><span class="line-number">102</span><br><span class="line-number">103</span><br><span class="line-number">104</span><br><span class="line-number">105</span><br><span class="line-number">106</span><br><span class="line-number">107</span><br><span class="line-number">108</span><br><span class="line-number">109</span><br><span class="line-number">110</span><br><span class="line-number">111</span><br><span class="line-number">112</span><br><span class="line-number">113</span><br><span class="line-number">114</span><br><span class="line-number">115</span><br><span class="line-number">116</span><br><span class="line-number">117</span><br><span class="line-number">118</span><br><span class="line-number">119</span><br><span class="line-number">120</span><br><span class="line-number">121</span><br><span class="line-number">122</span><br><span class="line-number">123</span><br><span class="line-number">124</span><br><span class="line-number">125</span><br><span class="line-number">126</span><br><span class="line-number">127</span><br><span class="line-number">128</span><br><span class="line-number">129</span><br><span class="line-number">130</span><br><span class="line-number">131</span><br><span class="line-number">132</span><br><span class="line-number">133</span><br><span class="line-number">134</span><br><span class="line-number">135</span><br><span class="line-number">136</span><br><span class="line-number">137</span><br><span class="line-number">138</span><br><span class="line-number">139</span><br><span class="line-number">140</span><br><span class="line-number">141</span><br><span class="line-number">142</span><br><span class="line-number">143</span><br><span class="line-number">144</span><br><span class="line-number">145</span><br><span class="line-number">146</span><br><span class="line-number">147</span><br><span class="line-number">148</span><br><span class="line-number">149</span><br><span class="line-number">150</span><br><span class="line-number">151</span><br><span class="line-number">152</span><br><span class="line-number">153</span><br><span class="line-number">154</span><br><span class="line-number">155</span><br><span class="line-number">156</span><br><span class="line-number">157</span><br><span class="line-number">158</span><br><span class="line-number">159</span><br><span class="line-number">160</span><br><span class="line-number">161</span><br><span class="line-number">162</span><br><span class="line-number">163</span><br><span class="line-number">164</span><br><span class="line-number">165</span><br><span class="line-number">166</span><br><span class="line-number">167</span><br><span class="line-number">168</span><br><span class="line-number">169</span><br><span class="line-number">170</span><br><span class="line-number">171</span><br><span class="line-number">172</span><br><span class="line-number">173</span><br><span class="line-number">174</span><br><span class="line-number">175</span><br><span class="line-number">176</span><br><span class="line-number">177</span><br><span class="line-number">178</span><br></div></div><blockquote><p>setScope\u6682\u65F6\u5FFD\u7565</p></blockquote><h2 id="\u7EC4\u4EF6\u5316" tabindex="-1">\u7EC4\u4EF6\u5316 <a class="header-anchor" href="#\u7EC4\u4EF6\u5316" aria-hidden="true">#</a></h2><h3 id="\u6E90\u7801\u6458\u8981-1" tabindex="-1">\u6E90\u7801\u6458\u8981 <a class="header-anchor" href="#\u6E90\u7801\u6458\u8981-1" aria-hidden="true">#</a></h3><div class="language- line-numbers-mode"><span class="copy"></span><pre><code>export function createComponent (
    Ctor: Class&lt;Component&gt; | Function | Object | void,
    data: ?VNodeData,
    context: Component,
    children: ?Array&lt;VNode&gt;,
    tag?: string
  ): VNode | Array&lt;VNode&gt; | void {
    if (isUndef(Ctor)) {
      return
    }
  
    const baseCtor = context.$options._base
  
    // plain options object: turn it into a constructor
    if (isObject(Ctor)) {
      Ctor = baseCtor.extend(Ctor)
    }
  
    // if at this stage it&#39;s not a constructor or an async component factory,
    // reject.
    if (typeof Ctor !== &#39;function&#39;) {
      if (process.<wbr>env.NODE_ENV !== &#39;production&#39;) {
        warn(\`Invalid Component definition: \${String(Ctor)}\`, context)
      }
      return
    }
  
    ...\u7701\u7565
  
    // install component management hooks onto the placeholder node
    installComponentHooks(data)
  
    // return a placeholder vnode
    const name = Ctor.options.name || tag
    const vnode = new VNode(
      \`vue-component-\${Ctor.cid}\${name ? \`-\${name}\` : &#39;&#39;}\`,
      data, undefined, undefined, undefined, context,
      { Ctor, propsData, listeners, tag, children },
      asyncFactory
    )
  
    // Weex specific: invoke recycle-list optimized @render function for
    // extracting cell-slot template.
    // https://github.com/Hanks10100/weex-native-directive/tree/master/component
    /* istanbul ignore if */
    if (__WEEX__ &amp;&amp; isRecyclableComponent(vnode)) {
      return renderRecyclableComponentTemplate(vnode)
    }
  
    return vnode
}
</code></pre><div class="line-numbers-wrapper"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br><span class="line-number">48</span><br><span class="line-number">49</span><br><span class="line-number">50</span><br><span class="line-number">51</span><br></div></div><div class="language- line-numbers-mode"><span class="copy"></span><pre><code>export function validateComponentName (name: string) {
    if (!/^[a-zA-Z][\\w-]*$/.test(name)) {
      warn(
        &#39;Invalid component name: &quot;&#39; + name + &#39;&quot;. Component names &#39; +
        &#39;can only contain alphanumeric characters and the hyphen, &#39; +
        &#39;and must start with a letter.&#39;
      )
    }
    if (isBuiltInTag(name) || config.isReservedTag(name)) {
      warn(
        &#39;Do not use built-in or reserved HTML elements as component &#39; +
        &#39;id: &#39; + name
      )
    }
}

export const ASSET_TYPES = [
    &#39;component&#39;,
    &#39;directive&#39;,
    &#39;filter&#39;
]

Vue.extend = function (extendOptions: Object): Function {
    extendOptions = extendOptions || {}
    // this\u662FVue
    const Super = this
    const SuperId = Super.cid
    const cachedCtors = extendOptions._Ctor || (extendOptions._Ctor = {})
    if (cachedCtors[SuperId]) {
      return cachedCtors[SuperId]
    }

    const name = extendOptions.name || Super.options.name
    if (process.<wbr>env.NODE_ENV !== &#39;production&#39; &amp;&amp; name) {
      validateComponentName(name)
    }

    const Sub = function VueComponent (options) {
      this._init(options)
    }
    Sub.prototype = Object.create(Super.prototype)
    Sub.prototype.constructor = Sub
    Sub.cid = cid++
    Sub.options = mergeOptions(
      Super.options,
      extendOptions
    )
    Sub[&#39;super&#39;] = Super

    // For props and computed properties, we define the proxy getters on
    // the Vue instances at extension time, on the extended prototype. This
    // avoids Object.defineProperty calls for each instance created.
    if (Sub.options.props) {
      initProps(Sub)
    }
    if (Sub.options.computed) {
      initComputed(Sub)
    }

    // allow further extension/mixin/plugin usage
    Sub.extend = Super.extend
    Sub.mixin = Super.mixin
    Sub.use = Super.use

    // create asset registers, so extended classes
    // can have their private assets too.
    ASSET_TYPES.forEach(function (type) {
      Sub[type] = Super[type]
    })
    // enable recursive self-lookup
    if (name) {
      Sub.options.components[name] = Sub
    }

    // keep a reference to the super options at extension time.
    // later at instantiation we can check if Super&#39;s options have
    // been updated.
    Sub.superOptions = Super.options
    Sub.extendOptions = extendOptions
    Sub.sealedOptions = extend({}, Sub.options)

    // cache constructor
    cachedCtors[SuperId] = Sub
    return Sub
}
</code></pre><div class="line-numbers-wrapper"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br><span class="line-number">48</span><br><span class="line-number">49</span><br><span class="line-number">50</span><br><span class="line-number">51</span><br><span class="line-number">52</span><br><span class="line-number">53</span><br><span class="line-number">54</span><br><span class="line-number">55</span><br><span class="line-number">56</span><br><span class="line-number">57</span><br><span class="line-number">58</span><br><span class="line-number">59</span><br><span class="line-number">60</span><br><span class="line-number">61</span><br><span class="line-number">62</span><br><span class="line-number">63</span><br><span class="line-number">64</span><br><span class="line-number">65</span><br><span class="line-number">66</span><br><span class="line-number">67</span><br><span class="line-number">68</span><br><span class="line-number">69</span><br><span class="line-number">70</span><br><span class="line-number">71</span><br><span class="line-number">72</span><br><span class="line-number">73</span><br><span class="line-number">74</span><br><span class="line-number">75</span><br><span class="line-number">76</span><br><span class="line-number">77</span><br><span class="line-number">78</span><br><span class="line-number">79</span><br><span class="line-number">80</span><br><span class="line-number">81</span><br><span class="line-number">82</span><br><span class="line-number">83</span><br><span class="line-number">84</span><br><span class="line-number">85</span><br></div></div><div class="language- line-numbers-mode"><span class="copy"></span><pre><code>function installComponentHooks (data: VNodeData) {
    const hooks = data.hook || (data.hook = {})
    for (let i = 0; i &lt; hooksToMerge.length; i++) {
      const key = hooksToMerge[i]
      const existing = hooks[key]
      const toMerge = componentVNodeHooks[key]
      if (existing !== toMerge &amp;&amp; !(existing &amp;&amp; existing._merged)) {
        hooks[key] = existing ? mergeHook(toMerge, existing) : toMerge
      }
    }
}


// inline hooks to be invoked on component VNodes during patch
const componentVNodeHooks = {
    init (vnode: VNodeWithData, hydrating: boolean): ?boolean {
      ...\u7701\u7565
    },
  
    prepatch (oldVnode: MountedComponentVNode, vnode: MountedComponentVNode) {
      ...\u7701\u7565
    },
  
    insert (vnode: MountedComponentVNode) {
      ...\u7701\u7565
    },
  
    destroy (vnode: MountedComponentVNode) {
      ...\u7701\u7565
    }
}

const hooksToMerge = Object.keys(componentVNodeHooks)

function mergeHook (f1: any, f2: any): Function {
    const merged = (a, b) =&gt; {
      // flow complains about extra args which is why we use any
      f1(a, b)
      f2(a, b)
    }
    merged._merged = true
    return merged
}
</code></pre><div class="line-numbers-wrapper"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br></div></div><h4 id="patch" tabindex="-1">patch <a class="header-anchor" href="#patch" aria-hidden="true">#</a></h4><div class="language- line-numbers-mode"><span class="copy"></span><pre><code>export function createPatchFunction (backend) {
    let i, j
    const cbs = {}
  
    const { modules, nodeOps } = backend
  
    for (i = 0; i &lt; hooks.length; ++i) {
      cbs[hooks[i]] = []
      for (j = 0; j &lt; modules.length; ++j) {
        if (isDef(modules[j][hooks[i]])) {
          cbs[hooks[i]].push(modules[j][hooks[i]])
        }
      }
    }
  
    ...\u7701\u7565
  
    let creatingElmInVPre = 0
  
    function createElm (
      vnode,
      insertedVnodeQueue,
      parentElm,
      refElm,
      nested,
      ownerArray,
      index
    ) {
      if (isDef(vnode.elm) &amp;&amp; isDef(ownerArray)) {
        // This vnode was used in a previous render!
        // now it&#39;s used as a new node, overwriting its elm would cause
        // potential patch errors down the road when it&#39;s used as an insertion
        // reference node. Instead, we clone the node on-demand before creating
        // associated DOM element for it.
        vnode = ownerArray[index] = cloneVNode(vnode)
      }
  
      vnode.isRootInsert = !nested // for transition enter check
      if (createComponent(vnode, insertedVnodeQueue, parentElm, refElm)) {
        return
      }
  
      ...\u7701\u7565
    }
  
    function createComponent (vnode, insertedVnodeQueue, parentElm, refElm) {
      let i = vnode.data
      if (isDef(i)) {
        const isReactivated = isDef(vnode.componentInstance) &amp;&amp; i.keepAlive
        if (isDef(i = i.hook) &amp;&amp; isDef(i = i.init)) {
          i(vnode, false /* hydrating */)
        }
        // after calling the init hook, if the vnode is a child component
        // it should&#39;ve created a child instance and mounted it. the child
        // component also has set the placeholder vnode&#39;s elm.
        // in that case we can just return the element and be done.
        if (isDef(vnode.componentInstance)) {
          initComponent(vnode, insertedVnodeQueue)
          insert(parentElm, vnode.elm, refElm)
          ...\u7701\u7565
          return true
        }
      }
    }
  
    function initComponent (vnode, insertedVnodeQueue) {
      if (isDef(vnode.data.pendingInsert)) {
        insertedVnodeQueue.push.apply(insertedVnodeQueue, vnode.data.pendingInsert)
        vnode.data.pendingInsert = null
      }
      vnode.elm = vnode.componentInstance.$el
      ...\u7701\u7565
    }
  
   
  
    function insert (parent, elm, ref) {
      if (isDef(parent)) {
        if (isDef(ref)) {
          if (ref.parentNode === parent) {
            nodeOps.insertBefore(parent, elm, ref)
          }
        } else {
          nodeOps.appendChild(parent, elm)
        }
      }
    }
  
  
    ...\u7701\u7565
  
    return function patch (oldVnode, vnode, hydrating, removeOnly) {
        if (isUndef(vnode)) {
          if (isDef(oldVnode)) invokeDestroyHook(oldVnode)
          return
        }
    
        let isInitialPatch = false
        const insertedVnodeQueue = []
    
        if (isUndef(oldVnode)) {
          // empty mount (likely as component), create new root element
          isInitialPatch = true
          createElm(vnode, insertedVnodeQueue)
        } else {
          ...\u7701\u7565
        }
    
        invokeInsertHook(vnode, insertedVnodeQueue, isInitialPatch)
        return vnode.elm
    }
}
</code></pre><div class="line-numbers-wrapper"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br><span class="line-number">48</span><br><span class="line-number">49</span><br><span class="line-number">50</span><br><span class="line-number">51</span><br><span class="line-number">52</span><br><span class="line-number">53</span><br><span class="line-number">54</span><br><span class="line-number">55</span><br><span class="line-number">56</span><br><span class="line-number">57</span><br><span class="line-number">58</span><br><span class="line-number">59</span><br><span class="line-number">60</span><br><span class="line-number">61</span><br><span class="line-number">62</span><br><span class="line-number">63</span><br><span class="line-number">64</span><br><span class="line-number">65</span><br><span class="line-number">66</span><br><span class="line-number">67</span><br><span class="line-number">68</span><br><span class="line-number">69</span><br><span class="line-number">70</span><br><span class="line-number">71</span><br><span class="line-number">72</span><br><span class="line-number">73</span><br><span class="line-number">74</span><br><span class="line-number">75</span><br><span class="line-number">76</span><br><span class="line-number">77</span><br><span class="line-number">78</span><br><span class="line-number">79</span><br><span class="line-number">80</span><br><span class="line-number">81</span><br><span class="line-number">82</span><br><span class="line-number">83</span><br><span class="line-number">84</span><br><span class="line-number">85</span><br><span class="line-number">86</span><br><span class="line-number">87</span><br><span class="line-number">88</span><br><span class="line-number">89</span><br><span class="line-number">90</span><br><span class="line-number">91</span><br><span class="line-number">92</span><br><span class="line-number">93</span><br><span class="line-number">94</span><br><span class="line-number">95</span><br><span class="line-number">96</span><br><span class="line-number">97</span><br><span class="line-number">98</span><br><span class="line-number">99</span><br><span class="line-number">100</span><br><span class="line-number">101</span><br><span class="line-number">102</span><br><span class="line-number">103</span><br><span class="line-number">104</span><br><span class="line-number">105</span><br><span class="line-number">106</span><br><span class="line-number">107</span><br><span class="line-number">108</span><br><span class="line-number">109</span><br><span class="line-number">110</span><br><span class="line-number">111</span><br><span class="line-number">112</span><br></div></div><div class="language- line-numbers-mode"><span class="copy"></span><pre><code>// inline hooks to be invoked on component VNodes during patch
const componentVNodeHooks = {
    init (vnode: VNodeWithData, hydrating: boolean): ?boolean {
      if (
        vnode.componentInstance &amp;&amp;
        !vnode.componentInstance._isDestroyed &amp;&amp;
        vnode.data.keepAlive
      ) {
        ...\u7701\u7565
      } else {
        const child = vnode.componentInstance = createComponentInstanceForVnode(
          vnode,
          activeInstance
        )
        child.$mount(hydrating ? vnode.elm : undefined, hydrating)
      }
    }
    ...\u7701\u7565
}
</code></pre><div class="line-numbers-wrapper"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br></div></div><blockquote><p>\u8D70\u4E86createElm\u4E4B\u540E\uFF0C\u8D70\u5230createComponent\uFF0C\u6267\u884C\u8FD9\u53E5<code>i(vnode, false /* hydrating */)</code>\u5C31\u8D70\u5230\u4E86componentVNodeHooks.init\u65B9\u6CD5</p></blockquote><div class="language- line-numbers-mode"><span class="copy"></span><pre><code>export function createComponentInstanceForVnode (
  vnode: any, // we know it&#39;s MountedComponentVNode but flow doesn&#39;t
  parent: any, // activeInstance in lifecycle state
): Component {
  const options: InternalComponentOptions = {
    _isComponent: true,
    _parentVnode: vnode,
    parent
  }
  ...\u7701\u7565
  return new vnode.componentOptions.Ctor(options)
}
</code></pre><div class="line-numbers-wrapper"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br></div></div><div class="language- line-numbers-mode"><span class="copy"></span><pre><code>Vue.prototype._init = function (options?: Object) {
    const vm: Component = this
    // a uid
    vm._uid = uid++

    let startTag, endTag
    /* istanbul ignore if */
    if (process.<wbr>env.NODE_ENV !== &#39;production&#39; &amp;&amp; config.performance &amp;&amp; mark) {
      startTag = \`vue-perf-start:\${vm._uid}\`
      endTag = \`vue-perf-end:\${vm._uid}\`
      mark(startTag)
    }

    // a flag to avoid this being observed
    vm._isVue = true
    // merge options
    if (options &amp;&amp; options._isComponent) {
      // optimize internal component instantiation
      // since dynamic options merging is pretty slow, and none of the
      // internal component options needs special treatment.
      initInternalComponent(vm, options)
    } else {
        ...\u7701\u7565
    }
    ...\u7701\u7565
    initLifecycle(vm)
    ...\u7701\u7565
}
</code></pre><div class="line-numbers-wrapper"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br></div></div><div class="language- line-numbers-mode"><span class="copy"></span><pre><code>export function initInternalComponent (vm: Component, options: InternalComponentOptions) {
    const opts = vm.$options = Object.create(vm.constructor.options)
    // doing this because it&#39;s faster than dynamic enumeration.
    const parentVnode = options._parentVnode
    opts.parent = options.parent
    opts._parentVnode = parentVnode
  
    const vnodeComponentOptions = parentVnode.componentOptions
    opts.propsData = vnodeComponentOptions.propsData
    opts._parentListeners = vnodeComponentOptions.listeners
    opts._renderChildren = vnodeComponentOptions.children
    opts._componentTag = vnodeComponentOptions.tag
  
    if (options.render) {
      opts.render = options.render
      opts.staticRenderFns = options.staticRenderFns
    }
}
</code></pre><div class="line-numbers-wrapper"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br></div></div><div class="language- line-numbers-mode"><span class="copy"></span><pre><code>export function initLifecycle (vm: Component) {
    const options = vm.$options
  
    // locate first non-abstract parent
    let parent = options.parent
    if (parent &amp;&amp; !options.abstract) {
      while (parent.$options.abstract &amp;&amp; parent.$parent) {
        parent = parent.$parent
      }
      parent.$children.push(vm)
    }
  
    vm.$parent = parent
    vm.$root = parent ? parent.$root : vm
  
    vm.$children = []
    vm.$refs = {}
  
    vm._watcher = null
    vm._inactive = null
    vm._directInactive = false
    vm._isMounted = false
    vm._isDestroyed = false
    vm._isBeingDestroyed = false
}
</code></pre><div class="line-numbers-wrapper"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br></div></div><h4 id="\u5408\u5E76\u914D\u7F6E" tabindex="-1">\u5408\u5E76\u914D\u7F6E <a class="header-anchor" href="#\u5408\u5E76\u914D\u7F6E" aria-hidden="true">#</a></h4><div class="language- line-numbers-mode"><span class="copy"></span><pre><code>Vue.prototype._init = function (options?: Object) {
    const vm: Component = this

    ...\u7701\u7565

    if (options &amp;&amp; options._isComponent) {
      // optimize internal component instantiation
      // since dynamic options merging is pretty slow, and none of the
      // internal component options needs special treatment.
      initInternalComponent(vm, options)
    } else {
      vm.$options = mergeOptions(
        resolveConstructorOptions(vm.constructor),
        options || {},
        vm
      )
    }

    ...\u7701\u7565
    
}
</code></pre><div class="line-numbers-wrapper"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br></div></div><div class="language- line-numbers-mode"><span class="copy"></span><pre><code>export function resolveConstructorOptions (Ctor: Class&lt;Component&gt;) {
    let options = Ctor.options
    if (Ctor.super) {
      ...\u7701\u7565
    }
    return options
}
</code></pre><div class="line-numbers-wrapper"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><blockquote><p>\u8FD9\u91CC\u7684Ctor\u662FVue</p></blockquote><div class="language- line-numbers-mode"><span class="copy"></span><pre><code>export const ASSET_TYPES = [
    &#39;component&#39;,
    &#39;directive&#39;,
    &#39;filter&#39;
]

export function initGlobalAPI (Vue: GlobalAPI) {
    
    ...\u7701\u7565
  
    Vue.options = Object.create(null)
    ASSET_TYPES.forEach(type =&gt; {
      Vue.options[type + &#39;s&#39;] = Object.create(null)
    })
  
    // this is used to identify the &quot;base&quot; constructor to extend all plain-object
    // components with in Weex&#39;s multi-instance scenarios.
    Vue.options._base = Vue
  
    extend(Vue.options.components, builtInComponents)
  
    ...\u7701\u7565
}
</code></pre><div class="line-numbers-wrapper"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br></div></div><div class="language- line-numbers-mode"><span class="copy"></span><pre><code>const defaultStrat = function (parentVal: any, childVal: any): any {
    return childVal === undefined
      ? parentVal
      : childVal
}

const strats = config.optionMergeStrategies

export function mergeOptions (
    parent: Object,
    child: Object,
    vm?: Component
  ): Object {
    
    ...\u7701\u7565

    const extendsFrom = child.extends
    if (extendsFrom) {
      parent = mergeOptions(parent, extendsFrom, vm)
    }
    if (child.mixins) {
      for (let i = 0, l = child.mixins.length; i &lt; l; i++) {
        parent = mergeOptions(parent, child.mixins[i], vm)
      }
    }
    const options = {}
    let key
    for (key in parent) {
      mergeField(key)
    }
    for (key in child) {
      if (!hasOwn(parent, key)) {
        mergeField(key)
      }
    }
    function mergeField (key) {
      const strat = strats[key] || defaultStrat
      options[key] = strat(parent[key], child[key], vm, key)
    }
    return options
}
</code></pre><div class="line-numbers-wrapper"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br></div></div><h4 id="\u751F\u547D\u5468\u671F" tabindex="-1">\u751F\u547D\u5468\u671F <a class="header-anchor" href="#\u751F\u547D\u5468\u671F" aria-hidden="true">#</a></h4><div class="language- line-numbers-mode"><span class="copy"></span><pre><code>export function callHook (vm: Component, hook: string) {
  // #7573 disable dep collection when invoking lifecycle hooks
  pushTarget()
  const handlers = vm.$options[hook]
  if (handlers) {
    for (let i = 0, j = handlers.length; i &lt; j; i++) {
      try {
        handlers[i].call(vm)
      } catch (e) {
        handleError(e, vm, \`\${hook} hook\`)
      }
    }
  }
  if (vm._hasHookEvent) {
    vm.$emit(&#39;hook:&#39; + hook)
  }
  popTarget()
}
</code></pre><div class="line-numbers-wrapper"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br></div></div><blockquote><p>\u6267\u884C\u751F\u547D\u5468\u671F\u7684\u51FD\u6570</p></blockquote><div class="language- line-numbers-mode"><span class="copy"></span><pre><code>Vue.prototype._init = function (options?: Object) {
    ...\u7701\u7565

    initLifecycle(vm)
    initEvents(vm)
    initRender(vm)
    callHook(vm, &#39;beforeCreate&#39;)
    initInjections(vm) // resolve injections before data/props
    initState(vm)
    initProvide(vm) // resolve provide after data/props
    callHook(vm, &#39;created&#39;)

    ...\u7701\u7565
}
</code></pre><div class="line-numbers-wrapper"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br></div></div><div class="language- line-numbers-mode"><span class="copy"></span><pre><code>export function mountComponent (
    vm: Component,
    el: ?Element,
    hydrating?: boolean
  ): Component {
    
    ...\u7701\u7565

    callHook(vm, &#39;beforeMount&#39;)
  
    let updateComponent
    /* istanbul ignore if */
    if (process.<wbr>env.NODE_ENV !== &#39;production&#39; &amp;&amp; config.performance &amp;&amp; mark) {
        ...\u7701\u7565
    } else {
      updateComponent = () =&gt; {
        vm._update(vm._render(), hydrating)
      }
    }
  
    ...\u7701\u7565
    
    if (vm.$vnode == null) {
        vm._isMounted = true
        callHook(vm, &#39;mounted&#39;)
    }
    return vm
}
</code></pre><div class="line-numbers-wrapper"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br></div></div><div class="language- line-numbers-mode"><span class="copy"></span><pre><code>export function createPatchFunction (backend) {
    
    ...\u7701\u7565
    
    function invokeInsertHook (vnode, queue, initial) {
        // delay insert hooks for component root nodes, invoke them after the
        // element is really inserted
        if (isTrue(initial) &amp;&amp; isDef(vnode.parent)) {
            vnode.parent.data.pendingInsert = queue
        } else {
            for (let i = 0; i &lt; queue.length; ++i) {
                queue[i].data.hook.insert(queue[i])
            }
        }
    }
  
    ...\u7701\u7565
  
    return function patch (oldVnode, vnode, hydrating, removeOnly) {

        ...\u7701\u7565
  
        invokeInsertHook(vnode, insertedVnodeQueue, isInitialPatch)
        return vnode.elm
    }
}


const componentVNodeHooks = {
    
    ...\u7701\u7565
  
    insert (vnode: MountedComponentVNode) {
      const { context, componentInstance } = vnode
      if (!componentInstance._isMounted) {
        componentInstance._isMounted = true
        callHook(componentInstance, &#39;mounted&#39;)
      }

      ...\u7701\u7565
    }
  
    ...\u7701\u7565

}
</code></pre><div class="line-numbers-wrapper"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br></div></div><div class="language- line-numbers-mode"><span class="copy"></span><pre><code>export function mountComponent (
    vm: Component,
    el: ?Element,
    hydrating?: boolean
  ): Component {
    
    ...\u7701\u7565
  
    // we set this to vm._watcher inside the watcher&#39;s constructor
    // since the watcher&#39;s initial patch may call $forceUpdate (e.g. inside child
    // component&#39;s mounted hook), which relies on vm._watcher being already defined
    new Watcher(vm, updateComponent, noop, {
      before () {
        if (vm._isMounted) {
          callHook(vm, &#39;beforeUpdate&#39;)
        }
      }
    }, true /* isRenderWatcher */)

    ...\u7701\u7565
    
    return vm
}

function flushSchedulerQueue () {
    
    ...\u7701\u7565
  
    // do not cache length because more watchers might be pushed
    // as we run existing watchers
    for (index = 0; index &lt; queue.length; index++) {
      watcher = queue[index]
      if (watcher.before) {
        watcher.before()
      }
      ...\u7701\u7565
    }
  
    ...\u7701\u7565
    callUpdatedHooks(updatedQueue)
  
    ...\u7701\u7565
}
  
function callUpdatedHooks (queue) {
    let i = queue.length
    while (i--) {
      const watcher = queue[i]
      const vm = watcher.vm
      if (vm._watcher === watcher &amp;&amp; vm._isMounted) {
        callHook(vm, &#39;updated&#39;)
      }
    }
}
</code></pre><div class="line-numbers-wrapper"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br><span class="line-number">48</span><br><span class="line-number">49</span><br><span class="line-number">50</span><br><span class="line-number">51</span><br><span class="line-number">52</span><br><span class="line-number">53</span><br><span class="line-number">54</span><br></div></div><div class="language- line-numbers-mode"><span class="copy"></span><pre><code>Vue.prototype.$destroy = function () {
    const vm: Component = this
    if (vm._isBeingDestroyed) {
      return
    }
    callHook(vm, &#39;beforeDestroy&#39;)
    ...\u7701\u7565
    // invoke destroy hooks on current rendered tree
    vm.__patch__(vm._vnode, null)
    // fire destroyed hook
    callHook(vm, &#39;destroyed&#39;)
    ...\u7701\u7565
}
</code></pre><div class="line-numbers-wrapper"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br></div></div><h4 id="\u7EC4\u4EF6\u6CE8\u518C" tabindex="-1">\u7EC4\u4EF6\u6CE8\u518C <a class="header-anchor" href="#\u7EC4\u4EF6\u6CE8\u518C" aria-hidden="true">#</a></h4><div class="language- line-numbers-mode"><span class="copy"></span><pre><code>export const ASSET_TYPES = [
  &#39;component&#39;,
  &#39;directive&#39;,
  &#39;filter&#39;
]


export function initAssetRegisters (Vue: GlobalAPI) {
  /**
   * Create asset registration methods.
   */
  ASSET_TYPES.forEach(type =&gt; {
    Vue[type] = function (
      id: string,
      definition: Function | Object
    ): Function | Object | void {
      if (!definition) {
        return this.options[type + &#39;s&#39;][id]
      } else {
        /* istanbul ignore if */
        if (process.<wbr>env.NODE_ENV !== &#39;production&#39; &amp;&amp; type === &#39;component&#39;) {
          validateComponentName(id)
        }
        if (type === &#39;component&#39; &amp;&amp; isPlainObject(definition)) {
          definition.name = definition.name || id
          definition = this.options._base.extend(definition)
        }
        if (type === &#39;directive&#39; &amp;&amp; typeof definition === &#39;function&#39;) {
          definition = { bind: definition, update: definition }
        }
        this.options[type + &#39;s&#39;][id] = definition
        return definition
      }
    }
  })
}
</code></pre><div class="line-numbers-wrapper"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br></div></div><div class="language- line-numbers-mode"><span class="copy"></span><pre><code>export function _createElement (
    context: Component,
    tag?: string | Class&lt;Component&gt; | Function | Object,
    data?: VNodeData,
    children?: any,
    normalizationType?: number
  ): VNode | Array&lt;VNode&gt; {
    ...\u7701\u7565
    if (typeof tag === &#39;string&#39;) {
      let Ctor
      ns = (context.$vnode &amp;&amp; context.$vnode.ns) || config.getTagNamespace(tag)
      if (config.isReservedTag(tag)) {
        ...\u7701\u7565
      } else if (isDef(Ctor = resolveAsset(context.$options, &#39;components&#39;, tag))) {
        // component
        vnode = createComponent(Ctor, data, context, children, tag)
      } else {
        // unknown or unlisted namespaced elements
        // check at runtime because it may get assigned a namespace when its
        // parent normalizes children
        vnode = new VNode(
          tag, data, children,
          undefined, undefined, context
        )
      }
    } else {
      // direct component options / constructor
      vnode = createComponent(tag, data, context, children)
    }
    ...\u7701\u7565
}
</code></pre><div class="line-numbers-wrapper"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br></div></div><div class="language- line-numbers-mode"><span class="copy"></span><pre><code>export function resolveAsset (
    options: Object,
    type: string,
    id: string,
    warnMissing?: boolean
  ): any {
    /* istanbul ignore if */
    if (typeof id !== &#39;string&#39;) {
      return
    }
    const assets = options[type]
    // check local registration variations first
    if (hasOwn(assets, id)) return assets[id]
    const camelizedId = camelize(id)
    if (hasOwn(assets, camelizedId)) return assets[camelizedId]
    const PascalCaseId = capitalize(camelizedId)
    if (hasOwn(assets, PascalCaseId)) return assets[PascalCaseId]
    // fallback to prototype chain
    const res = assets[id] || assets[camelizedId] || assets[PascalCaseId]
    if (process.<wbr>env.NODE_ENV !== &#39;production&#39; &amp;&amp; warnMissing &amp;&amp; !res) {
      warn(
        &#39;Failed to resolve &#39; + type.slice(0, -1) + &#39;: &#39; + id,
        options
      )
    }
    return res
}
</code></pre><div class="line-numbers-wrapper"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br></div></div><h4 id="\u5F02\u6B65\u7EC4\u4EF6" tabindex="-1">\u5F02\u6B65\u7EC4\u4EF6 <a class="header-anchor" href="#\u5F02\u6B65\u7EC4\u4EF6" aria-hidden="true">#</a></h4><div class="language- line-numbers-mode"><span class="copy"></span><pre><code>export function createComponent (
    Ctor: Class&lt;Component&gt; | Function | Object | void,
    data: ?VNodeData,
    context: Component,
    children: ?Array&lt;VNode&gt;,
    tag?: string
  ): VNode | Array&lt;VNode&gt; | void {
    
    ...\u7701\u7565
  
    const baseCtor = context.$options._base

    ...\u7701\u7565

    // async component
    let asyncFactory
    if (isUndef(Ctor.cid)) {
      asyncFactory = Ctor
      Ctor = resolveAsyncComponent(asyncFactory, baseCtor, context)
      if (Ctor === undefined) {
        // return a placeholder node for async component, which is rendered
        // as a comment node but preserves all the raw information for the node.
        // the information will be used for async server-rendering and hydration.
        return createAsyncPlaceholder(
          asyncFactory,
          data,
          context,
          children,
          tag
        )
      }
    }
  
    ...\u7701\u7565
}
</code></pre><div class="line-numbers-wrapper"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br></div></div><div class="language- line-numbers-mode"><span class="copy"></span><pre><code>export function resolveAsyncComponent (
    factory: Function,
    baseCtor: Class&lt;Component&gt;,
    context: Component
  ): Class&lt;Component&gt; | void {
    if (isTrue(factory.error) &amp;&amp; isDef(factory.errorComp)) {
      return factory.errorComp
    }
  
    if (isDef(factory.resolved)) {
      return factory.resolved
    }
  
    if (isTrue(factory.loading) &amp;&amp; isDef(factory.loadingComp)) {
      return factory.loadingComp
    }
  
    if (isDef(factory.contexts)) {
      // already pending
      factory.contexts.push(context)
    } else {
      const contexts = factory.contexts = [context]
      let sync = true
  
      const forceRender = () =&gt; {
        for (let i = 0, l = contexts.length; i &lt; l; i++) {
          contexts[i].$forceUpdate()
        }
      }
  
      const resolve = once((res: Object | Class&lt;Component&gt;) =&gt; {
        // cache resolved
        factory.resolved = ensureCtor(res, baseCtor)
        // invoke callbacks only if this is not a synchronous resolve
        // (async resolves are shimmed as synchronous during SSR)
        if (!sync) {
          forceRender()
        }
      })
  
      const reject = once(reason =&gt; {
        process.<wbr>env.NODE_ENV !== &#39;production&#39; &amp;&amp; warn(
          \`Failed to resolve async component: \${String(factory)}\` +
          (reason ? \`\\nReason: \${reason}\` : &#39;&#39;)
        )
        if (isDef(factory.errorComp)) {
          factory.error = true
          forceRender()
        }
      })
  
      const res = factory(resolve, reject)
  
      if (isObject(res)) {
          if (typeof res.then === &#39;function&#39;) {
            // () =&gt; Promise
            if (isUndef(factory.resolved)) {
              res.then(resolve, reject)
            }
          } else if (isDef(res.component) &amp;&amp; typeof res.component.then === &#39;function&#39;) {
            res.component.then(resolve, reject)
    
            if (isDef(res.error)) {
              factory.errorComp = ensureCtor(res.error, baseCtor)
            }
    
            if (isDef(res.loading)) {
              factory.loadingComp = ensureCtor(res.loading, baseCtor)
              if (res.delay === 0) {
                factory.loading = true
              } else {
                setTimeout(() =&gt; {
                  if (isUndef(factory.resolved) &amp;&amp; isUndef(factory.error)) {
                    factory.loading = true
                    forceRender()
                  }
                }, res.delay || 200)
              }
            }
    
            if (isDef(res.timeout)) {
              setTimeout(() =&gt; {
                if (isUndef(factory.resolved)) {
                  reject(
                    process.<wbr>env.NODE_ENV !== &#39;production&#39;
                      ? \`timeout (\${res.timeout}ms)\`
                      : null
                  )
                }
              }, res.timeout)
            }
          }
      }
  
      sync = false
      // return in case resolved synchronously
      return factory.loading
        ? factory.loadingComp
        : factory.resolved
    }
}
</code></pre><div class="line-numbers-wrapper"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br><span class="line-number">48</span><br><span class="line-number">49</span><br><span class="line-number">50</span><br><span class="line-number">51</span><br><span class="line-number">52</span><br><span class="line-number">53</span><br><span class="line-number">54</span><br><span class="line-number">55</span><br><span class="line-number">56</span><br><span class="line-number">57</span><br><span class="line-number">58</span><br><span class="line-number">59</span><br><span class="line-number">60</span><br><span class="line-number">61</span><br><span class="line-number">62</span><br><span class="line-number">63</span><br><span class="line-number">64</span><br><span class="line-number">65</span><br><span class="line-number">66</span><br><span class="line-number">67</span><br><span class="line-number">68</span><br><span class="line-number">69</span><br><span class="line-number">70</span><br><span class="line-number">71</span><br><span class="line-number">72</span><br><span class="line-number">73</span><br><span class="line-number">74</span><br><span class="line-number">75</span><br><span class="line-number">76</span><br><span class="line-number">77</span><br><span class="line-number">78</span><br><span class="line-number">79</span><br><span class="line-number">80</span><br><span class="line-number">81</span><br><span class="line-number">82</span><br><span class="line-number">83</span><br><span class="line-number">84</span><br><span class="line-number">85</span><br><span class="line-number">86</span><br><span class="line-number">87</span><br><span class="line-number">88</span><br><span class="line-number">89</span><br><span class="line-number">90</span><br><span class="line-number">91</span><br><span class="line-number">92</span><br><span class="line-number">93</span><br><span class="line-number">94</span><br><span class="line-number">95</span><br><span class="line-number">96</span><br><span class="line-number">97</span><br><span class="line-number">98</span><br><span class="line-number">99</span><br><span class="line-number">100</span><br><span class="line-number">101</span><br></div></div><div class="language- line-numbers-mode"><span class="copy"></span><pre><code>export function createAsyncPlaceholder (
    factory: Function,
    data: ?VNodeData,
    context: Component,
    children: ?Array&lt;VNode&gt;,
    tag: ?string
  ): VNode {
    const node = createEmptyVNode()
    node.asyncFactory = factory
    node.asyncMeta = { data, context, children, tag }
    return node
}
</code></pre><div class="line-numbers-wrapper"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br></div></div><div class="language- line-numbers-mode"><span class="copy"></span><pre><code>function ensureCtor (comp: any, base) {
    if (
      comp.__esModule ||
      (hasSymbol &amp;&amp; comp[Symbol.toStringTag] === &#39;Module&#39;)
    ) {
      comp = comp.default
    }
    return isObject(comp)
      ? base.extend(comp)
      : comp
}


Vue.prototype.$forceUpdate = function () {
    const vm: Component = this
    if (vm._watcher) {
      vm._watcher.update()
    }
}
</code></pre><div class="line-numbers-wrapper"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br></div></div><h2 id="\u54CD\u5E94\u5F0F\u539F\u7406" tabindex="-1">\u54CD\u5E94\u5F0F\u539F\u7406 <a class="header-anchor" href="#\u54CD\u5E94\u5F0F\u539F\u7406" aria-hidden="true">#</a></h2><h3 id="\u6E90\u7801\u6458\u8981-2" tabindex="-1">\u6E90\u7801\u6458\u8981 <a class="header-anchor" href="#\u6E90\u7801\u6458\u8981-2" aria-hidden="true">#</a></h3><h4 id="\u54CD\u5E94\u5F0F\u5BF9\u8C61" tabindex="-1">\u54CD\u5E94\u5F0F\u5BF9\u8C61 <a class="header-anchor" href="#\u54CD\u5E94\u5F0F\u5BF9\u8C61" aria-hidden="true">#</a></h4><div class="language- line-numbers-mode"><span class="copy"></span><pre><code>Vue.prototype._init = function (options?: Object) {
    const vm: Component = this
    ...\u7701\u7565

    initState(vm)
    
    ...\u7701\u7565
}


export function initState (vm: Component) {
    vm._watchers = []
    const opts = vm.$options
    if (opts.props) initProps(vm, opts.props)
    if (opts.methods) initMethods(vm, opts.methods)
    if (opts.data) {
      initData(vm)
    } else {
      observe(vm._data = {}, true /* asRootData */)
    }
    if (opts.computed) initComputed(vm, opts.computed)
    if (opts.watch &amp;&amp; opts.watch !== nativeWatch) {
      initWatch(vm, opts.watch)
    }
}

function initData (vm: Component) {
    let data = vm.$options.data
    data = vm._data = typeof data === &#39;function&#39;
      ? getData(data, vm)
      : data || {}
    ...\u7701\u7565
    // observe data
    observe(data, true /* asRootData */)
}
</code></pre><div class="line-numbers-wrapper"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br></div></div><div class="language- line-numbers-mode"><span class="copy"></span><pre><code>export let shouldObserve: boolean = true

export function observe (value: any, asRootData: ?boolean): Observer | void {
    if (!isObject(value) || value instanceof VNode) {
      return
    }
    let ob: Observer | void
    if (hasOwn(value, &#39;__ob__&#39;) &amp;&amp; value.__ob__ instanceof Observer) {
      ob = value.__ob__
    } else if (
      shouldObserve &amp;&amp;
      !isServerRendering() &amp;&amp;
      (Array.isArray(value) || isPlainObject(value)) &amp;&amp;
      Object.isExtensible(value) &amp;&amp;
      !value._isVue
    ) {
      ob = new Observer(value)
    }
    if (asRootData &amp;&amp; ob) {
      ob.vmCount++
    }
    return ob
}

export function toggleObserving (value: boolean) {
  shouldObserve = value
}
</code></pre><div class="line-numbers-wrapper"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br></div></div><div class="language- line-numbers-mode"><span class="copy"></span><pre><code>export class Observer {
  value: any;
  dep: Dep;
  vmCount: number; // number of vms that has this object as root $data

  constructor (value: any) {
    this.value = value
    this.dep = new Dep()
    this.vmCount = 0
    def(value, &#39;__ob__&#39;, this)
    if (Array.isArray(value)) {
      const augment = hasProto
        ? protoAugment
        : copyAugment
      augment(value, arrayMethods, arrayKeys)
      this.observeArray(value)
    } else {
      this.walk(value)
    }
  }

  /**
   * Walk through each property and convert them into
   * getter/setters. This method should only be called when
   * value type is Object.
   */
  walk (obj: Object) {
    const keys = Object.keys(obj)
    for (let i = 0; i &lt; keys.length; i++) {
      defineReactive(obj, keys[i])
    }
  }

  /**
   * Observe a list of Array items.
   */
  observeArray (items: Array&lt;any&gt;) {
    for (let i = 0, l = items.length; i &lt; l; i++) {
      observe(items[i])
    }
  }
}
</code></pre><div class="line-numbers-wrapper"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br></div></div><div class="language- line-numbers-mode"><span class="copy"></span><pre><code>export function def (obj: Object, key: string, val: any, enumerable?: boolean) {
  Object.defineProperty(obj, key, {
    value: val,
    enumerable: !!enumerable,
    writable: true,
    configurable: true
  })
}
</code></pre><div class="line-numbers-wrapper"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br></div></div><div class="language- line-numbers-mode"><span class="copy"></span><pre><code>export function defineReactive (
    obj: Object,
    key: string,
    val: any,
    customSetter?: ?Function,
    shallow?: boolean
  ) {
    const dep = new Dep()
  
    const property = Object.getOwnPropertyDescriptor(obj, key)
    if (property &amp;&amp; property.configurable === false) {
      return
    }
  
    // cater for pre-defined getter/setters
    const getter = property &amp;&amp; property.get
    const setter = property &amp;&amp; property.set
    if ((!getter || setter) &amp;&amp; arguments.length === 2) {
      val = obj[key]
    }
  
    let childOb = !shallow &amp;&amp; observe(val)
    Object.defineProperty(obj, key, {
      enumerable: true,
      configurable: true,
      get: function reactiveGetter () {
        const value = getter ? getter.call(obj) : val
        if (Dep.target) {
          dep.depend()
          if (childOb) {
            childOb.dep.depend()
            if (Array.isArray(value)) {
              dependArray(value)
            }
          }
        }
        return value
      },
      set: function reactiveSetter (newVal) {
        const value = getter ? getter.call(obj) : val
        /* eslint-disable no-self-compare */
        if (newVal === value || (newVal !== newVal &amp;&amp; value !== value)) {
          return
        }
        /* eslint-enable no-self-compare */
        if (process.<wbr>env.NODE_ENV !== &#39;production&#39; &amp;&amp; customSetter) {
          customSetter()
        }
        if (setter) {
          setter.call(obj, newVal)
        } else {
          val = newVal
        }
        childOb = !shallow &amp;&amp; observe(newVal)
        dep.notify()
      }
    })
}
</code></pre><div class="line-numbers-wrapper"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br><span class="line-number">48</span><br><span class="line-number">49</span><br><span class="line-number">50</span><br><span class="line-number">51</span><br><span class="line-number">52</span><br><span class="line-number">53</span><br><span class="line-number">54</span><br><span class="line-number">55</span><br><span class="line-number">56</span><br><span class="line-number">57</span><br><span class="line-number">58</span><br></div></div><h4 id="\u4F9D\u8D56\u6536\u96C6" tabindex="-1">\u4F9D\u8D56\u6536\u96C6 <a class="header-anchor" href="#\u4F9D\u8D56\u6536\u96C6" aria-hidden="true">#</a></h4><div class="language- line-numbers-mode"><span class="copy"></span><pre><code>export function mountComponent (
    vm: Component,
    el: ?Element,
    hydrating?: boolean
  ): Component {
    ...\u7701\u7565

    if (process.<wbr>env.NODE_ENV !== &#39;production&#39; &amp;&amp; config.performance &amp;&amp; mark) {
      ...\u7701\u7565
    } else {
      updateComponent = () =&gt; {
        vm._update(vm._render(), hydrating)
      }
    }
  
    // we set this to vm._watcher inside the watcher&#39;s constructor
    // since the watcher&#39;s initial patch may call $forceUpdate (e.g. inside child
    // component&#39;s mounted hook), which relies on vm._watcher being already defined
    new Watcher(vm, updateComponent, noop, {
      before () {
        if (vm._isMounted) {
          callHook(vm, &#39;beforeUpdate&#39;)
        }
      }
    }, true /* isRenderWatcher */)
    ...\u7701\u7565
}
</code></pre><div class="line-numbers-wrapper"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br></div></div><blockquote><p>\u6267\u884CmountComponent\u65B9\u6CD5\u521B\u5EFAWatcher</p></blockquote><div class="language- line-numbers-mode"><span class="copy"></span><pre><code>export default class Watcher {
    vm: Component;
    expression: string;
    cb: Function;
    id: number;
    deep: boolean;
    user: boolean;
    computed: boolean;
    sync: boolean;
    dirty: boolean;
    active: boolean;
    dep: Dep;
    deps: Array&lt;Dep&gt;;
    newDeps: Array&lt;Dep&gt;;
    depIds: SimpleSet;
    newDepIds: SimpleSet;
    before: ?Function;
    getter: Function;
    value: any;
  
    constructor (
      vm: Component,
      expOrFn: string | Function,
      cb: Function,
      options?: ?Object,
      isRenderWatcher?: boolean
    ) {
      this.vm = vm
      ...\u7701\u7565
      this.deps = []
      this.newDeps = []
      this.depIds = new Set()
      this.newDepIds = new Set()
      ...\u7701\u7565
      if (typeof expOrFn === &#39;function&#39;) {
        this.getter = expOrFn
      } else {
        ...\u7701\u7565
      }
      if (this.computed) {
        this.value = undefined
        this.dep = new Dep()
      } else {
        this.value = this.get()
      }
    }
  
    /**
     * Evaluate the getter, and re-collect dependencies.
     */
    get () {
      pushTarget(this)
      let value
      const vm = this.vm
      try {
        value = this.getter.call(vm, vm)
      } catch (e) {
        if (this.user) {
          handleError(e, vm, \`getter for watcher &quot;\${this.expression}&quot;\`)
        } else {
          throw e
        }
      } finally {
        // &quot;touch&quot; every property so they are all tracked as
        // dependencies for deep watching
        if (this.deep) {
          traverse(value)
        }
        popTarget()
        this.cleanupDeps()
      }
      return value
    }
  
    /**
     * Add a dependency to this directive.
     */
    addDep (dep: Dep) {
      const id = dep.id
      if (!this.newDepIds.has(id)) {
        this.newDepIds.add(id)
        this.newDeps.push(dep)
        if (!this.depIds.has(id)) {
          dep.addSub(this)
        }
      }
    }
  
    /**
     * Clean up for dependency collection.
     */
    cleanupDeps () {
      let i = this.deps.length
      while (i--) {
        const dep = this.deps[i]
        if (!this.newDepIds.has(dep.id)) {
          dep.removeSub(this)
        }
      }
      let tmp = this.depIds
      this.depIds = this.newDepIds
      this.newDepIds = tmp
      this.newDepIds.clear()
      tmp = this.deps
      this.deps = this.newDeps
      this.newDeps = tmp
      this.newDeps.length = 0
    }
  
    ...\u7701\u7565
    
}
</code></pre><div class="line-numbers-wrapper"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br><span class="line-number">48</span><br><span class="line-number">49</span><br><span class="line-number">50</span><br><span class="line-number">51</span><br><span class="line-number">52</span><br><span class="line-number">53</span><br><span class="line-number">54</span><br><span class="line-number">55</span><br><span class="line-number">56</span><br><span class="line-number">57</span><br><span class="line-number">58</span><br><span class="line-number">59</span><br><span class="line-number">60</span><br><span class="line-number">61</span><br><span class="line-number">62</span><br><span class="line-number">63</span><br><span class="line-number">64</span><br><span class="line-number">65</span><br><span class="line-number">66</span><br><span class="line-number">67</span><br><span class="line-number">68</span><br><span class="line-number">69</span><br><span class="line-number">70</span><br><span class="line-number">71</span><br><span class="line-number">72</span><br><span class="line-number">73</span><br><span class="line-number">74</span><br><span class="line-number">75</span><br><span class="line-number">76</span><br><span class="line-number">77</span><br><span class="line-number">78</span><br><span class="line-number">79</span><br><span class="line-number">80</span><br><span class="line-number">81</span><br><span class="line-number">82</span><br><span class="line-number">83</span><br><span class="line-number">84</span><br><span class="line-number">85</span><br><span class="line-number">86</span><br><span class="line-number">87</span><br><span class="line-number">88</span><br><span class="line-number">89</span><br><span class="line-number">90</span><br><span class="line-number">91</span><br><span class="line-number">92</span><br><span class="line-number">93</span><br><span class="line-number">94</span><br><span class="line-number">95</span><br><span class="line-number">96</span><br><span class="line-number">97</span><br><span class="line-number">98</span><br><span class="line-number">99</span><br><span class="line-number">100</span><br><span class="line-number">101</span><br><span class="line-number">102</span><br><span class="line-number">103</span><br><span class="line-number">104</span><br><span class="line-number">105</span><br><span class="line-number">106</span><br><span class="line-number">107</span><br><span class="line-number">108</span><br><span class="line-number">109</span><br><span class="line-number">110</span><br><span class="line-number">111</span><br><span class="line-number">112</span><br></div></div><blockquote><p>\u521B\u5EFAWatcher\u7684\u65F6\u5019\u6267\u884CupdateComponent</p></blockquote><div class="language- line-numbers-mode"><span class="copy"></span><pre><code>Vue.prototype._render = function (): VNode {
    ...\u7701\u7565
    try {
      vnode = render.call(vm._renderProxy, vm.$createElement)
    } catch (e) {
      handleError(e, vm, \`render\`)
      // return error render result,
      // or previous vnode to prevent render error causing blank component
      /* istanbul ignore else */
      if (process.<wbr>env.NODE_ENV !== &#39;production&#39;) {
        if (vm.$options.renderError) {
          try {
            vnode = vm.$options.renderError.call(vm._renderProxy, vm.$createElement, e)
          } catch (e) {
            handleError(e, vm, \`renderError\`)
            vnode = vm._vnode
          }
        } else {
          vnode = vm._vnode
        }
      } else {
        vnode = vm._vnode
      }
    }
    ...\u7701\u7565
}
</code></pre><div class="line-numbers-wrapper"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br></div></div><blockquote><p>\u6267\u884Crender.call\u7684\u65F6\u5019\uFF0C\u80FD\u591F\u8BBF\u95EE\u5230\u6211\u4EEC\u7684\u6570\u636E</p></blockquote><div class="language- line-numbers-mode"><span class="copy"></span><pre><code>export function defineReactive (
    obj: Object,
    key: string,
    val: any,
    customSetter?: ?Function,
    shallow?: boolean
  ) {
    
    const dep = new Dep()

    const property = Object.getOwnPropertyDescriptor(obj, key)
    if (property &amp;&amp; property.configurable === false) {
        return
    }

    // cater for pre-defined getter/setters
    const getter = property &amp;&amp; property.get
    const setter = property &amp;&amp; property.set
    if ((!getter || setter) &amp;&amp; arguments.length === 2) {
        val = obj[key]
    }

    let childOb = !shallow &amp;&amp; observe(val)
    Object.defineProperty(obj, key, {
      enumerable: true,
      configurable: true,
      get: function reactiveGetter () {
        const value = getter ? getter.call(obj) : val
        if (Dep.target) {
          dep.depend()
          if (childOb) {
            childOb.dep.depend()
            if (Array.isArray(value)) {
              dependArray(value)
            }
          }
        }
        return value
      },
      set: function reactiveSetter (newVal) {
        ...\u7701\u7565
      }
    })
}
</code></pre><div class="line-numbers-wrapper"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br></div></div><blockquote><p>\u8BBF\u95EE\u6211\u4EEC\u7684\u6570\u636E\u5C31\u80FD\u591F\u6267\u884Cget\u65B9\u6CD5</p></blockquote><div class="language- line-numbers-mode"><span class="copy"></span><pre><code>let uid = 0

export default class Dep {
  static target: ?Watcher;
  id: number;
  subs: Array&lt;Watcher&gt;;

  constructor () {
    this.id = uid++
    this.subs = []
  }

  addSub (sub: Watcher) {
    this.subs.push(sub)
  }

  removeSub (sub: Watcher) {
    remove(this.subs, sub)
  }

  depend () {
    if (Dep.target) {
      Dep.target.addDep(this)
    }
  }

  notify () {
    // stabilize the subscriber list first
    const subs = this.subs.slice()
    for (let i = 0, l = subs.length; i &lt; l; i++) {
      subs[i].update()
    }
  }
}

Dep.target = null

const targetStack = []

export function pushTarget (_target: ?Watcher) {
  if (Dep.target) targetStack.push(Dep.target)
  Dep.target = _target
}

export function popTarget () {
  Dep.target = targetStack.pop()
}
</code></pre><div class="line-numbers-wrapper"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br></div></div><h4 id="\u6D3E\u53D1\u66F4\u65B0" tabindex="-1">\u6D3E\u53D1\u66F4\u65B0 <a class="header-anchor" href="#\u6D3E\u53D1\u66F4\u65B0" aria-hidden="true">#</a></h4><div class="language- line-numbers-mode"><span class="copy"></span><pre><code>export function defineReactive (
    obj: Object,
    key: string,
    val: any,
    customSetter?: ?Function,
    shallow?: boolean
  ) {
    const dep = new Dep()
  
    const property = Object.getOwnPropertyDescriptor(obj, key)
    if (property &amp;&amp; property.configurable === false) {
      return
    }
  
    // cater for pre-defined getter/setters
    const getter = property &amp;&amp; property.get
    const setter = property &amp;&amp; property.set
    if ((!getter || setter) &amp;&amp; arguments.length === 2) {
      val = obj[key]
    }
  
    let childOb = !shallow &amp;&amp; observe(val)
    Object.defineProperty(obj, key, {
      enumerable: true,
      configurable: true,
      get: function reactiveGetter () {
        ...\u7701\u7565
      },
      set: function reactiveSetter (newVal) {
        const value = getter ? getter.call(obj) : val
        /* eslint-disable no-self-compare */
        if (newVal === value || (newVal !== newVal &amp;&amp; value !== value)) {
          return
        }
        /* eslint-enable no-self-compare */
        if (process.<wbr>env.NODE_ENV !== &#39;production&#39; &amp;&amp; customSetter) {
          customSetter()
        }
        if (setter) {
          setter.call(obj, newVal)
        } else {
          val = newVal
        }
        childOb = !shallow &amp;&amp; observe(newVal)
        dep.notify()
      }
    })
}
</code></pre><div class="line-numbers-wrapper"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br><span class="line-number">48</span><br></div></div><div class="language- line-numbers-mode"><span class="copy"></span><pre><code>export default class Dep {
  static target: ?Watcher;
  id: number;
  subs: Array&lt;Watcher&gt;;

  constructor () {
    this.id = uid++
    this.subs = []
  }

  ...\u7701\u7565

  notify () {
    // stabilize the subscriber list first
    const subs = this.subs.slice()
    for (let i = 0, l = subs.length; i &lt; l; i++) {
      subs[i].update()
    }
  }
}
</code></pre><div class="line-numbers-wrapper"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br></div></div><div class="language- line-numbers-mode"><span class="copy"></span><pre><code>export default class Watcher {
    vm: Component;
    expression: string;
    cb: Function;
    id: number;
    deep: boolean;
    user: boolean;
    computed: boolean;
    sync: boolean;
    dirty: boolean;
    active: boolean;
    dep: Dep;
    deps: Array&lt;Dep&gt;;
    newDeps: Array&lt;Dep&gt;;
    depIds: SimpleSet;
    newDepIds: SimpleSet;
    before: ?Function;
    getter: Function;
    value: any;
  
    constructor (
      vm: Component,
      expOrFn: string | Function,
      cb: Function,
      options?: ?Object,
      isRenderWatcher?: boolean
    ) {
        ...\u7701\u7565
        if (options) {
            ...\u7701\u7565
            this.sync = !!options.sync
            ...\u7701\u7565
        } else {
            this.deep = this.user = this.computed = this.sync = false
        }
        ...\u7701\u7565
    }
  
    ...\u7701\u7565
  
    /**
     * Subscriber interface.
     * Will be called when a dependency changes.
     */
    update () {
      /* istanbul ignore else */
      if (this.computed) {
        ...\u7701\u7565
      } else if (this.sync) {
        this.run()
      } else {
        queueWatcher(this)
      }
    }
  
    ...\u7701\u7565
}
</code></pre><div class="line-numbers-wrapper"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br><span class="line-number">48</span><br><span class="line-number">49</span><br><span class="line-number">50</span><br><span class="line-number">51</span><br><span class="line-number">52</span><br><span class="line-number">53</span><br><span class="line-number">54</span><br><span class="line-number">55</span><br><span class="line-number">56</span><br><span class="line-number">57</span><br></div></div><div class="language- line-numbers-mode"><span class="copy"></span><pre><code>let has: { [key: number]: ?true } = {}
let flushing = false
const queue: Array&lt;Watcher&gt; = []
let waiting = false

export function queueWatcher (watcher: Watcher) {
    const id = watcher.id
    if (has[id] == null) {
      has[id] = true
      if (!flushing) {
        queue.push(watcher)
      } else {
        // if already flushing, splice the watcher based on its id
        // if already past its id, it will be run next immediately.
        let i = queue.length - 1
        while (i &gt; index &amp;&amp; queue[i].id &gt; watcher.id) {
          i--
        }
        queue.splice(i + 1, 0, watcher)
      }
      // queue the flush
      if (!waiting) {
        waiting = true
        nextTick(flushSchedulerQueue)
      }
    }
}
</code></pre><div class="line-numbers-wrapper"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br></div></div><div class="language- line-numbers-mode"><span class="copy"></span><pre><code>let flushing = false
let circular: { [key: number]: number } = {}

function flushSchedulerQueue () {
    flushing = true
    let watcher, id
  
    // Sort queue before flush.
    // This ensures that:
    // 1. Components are updated from parent to child. (because parent is always
    //    created before the child)
    // 2. A component&#39;s user watchers are run before its render watcher (because
    //    user watchers are created before the render watcher)
    // 3. If a component is destroyed during a parent component&#39;s watcher run,
    //    its watchers can be skipped.
    queue.sort((a, b) =&gt; a.id - b.id)
  
    // do not cache length because more watchers might be pushed
    // as we run existing watchers
    for (index = 0; index &lt; queue.length; index++) {
      watcher = queue[index]
      if (watcher.before) {
        watcher.before()
      }
      id = watcher.id
      has[id] = null
      watcher.run()
      // in dev build, check and stop circular updates.
      if (process.<wbr>env.NODE_ENV !== &#39;production&#39; &amp;&amp; has[id] != null) {
        circular[id] = (circular[id] || 0) + 1
        if (circular[id] &gt; MAX_UPDATE_COUNT) {
          warn(
            &#39;You may have an infinite update loop &#39; + (
              watcher.user
                ? \`in watcher with expression &quot;\${watcher.expression}&quot;\`
                : \`in a component render function.\`
            ),
            watcher.vm
          )
          break
        }
      }
    }
  
    // keep copies of post queues before resetting state
    const activatedQueue = activatedChildren.slice()
    const updatedQueue = queue.slice()
  
    resetSchedulerState()
  
    // call component updated and activated hooks
    callActivatedHooks(activatedQueue)
    callUpdatedHooks(updatedQueue)
  
    // devtool hook
    /* istanbul ignore if */
    if (devtools &amp;&amp; config.devtools) {
      devtools.emit(&#39;flush&#39;)
    }
}
</code></pre><div class="line-numbers-wrapper"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br><span class="line-number">48</span><br><span class="line-number">49</span><br><span class="line-number">50</span><br><span class="line-number">51</span><br><span class="line-number">52</span><br><span class="line-number">53</span><br><span class="line-number">54</span><br><span class="line-number">55</span><br><span class="line-number">56</span><br><span class="line-number">57</span><br><span class="line-number">58</span><br><span class="line-number">59</span><br><span class="line-number">60</span><br></div></div><div class="language- line-numbers-mode"><span class="copy"></span><pre><code>export default class Watcher {
    vm: Component;
    expression: string;
    cb: Function;
    id: number;
    deep: boolean;
    user: boolean;
    computed: boolean;
    sync: boolean;
    dirty: boolean;
    active: boolean;
    dep: Dep;
    deps: Array&lt;Dep&gt;;
    newDeps: Array&lt;Dep&gt;;
    depIds: SimpleSet;
    newDepIds: SimpleSet;
    before: ?Function;
    getter: Function;
    value: any;
  
    constructor (
      vm: Component,
      expOrFn: string | Function,
      cb: Function,
      options?: ?Object,
      isRenderWatcher?: boolean
    ) {
      ...\u7701\u7565
      this.cb = cb
      ...\u7701\u7565
      this.active = true
      ...\u7701\u7565
    }
  
    ...\u7701\u7565
  
    /**
     * Scheduler job interface.
     * Will be called by the scheduler.
     */
    run () {
      if (this.active) {
        this.getAndInvoke(this.cb)
      }
    }
    
    get () {
        pushTarget(this)
        let value
        const vm = this.vm
        try {
          value = this.getter.call(vm, vm)
        } catch (e) {
          if (this.user) {
            handleError(e, vm, \`getter for watcher &quot;\${this.expression}&quot;\`)
          } else {
            throw e
          }
        } finally {
          // &quot;touch&quot; every property so they are all tracked as
          // dependencies for deep watching
          if (this.deep) {
            traverse(value)
          }
          popTarget()
          this.cleanupDeps()
        }
        return value
    }
  
    getAndInvoke (cb: Function) {
      const value = this.get()
      if (
        value !== this.value ||
        // Deep watchers and watchers on Object/Arrays should fire even
        // when the value is the same, because the value may
        // have mutated.
        isObject(value) ||
        this.deep
      ) {
        // set new value
        const oldValue = this.value
        this.value = value
        this.dirty = false
        if (this.user) {
          try {
            cb.call(this.vm, value, oldValue)
          } catch (e) {
            handleError(e, this.vm, \`callback for watcher &quot;\${this.expression}&quot;\`)
          }
        } else {
          cb.call(this.vm, value, oldValue)
        }
      }
    }
  
    ...\u7701\u7565
    
}
</code></pre><div class="line-numbers-wrapper"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br><span class="line-number">48</span><br><span class="line-number">49</span><br><span class="line-number">50</span><br><span class="line-number">51</span><br><span class="line-number">52</span><br><span class="line-number">53</span><br><span class="line-number">54</span><br><span class="line-number">55</span><br><span class="line-number">56</span><br><span class="line-number">57</span><br><span class="line-number">58</span><br><span class="line-number">59</span><br><span class="line-number">60</span><br><span class="line-number">61</span><br><span class="line-number">62</span><br><span class="line-number">63</span><br><span class="line-number">64</span><br><span class="line-number">65</span><br><span class="line-number">66</span><br><span class="line-number">67</span><br><span class="line-number">68</span><br><span class="line-number">69</span><br><span class="line-number">70</span><br><span class="line-number">71</span><br><span class="line-number">72</span><br><span class="line-number">73</span><br><span class="line-number">74</span><br><span class="line-number">75</span><br><span class="line-number">76</span><br><span class="line-number">77</span><br><span class="line-number">78</span><br><span class="line-number">79</span><br><span class="line-number">80</span><br><span class="line-number">81</span><br><span class="line-number">82</span><br><span class="line-number">83</span><br><span class="line-number">84</span><br><span class="line-number">85</span><br><span class="line-number">86</span><br><span class="line-number">87</span><br><span class="line-number">88</span><br><span class="line-number">89</span><br><span class="line-number">90</span><br><span class="line-number">91</span><br><span class="line-number">92</span><br><span class="line-number">93</span><br><span class="line-number">94</span><br><span class="line-number">95</span><br><span class="line-number">96</span><br><span class="line-number">97</span><br><span class="line-number">98</span><br><span class="line-number">99</span><br></div></div><div class="language- line-numbers-mode"><span class="copy"></span><pre><code>function callUpdatedHooks (queue) {
    let i = queue.length
    while (i--) {
      const watcher = queue[i]
      const vm = watcher.vm
      if (vm._watcher === watcher &amp;&amp; vm._isMounted) {
        callHook(vm, &#39;updated&#39;)
      }
    }
}
</code></pre><div class="line-numbers-wrapper"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br></div></div><h4 id="nexttick" tabindex="-1">nextTick <a class="header-anchor" href="#nexttick" aria-hidden="true">#</a></h4><div class="language- line-numbers-mode"><span class="copy"></span><pre><code>let microTimerFunc
let macroTimerFunc
let useMacroTask = false

if (typeof setImmediate !== &#39;undefined&#39; &amp;&amp; isNative(setImmediate)) {
  macroTimerFunc = () =&gt; {
    setImmediate(flushCallbacks)
  }
} else if (typeof MessageChannel !== &#39;undefined&#39; &amp;&amp; (
  isNative(MessageChannel) ||
  // PhantomJS
  MessageChannel.toString() === &#39;[object MessageChannelConstructor]&#39;
)) {
  const channel = new MessageChannel()
  const port = channel.port2
  channel.port1.onmessage = flushCallbacks
  macroTimerFunc = () =&gt; {
    port.postMessage(1)
  }
} else {
  /* istanbul ignore next */
  macroTimerFunc = () =&gt; {
    setTimeout(flushCallbacks, 0)
  }
}


if (typeof Promise !== &#39;undefined&#39; &amp;&amp; isNative(Promise)) {
  const p = Promise.resolve()
  microTimerFunc = () =&gt; {
    p.then(flushCallbacks)
    // in problematic UIWebViews, Promise.then doesn&#39;t completely break, but
    // it can get stuck in a weird state where callbacks are pushed into the
    // microtask queue but the queue isn&#39;t being flushed, until the browser
    // needs to do some other work, e.g. handle a timer. Therefore we can
    // &quot;force&quot; the microtask queue to be flushed by adding an empty timer.
    if (isIOS) setTimeout(noop)
  }
} else {
  // fallback to macro
  microTimerFunc = macroTimerFunc
}
</code></pre><div class="line-numbers-wrapper"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br></div></div><div class="language- line-numbers-mode"><span class="copy"></span><pre><code>const callbacks = []
let pending = false


export function nextTick (cb?: Function, ctx?: Object) {
  let _resolve
  callbacks.push(() =&gt; {
    if (cb) {
      try {
        cb.call(ctx)
      } catch (e) {
        handleError(e, ctx, &#39;nextTick&#39;)
      }
    } else if (_resolve) {
      _resolve(ctx)
    }
  })
  if (!pending) {
    pending = true
    if (useMacroTask) {
      macroTimerFunc()
    } else {
      microTimerFunc()
    }
  }
  // $flow-disable-line
  if (!cb &amp;&amp; typeof Promise !== &#39;undefined&#39;) {
    return new Promise(resolve =&gt; {
      _resolve = resolve
    })
  }
}
</code></pre><div class="line-numbers-wrapper"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br></div></div><h4 id="vue-set" tabindex="-1">Vue.set <a class="header-anchor" href="#vue-set" aria-hidden="true">#</a></h4><div class="language- line-numbers-mode"><span class="copy"></span><pre><code>export function set (target: Array&lt;any&gt; | Object, key: any, val: any): any {
    if (process.<wbr>env.NODE_ENV !== &#39;production&#39; &amp;&amp;
      (isUndef(target) || isPrimitive(target))
    ) {
      warn(\`Cannot set reactive property on undefined, null, or primitive value: \${(target: any)}\`)
    }
    if (Array.isArray(target) &amp;&amp; isValidArrayIndex(key)) {
      target.length = Math.max(target.length, key)
      target.splice(key, 1, val)
      return val
    }
    if (key in target &amp;&amp; !(key in Object.prototype)) {
      target[key] = val
      return val
    }
    const ob = (target: any).__ob__
    if (target._isVue || (ob &amp;&amp; ob.vmCount)) {
      process.<wbr>env.NODE_ENV !== &#39;production&#39; &amp;&amp; warn(
        &#39;Avoid adding reactive properties to a Vue instance or its root $data &#39; +
        &#39;at runtime - declare it upfront in the data option.&#39;
      )
      return val
    }
    if (!ob) {
      target[key] = val
      return val
    }
    defineReactive(ob.value, key, val)
    ob.dep.notify()
    return val
}
</code></pre><div class="line-numbers-wrapper"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br></div></div><h4 id="\u8BA1\u7B97\u5C5E\u6027" tabindex="-1">\u8BA1\u7B97\u5C5E\u6027 <a class="header-anchor" href="#\u8BA1\u7B97\u5C5E\u6027" aria-hidden="true">#</a></h4><div class="language- line-numbers-mode"><span class="copy"></span><pre><code>export function initState (vm: Component) {
    vm._watchers = []
    const opts = vm.$options
    ...\u7701\u7565
    if (opts.computed) initComputed(vm, opts.computed)
    ...\u7701\u7565
}
</code></pre><div class="line-numbers-wrapper"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><div class="language- line-numbers-mode"><span class="copy"></span><pre><code>const computedWatcherOptions = { computed: true }

function initComputed (vm: Component, computed: Object) {
    // $flow-disable-line
    const watchers = vm._computedWatchers = Object.create(null)
    // computed properties are just getters during SSR
    const isSSR = isServerRendering()
  
    for (const key in computed) {
      const userDef = computed[key]
      const getter = typeof userDef === &#39;function&#39; ? userDef : userDef.get
      if (process.<wbr>env.NODE_ENV !== &#39;production&#39; &amp;&amp; getter == null) {
        warn(
          \`Getter is missing for computed property &quot;\${key}&quot;.\`,
          vm
        )
      }
  
      if (!isSSR) {
        // create internal watcher for the computed property.
        watchers[key] = new Watcher(
          vm,
          getter || noop,
          noop,
          computedWatcherOptions
        )
      }
  
      // component-defined computed properties are already defined on the
      // component prototype. We only need to define computed properties defined
      // at instantiation here.
      if (!(key in vm)) {
        defineComputed(vm, key, userDef)
      } else if (process.<wbr>env.NODE_ENV !== &#39;production&#39;) {
        if (key in vm.$data) {
          warn(\`The computed property &quot;\${key}&quot; is already defined in data.\`, vm)
        } else if (vm.$options.props &amp;&amp; key in vm.$options.props) {
          warn(\`The computed property &quot;\${key}&quot; is already defined as a prop.\`, vm)
        }
      }
    }
}
</code></pre><div class="line-numbers-wrapper"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br></div></div><div class="language- line-numbers-mode"><span class="copy"></span><pre><code>const sharedPropertyDefinition = {
    enumerable: true,
    configurable: true,
    get: noop,
    set: noop
}

export function defineComputed (
    target: any,
    key: string,
    userDef: Object | Function
  ) {
    const shouldCache = !isServerRendering()
    if (typeof userDef === &#39;function&#39;) {
      sharedPropertyDefinition.get = shouldCache
        ? createComputedGetter(key)
        : userDef
      sharedPropertyDefinition.set = noop
    } else {
      sharedPropertyDefinition.get = userDef.get
        ? shouldCache &amp;&amp; userDef.cache !== false
          ? createComputedGetter(key)
          : userDef.get
        : noop
      sharedPropertyDefinition.set = userDef.set
        ? userDef.set
        : noop
    }
    if (process.<wbr>env.NODE_ENV !== &#39;production&#39; &amp;&amp;
        sharedPropertyDefinition.set === noop) {
      sharedPropertyDefinition.set = function () {
        warn(
          \`Computed property &quot;\${key}&quot; was assigned to but it has no setter.\`,
          this
        )
      }
    }
    Object.defineProperty(target, key, sharedPropertyDefinition)
}
</code></pre><div class="line-numbers-wrapper"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br></div></div><div class="language- line-numbers-mode"><span class="copy"></span><pre><code>function createComputedGetter (key) {
    return function computedGetter () {
      const watcher = this._computedWatchers &amp;&amp; this._computedWatchers[key]
      if (watcher) {
        watcher.depend()
        return watcher.evaluate()
      }
    }
}
</code></pre><div class="line-numbers-wrapper"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br></div></div><div class="language- line-numbers-mode"><span class="copy"></span><pre><code>export default class Watcher {
    
    constructor (
      vm: Component,
      expOrFn: string | Function,
      cb: Function,
      options?: ?Object,
      isRenderWatcher?: boolean
    ) {
      this.vm = vm
      if (isRenderWatcher) {
        vm._watcher = this
      }
      vm._watchers.push(this)
      // options
      if (options) {
        this.deep = !!options.deep
        this.user = !!options.user
        this.computed = !!options.computed
        this.sync = !!options.sync
        this.before = options.before
      } else {
        this.deep = this.user = this.computed = this.sync = false
      }
      this.cb = cb
      this.id = ++uid // uid for batching
      this.active = true
      this.dirty = this.computed // for computed watchers
      this.deps = []
      this.newDeps = []
      this.depIds = new Set()
      this.newDepIds = new Set()
      this.expression = process.<wbr>env.NODE_ENV !== &#39;production&#39;
        ? expOrFn.toString()
        : &#39;&#39;
      // parse expression for getter
      if (typeof expOrFn === &#39;function&#39;) {
        this.getter = expOrFn
      } else {
        ...\u7701\u7565
      }
      if (this.computed) {
        this.value = undefined
        this.dep = new Dep()
      } else {
        ...\u7701\u7565
      }
    }
  
    /**
     * Evaluate the getter, and re-collect dependencies.
     */
    get () {
      pushTarget(this)
      let value
      const vm = this.vm
      try {
        value = this.getter.call(vm, vm)
      } catch (e) {
        if (this.user) {
          handleError(e, vm, \`getter for watcher &quot;\${this.expression}&quot;\`)
        } else {
          throw e
        }
      } finally {
        // &quot;touch&quot; every property so they are all tracked as
        // dependencies for deep watching
        if (this.deep) {
          traverse(value)
        }
        popTarget()
        this.cleanupDeps()
      }
      return value
    }
  
  

    ...\u7701\u7565
    
  
    /**
     * Subscriber interface.
     * Will be called when a dependency changes.
     */
    update () {
      /* istanbul ignore else */
      if (this.computed) {
        // A computed property watcher has two modes: lazy and activated.
        // It initializes as lazy by default, and only becomes activated when
        // it is depended on by at least one subscriber, which is typically
        // another computed property or a component&#39;s render function.
        if (this.dep.subs.length === 0) {
          // In lazy mode, we don&#39;t want to perform computations until necessary,
          // so we simply mark the watcher as dirty. The actual computation is
          // performed just-in-time in this.evaluate() when the computed property
          // is accessed.
          this.dirty = true
        } else {
          // In activated mode, we want to proactively perform the computation
          // but only notify our subscribers when the value has indeed changed.
          this.getAndInvoke(() =&gt; {
            this.dep.notify()
          })
        }
      } else if (this.sync) {
        this.run()
      } else {
        queueWatcher(this)
      }
    }
  
    /**
     * Scheduler job interface.
     * Will be called by the scheduler.
     */
    run () {
      if (this.active) {
        this.getAndInvoke(this.cb)
      }
    }
  
    getAndInvoke (cb: Function) {
      const value = this.get()
      if (
        value !== this.value ||
        // Deep watchers and watchers on Object/Arrays should fire even
        // when the value is the same, because the value may
        // have mutated.
        isObject(value) ||
        this.deep
      ) {
        // set new value
        const oldValue = this.value
        this.value = value
        this.dirty = false
        if (this.user) {
          try {
            cb.call(this.vm, value, oldValue)
          } catch (e) {
            handleError(e, this.vm, \`callback for watcher &quot;\${this.expression}&quot;\`)
          }
        } else {
          cb.call(this.vm, value, oldValue)
        }
      }
    }
  
    /**
     * Evaluate and return the value of the watcher.
     * This only gets called for computed property watchers.
     */
    evaluate () {
      if (this.dirty) {
        this.value = this.get()
        this.dirty = false
      }
      return this.value
    }
  
    /**
     * Depend on this watcher. Only for computed property watchers.
     */
    depend () {
      if (this.dep &amp;&amp; Dep.target) {
        this.dep.depend()
      }
    }
  
    ...\u7701\u7565
}
</code></pre><div class="line-numbers-wrapper"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br><span class="line-number">48</span><br><span class="line-number">49</span><br><span class="line-number">50</span><br><span class="line-number">51</span><br><span class="line-number">52</span><br><span class="line-number">53</span><br><span class="line-number">54</span><br><span class="line-number">55</span><br><span class="line-number">56</span><br><span class="line-number">57</span><br><span class="line-number">58</span><br><span class="line-number">59</span><br><span class="line-number">60</span><br><span class="line-number">61</span><br><span class="line-number">62</span><br><span class="line-number">63</span><br><span class="line-number">64</span><br><span class="line-number">65</span><br><span class="line-number">66</span><br><span class="line-number">67</span><br><span class="line-number">68</span><br><span class="line-number">69</span><br><span class="line-number">70</span><br><span class="line-number">71</span><br><span class="line-number">72</span><br><span class="line-number">73</span><br><span class="line-number">74</span><br><span class="line-number">75</span><br><span class="line-number">76</span><br><span class="line-number">77</span><br><span class="line-number">78</span><br><span class="line-number">79</span><br><span class="line-number">80</span><br><span class="line-number">81</span><br><span class="line-number">82</span><br><span class="line-number">83</span><br><span class="line-number">84</span><br><span class="line-number">85</span><br><span class="line-number">86</span><br><span class="line-number">87</span><br><span class="line-number">88</span><br><span class="line-number">89</span><br><span class="line-number">90</span><br><span class="line-number">91</span><br><span class="line-number">92</span><br><span class="line-number">93</span><br><span class="line-number">94</span><br><span class="line-number">95</span><br><span class="line-number">96</span><br><span class="line-number">97</span><br><span class="line-number">98</span><br><span class="line-number">99</span><br><span class="line-number">100</span><br><span class="line-number">101</span><br><span class="line-number">102</span><br><span class="line-number">103</span><br><span class="line-number">104</span><br><span class="line-number">105</span><br><span class="line-number">106</span><br><span class="line-number">107</span><br><span class="line-number">108</span><br><span class="line-number">109</span><br><span class="line-number">110</span><br><span class="line-number">111</span><br><span class="line-number">112</span><br><span class="line-number">113</span><br><span class="line-number">114</span><br><span class="line-number">115</span><br><span class="line-number">116</span><br><span class="line-number">117</span><br><span class="line-number">118</span><br><span class="line-number">119</span><br><span class="line-number">120</span><br><span class="line-number">121</span><br><span class="line-number">122</span><br><span class="line-number">123</span><br><span class="line-number">124</span><br><span class="line-number">125</span><br><span class="line-number">126</span><br><span class="line-number">127</span><br><span class="line-number">128</span><br><span class="line-number">129</span><br><span class="line-number">130</span><br><span class="line-number">131</span><br><span class="line-number">132</span><br><span class="line-number">133</span><br><span class="line-number">134</span><br><span class="line-number">135</span><br><span class="line-number">136</span><br><span class="line-number">137</span><br><span class="line-number">138</span><br><span class="line-number">139</span><br><span class="line-number">140</span><br><span class="line-number">141</span><br><span class="line-number">142</span><br><span class="line-number">143</span><br><span class="line-number">144</span><br><span class="line-number">145</span><br><span class="line-number">146</span><br><span class="line-number">147</span><br><span class="line-number">148</span><br><span class="line-number">149</span><br><span class="line-number">150</span><br><span class="line-number">151</span><br><span class="line-number">152</span><br><span class="line-number">153</span><br><span class="line-number">154</span><br><span class="line-number">155</span><br><span class="line-number">156</span><br><span class="line-number">157</span><br><span class="line-number">158</span><br><span class="line-number">159</span><br><span class="line-number">160</span><br><span class="line-number">161</span><br><span class="line-number">162</span><br><span class="line-number">163</span><br><span class="line-number">164</span><br><span class="line-number">165</span><br><span class="line-number">166</span><br><span class="line-number">167</span><br><span class="line-number">168</span><br><span class="line-number">169</span><br><span class="line-number">170</span><br><span class="line-number">171</span><br></div></div><h4 id="\u4FA6\u542C\u5C5E\u6027" tabindex="-1">\u4FA6\u542C\u5C5E\u6027 <a class="header-anchor" href="#\u4FA6\u542C\u5C5E\u6027" aria-hidden="true">#</a></h4><div class="language- line-numbers-mode"><span class="copy"></span><pre><code>export function initState (vm: Component) {
  vm._watchers = []
  const opts = vm.$options
  ...\u7701\u7565
  if (opts.watch &amp;&amp; opts.watch !== nativeWatch) {
    initWatch(vm, opts.watch)
  }
}
</code></pre><div class="line-numbers-wrapper"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br></div></div><div class="language- line-numbers-mode"><span class="copy"></span><pre><code>function initWatch (vm: Component, watch: Object) {
  for (const key in watch) {
    const handler = watch[key]
    if (Array.isArray(handler)) {
      for (let i = 0; i &lt; handler.length; i++) {
        createWatcher(vm, key, handler[i])
      }
    } else {
      createWatcher(vm, key, handler)
    }
  }
}
</code></pre><div class="line-numbers-wrapper"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br></div></div><div class="language- line-numbers-mode"><span class="copy"></span><pre><code>function createWatcher (
  vm: Component,
  expOrFn: string | Function,
  handler: any,
  options?: Object
) {
  if (isPlainObject(handler)) {
    options = handler
    handler = handler.handler
  }
  if (typeof handler === &#39;string&#39;) {
    handler = vm[handler]
  }
  return vm.$watch(expOrFn, handler, options)
}
</code></pre><div class="line-numbers-wrapper"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br></div></div><div class="language- line-numbers-mode"><span class="copy"></span><pre><code>Vue.prototype.$watch = function (
    expOrFn: string | Function,
    cb: any,
    options?: Object
  ): Function {
    const vm: Component = this
    if (isPlainObject(cb)) {
      return createWatcher(vm, expOrFn, cb, options)
    }
    options = options || {}
    options.user = true
    const watcher = new Watcher(vm, expOrFn, cb, options)
    if (options.immediate) {
      cb.call(vm, watcher.value)
    }
    return function unwatchFn () {
      watcher.teardown()
    }
}
</code></pre><div class="line-numbers-wrapper"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br></div></div><div class="language- line-numbers-mode"><span class="copy"></span><pre><code>export default class Watcher {
    
    ...\u7701\u7565
  
    constructor (
      vm: Component,
      expOrFn: string | Function,
      cb: Function,
      options?: ?Object,
      isRenderWatcher?: boolean
    ) {
      this.vm = vm
      if (isRenderWatcher) {
        vm._watcher = this
      }
      vm._watchers.push(this)
      // options
      if (options) {
        this.deep = !!options.deep
        this.user = !!options.user
        this.computed = !!options.computed
        this.sync = !!options.sync
        this.before = options.before
      } else {
        this.deep = this.user = this.computed = this.sync = false
      }
      this.cb = cb
      this.id = ++uid // uid for batching
      this.active = true
      this.dirty = this.computed // for computed watchers
      this.deps = []
      this.newDeps = []
      this.depIds = new Set()
      this.newDepIds = new Set()
      this.expression = process.<wbr>env.NODE_ENV !== &#39;production&#39;
        ? expOrFn.toString()
        : &#39;&#39;
      // parse expression for getter
      if (typeof expOrFn === &#39;function&#39;) {
        this.getter = expOrFn
      } else {
        this.getter = parsePath(expOrFn)
        if (!this.getter) {
          this.getter = function () {}
          process.<wbr>env.NODE_ENV !== &#39;production&#39; &amp;&amp; warn(
            \`Failed watching path: &quot;\${expOrFn}&quot; \` +
            &#39;Watcher only accepts simple dot-delimited paths. &#39; +
            &#39;For full control, use a function instead.&#39;,
            vm
          )
        }
      }
      if (this.computed) {
        ...\u7701\u7565
      } else {
        this.value = this.get()
      }
    }
  
    /**
     * Evaluate the getter, and re-collect dependencies.
     */
    get () {
      pushTarget(this)
      let value
      const vm = this.vm
      try {
        value = this.getter.call(vm, vm)
      } catch (e) {
        if (this.user) {
          handleError(e, vm, \`getter for watcher &quot;\${this.expression}&quot;\`)
        } else {
          throw e
        }
      } finally {
        // &quot;touch&quot; every property so they are all tracked as
        // dependencies for deep watching
        if (this.deep) {
          traverse(value)
        }
        popTarget()
        this.cleanupDeps()
      }
      return value
    }
  
    ...\u7701\u7565
  
    /**
     * Subscriber interface.
     * Will be called when a dependency changes.
     */
    update () {
      /* istanbul ignore else */
      if (this.computed) {
        // A computed property watcher has two modes: lazy and activated.
        // It initializes as lazy by default, and only becomes activated when
        // it is depended on by at least one subscriber, which is typically
        // another computed property or a component&#39;s render function.
        if (this.dep.subs.length === 0) {
          // In lazy mode, we don&#39;t want to perform computations until necessary,
          // so we simply mark the watcher as dirty. The actual computation is
          // performed just-in-time in this.evaluate() when the computed property
          // is accessed.
          this.dirty = true
        } else {
          // In activated mode, we want to proactively perform the computation
          // but only notify our subscribers when the value has indeed changed.
          this.getAndInvoke(() =&gt; {
            this.dep.notify()
          })
        }
      } else if (this.sync) {
        this.run()
      } else {
        queueWatcher(this)
      }
    }
  
    /**
     * Scheduler job interface.
     * Will be called by the scheduler.
     */
    run () {
      if (this.active) {
        this.getAndInvoke(this.cb)
      }
    }
  
    getAndInvoke (cb: Function) {
      const value = this.get()
      if (
        value !== this.value ||
        // Deep watchers and watchers on Object/Arrays should fire even
        // when the value is the same, because the value may
        // have mutated.
        isObject(value) ||
        this.deep
      ) {
        // set new value
        const oldValue = this.value
        this.value = value
        this.dirty = false
        if (this.user) {
          try {
            cb.call(this.vm, value, oldValue)
          } catch (e) {
            handleError(e, this.vm, \`callback for watcher &quot;\${this.expression}&quot;\`)
          }
        } else {
          cb.call(this.vm, value, oldValue)
        }
      }
    }
  
    /**
     * Evaluate and return the value of the watcher.
     * This only gets called for computed property watchers.
     */
    evaluate () {
      if (this.dirty) {
        this.value = this.get()
        this.dirty = false
      }
      return this.value
    }
  
    /**
     * Depend on this watcher. Only for computed property watchers.
     */
    depend () {
      if (this.dep &amp;&amp; Dep.target) {
        this.dep.depend()
      }
    }
  
    /**
     * Remove self from all dependencies&#39; subscriber list.
     */
    teardown () {
      if (this.active) {
        // remove self from vm&#39;s watcher list
        // this is a somewhat expensive operation so we skip it
        // if the vm is being destroyed.
        if (!this.vm._isBeingDestroyed) {
          remove(this.vm._watchers, this)
        }
        let i = this.deps.length
        while (i--) {
          this.deps[i].removeSub(this)
        }
        this.active = false
      }
    }
}
</code></pre><div class="line-numbers-wrapper"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br><span class="line-number">48</span><br><span class="line-number">49</span><br><span class="line-number">50</span><br><span class="line-number">51</span><br><span class="line-number">52</span><br><span class="line-number">53</span><br><span class="line-number">54</span><br><span class="line-number">55</span><br><span class="line-number">56</span><br><span class="line-number">57</span><br><span class="line-number">58</span><br><span class="line-number">59</span><br><span class="line-number">60</span><br><span class="line-number">61</span><br><span class="line-number">62</span><br><span class="line-number">63</span><br><span class="line-number">64</span><br><span class="line-number">65</span><br><span class="line-number">66</span><br><span class="line-number">67</span><br><span class="line-number">68</span><br><span class="line-number">69</span><br><span class="line-number">70</span><br><span class="line-number">71</span><br><span class="line-number">72</span><br><span class="line-number">73</span><br><span class="line-number">74</span><br><span class="line-number">75</span><br><span class="line-number">76</span><br><span class="line-number">77</span><br><span class="line-number">78</span><br><span class="line-number">79</span><br><span class="line-number">80</span><br><span class="line-number">81</span><br><span class="line-number">82</span><br><span class="line-number">83</span><br><span class="line-number">84</span><br><span class="line-number">85</span><br><span class="line-number">86</span><br><span class="line-number">87</span><br><span class="line-number">88</span><br><span class="line-number">89</span><br><span class="line-number">90</span><br><span class="line-number">91</span><br><span class="line-number">92</span><br><span class="line-number">93</span><br><span class="line-number">94</span><br><span class="line-number">95</span><br><span class="line-number">96</span><br><span class="line-number">97</span><br><span class="line-number">98</span><br><span class="line-number">99</span><br><span class="line-number">100</span><br><span class="line-number">101</span><br><span class="line-number">102</span><br><span class="line-number">103</span><br><span class="line-number">104</span><br><span class="line-number">105</span><br><span class="line-number">106</span><br><span class="line-number">107</span><br><span class="line-number">108</span><br><span class="line-number">109</span><br><span class="line-number">110</span><br><span class="line-number">111</span><br><span class="line-number">112</span><br><span class="line-number">113</span><br><span class="line-number">114</span><br><span class="line-number">115</span><br><span class="line-number">116</span><br><span class="line-number">117</span><br><span class="line-number">118</span><br><span class="line-number">119</span><br><span class="line-number">120</span><br><span class="line-number">121</span><br><span class="line-number">122</span><br><span class="line-number">123</span><br><span class="line-number">124</span><br><span class="line-number">125</span><br><span class="line-number">126</span><br><span class="line-number">127</span><br><span class="line-number">128</span><br><span class="line-number">129</span><br><span class="line-number">130</span><br><span class="line-number">131</span><br><span class="line-number">132</span><br><span class="line-number">133</span><br><span class="line-number">134</span><br><span class="line-number">135</span><br><span class="line-number">136</span><br><span class="line-number">137</span><br><span class="line-number">138</span><br><span class="line-number">139</span><br><span class="line-number">140</span><br><span class="line-number">141</span><br><span class="line-number">142</span><br><span class="line-number">143</span><br><span class="line-number">144</span><br><span class="line-number">145</span><br><span class="line-number">146</span><br><span class="line-number">147</span><br><span class="line-number">148</span><br><span class="line-number">149</span><br><span class="line-number">150</span><br><span class="line-number">151</span><br><span class="line-number">152</span><br><span class="line-number">153</span><br><span class="line-number">154</span><br><span class="line-number">155</span><br><span class="line-number">156</span><br><span class="line-number">157</span><br><span class="line-number">158</span><br><span class="line-number">159</span><br><span class="line-number">160</span><br><span class="line-number">161</span><br><span class="line-number">162</span><br><span class="line-number">163</span><br><span class="line-number">164</span><br><span class="line-number">165</span><br><span class="line-number">166</span><br><span class="line-number">167</span><br><span class="line-number">168</span><br><span class="line-number">169</span><br><span class="line-number">170</span><br><span class="line-number">171</span><br><span class="line-number">172</span><br><span class="line-number">173</span><br><span class="line-number">174</span><br><span class="line-number">175</span><br><span class="line-number">176</span><br><span class="line-number">177</span><br><span class="line-number">178</span><br><span class="line-number">179</span><br><span class="line-number">180</span><br><span class="line-number">181</span><br><span class="line-number">182</span><br><span class="line-number">183</span><br><span class="line-number">184</span><br><span class="line-number">185</span><br><span class="line-number">186</span><br><span class="line-number">187</span><br><span class="line-number">188</span><br><span class="line-number">189</span><br><span class="line-number">190</span><br><span class="line-number">191</span><br><span class="line-number">192</span><br><span class="line-number">193</span><br><span class="line-number">194</span><br><span class="line-number">195</span><br></div></div><div class="language- line-numbers-mode"><span class="copy"></span><pre><code>const bailRE = /[^\\w.$]/
export function parsePath (path: string): any {
  if (bailRE.test(path)) {
    return
  }
  const segments = path.split(&#39;.&#39;)
  return function (obj) {
    for (let i = 0; i &lt; segments.length; i++) {
      if (!obj) return
      obj = obj[segments[i]]
    }
    return obj
  }
}
</code></pre><div class="line-numbers-wrapper"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br></div></div><h4 id="\u7EC4\u4EF6\u66F4\u65B0" tabindex="-1">\u7EC4\u4EF6\u66F4\u65B0 <a class="header-anchor" href="#\u7EC4\u4EF6\u66F4\u65B0" aria-hidden="true">#</a></h4><div class="language- line-numbers-mode"><span class="copy"></span><pre><code>export function mountComponent (
    vm: Component,
    el: ?Element,
    hydrating?: boolean
  ): Component {
    ...\u7701\u7565
    if (process.<wbr>env.NODE_ENV !== &#39;production&#39; &amp;&amp; config.performance &amp;&amp; mark) {
      ...\u7701\u7565
    } else {
      updateComponent = () =&gt; {
        vm._update(vm._render(), hydrating)
      }
    }
  
    // we set this to vm._watcher inside the watcher&#39;s constructor
    // since the watcher&#39;s initial patch may call $forceUpdate (e.g. inside child
    // component&#39;s mounted hook), which relies on vm._watcher being already defined
    new Watcher(vm, updateComponent, noop, {
      before () {
        if (vm._isMounted) {
          callHook(vm, &#39;beforeUpdate&#39;)
        }
      }
    }, true /* isRenderWatcher */)

    ...\u7701\u7565
}
</code></pre><div class="line-numbers-wrapper"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br></div></div><div class="language- line-numbers-mode"><span class="copy"></span><pre><code>Vue.prototype._update = function (vnode: VNode, hydrating?: boolean) {
    const vm: Component = this
    const prevEl = vm.$el
    const prevVnode = vm._vnode
    const prevActiveInstance = activeInstance
    activeInstance = vm
    vm._vnode = vnode
    // Vue.prototype.__patch__ is injected in entry points
    // based on the rendering backend used.
    if (!prevVnode) {
      ...\u7701\u7565
    } else {
      // updates
      vm.$el = vm.__patch__(prevVnode, vnode)
    }
    ...\u7701\u7565
}
</code></pre><div class="line-numbers-wrapper"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br></div></div><div class="language- line-numbers-mode"><span class="copy"></span><pre><code>export function createPatchFunction (backend) {

    ...\u7701\u7565

    function isPatchable (vnode) {
        while (vnode.componentInstance) {
            vnode = vnode.componentInstance._vnode
        }
        return isDef(vnode.tag)
    }


    function patchVnode (oldVnode, vnode, insertedVnodeQueue, removeOnly) {
        if (oldVnode === vnode) {
          return
        }
    
        const elm = vnode.elm = oldVnode.elm
    
        ...\u7701\u7565
    
        let i
        const data = vnode.data
        if (isDef(data) &amp;&amp; isDef(i = data.hook) &amp;&amp; isDef(i = i.prepatch)) {
          i(oldVnode, vnode)
        }
    
        const oldCh = oldVnode.children
        const ch = vnode.children
        if (isDef(data) &amp;&amp; isPatchable(vnode)) {
          for (i = 0; i &lt; cbs.update.length; ++i) cbs.update[i](oldVnode, vnode)
          if (isDef(i = data.hook) &amp;&amp; isDef(i = i.update)) i(oldVnode, vnode)
        }
        if (isUndef(vnode.text)) {
          if (isDef(oldCh) &amp;&amp; isDef(ch)) {
            if (oldCh !== ch) updateChildren(elm, oldCh, ch, insertedVnodeQueue, removeOnly)
          } else if (isDef(ch)) {
            if (isDef(oldVnode.text)) nodeOps.setTextContent(elm, &#39;&#39;)
            addVnodes(elm, null, ch, 0, ch.length - 1, insertedVnodeQueue)
          } else if (isDef(oldCh)) {
            removeVnodes(elm, oldCh, 0, oldCh.length - 1)
          } else if (isDef(oldVnode.text)) {
            nodeOps.setTextContent(elm, &#39;&#39;)
          }
        } else if (oldVnode.text !== vnode.text) {
          nodeOps.setTextContent(elm, vnode.text)
        }
        if (isDef(data)) {
          if (isDef(i = data.hook) &amp;&amp; isDef(i = i.postpatch)) i(oldVnode, vnode)
        }
    }
    
    ...\u7701\u7565
  
    return function patch (oldVnode, vnode, hydrating, removeOnly) {
      if (isUndef(vnode)) {
        if (isDef(oldVnode)) invokeDestroyHook(oldVnode)
        return
      }
  
      let isInitialPatch = false
      const insertedVnodeQueue = []
  
      if (isUndef(oldVnode)) {
        ...\u7701\u7565
      } else {
        const isRealElement = isDef(oldVnode.nodeType)
        if (!isRealElement &amp;&amp; sameVnode(oldVnode, vnode)) {
          // patch existing root node
          patchVnode(oldVnode, vnode, insertedVnodeQueue, removeOnly)
        } else {
          
          ...\u7701\u7565
  
          // replacing existing element
          const oldElm = oldVnode.elm
          const parentElm = nodeOps.parentNode(oldElm)
  
          // create new node
          createElm(
            vnode,
            insertedVnodeQueue,
            // extremely rare edge case: do not insert if old element is in a
            // leaving transition. Only happens when combining transition +
            // keep-alive + HOCs. (#4590)
            oldElm._leaveCb ? null : parentElm,
            nodeOps.nextSibling(oldElm)
          )
  
          // update parent placeholder node element, recursively
          if (isDef(vnode.parent)) {
            let ancestor = vnode.parent
            const patchable = isPatchable(vnode)
            while (ancestor) {
              for (let i = 0; i &lt; cbs.destroy.length; ++i) {
                cbs.destroy[i](ancestor)
              }
              ancestor.elm = vnode.elm
              if (patchable) {
                for (let i = 0; i &lt; cbs.create.length; ++i) {
                  cbs.create[i](emptyNode, ancestor)
                }
                // #6513
                // invoke insert hooks that may have been merged by create hooks.
                // e.g. for directives that uses the &quot;inserted&quot; hook.
                const insert = ancestor.data.hook.insert
                if (insert.merged) {
                  // start at index 1 to avoid re-invoking component mounted hook
                  for (let i = 1; i &lt; insert.fns.length; i++) {
                    insert.fns[i]()
                  }
                }
              } else {
                registerRef(ancestor)
              }
              ancestor = ancestor.parent
            }
          }
  
          // destroy old node
          if (isDef(parentElm)) {
            removeVnodes(parentElm, [oldVnode], 0, 0)
          } else if (isDef(oldVnode.tag)) {
            invokeDestroyHook(oldVnode)
          }
        }
      }
  
      invokeInsertHook(vnode, insertedVnodeQueue, isInitialPatch)
      return vnode.elm
    }
}
</code></pre><div class="line-numbers-wrapper"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br><span class="line-number">48</span><br><span class="line-number">49</span><br><span class="line-number">50</span><br><span class="line-number">51</span><br><span class="line-number">52</span><br><span class="line-number">53</span><br><span class="line-number">54</span><br><span class="line-number">55</span><br><span class="line-number">56</span><br><span class="line-number">57</span><br><span class="line-number">58</span><br><span class="line-number">59</span><br><span class="line-number">60</span><br><span class="line-number">61</span><br><span class="line-number">62</span><br><span class="line-number">63</span><br><span class="line-number">64</span><br><span class="line-number">65</span><br><span class="line-number">66</span><br><span class="line-number">67</span><br><span class="line-number">68</span><br><span class="line-number">69</span><br><span class="line-number">70</span><br><span class="line-number">71</span><br><span class="line-number">72</span><br><span class="line-number">73</span><br><span class="line-number">74</span><br><span class="line-number">75</span><br><span class="line-number">76</span><br><span class="line-number">77</span><br><span class="line-number">78</span><br><span class="line-number">79</span><br><span class="line-number">80</span><br><span class="line-number">81</span><br><span class="line-number">82</span><br><span class="line-number">83</span><br><span class="line-number">84</span><br><span class="line-number">85</span><br><span class="line-number">86</span><br><span class="line-number">87</span><br><span class="line-number">88</span><br><span class="line-number">89</span><br><span class="line-number">90</span><br><span class="line-number">91</span><br><span class="line-number">92</span><br><span class="line-number">93</span><br><span class="line-number">94</span><br><span class="line-number">95</span><br><span class="line-number">96</span><br><span class="line-number">97</span><br><span class="line-number">98</span><br><span class="line-number">99</span><br><span class="line-number">100</span><br><span class="line-number">101</span><br><span class="line-number">102</span><br><span class="line-number">103</span><br><span class="line-number">104</span><br><span class="line-number">105</span><br><span class="line-number">106</span><br><span class="line-number">107</span><br><span class="line-number">108</span><br><span class="line-number">109</span><br><span class="line-number">110</span><br><span class="line-number">111</span><br><span class="line-number">112</span><br><span class="line-number">113</span><br><span class="line-number">114</span><br><span class="line-number">115</span><br><span class="line-number">116</span><br><span class="line-number">117</span><br><span class="line-number">118</span><br><span class="line-number">119</span><br><span class="line-number">120</span><br><span class="line-number">121</span><br><span class="line-number">122</span><br><span class="line-number">123</span><br><span class="line-number">124</span><br><span class="line-number">125</span><br><span class="line-number">126</span><br><span class="line-number">127</span><br><span class="line-number">128</span><br><span class="line-number">129</span><br><span class="line-number">130</span><br><span class="line-number">131</span><br><span class="line-number">132</span><br></div></div><div class="language- line-numbers-mode"><span class="copy"></span><pre><code>function sameVnode (a, b) {
  return (
    a.key === b.key &amp;&amp; (
      (
        a.tag === b.tag &amp;&amp;
        a.isComment === b.isComment &amp;&amp;
        isDef(a.data) === isDef(b.data) &amp;&amp;
        sameInputType(a, b)
      ) || (
        isTrue(a.isAsyncPlaceholder) &amp;&amp;
        a.asyncFactory === b.asyncFactory &amp;&amp;
        isUndef(b.asyncFactory.error)
      )
    )
  )
}
</code></pre><div class="line-numbers-wrapper"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br></div></div><div class="language- line-numbers-mode"><span class="copy"></span><pre><code>const componentVNodeHooks = {
  
  ...\u7701\u7565

  prepatch (oldVnode: MountedComponentVNode, vnode: MountedComponentVNode) {
    const options = vnode.componentOptions
    const child = vnode.componentInstance = oldVnode.componentInstance
    updateChildComponent(
      child,
      options.propsData, // updated props
      options.listeners, // updated listeners
      vnode, // new parent vnode
      options.children // new children
    )
  },

  ...\u7701\u7565
  
}
</code></pre><div class="line-numbers-wrapper"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br></div></div>`,116),l=[p];function b(i,c,u,m,t,o){return s(),e("div",null,l)}var v=n(r,[["render",b]]);export{h as __pageData,v as default};
