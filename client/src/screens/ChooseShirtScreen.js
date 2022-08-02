import React, { useEffect, useState } from 'react'
import Title from '../components/Title'
import { Button, Table } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import '../css/chooseScreen.css'
import { chooseShirt } from '../state/action-creators/SetsActions'
import Form from 'react-bootstrap/Form'

const ChooseShirtScreen = () => {
  const startCreateTime = new Date()
  localStorage.setItem('startCreateTime', startCreateTime)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const shirtsState = useSelector((state) => state.shirts)
  const setsState = useSelector((state) => state.sets)
  const [filteredShirts, setFilteredShirts] = useState(
    shirtsState.availableShirts,
  )
  const [selectedColor, setSelectedColor] = useState('')
  const [selectedSize, setSelectedSize] = useState('')
  const relevantFunctions = bindActionCreators({ chooseShirt }, dispatch)
  useEffect(() => {
    //check if there is no filter
    if (selectedColor == '' && selectedSize == '') {
      setFilteredShirts(shirtsState.availableShirts)
    } // check if there is a color filter
    else if (selectedColor !== '' && selectedSize == '') {
      setFilteredShirts(
        shirtsState.availableShirts.filter((shirt) => {
          return shirt.color === selectedColor
        }),
      )
      // check if there is a size filter
    } else if (selectedSize !== '' && selectedColor == '') {
      setFilteredShirts(
        shirtsState.availableShirts.filter((shirt) => {
          return shirt.size == selectedSize
        }),
      )
      // check if there is size & color filter
    } else if (selectedSize !== '' && selectedColor !== '') {
      setFilteredShirts(
        shirtsState.availableShirts.filter((shirt) => {
          return shirt.size === selectedSize && shirt.color === selectedColor
        }),
      )
    }
    if (setsState.chosenPants !== null || setsState.chosenShoes !== null) {
      // show the recommended list and the othe options below
    }
  }, [selectedColor, selectedSize])
  return (
    <div className="container">
      <Title title="Choose Shirt" />
      <Button variant="secondary" onClick={() => navigate('/')}>
        Back
      </Button>

      <div className="other-options">
        <h4>Other options:</h4>
        <div className="select-area">
          <span>Filter by sizes:</span>
          <Form.Select
            size="sm"
            style={{ width: '250px' }}
            onChange={(e) => {
              setSelectedSize(e.target.value)
            }}
          >
            <option value="">Select size</option>
            <option value="S">S</option>
            <option value="M">M</option>
            <option value="L">L</option>
            <option value="XL">XL</option>
            <option value="XXL">XXL</option>
          </Form.Select>
          <span>Filter by colors:</span>
          <Form.Select
            size="sm"
            style={{ width: '250px' }}
            onChange={(e) => {
              setSelectedColor(e.target.value)
            }}
          >
            <option value="">Select color</option>
            <option value="red">red</option>
            <option value="white">white</option>
            <option value="black">black</option>
            <option value="green">green</option>
            <option value="pink">pink</option>
          </Form.Select>
        </div>
        <Table striped bordered hover responsive className="table-sm">
          <thead>
            <tr>
              <th>ID</th>
              <th>Color</th>
              <th>Size</th>
              <th>Brand</th>
              <th>Image</th>
              <th>Choose</th>
            </tr>
          </thead>
          <tbody>
            {filteredShirts.length > 0 &&
              filteredShirts.map((shirt, index) => {
                return (
                  <tr key={shirt.id}>
                    <td>{shirt.id}</td>
                    <td>{shirt.color}</td>
                    <td>{shirt.size}</td>
                    <td>{shirt.brand}</td>
                    <td>
                      <img
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSafxk5WzcB0UQboAJQ_VkG8YLmYzI1VEYe5w&usqp=CAU"
                        style={{ width: '100px', height: '100px' }}
                      />
                    </td>
                    <td>
                      <Button
                        variant="success"
                        onClick={() => {
                          relevantFunctions.chooseShirt(shirt)
                          navigate('/createSet/pants')
                        }}
                      >
                        Choose
                      </Button>
                    </td>
                  </tr>
                )
              })}
          </tbody>
        </Table>
      </div>
    </div>
  )
}

export default ChooseShirtScreen
