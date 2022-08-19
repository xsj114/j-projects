[[toc]]

# Hello VitePress


## j-http-code

## j-is

::: info
This is an info box.
:::

::: tip
This is a tip.
:::

::: warning
This is a warning.
:::

::: danger
This is a dangerous warning.
:::

::: details
This is a details block.
:::

::: danger STOP
Danger zone, do not proceed
:::

::: details Click me to view the code
```js
console.log('Hello, VitePress!')
```
:::

```js
export default {
  name: 'MyComponent',
  // ...
}
```

```html
<ul>
  <li v-for="todo in todos" :key="todo.id">
    {{ todo.text }}
  </li>
</ul>
```


```js{4}
export default {
  data () {
    return {
      msg: 'Highlighted!'
    }
  }
}
```
