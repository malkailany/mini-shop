import { render, screen, fireEvent } from '@testing-library/react'
import items from './data/items.json'
import App from './App'
import CheckoutModal from './CheckoutModal'

test('renders the items correctly from json', () => {
  render(<App />)
  for (let i = 0; i < 5; i++) {
    const linkElement = screen.getByTestId(`movie-${items[i].id}`)
    expect(linkElement).toBeInTheDocument()
    expect(linkElement).toHaveTextContent(items[i].item_name)
  }
})

test('Modal renders when show flag is true', () => {
  render(<CheckoutModal show={true} />)
  const modalElements = screen.getByTestId('modal')
  expect(modalElements).toBeInTheDocument()
})

test('value of basket adds up correctly', () => {
  let InitialTotal = 0.0
  //test if the basket is first empty
  render(<App />)
  const BasketPrice = screen.getByTestId('basket-price')
  expect(BasketPrice).toHaveTextContent(/^0.00$/)
  for (let i = 0; i < 5; i++) {
    const linkElement = screen.getByTestId(`movie-btn-${items[i].id}`)
    fireEvent.click(linkElement)
    InitialTotal += items[i].price
    expect(BasketPrice).toHaveTextContent(InitialTotal)
  }
})
