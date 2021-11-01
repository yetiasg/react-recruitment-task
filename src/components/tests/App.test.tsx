import ReactDOM from 'react-dom'
import { App } from '../App'

let container = null
beforeEach(() => {
  container = document.createElement('div')
  ReactDOM.render(<App/>, container)
})

// afterEach(() => {

// })


function sum(a:number, b:number):number{
  return a+b
}

describe('test App component', () => {
  test('sum', () => {
    expect(sum(5, 5)).toBe(10);
  });
})
