import { render, unmountComponentAtNode } from 'react-dom'
import { act } from 'react-dom/test-utils';
import { UsersList } from '../UsersList'


describe('test UsersList component', () => {
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

  
  test('render UsersList-container', () => {
    act(() => {
      render(<UsersList users={[]}/>, container)
    })
    const usersListContainer = container.querySelectorAll('div.UsersList-container')
    expect(usersListContainer).toHaveLength(1)
  })

  test('render empty ordered list', () => {
    act(() => {
      render(<UsersList users={[]}/>, container)
    })
    const orderedList = container.querySelectorAll('ol.UsersList-list')
    expect(orderedList).toHaveLength(1)
  })

  test('render ordered list', () => {
    act(() => {
      render(<UsersList users={fakeUsers}/>, container)
    })
    const orderedList = container.querySelectorAll('ol.UsersList-list')
    expect(orderedList).toHaveLength(1)
  })

  test('render ordered list elements', () => {
    act(() => {
      render(<UsersList users={fakeUsers}/>, container)
    })
    const orderedListElements = container.querySelectorAll('li.UsersList-li')
    expect(orderedListElements).toHaveLength(fakeUsers.length)
  })

  test('rendered list includes user data and username', async () => {
    await act(async () => {
      render(<UsersList users={[fakeUsers[0]]}/>, container)
    })

    const userListLiName = container.querySelector('span.UsersList-li-name')
    const userListLiUsername = container.querySelector('span.UsersList-li-username')
    expect(userListLiName?.textContent).toBe(fakeUsers[0].name)
    expect(userListLiUsername?.textContent?.trim()).toBe(`@${fakeUsers[0].username}`)
  })

});