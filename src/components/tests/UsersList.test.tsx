import { UsersList } from '../UsersList'
import { render as rrender, unmountComponentAtNode} from 'react-dom';
import { render } from  '@testing-library/react'
import '@testing-library/jest-dom'


describe('test UsersList component', () => {
  const fakeUsers = [
    {id: 1, name: "Leanne Graham", username: "Bret"},
    {id: 7, name: "Kurtis Weissnat", username: "Elwyn.Skiles"}
  ]

  test('renders UsersList container and empty list', () => {
    let container:HTMLDivElement
    container = document.createElement('div')
    document.body.appendChild(container)

    rrender(<UsersList users={[]} error=''/>, container)
    const usersListContainer = container.querySelectorAll('div.UsersList-container')
    expect(usersListContainer).toHaveLength(1)

    const orderedList = container.querySelectorAll('ol.UsersList-list')
    expect(orderedList).toHaveLength(1)

    unmountComponentAtNode(container)
    container.remove()
  })

  test('renders ordered list with fake data', () => {
    const {getAllByRole} = render(<UsersList users={fakeUsers} error=''/>)
    expect(getAllByRole('list')).toHaveLength(1)
    expect(getAllByRole('listitem')).toHaveLength(fakeUsers.length)
    const usersList = getAllByRole('listitem').map(li => li.textContent?.split(' ').slice(0, 2).join(" "))
    usersList.forEach(user => {
      expect(fakeUsers.find(u => u.name === user)).toBeTruthy()
    })
  })

  test('renders list 1 element with fake user data', async() => {
    const {getByText, getAllByText} = render(<UsersList users={[fakeUsers[0]]} error=''/>)
    expect(getAllByText(fakeUsers[0].name)).toHaveLength(1)
    expect(getByText(fakeUsers[0].name)).toBeInTheDocument()
  })

  test('renders "Loading..." message if no data passed, and no error pccurred', () => {
    const {getByText, getAllByText} = render(<UsersList users={[]} error=''/>)
    expect(getAllByText(/Loading.../i)).toHaveLength(1)
    expect(getByText(/Loading.../i)).toBeInTheDocument()
  })

  test('renders error message if no data passed, but error occurred', () => {
    const errorMessage = 'Something went wrong. Try again later'
    const {getByText, getAllByText} = render(<UsersList users={[]} error={errorMessage}/>)
    expect(getAllByText(errorMessage)).toHaveLength(1)
    expect(getByText(errorMessage)).toBeInTheDocument()
  })
});



