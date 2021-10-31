import './styles/Search.css'
import { FC, useState, useEffect } from 'react'
import { UserI } from './App'

interface SearchI{
  users:UserI[];
  onInputChange: (setMatchedUsers: any) => void;
}

export const Search:FC<SearchI> = ({users, onInputChange}) => {
  const [searchValue, setSearchValue] = useState<string>('')

  useEffect(() => {
    const search = () => {
      return users.map(user => {
        const [...data] = user.name.toLowerCase().split(' ')
        let term:boolean[] = []
        data.forEach( el => {
          term.push(el.startsWith(searchValue.toLowerCase()))
        })
        return term.includes(true) ? user : null
      })
    }
    if(!searchValue) return onInputChange(users)
    onInputChange(search())
  }, [searchValue, users, onInputChange])

  return (
    <input
      className="Search-input"
      value={searchValue}
      placeholder="Search by user name..."
      onChange={e => setSearchValue(e.target.value)}
    />
  )
}