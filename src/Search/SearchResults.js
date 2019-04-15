import React from 'react'
import SearchResult from './SearchResult'
import './search.css'

class SearchResults extends React.Component {
	state = {
		loading: false,
		results: [],
	}

	componentDidMount = () => {
		this.fetchResults()
	}

	componentWillReceiveProps = nextProps => {
		if (
			nextProps.searchTerm !== this.props.searchTerm ||
			nextProps.searchType !== this.props.searchType
		) {
			this.fetchResults(nextProps.searchTerm, nextProps.searchType)
		}
	}

	fetchTimeout = null

	fetchResults = (
		searchTerm = this.props.searchTerm,
		searchType = this.props.searchType,
	) => {
		if (this.fetchTimeout) clearTimeout(this.fetchTimeout)
		console.log(searchTerm.length, searchTerm)
		if (!searchTerm.length) {
			this.setState({ loading: false })
			return
		}
		this.setState({ loading: true })
		this.fetchTimeout = setTimeout(async () => {
			const response = await fetch(
				`https://api.github.com/search/${searchType}?q=${searchTerm}`,
			).then(r => r.json())
			const results = response.items
			this.setState({ loading: false, results })
		}, 500)
	}

	componentWillUnmount = () => {
		if (this.fetchTimeout) clearTimeout(this.fetchTimeout)
	}

	isBookmarked = result => {
		const { searchType, bookmarks } = this.props
		if (!bookmarks[searchType]) return false
		return Boolean(bookmarks[searchType].find(b => b.id === result.id))
	}

	render() {
		const { searchTerm, saveBookmark, searchType, removeBookmark } = this.props
		const { results, loading } = this.state
		if (loading) return <p>Loading...</p>
		if (!searchTerm.length) return <p>Search for something!</p>
		if (results.length === 0) return <p>No Results for "{searchTerm}"</p>

		return (
			<div>
				<p>Search results for "{searchTerm}"</p>
				<div className="search-results">
					{results.map(result => (
						<SearchResult
							key={result.id}
							result={result}
							searchType={searchType}
							saveBookmark={saveBookmark}
							removeBookmark={removeBookmark}
							isBookmarked={this.isBookmarked(result)}
						/>
					))}
				</div>
			</div>
		)
	}
}

export default SearchResults
