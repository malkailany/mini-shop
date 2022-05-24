import React, { useState } from 'react'
import { Button, Col, Form, Modal, Row } from 'react-bootstrap'
const CheckoutModal = props => {
  const [IsApproved, SetApproved] = useState()
  const onSubmit = e => {
    e.preventDefault()
    const CardNumber = e.target.cardnumber.value
    switch (CardNumber) {
      case '4242424242424242':
        SetApproved(true)
        break
      case '4000000000000002':
        SetApproved(false)
        break
      default:
        SetApproved(false)
    }
  }
  return (
    <>
      <Modal {...props} backdrop='static' keyboard={false} data-testid='modal'>
        <Modal.Header closeButton>
          <Modal.Title as={'h1'}>Checkout</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={onSubmit}>
            <Form.Group className='mb-3' controlId='formBasicEmail'>
              <Form.Control type='email' placeholder='Enter email' />
            </Form.Group>
            <hr />
            <Form.Group className='mb-3' controlId='cardNumber'>
              <Form.Control
                type='text'
                placeholder='Card Number'
                name='cardnumber'
              />
            </Form.Group>
            <Row className='g-0 '>
              <Col>
                <Form.Group className='mb-3' controlId='formBasicEmail'>
                  <Form.Control
                    type='text'
                    className='rounded-left rounded-0 '
                    placeholder='MM/YY'
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className='mb-3' controlId='formBasicEmail'>
                  <Form.Control
                    type='text'
                    className='rounded-0 rounded-right'
                    placeholder='CVC'
                    maxLength='3'
                  />
                </Form.Group>
              </Col>
            </Row>
            <h2>Total: £{props.TotalPrice}</h2>
            <Button variant='secondary' onClick={props.onHide}>
              Close
            </Button>
            <Button variant='success' type='submit'>
              Purchase
            </Button>
          </Form>
        </Modal.Body>

        <Modal.Footer>
          {IsApproved !== undefined
            ? IsApproved
              ? 'Thank you for your purchase'
              : 'Sorry, card declined'
            : ''}
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default CheckoutModal
