import { render as rrender, unmountComponentAtNode } from 'react-dom'
import { act } from 'react-dom/test-utils';
import { Search } from '../Search'
import { render } from  '@testing-library/react'
import '@testing-library/jest-dom'


describe('test Search component', () => {
  test('renders Search container', () => {
    let container:HTMLDivElement 
    container = document.createElement('div')

    act(() => {
      rrender(<Search users={[]} onInputChange={()=>{}} />, container)
    })
    const searchContainer = container.querySelectorAll('.Search-container')
    expect(searchContainer).toHaveLength(1)

    unmountComponentAtNode(container)
    container.remove()
  })

  test('renders Search component elements and values', () => {
    const {getAllByRole, getByRole, getByPlaceholderText} = render(<Search users={[]} onInputChange={()=>{}} />)
    expect(getAllByRole('textbox')).toHaveLength(1)
    expect(getByRole('textbox')).toHaveValue('')
    expect(getByPlaceholderText('Search by user name...')).toBeInTheDocument()
  })
});