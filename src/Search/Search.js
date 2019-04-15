import React from 'react'
import SearchResults from './SearchResults'
import './search.css'

class Search extends React.Component {
	state = {
		searchTerm: '',
		searchType: 'repositories', // 'repositories' or 'users'
	}

	updateSearchTerm = e => {
		this.setState({
			searchTerm: e.target.value,
		})
	}

	setSearchType = searchType => () => {
		this.setState({ searchType })
	}

	render() {
		const { searchTerm, searchType } = this.state
		const { saveBookmark, removeBookmark, bookmarks } = this.props
		console.log(this.props)

		return (
			<React.Fragment>
				<div className="field">
					<div className="field__toggle">
						<button
							className={searchType === 'repositories' ? 'active' : ''}
							onClick={this.setSearchType('repositories')}
						>
							Repos
						</button>
						<button
							className={searchType === 'users' ? 'active' : ''}
							onClick={this.setSearchType('users')}
						>
							Users
						</button>
					</div>
					<label>Search {searchType}</label>
					<input onChange={this.updateSearchTerm} name="search" />
				</div>
				<SearchResults
					searchTerm={searchTerm}
					searchType={searchType}
					saveBookmark={saveBookmark}
					removeBookmark={removeBookmark}
					bookmarks={bookmarks}
				/>
			</React.Fragment>
		)
	}
}

export default Search
