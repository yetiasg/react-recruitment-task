import './styles/UsersList.css'
import { FC } from 'react'
import { UserI } from './App'

interface UsersListI{
  users: (UserI | null)[]
}

export const UsersList:FC<UsersListI> = ({users}) => {
  const renderList = () => {
    return users?.map(user => {
     if(user) return (
      <li 
        className="UsersList-li"
        key={user?.id}>
        <span className="UsersList-li-name">{user?.name}</span>
        <span className="UsersList-li-username">{` @${user?.username}`}</span>
      </li>
      )
     return null
    })
  }
  return (
    <div className="UsersList-container">
      <ol className="UsersList-list">{renderList()}</ol>
    </div>
  )
}
