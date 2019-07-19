# Hooks: `useState`

In this section, we'll cover the simplest hook, `useState`, and how it can be used to do the same things as a Class component's `this.setState`.

To get started, we'll dive into the counter example from the main Readme, going through it line-by-line.

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


### Tuples

```js
const [count, setCount] = React.useState(0)
```

The first thing we notice here is the `const [count, setCount] = ...`. If this syntax is unfamiliar, we are simply using [ES6 Array Destructuring](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment). `useState` returns an array with two items: the first is the value of the state, and the second is a function you can use to update that state, triggering a re-render. The above could be rewritten as:

```js
const countState = React.useState(0)
const count = countState[0]
const setCount = countState[1]
```

Typically, we use arrays for storing a list of values. We often don't know what the length of that array will be. In this case, we know that `useState` will *always return an array of two items*, the first being the state, and the second being the updating function.


When an array is used this way, it is known as a `tuple`. A tuple is an array of a fixed length, with each entry in the array representing a particular value. Tuples are not often used within the JS community, but React Hooks have introduced them, and you'll likely be seeing them used in more and more libraries moving forward. The important thing to remember that _a tuple is just an array_. 

Here's an example of an address as both an object and as a tuple:

```js
const addressObject = {
  line1: '123 Sesame Street',
  line2: 'Unit ABC',
  city: 'New York',
  state: 'NY',
  zip: '10001'
}

const addressTuple = [
  '123 Sesame Street',
  'Unit ABC',
  'New York',
  'NY',
  '10001'
]
```

Often, it makes more sense to use an object to represent data, because the keys describe what that value is. With Tuples, developers need to know & remember what each entry in the tuple is. For example, would you rather come across `address[3]` or `address.state` when reading through code? Often, objects make the most sense. But, in combination with  ES6 Array Destructuring, tuples have one advantage - we can easily assign each value to a variable of whatever name we choose.

For our address example, a tuple might be handy if we are working with various APIs that use different variable names. Maybe we are submitting the address to an api that uses all-uppercase properties - in that case, we could do something like this:

```js
const [LINE_1, LINE_2, CITY, STATE, ZIP] = address

api.updateAddress({ LINE_1, LINE_2, CITY, STATE, ZIP })
```


When working with `useState`, this means we can assign the state and and our updater function to whatever we choose:

```js
const [username, setUsername] = React.useState('joseph')
const [zipCode, setZipCode] = React.useState(90065)
```


## Initial State

Back to this line:

```js
const [count, setCount] = React.useState(0)
```

We see that we call `React.useState` with a value of `0`. This argument is the initial state - in this example, `count` will be assigned to `0`.


## Calling the update function

Moving on to the next two lines:

```js
  const increment = () => setCount(count + 1)
  const decrement = () => setCount(count - 1)
```

Here, we are creating two new functions that will call `setCount`. These functions are then assigned to the buttons as handlers:

```js
  return (
    <div>
      <span>Current Count: ${count}</span>
      <button onClick={increment}>+</button>
      <button onClick={decrement}>-</button>
    </div>
  )
```

When we click the `+` button, the `increment` function is called, which executes `setCount(count + 1)`. When `setCount` has been called, the component will re-render, and our `count` will have been increased by one:

```js
const [count, setCount] = React.useState(0) /* same as before, except useState will return an updated count */
```

So, when an update function is called, *the new state will be whatever was supplied to that function*. This sounds pretty straightforward (and it is!) - but this works a little differently from Class components. Keep this in the back of your mind during the exercise, and we'll cover it in the next section.

### 🏋️‍♂️Exercise 1: Clicker Hook

1. Open up a new Codesandbox, and replace the default App component with the Counter above. (Type it out by hand!)
2. Play with the initial state
3. (bonus) Prevent the count from going below 0 or above 10.
4. (bonus) Disable the `+` button when the count is 10, and the `-` button when the count is 0. (hint: you can disable a button HTML element with the `disabled` prop: `<button disabled={true}>...</button>`)

## Multiple Hooks & Multiple pieces of state 

Ok, let's beef up our Counter component. In addition to tracking the `count`, we want to add a controlled text input, and keep track of that value in the state.

💡 *This is an example of one of the key ways that Hooks work differently from Class components*

In a class component, we could do this:

