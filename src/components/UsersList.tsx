import './styles/UsersList.css'
import { FC } from 'react'
import { UserI } from './App'

interface UsersListI{
  users: (UserI | null)[],
  error: string
}

export const UsersList:FC<UsersListI> = ({users, error}) => {
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

  const renderInfo = () => {
    if(error || error.length){
      return (<h4 className="UsersList-info-error UsersList-info">{error}</h4>)
    }

    if((!users || !users.length) && !error){
      return (<h4 className="UsersList-info-loading UsersList-info">Loading...</h4>)
    }
  }

  return (
    <div className="UsersList-container">
      <ol className="UsersList-list">{renderList()}</ol>
      <div>{renderInfo()}</div>
    </div>
  )
}
