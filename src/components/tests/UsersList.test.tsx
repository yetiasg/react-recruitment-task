import { render, unmountComponentAtNode } from 'react-dom'
import { act } from 'react-dom/test-utils';
import { UsersList } from '../UsersList'

import { render as jrender, cleanup, waitFor, screen, fireEvent } from  '@testing-library/react'


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

  test('renders users list', () => {
    jrender(<UsersList users={fakeUsers} error=''/>)
  })

  test('renders UsersList container and empty list', () => {
    act(() => {
      render(<UsersList users={[]} error=''/>, container)
    })
    const usersListContainer = container.querySelectorAll('div.UsersList-container')
    expect(usersListContainer).toHaveLength(1)

    const orderedList = container.querySelectorAll('ol.UsersList-list')
    expect(orderedList).toHaveLength(1)
  })

  test('renders ordered list with fake data', () => {
    act(() => {
      render(<UsersList users={fakeUsers} error=''/>, container)
    })
    const orderedList = container.querySelectorAll('ol.UsersList-list')
    expect(orderedList).toHaveLength(1)

    const orderedListElements = container.querySelectorAll('li.UsersList-li')
    expect(orderedListElements).toHaveLength(fakeUsers.length)
  })

  test('renders list that includes passed user data and username', async() => {
    act(() => {
      render(<UsersList users={[fakeUsers[0]]} error=''/>, container)
    })
    const userListLiName = container.querySelector('span.UsersList-li-name')
    expect(userListLiName?.textContent).toBe(fakeUsers[0].name)

    const userListLiUsername = container.querySelector('span.UsersList-li-username')
    expect(userListLiUsername?.textContent?.trim()).toBe(`@${fakeUsers[0].username}`)
  })

  test('renders empty list and loading message if no data passed, but no error pccurred', async() => {
    act(() => {
      render(<UsersList users={[]} error=''/>, container)
    })

    const orderedList = container.querySelectorAll('ol.UsersList-list')
    expect(orderedList).toHaveLength(1)

    const appInfoElement = container.querySelectorAll('.UsersList-info-loading')
    expect(appInfoElement).toHaveLength(1)
    
    const appInfoElementText = container.querySelector('.UsersList-info-loading')
    expect(appInfoElementText?.textContent).toBe('Loading...')
  })

  test('renders empty list and error message if no data passed, but error occurred', async() => {
    const errorMessage = 'Something went wrong. Try again later'
    act(() => {
      render(<UsersList users={[]} error={errorMessage}/>, container)
    })

    const orderedList = container.querySelectorAll('ol.UsersList-list')
    expect(orderedList).toHaveLength(1)

    const appInfoElement = container.querySelectorAll('.UsersList-info-error')
    expect(appInfoElement).toHaveLength(1)
    
    const appInfoElementText = container.querySelector('.UsersList-info-error')
    expect(appInfoElementText?.textContent).toBe(errorMessage)
  })
});



