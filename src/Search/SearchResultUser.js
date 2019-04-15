import React from 'react'

const SearchResultUser = ({ result }) => {
	const { avatar_url, login, html_url, type } = result

	return (
		<React.Fragment>
			<h3 className="search-result__title">
				<img className="avatar" src={avatar_url} alt={login} />
				{login}
			</h3>
			<h5>
				<a href={html_url}>Profile</a>
			</h5>
			<div className="info-container">
				<h5 className="info">
					<span className="info__label">Type:</span>
					<span className="info__value">{type}</span>
				</h5>
			</div>
		</React.Fragment>
	)
}
export default SearchResultUser
