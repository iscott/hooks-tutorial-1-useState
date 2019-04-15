import React from 'react'
import './bookmarks.css'

const Bookmarks = ({ bookmarks, removeBookmark }) => {
	const remove = (type, id) => () => removeBookmark(type, id)
	return (
		<div>
			<h2>My Bookmarks</h2>
			<div className="bookmarks-list">
				<h3 className="bookmarks-list__title">Repositories</h3>
				{bookmarks.repositories.map(repo => (
					<div className="bookmarks-list__item" key={repo.id}>
						<h4>{repo.name}</h4>
						<button onClick={remove('repositories', repo.id)}>remove</button>
					</div>
				))}
			</div>
			<div className="bookmarks-list">
				<h3 className="bookmarks-list__title">Users</h3>
				{bookmarks.users.map(user => (
					<div className="bookmarks-list__item" key={user.id}>
						<div>
							<img className="avatar" src={user.avatar_url} alt={user.login} />
						</div>
						<h4>{user.login}</h4>
						<button onClick={remove('users', user.id)}>remove</button>
					</div>
				))}
			</div>
		</div>
	)
}
export default Bookmarks
