import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import './Navigation.css'

class Navigation extends Component {
	render() {
		return (
			<nav>
				<h4>
					<NavLink to="/search">Search</NavLink>
				</h4>
				<h4>
					<NavLink to="/bookmarks">Bookmarks</NavLink>
				</h4>
			</nav>
		)
	}
}

export default Navigation
