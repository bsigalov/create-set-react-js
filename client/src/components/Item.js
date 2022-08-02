import React from 'react'
import Card from 'react-bootstrap/Card'
import { Button } from 'react-bootstrap'
import '../css/item.css'

const Item = ({ item, type, withPicture }) => {
  return (
    <>
      {item && (
        <Card style={{ width: '13rem', display: 'flex' }}>
          {withPicture && (
            <Card.Img className="card-image" variant="top" src={item.image} />
          )}
          <Card.Title>ID: {item._id}</Card.Title>
          <Card.Subtitle>{type}</Card.Subtitle>
          <Card.Text>
            Color: {item.color} <br></br>
            Size: {item.size} <br></br>
            Brand: {item.brand}
          </Card.Text>

          {withPicture && <Button variant="success">Choose</Button>}
        </Card>
      )}
    </>
  )
}

export default Item
