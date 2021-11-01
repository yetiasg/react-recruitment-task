import './styles/App.css'
import { FC, useState, useEffect } from "react"
import { jsonPlaceholder } from "../api/jsonPlaceholder"
import { UsersList } from './UsersList'
import { Search } from "./Search"

export interface UserI{
  id:number;
  name:string;
  username:string;
}

export const App:FC = () => {
  const [users, setUsers] = useState<UserI[]>([])
  const [matchedUsers, setMatchedUsers] = useState<(UserI | null)[]>([])
  const [errorMsg, setErrorMsg] = useState<string>('')

  const fetchUsers = async () => {
    try{
      const response = await jsonPlaceholder.get('/users')
      setUsers(response.data)
      setMatchedUsers(response.data)
    }catch(error){
      setErrorMsg('Something went wrong. Try again later')
    }
  }

  useEffect(() => {
    fetchUsers()
  },[])

  return (
    <div className="App-container">
      <h4 className="App-header">Users list</h4>
      <Search users={users} onInputChange={setMatchedUsers}/>
      <div>{(users.length <= 0 && !errorMsg) ? <h4 className="App-info">Loading...</h4> : null}</div>
      <div>{errorMsg ? <h4 className="App-info">{errorMsg}</h4> : null}</div>
      <UsersList users={matchedUsers}/>
    </div>
  )
}