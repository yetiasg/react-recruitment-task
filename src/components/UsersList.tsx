import './styles/UsersList.css'
import { FC } from 'react'
import { UserI } from './App'

interface UsersListI{
  users: UserI[]
}

export const UsersList:FC<UsersListI> = ({users}) => {
  const renderList = () => {
    return users.map(user => {
     if(user) return (
      <li
        className="UserList-li"
        key={user?.id}>
        <span className="UserList-li-name">{user?.name}</span>
        {` @${user?.username}`}
      </li>
      )
     return null
    })
  }

  return (
    <div className="UserList-container">
      <ol className="UsersList-list">{renderList()}</ol>
    </div>
  )
}

