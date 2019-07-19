
# Hooks: `useEffect`

In this section, we'll cover another commonly-used hook: `useEffect`. You'll use it to do things similar to what you would with `componentDidMount` and `componentWillUnmount`. Things like:

 - Starting API calls, and updating the state on their completion
 - Starting intervals or timers with `setInterval` and `setTimeout`, and cleaning them up(`clearInterval`, `clearTimeout`) before the component unmounts.

## UseEffect Demo

## Lab 1

In this lab, we will refactor the `SearchResults` component in this repo to use hooks. This component:


1. Stores `loading` and `results` in its state
2. When the component mounts, calls the `fetchResults` method
3. When the component receives new props, it calls the `fetchResults` method again - but only when the `searchTerm` or `searchType` props have changed
4. (fetchResults)
  - If a previous `timeoutId` exists, clears it so it doesn't make an API request with outdated props.
  - If the search term is empty, return early (don't run the search)
  - If we're about to run a search, set `loading` to `true`
  - Starting a timeout of 500ms, and saving that `timeoutId` to a variable, so it can be cleared (canceled) when the component unmounts
  - After the 500ms, calls `fetch` to get the results
  - After getting the results, saves that data to `results`
5. (componentWillUnmount)
  - Clears the timeout

Your goal is to replace this Class component with a Function component that utilizes hooks to do all of the above. Like before, we'll be able to copy + paste some of the logic.


### ✅ Step 1: Set up the initial `loading` and `results` state.

- Create a new Function component named `SearchResults`. Rename the class component to something else so it doesn't conflict - we will remove it when we're done.
 - Have it `return null` for now.
 - Use `React.useState` to initialize `loading` as `false`, and `results` as an empty array.


### ✅ Step 2: Set up `useEffect`.

- Add a new call to `useEffect`:

```js
useEffect(() => {
  console.log('running use effect')
  console.log(props)
})
```

🔎 In the browser, watch the console as you type in search results. You should see the console log out that message and the props each time.

- Within `useEffect`, call one of your state updater functions:

```js
useEffect(() => {
  console.log('running use effect')
  console.log(props)
  setLoading(true)
})
```

🔎 Take a look in the browser - React will complain that it is rendering in an infinite loop! 🤯  To fix this, we need to tell `useEffect` which variables to watch. When these variables change, it will run again.

🤔 Taking a look at this line in what our component does:

> 3. When the component receives new props, it calls the `fetchResults` method again - but only when the `searchTerm` or `searchType` props have changed

Ok, so we only want to run this `useEffect` when the `searchTerm` or `searchType` values have changed.

- Add the second argument to `useEffect` - an array that contains both `searchTerm` and `searchType` (the order doesn't matter):

```js
useEffect(() => {
  console.log('running use effect')
  console.log(props)
  setLoading(true)
}, [searchType, searchTerm])
```

🔎 Back in the browser, type in some new search results, or switch the search type. You should see your console logging out only as the props change: we've fixed the infinite loop.


### ✅ Step 3: Make the API call

We'll skip the `setTimeout` business for now, and jump right into making the API call. This step is going to be pretty easy! We'll cover these parts of the process:

4. (fetchResults)
  - (skipping this) ~If a previous `timeoutId` exists, clears it so it doesn't make an API request with outdated props.~
  - If the search term is empty, return early (don't run the search)
  - If we're about to run a search, set `loading` to `true`
  - (skipping this) ~Starting a timeout of 500ms, and saving that `timeoutId` to a variable, so it can be cleared (canceled) when the component unmounts~
  - (skipping this) ~After the 500ms, calls `fetch` to get the results~
  - After getting the results, saves that data to `results`

