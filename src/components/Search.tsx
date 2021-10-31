import './styles/Search.css'
import { FC, useState, useEffect } from 'react'
import { UserI } from './App'

interface SearchI{
  users:UserI[];
  onInputChange: (setMatchedUsers: any) => void;
}

export const Search:FC<SearchI> = ({users, onInputChange}) => {
  const [searchValue, setSearchValue] = useState<string>('')

  const findUser = () => {
    return users.map(user => {
      const name = user.name.toLowerCase()
      const [...data] = name.split(' ')
      let term:boolean[] = []
      data.forEach(el => {
        term.push(el.startsWith(searchValue.toLowerCase()) || name.startsWith(searchValue.toLowerCase()))
      })
      return term.includes(true) ? user : null
    })
  }

  useEffect(() => {
    if(!searchValue) return onInputChange(users)
    onInputChange(findUser())
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchValue])

  return (
    <input
      type="text"
      className="Search-input"
      value={searchValue}
      placeholder="Search by user name..."
      onChange={e => setSearchValue(e.target.value)}
    />
  )
}