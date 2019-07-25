# Custom Hooks


### Exercise 1: Warmup

Write a component that fetches and displays details for a repository from the Github API, using Hooks. It should:

 - Display some kind of "Loading.." UI while the request is in progress
 - Display the repo title (an / or any other data) once the request is complete
 - Display an error message if there was a problem with the request.
 
Use [this Codesandbox](https://codesandbox.io/s/lingering-wave-78448) as a starting point, working in `Repository.js`.

Hints:

 - Use `setState` three times: once for the `loading`, once for the `repo`, and once for `errorMessage`.
 - Use `useEffect` to start the API request. Make sure this only runs on the first render!
 - Use the props supplied by React Router to get the repository ID. (Take a look at the console)
   - The ID for the Husky & React Testing Library routes will work
   - The "Mystery Repo" ID does not exist, and will return an error. Use this one to develop your error message UI.
 - Remember to use `.then` twice when working with `fetch`:
 
   ```js
   fetch(someUrl)
     .then((response) => response.json()) // wait for the request to fully finish
     .then((data) => {
       /* now, do things with the final data */
     })
     .catch((error) => {
       /* Handle any network errors. Note that errors specific to the API will need to be handled above! */
     })
   ```

#### 🔗[Solution](https://codesandbox.io/s/priceless-goodall-gz5j0)

### Exercise 2: Custom Fetch Hook

In the same file:

 - Create a new function called `useFetchRepo`, and have it accept a `repoId` as its only argument.
 - Cut all of the state and fetching logic from the component and paste it into this function.
 - Have it return an object with each piece of state:
 
 ```js
 return {
   loading,
   errorMessage,
   repo
 }
 ```

 - Back in the Component, use your new hook. Be sure to pass in the proper ID from the params:
 
   ```js
   function Repository(props) {
     const { loading, errorMessage, repo } = useFetchRepo(props.match.params.repoId)
     
     /* Render logic remains the same */
     if (loading) return <p>Loading...</p>
     /* etc */
   }
