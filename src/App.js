import './App.css'
import { Col, Container, Row, Button } from 'react-bootstrap'
import items from './data/items.json'
import { useState, useMemo, useCallback } from 'react'
import CheckoutModal from './CheckoutModal'
function App () {
  const [Basket, SetBasket] = useState([])
  const [CheckoutStatus, SetStatus] = useState(false)

  const AddToBasket = item => SetBasket(prev => [...prev, item])
  const RemoveFromBasket = item =>
    SetBasket(prev => prev.filter(el => el.id !== item.id))

  const CalcPrice = useCallback(() => {
    if (!Basket.length) return `0.00`
    console.log('rendered')
    return Basket.reduce((total, currItem) => currItem.price + total, 0)
  }, [Basket])

  const TotalPrice = useMemo(() => CalcPrice(), [CalcPrice])

  return (
    <div className='App'>
      <Container>
        <Row>
          <Col>
            <h1>Shop</h1>
          </Col>
        </Row>
        <Row>
          <Col xs={6} id='movie-container'>
            <h1>Movies</h1>
            <div className='movie-list' data-testid='movie-list'>
              {items.map((movie, i) => {
                return (
                  <div
                    key={i}
                    className='d-flex justify-content-center align-items-baseline'
                    data-testid={`movie-${movie.id}`}
                  >
                    <p>
                      {movie.item_name} - £{movie.price}
                    </p>
                    <Button
                      className='mx-3'
                      onClick={() => AddToBasket(movie)}
                      data-testid={`movie-btn-${movie.id}`}
                    >
                      Add
                    </Button>
                  </div>
                )
              })}
            </div>
          </Col>
          <Col xs={6} id='basket'>
            <h1>Basket</h1>
            <div className='basket-list' data-testid='basket-list'>
              {Basket.map((item, i) => {
                return (
                  <div
                    key={i}
                    className='d-flex justify-content-center align-items-baseline'
                  >
                    <p>
                      {item.item_name} - £{item.price}
                    </p>
                    <Button
                      className='mx-3'
                      onClick={() => RemoveFromBasket(item)}
                    >
                      Remove
                    </Button>
                  </div>
                )
              })}
            </div>
            <hr />
            <div className='d-flex justify-content-around'>
              <h2>
                Total Price: £
                <span data-testid='basket-price'>{TotalPrice}</span>
              </h2>
              <Button
                variant='success'
                onClick={() => {
                  SetStatus(true)
                }}
              >
                Checkout
              </Button>
            </div>
          </Col>
        </Row>
      </Container>
      <CheckoutModal
        TotalPrice={TotalPrice}
        show={CheckoutStatus}
        onHide={() => SetStatus(false)}
      />
    </div>
  )
}

export default App
