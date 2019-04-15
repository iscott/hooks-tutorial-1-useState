import React from 'react'

const SearchResultRepo = ({ result }) => {
	const {
		name,
		description,
		homepage,
		html_url,
		language,
		owner,
		stargazers_count,
		open_issues_count,
	} = result

	return (
		<React.Fragment>
			<h3 className="search-result__title">{name}</h3>
			<p className="search-result__description"> {description}</p>
			<h5>
				<a href={html_url}>Repo</a>
			</h5>
			{homepage ? (
				<h5>
					<a href={homepage} target="_blank" rel="noreferrer noopener">
						Homepage
					</a>
				</h5>
			) : null}
			<h5>
				By{' '}
				<a href={html_url} target="_blank" rel="noreferrer noopener">
					{owner.login}
				</a>
			</h5>
			<div className="info-container">
				<h5 className="info">
					<span className="info__label">Language:</span>
					<span className="info__value">{language}</span>
				</h5>
				<h5 className="info">
					<span className="info__label">Stars:</span>
					<span className="info__value">{stargazers_count}</span>
				</h5>
				<h5 className="info">
					<span className="info__label">Open Issues:</span>
					<span className="info__value">{open_issues_count}</span>
				</h5>
			</div>
		</React.Fragment>
	)
}

export default SearchResultRepo