```js
class Counter extends React.Component {
  state = {
    count: 0
    inputValue: ''
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

  onInputChange = (e) => {
    this.setState({
      inputValue: e.target.value
    })
  }

  render() {
    return (
      <div>
        <span>Current Count: ${this.state.count}</span>
        <button onClick={this.increment}>+</button>
        <button onClick={this.decrement}>-</button>
        <input value={this.state.inputValue} />
      </div>
    )
  }
}
```

Let's take a quick look at one of these handlers:

```js
this.setState({
  inputValue: e.target.value
})
```

We set the state with an updated `inputValue`. The component re-renders, and, assuming we hadn't clicked anything our new state is:

```
{
  count: 0,
  inputValue: 'a'
}
```

Notice that **we didn't include the `count` in our call to `this.setState`**. But, it was included in the next render. This is because a class component's `setState` performs a *shallow merge*, updating only the properties of the `state` object that are included in the argument.

*React hooks do this differently*: The updated state is not merged, but replaced completely. So, if we were to rewrite this class component like this:


```js
function Counter() {
  const [counterState, setCounterState] = React.useState({
    count: 0,
    inputValue: ''
  })

  const increment = () => setCounterState({ count: counterState.count + 1 })
  const decrement = () => setCounterState({ count: counterState.count - 1 })
  const handleChange = (e) => setCounterState({ inputValue: e.target.value })

  return (
    <div>
      <span>Current Count: ${counterState.count}</span>
      <button onClick={increment}>+</button>
      <button onClick={decrement}>-</button>
      <input onChange={handleChange} value={counterState.inputValue} />
    </div>
  )
}
```

When we call the `increment` function, our component will re-render, and our `counterState` will now look like:


```js
{
  count: 1
}
```

The `inputValue` is no longer on the state! You *could* merge in the existing state each time you call `setCounterState`, like so:

```js
const increment = () => setCounterState({
  ...counterState,                 // spread in the existing state
  count: counterState.count + 1    // update the count, overwriting the existing count
})
```

But, this will quickly become cumbersome as we add more pieces of state. Later, we'll use the `useReducer` hook to handle more complicated state. But in this case, we can simply call `useState` twice: once for our count, and once for our input value:

```js
function Counter() {
  const [count, setCount] = React.useState(0)
  const [inputValue, setInputValue] = React.useState('')

  const increment = () => setCount(count + 1)
  const decrement = () => setCount(count - 1)
  const handleChange = (e) => setInputValue(e.target.value)

  return (
    <div>
      <span>Current Count: ${count}</span>
      <button onClick={increment}>+</button>
      <button onClick={decrement}>-</button>
      <input onChange={handleChange} value={inputValue} />
    </div>
  )
}
```

Much simpler! 👏

We can call `useState` as many times as we need.

### Exercise 2: More State

1. Back in your Codesandbox, add a controlled input that is handled by its own `useState`


## Lab 1

#### Setup

 - If you haven't already, clone this repo (https://git.generalassemb.ly/good-idea/hooks-tutorial), `cd` into it, and `npm install`
 - Next, run `git fetch` to retreive the list of remote branches.
 - Run `git branch --all` - within the output, you should see a list that includes `remotes/origin/activity-one`, `-two`, etc.
 - Then, `git checkout -b activity-one`. This will create a new branch in your local repo that matches the remote `activity-one` branch.
 - Finally, `npm run start` - your browser should open to http://localhost:3000, and you should see a `useState` item in the nav bar.

- Look in `HookDemos/UseStateDemo` to see the component rendered at the `useState` route.
- We'll be refactoring `Search/Search.js`

In this lab, we will refactor the `Search` component in this repo to use hooks. This component is responsible for:

1. Keeping track of the current search type (`repositories` or `users`)
2. Keeping track of the current search term
3. Passing those pieces of state, as well as some bookmarking props, to the `<SearchResults />` component.

Your goal is to replace this Class component with a Function component that utilizes hooks to do all of the above. Some hints:

- The JSX you return will be *mostly* the same - remember to replace all usage of `this.props` with just `props`
- Use `useState` twice, once for the search term, and once for the search type.
- Implement the same functionality as `this.updateSearchTerm` and `this.setSearchType` using normal functions, delcared within your component.
 - If you're not comfortable with the 'function that returns a function' syntax, you can break `setSearchType` into two different functions, i.e. `setTypeToRepository` or `setTypeToUser`


## Summary

That's it for `useState`! It's super simple, and great for tracking basic pieces of your state. It's a little different from `this.setState`, but can be used to do the same things.

Next up: [`useEffect`](useEffect.md)

