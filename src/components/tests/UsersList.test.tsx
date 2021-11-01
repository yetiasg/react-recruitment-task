import { render, unmountComponentAtNode } from 'react-dom'
import { act } from 'react-dom/test-utils';
import { UsersList } from '../UsersList'


describe('test UsersList component', () => {
  let container:HTMLDivElement

  beforeAll(async() => {
    container = document.createElement('div')
    document.body.appendChild(container)
  })

  afterAll(() => {
    unmountComponentAtNode(container)
    document.body.removeChild(container)
    container.remove()
  })

  const fakeUsers = [
    {id: 1, name: "Leanne Graham", username: "Bret"},
    {id: 7, name: "Kurtis Weissnat", username: "Elwyn.Skiles"}
  ]

  test('rendered UsersList component elements without data passed', () => {
    act(() => {
      render(<UsersList users={[]}/>, container)
    })
    const usersListContainer = container.querySelectorAll('div.UsersList-container')
    expect(usersListContainer).toHaveLength(1)

    const orderedList = container.querySelectorAll('ol.UsersList-list')
    expect(orderedList).toHaveLength(1)
  })

  test('ordered list rendering', () => {
    act(() => {
      render(<UsersList users={fakeUsers}/>, container)
    })
    const orderedList = container.querySelectorAll('ol.UsersList-list')
    expect(orderedList).toHaveLength(1)

    const orderedListElements = container.querySelectorAll('li.UsersList-li')
    expect(orderedListElements).toHaveLength(fakeUsers.length)
  })

  test('rendered list includes user data and username', async() => {
    act(() => {
      render(<UsersList users={[fakeUsers[0]]}/>, container)
    })
    const userListLiName = container.querySelector('span.UsersList-li-name')
    expect(userListLiName?.textContent).toBe(fakeUsers[0].name)

    const userListLiUsername = container.querySelector('span.UsersList-li-username')
    expect(userListLiUsername?.textContent?.trim()).toBe(`@${fakeUsers[0].username}`)
  })
});