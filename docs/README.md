# React Hooks

## Table of Contents

1. [`useState`](useState.md)
2. [`useEffect`](useEffect.md)
3. [`useContext`](useContext.md)
4. [`useReducer`](useReducer.md)
5. [custom hooks](customHooks.md)

# Intro to Hooks

Before hooks, all state needed to be within a Class component. Class components come with a lot of boilerplate, which can feel bulky, especially when dealing with a simpler state. Function components, on the other hand, are generally simpler and easier to read - but, until recently, could not manage their own state: they would receive some props, and return some JSX based on those props.

Hooks introduce state management to Function components, using a simpler and more flexible API. Here's an example of a Class component refactored to be a Function component with hooks:

```js
class Counter extends React.Component {
  state = {
    count: 0
  }

  increment = () => {
    this.setState({
      count: this.state.count + 1
    })
  }

  decrement = () => {
    this.setState({
      count: this.state.count + 1
    })
  }

  render() {
    return (
      <div>
        <span>Current Count: ${this.state.count}</span>
        <button onClick={this.increment}>+</button>
        <button onClick={this.decrement}>-</button>
      </div>
    )
  }
}
```

Becomes:

```js
function Counter() {
  const [count, setCount] = React.useState(0)

  const increment = () => setCount(count + 1)
  const decrement = () => setCount(count - 1)

  return (
    <div>
      <span>Current Count: ${count}</span>
      <button onClick={increment}>+</button>
      <button onClick={decrement}>-</button>
    </div>
  )
}
```

`useState` is the first of the hooks we'll look at.

There are a few things to remember while working with hooks. We'll cover these throughout the lessons in this repo:

1. Hooks can only be called within React Function components, or within custom hooks.
2. Just like Class components, Function components re-render any time their props or state changes. With hooks, this means that any update to a `useState` or `useReducer` hook will call a re-render.
3. Hooks must always be rendered in the same order each time the function is called - meaning, on every re-render. This means you can't use conditional logic to apply different hooks, or return early and avoid calling later hooks.
4. The names for all built-in hooks start with `use`. When writing custom hooks, it's suggested that you follow this pattern - but you don't need to.
5. Hook components can do anything a Class component can do - but the logic behind it is different. Class components are not going away, and in some cases - such as when your state & logic gets more complicated - can be a better choice.

# Resources

[📜 Official React Docs: Hooks at a Glance](https://reactjs.org/docs/hooks-overview.html)
[📜 Official React Docs: Hooks API Reference](https://reactjs.org/docs/hooks-reference.html)
