import { render, unmountComponentAtNode } from 'react-dom'
import { act } from 'react-dom/test-utils';
import { App } from '../App'


describe('test App component', () => {
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

  test('rendered App component elements', async() => {
    act(() => {
      render(<App/>, container)
    })
    const appContainer = container.querySelectorAll('.App-container')
    expect(appContainer).toHaveLength(1)

    const headerElement = container.querySelectorAll('.App-header')
    expect(headerElement).toHaveLength(1)

    const headerElementText = container.querySelector('.App-header')
    expect(headerElementText?.textContent).toBe('Users list')
  })
})