import { render, unmountComponentAtNode } from 'react-dom'
import { act } from 'react-dom/test-utils';
import { Search } from '../Search'


describe('test Search component', () => {
  const fakeUsers = [
    {id: 1, name: "Leanne Graham", username: "Bret"},
    {id: 7, name: "Kurtis Weissnat", username: "Elwyn.Skiles"}
  ]

  let container:HTMLDivElement 
  beforeEach(() => {
    container = document.createElement('div')
    document.body.appendChild(container)
  })

  afterEach(() => {
    unmountComponentAtNode(container)
    container.remove()
  })

  test('search input tests', () => {
    act(() => {
      render(<Search users={[]} onInputChange={()=>{}} />, container)
    })

    const searchInput = container.querySelectorAll('input')
    expect(searchInput).toHaveLength(1)
    expect(searchInput[0]?.name).toBe('search-input')
    expect(searchInput[0]?.placeholder).toBe('Search by user name...')
    expect(searchInput[0]?.value).toBe('')
    searchInput[0].value = fakeUsers[0].name
    expect(searchInput[0]?.value).toBe(fakeUsers[0].name)
  })
 
  test('findUser function test', () => {
    
  })
});