import { render, unmountComponentAtNode } from 'react-dom'
import { act } from 'react-dom/test-utils';
import { App } from '../App'

describe('test App component', () => {

  let container:HTMLDivElement 
  beforeEach(() => {
    container = document.createElement('div')
    document.body.appendChild(container)
  })

  afterEach(() => {
    unmountComponentAtNode(container)
    container.remove()
  })


  test('render App component', () => {
    act(() => {
      render(<App/>, container)
    })
    const appContainer = container.querySelectorAll('.App-container')
    expect(appContainer).toHaveLength(1)
  });

  test('render "User list" header', () => {
    act(() => {
      render(<App/>, container)
    })
    const headerElements = container.querySelectorAll('.App-header')
    expect(headerElements).toHaveLength(1)
    const headerElement = container.querySelector('.App-header')
    expect(headerElement?.textContent).toBe('Users list')
  });

  // test('render "App-info" elements', async() => {
  //   act(() => {
  //     render(<App/>, container)
  //   })
  //   const appInfoElements = container.querySelectorAll('.App-info')
  //   expect(appInfoElements).toHaveLength(2)
  // });

  test('render "App-info-loading" element', async() => {
    act(() => {
      render(<App/>, container)
    })
    const appInfoElements = container.querySelectorAll('.App-info-loading')
    expect(appInfoElements).toHaveLength(1)
    const appInfoElement = container.querySelector('.App-info-loading')
    expect(appInfoElement?.textContent).toBe('Loading...')
  });
   
})