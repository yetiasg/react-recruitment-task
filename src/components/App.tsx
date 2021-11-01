import './styles/App.css'
import { FC, Dispatch, SetStateAction, useState, useEffect } from "react"
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

  useEffect(() => {
    fetchUsers(setUsers, setMatchedUsers, setErrorMsg)
  },[])

  return (
    <div className="App-container">
      <h4 className="App-header">Users list</h4>
      <Search users={users} onInputChange={setMatchedUsers}/>
      <div>{(matchedUsers.length <= 0 && !errorMsg) ? <h4 className="App-info-loading">Loading...</h4> : null}</div>
      <div>{errorMsg ? <h4 className="App-info-error">{errorMsg}</h4> : null}</div>
      <UsersList users={matchedUsers}/>
    </div>
  )
}

const fetchUsers = async (
  setUsers:Dispatch<SetStateAction<UserI[]>>,
  setMatchedUsers:Dispatch<SetStateAction<(UserI | null)[]>>,
  setErrorMsg: Dispatch<SetStateAction<string>>
  ) => {
  try{
    const response = await jsonPlaceholder.get('/users')
    if(response.data){
      setUsers(response.data)
      setMatchedUsers(response.data)
    }
  }catch(error){
    setErrorMsg('Something went wrong. Try again later')
    setUsers([])
    setMatchedUsers([])
  }
}