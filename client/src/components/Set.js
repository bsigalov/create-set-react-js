import React from 'react'
import Item from './Item'
import CardGroup from 'react-bootstrap/CardGroup'
import { Button, Card } from 'react-bootstrap'
import '../css/mySets.css'
import { useSelector, useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'
import { deleteSetById } from '../state/action-creators/SetsActions'

const Set = ({ set, index }) => {
  const dispatch = useDispatch()
  const relevantFunctions = bindActionCreators({ deleteSetById }, dispatch)
  return (
    <div className="set">
      <CardGroup>
        <Item type="shirt" item={set.shirt} />
        <Item type="pants" item={set.pants} />
        <Item type="shoes" item={set.shoes} />
        <Card.Text>
          Created at: {set.createdAt} <br></br> Created in: {set.timeToCreate}{' '}
          minutes
        </Card.Text>

        <Button
          onClick={() => {
            if (window.confirm('Are you sure you want to delete this set?')) {
              relevantFunctions.deleteSetById(set.id)
            } else {
              console.log('Set not deleted')
            }
          }}
          variant="danger"
        >
          Delete set
        </Button>
      </CardGroup>
    </div>
  )
}

export default Set
