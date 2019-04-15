import React, { Component } from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Navigation from './Navigation'
import Search from './Search'
import Bookmarks from './Bookmarks'
import './App.css'

class App extends Component {
	state = {
		bookmarks: {
			repositories: [],
			users: [],
		},
	}

	saveBookmark = (type, newBookmark) => {
		console.log(type)
		this.setState(currentState => {
			const { repositories, users } = currentState.bookmarks
			if (type === 'repositories') {
				return {
					bookmarks: {
						repositories: [...repositories, newBookmark],
						users,
					},
				}
			} else if (type === 'users') {
				return {
					bookmarks: {
						repositories,
						users: [...users, newBookmark],
					},
				}
			} else {
				throw new Error(`Cannot bookmark type "${type}"`)
			}
		})
	}

	removeBookmark = (type, bookmarkId) => {
		console.log(type, bookmarkId)
		this.setState(currentState => {
			const { repositories, users } = currentState.bookmarks
			if (type === 'repositories') {
				return {
					bookmarks: {
						repositories: repositories.filter(r => r.id !== bookmarkId),
						users,
					},
				}
			} else if (type === 'users') {
				return {
					bookmarks: {
						repositories,
						users: users.filter(u => u.id !== bookmarkId),
					},
				}
			}
		})
	}

	render() {
		console.log(this.state.bookmarks)
		return (
			<BrowserRouter>
				<div className="App">
					<h1>
						<span role="img" aria-label="Books">
							📚
						</span>
						Github Bookmarks
					</h1>
					<Navigation />
					<main>
						<Switch>
							<Route
								path="/search"
								render={() => (
									<Search
										saveBookmark={this.saveBookmark}
										removeBookmark={this.removeBookmark}
										bookmarks={this.state.bookmarks}
									/>
								)}
							/>
							<Route
								path="/bookmarks"
								render={() => (
									<Bookmarks
										bookmarks={this.state.bookmarks}
										removeBookmark={this.removeBookmark}
									/>
								)}
							/>
						</Switch>
					</main>
				</div>
			</BrowserRouter>
		)
	}
}

export default App
