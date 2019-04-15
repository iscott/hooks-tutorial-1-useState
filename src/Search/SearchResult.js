import React from 'react'
import SearchResultRepo from './SearchResultRepo'
import SearchResultUser from './SearchResultUser'

const SearchResult = ({
	result,
	saveBookmark,
	removeBookmark,
	isBookmarked,
	searchType,
}) => {
	const handleClick = () => {
		if (isBookmarked) {
			removeBookmark(searchType, result.id)
		} else {
			saveBookmark(searchType, result)
		}
	}

	return (
		<div className="search-result">
			{isBookmarked ? (
				<span
					className="search-result__bookmarked-icon"
					role="img"
					aria-label="Currently Bookmarked"
				>
					✅
				</span>
			) : null}
			{searchType === 'repositories' ? (
				<SearchResultRepo result={result} />
			) : (
				<SearchResultUser result={result} />
			)}

			<button onClick={handleClick}>
				{isBookmarked ? 'Remove' : 'Bookmark'}
			</button>
		</div>
	)
}
export default SearchResult
