
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
6. (isBookmarked) a simple function that looks at the `searchType` and `bookmarks` props to see if a search result has been bookmarked or not. (this gets called in the render method)
7. Renders out UI based on the state.

Your goal is to replace this Class component with a Function component that utilizes hooks to do all of the above. Like before, we'll be able to copy + paste some of the logic.


### ✅ Step 1: Set up the initial `loading` and `results` state.

- At the top of your file, import `useEffect` and `useState` along with React:

```js
import React, { useState, useEffect } from 'react'
```

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

- At the very top of your component, add:

```js
const { searchTerm, searchType, bookmarks } = props
```

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
   - 👉 If the search term is empty, return early (don't run the search)
   - 👉 If we're about to run a search, set `loading` to `true`
   - (skipping this) ~Starting a timeout of 500ms, and saving that `timeoutId` to a variable, so it can be cleared (canceled) when the component unmounts~
   - 👉 (skipping some of this) ~After the 500ms~, calls `fetch` to get the results
   - 👉 After getting the results, saves that data to `results`

First on the list:

> - If the search term is empty, return early (don't run the search)

 - Within your `useEffect`, return early if the search term is an empty string: `if (searchTerm.length === 0) return`

> - If we're about to run a search, set `loading` to `true`

- On the next line, set the loading state to `true`

> - calls `fetch` to get the results 

- Next, copy in the `fetch` functionality from the class component. The only thing you will need to change is how you update your state - replace `this.setState` with two calls to your state updater functions
- Add a `console.log` to see the response from the API
 
🔎 Back in the browser, enter a search term. (It will run a search with each keypress, so do a small search like 'ab'). Look in your console - you should see it log out the results for each search

### ✅ Step 4: Re-implement the timeout

Now, we'll cover the parts of the last step that we skipped:


4. (fetchResults)
   - 👉 If a previous `timeoutId` exists, clears it so it doesn't make an API request with outdated props.
   - (completed) ~If the search term is empty, return early (don't run the search)~
   - (completed) ~If we're about to run a search, set `loading` to `true`~
   - 👉 Starting a timeout of 500ms, and saving that `timeoutId` to a variable, so it can be cleared (canceled) when the component unmounts
   - 👉  After the 500ms, (completed) ~calls `fetch` to get the results~
   - (completed) ~After getting the results, saves that data to `results`~

We'll start with these lines:

> - 👉 Starting a timeout of 500ms, and saving that `timeoutId` to a variable, so it can be cleared (canceled) when the component unmounts
> - 👉  After the 500ms, (completed) ~calls `fetch` to get the results~

- Wrap your `fetch` logic within a `setTimeout`, just like it is in the Class component. Instead of saving the id to `this.fetchTimeout`, save it to a normal variable:

```js
const timeoutId = setTimeout(() => { /* fetch stuff */ }, 500)`
```

Last on the list:
> - 👉 If a previous `timeoutId` exists, clears it so it doesn't make an API request with outdated props.

The logic for all of this is going to be a little different. Remember that we can return a 'cleanup' function - and now that we have a `timeoutId`, we can call `clearTimeout` to prevent early fetches.

- At the end of `useEffect`, return a function that clears the timeout. 

```js
return () => clearTimeout(timeoutId)
```

Your whole `useEffect` should now look something like this:

```js
useEffect(() => {
  setLoading(true)
  const timeoutId = setTimeout(() => {
    fetch(
      `https://api.github.com/search/${searchType}?q=${searchTerm}`,
    )
      .then(r => r.json())
      .then(response => {
	const results = response.items
        console.log(results)
        setLoading(false)
        setResults(results)
    })
  }, 500)
}, [searchType, searchTerm])
```

🔎 Back in the browser, start typing some search results. You should see updated results in the console - but only after you have finished typing.


### ✅ Step 6: Re-implement the render

There are two last thing last things to cover:

> 6. (isBookmarked) a simple function that looks at the `searchType` and `bookmarks` props to see if a search result has been bookmarked or not. (this gets called in the render method)
> 7. Renders out UI based on the state.

To get this function working:

 - Copy and paste it from the class component right into the body of your Function component (Doesn't matter where).
 - Delete the first line in this function - we already have `searchType` and `bookmarks` available from the top of the function.


So far, we have just been returning `null`. We'll render the same UI.

- Copy over the contents of the Class component's `render` method, except for the first two lines (we have all of these variables available to us already)
- Return the same JSX. The only line you will need to change is:

```
/* from */
isBookmarked={this.isBookmarked(result)}
/*  👇  */
/*  to  */
isBookmarked={isBookmarked(result)}
```

🔎 Back in the browser - enter some search terms. You should now see everything working as before! 
