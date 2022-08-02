import React, { useEffect, useState } from 'react'
import Title from '../components/Title'
import { Button, Table } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'
import { useNavigate } from 'react-router-dom'
import '../css/chooseScreen.css'
import { chooseShoes } from '../state/action-creators/SetsActions'
import { recommendShoes } from '../state/action-creators/ShoesActions'
import Form from 'react-bootstrap/Form'

const ChooseShirtScreen = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const shoesState = useSelector((state) => state.shoes)
  const setsState = useSelector((state) => state.sets)
  const [filteredShoes, setFilteredShoes] = useState(shoesState.availableShoes)
  const [selectedColor, setSelectedColor] = useState('')
  const [selectedSize, setSelectedSize] = useState(0)

  const relevantFunctions = bindActionCreators(
    { recommendShoes, chooseShoes },
    dispatch,
  )
  let noRecommendedMessage = 'There are no recommended items'
  useEffect(() => {
    relevantFunctions.recommendShoes()
    //check if there is no filter
    if (selectedColor == '' && selectedSize == 0) {
      setFilteredShoes(shoesState.availableShoes)
    } // check if there is a color filter
    else if (selectedColor !== '' && selectedSize == 0) {
      setFilteredShoes(
        shoesState.availableShoes.filter((shoes) => {
          return shoes.color === selectedColor
        }),
      )
      // check if there is a size filter
    } else if (selectedSize !== 0 && selectedColor == '') {
      setFilteredShoes(
        shoesState.availableShoes.filter((shoes) => {
          return shoes.size - selectedSize == 0
        }),
      )
      // check if there is size & color filter
    } else if (selectedSize !== 0 && selectedColor !== '') {
      setFilteredShoes(
        shoesState.availableShoes.filter((shoes) => {
          return shoes.size - selectedSize == 0 && shoes.color == selectedColor
        }),
      )
    }
  }, [selectedColor, selectedSize])

  return (
    <div className="container">
      <Title title="Choose Shoes" />
      <Button variant="secondary" onClick={() => navigate('/createSet/pants')}>
        Back
      </Button>
      <div className="recommended-options">
        <h4>Recommended options:</h4>
        {!setsState.chosenPants && noRecommendedMessage}
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
            {shoesState.recommendedShoes.length > 0 &&
              shoesState.recommendedShoes.map((shoes, index) => {
                return (
                  <tr key={index}>
                    <td>{shoes.id}</td>
                    <td>{shoes.color}</td>
                    <td>{shoes.size}</td>
                    <td>{shoes.brand}</td>
                    <td>
                      <img
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQlxXcwfD7MSXaVIhVUUI4uWX2Q8jM39mCgQ&usqp=CAU"
                        style={{ width: '100px', height: '100px' }}
                      />
                    </td>
                    <td>
                      <Button
                        variant="success"
                        onClick={() => {
                          relevantFunctions.chooseShoes(shoes)
                          navigate('/')
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
            <option value={0}>Select size(EUR)</option>
            <option value={36}>36</option>
            <option value={37}>37</option>
            <option value={38}>38</option>
            <option value={39}>39</option>
            <option value={40}>40</option>
            <option value={41}>41</option>
            <option value={42}>42</option>
            <option value={43}>43</option>
            <option value={44}>44</option>
            <option value={45}>45</option>
            <option value={46}>46</option>
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
            {filteredShoes.length > 0 &&
              filteredShoes.map((shoes, index) => {
                return (
                  <tr key={shoes.id}>
                    <td>{shoes.id}</td>
                    <td>{shoes.color}</td>
                    <td>{shoes.size}</td>
                    <td>{shoes.brand}</td>
                    <td>
                      <img
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQlxXcwfD7MSXaVIhVUUI4uWX2Q8jM39mCgQ&usqp=CAU"
                        style={{ width: '100px', height: '100px' }}
                      />
                    </td>
                    <td>
                      <Button
                        variant="success"
                        onClick={() => {
                          relevantFunctions.chooseShoes(shoes)
                          navigate('/')
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
