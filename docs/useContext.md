# Hooks: `useContext`

In this section, we'll cover `useContext`. This hook can be used to easily *consume* context - it doesn't change anything about how you create your Providers. Instead of wrapping our components in `<MyContextConsumer>` components, like this:

```js
import React from 'react'
import { MyContextConsumer } from '../Providers/MyProvider'

function MyComponent(props) {
  /* your component */
}

function Wrapper(props) {
  return (
    <MyContextConsumer>
      {(contextProps) => <MyComponent {...props} {...contextProps} />}
    </MyContextConsumer>
  )
}

export default Wrapper
```

We can use the `useContext` hook:

```js
import React from 'react'
import { MyContext } from '../Providers/MyProvider'

function MyComponent(props) {
  const contextProps = React.useContext(MyContext)
  /* your component */
}

export default MyComponent
```

And... That's about all there is to it! Note one change, on line 2:

```js
import { MyContext } from '../Providers/MyProvider'
```

Here, we are importing the actual Context object returned by `React.createContext()`. This means that we need to export it in our Provider component:

```js

// from
const MyContext = React.createContext()
export const MyConsumer = MyContext.Consumer

// to
export const MyContext = React.createContext()
export const MyConsumer = MyContext.Consumer
```

## `useMyContext` custom hook

We'll get more into custom hooks in a later lesson, but for now, we can write a simple one that can help you and your collaborators have better feedback when using the hook improperly.

Let's say that we have a "Clicker" context, and are consuming it in a simple `<Incrementer />` component:

```js
import React from 'react'
import { MyContext } from '../Providers/MyProvider'

function Incrementer(props) {
  const { count, increaseCount } = useContext(MyClickerContext)
  
  return (
    <div>
      <p>Current Count: {count}</p>
      <button onClick={increaseCount}>Increase</button>
    </div>
  )
}

export default Incrementer
```

This component will do everything we need it to. But, if we forget to wrap our app in a `<MyClickerProvider>`, we will see an error that looks something like:

```
Failed to compile
./src/Components/Incrementer.js
  Line 10:  'increaseCount' is not defined  no-undef

Search for the keywords to learn more about each error.
This error occurred during the build time and cannot be dismissed.
```

In the console, you'd see something like:

```
Uncaught TypeError: Cannot read property 'increaseCount' of undefined
```

If you were the developer who created the Clicker Context & Provider, you might be able to guess that the problem is that you didn't include the Provider at the top of the tree. But, to another developer, the cause of the problem is not very clear from the error message. To make this whole experience smoother, we can **fail fast** by throwing a custom error.

### Failing Fast

Our (hypothetical) MyClickerProvider.js file looks like this:

```js
import React from 'react'

export const ClickerContext = React.createContext()
export const MyConsumer = ClickerContext.Consumer

const MyClickerProvider = (props) => {
  const [count, setCount] = React.useState(0)
  
  function increaseCount() {
    setCount(count + 1)
  }
  
  return (
    <ClickerContext.Provider value={value}>
      {children}
    </ClickerContext.Provider>
  )
}
```

Instead of exporting `MyContext` (so other components can import it and use `useContext(MyContext)`), we can create a "custom hook". It's worth noting that **a custom hook is just a function**. Within it, we can use other hooks. We will create a custom hook called `useCounter` that:

 - Returns the context value, if available
 - Otherwise, throws an error notifying the developer that the hook is being used outside of a Provider.[
 
Here it is:
 
```js
export function useCounter() {
  const ctx = React.useContext(ClickerContext)
  if (ctx === undefined) {
    throw new Error('You cannot use useCounter outside of a CounterProvider. Be sure to include it somewhere higher in the tree')
  }
  return ctx
}
```

And that's it!


### 🔗 Bonus: [React Context code snippet](https://snippet-generator.app/?description=React+Context+Provider&tabtrigger=rcontext&snippet=import+*+as+React+from+%27react%27%0A%0Aconst+%24%7B1%3AMyContext%7DContext+%3D+React.createContext%28undefined%29%0A%0Aexport+const+%24%7B1%3AMyContext%7DConsumer+%3D+%24%7B1%3AMyContext%7DContext.Consumer%0A%0Aexport+const+useMyContext+%3D+%28%29+%3D%3E+%7B%0A++const+ctx+%3D+React.useContext%28%24%7B1%3AMyContext%7DContext%29%0A++if+%28%21ctx%29+throw+new+Error%28%27use%24%7B1%3AMyContext%7D+must+be+used+within+a+%24%7B1%3AMyContext%7DProvider%27%29%0A++return+ctx%0A%7D%0A%0Aexport+const+%24%7B1%3AMyContext%7DProvider+%3D+%28%7B+children+%7D%29+%3D%3E+%7B%0A++const+value+%3D+%7B%0A++++%2F*+*%2F%0A++%7D%0A%0A++return+%3C%24%7B1%3AMyContext%7DContext.Provider+value%3D%7Bvalue%7D%3E%7Bchildren%7D%3C%2F%24%7B1%3AMyContext%7DContext.Provider%3E%0A%7D%0A&mode=vscode)

VS Code instructions:

 - Press `Cmd + Shift + P` to open the command palette.
   - Type "snippet", then select "Configure User Snippets" and press enter.
 - (Alternatively) Go to the **Code** menu, and select **Preferences** > **User Snippets**
 - The command palette will ask for a file type: start typing `javascript` and select `javascript.json`.
   - Note: You'll also see a `javascriptreact.json`. Snippets here will only be available in files with a `.jsx` extension. Similarly, snippets in `javascript.json` will only be available in `.js` files. Most of our files have been `.js`, so let's select `javsacript.json`. (Or, you can add this snippet to both!)
 - Copy the output (right-hand side) of the Snippet Generator link
 - Paste it in to the snippet's JSON object

To give it a test run:

 - Create a new javascript file
 - At the top, start typing `rcontext`. You should see a tooltip pop up with your user snippet.
 - Select the snippet and press Tab
 - Your snippet should appear, with each "MyContext" placeholder pre-selected
   - Start typing a name for your context, like "Clicker"
   
## Exercise

Check out to the `activity-three` branch.

(Some changes have been made since `activity-two`, so for this exercise, make sure you are starting from a clean copy of `activity-three`. You can do a hard reset with `git fetch && git checkout activity-three && git reset --hard origin/activity-three`)

In this branch, there is a `BookmarksProvider` module, which exports the Provider and Consumer. In this exercise, we will:

 - Create a simple `useBookmarks` custom hook (based on the example above)
 - Update Bookmarks.js and SearchResults.js to use the hook instead of the `<Consumer>` wrapper component.
 
 
#### ✅Step 1: Create the `useBookmarks` hook.

- Create a new function, `useBookmarks`, modeled on the example in this readme.
- Export it

That's it!

#### ✅Step 2: Update Bookmarks.js and SearchResults.js

(In both files)

- Remove the Wrapper component, and change the default export to `Bookmarks` / `SearchResults` (accordingly)
  - (this will break your app for a moment)
- Replace the `BookmarksConsumer` import with `useBookmarks`
- At the top of each of the component, get the context value with `useBookmarks`

Each of these components get bookmarking props off of their main `props` object. You'll now need to get these from the context value. For example, all you need to do in `SearchResults` is:

```js
// from
const { searchTerm, searchType, bookmarks, saveBookmark, removeBookmark } = props

// to
const { bookmarks, saveBookmark, removeBookmark } = useBookmarks()
const { searchTerm, searchType } = props
```

#### ✅Bonus: Update the Provider to use hooks

If you want a little more practice refactoring a Class component to use Hooks!

