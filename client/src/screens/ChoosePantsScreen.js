import React, { useEffect, useState } from 'react'
import Title from '../components/Title'
import { Button, Table } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'
import { useNavigate } from 'react-router-dom'
import '../css/chooseScreen.css'
import { choosePants } from '../state/action-creators/SetsActions'
import { recommendPants } from '../state/action-creators/PantsActions'
import Form from 'react-bootstrap/Form'

const ChoosePantsScreen = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const pantsState = useSelector((state) => state.pants)
  const setsState = useSelector((state) => state.sets)
  const [filteredPants, setFilteredPants] = useState(pantsState.availablePants)
  const [selectedColor, setSelectedColor] = useState('')
  const [selectedSize, setSelectedSize] = useState(0)
  const relevantFunctions = bindActionCreators(
    { choosePants, recommendPants },
    dispatch,
  )
  let noRecommendedMessage = 'There are no recommended items'
  useEffect(() => {
    relevantFunctions.recommendPants()
    //check if there is no filter
    if (selectedColor == '' && selectedSize == 0) {
      setFilteredPants(pantsState.availablePants)
    } // check if there is a color filter
    else if (selectedColor !== '' && selectedSize == 0) {
      setFilteredPants(
        pantsState.availablepants.filter((pants) => {
          return pants.color === selectedColor
        }),
      )
      // check if there is a size filter
    } else if (selectedSize !== 0 && selectedColor == '') {
      setFilteredPants(
        pantsState.availablePants.filter((pants) => {
          return pants.size - selectedSize == 0
        }),
      )
      // check if there is size & color filter
    } else if (selectedSize !== 0 && selectedColor !== '') {
      setFilteredPants(
        pantsState.availablePants.filter((pants) => {
          return pants.size - selectedSize == 0 && pants.color == selectedColor
        }),
      )
    }
  }, [selectedColor, selectedSize])
  return (
    <div className="container">
      <Title title="Choose Pants" />
      <Button variant="secondary" onClick={() => navigate('/createSet/shirt')}>
        Back
      </Button>
      <div className="recommended-options">
        <h4>Recommended options:</h4>
        {!setsState.chosenShirts && noRecommendedMessage}
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
            {pantsState.recommendedPants.length > 0 &&
              pantsState.recommendedPants.map((pants, index) => {
                return (
                  <tr key={index}>
                    <td>{pants.id}</td>
                    <td>{pants.color}</td>
                    <td>{pants.size}</td>
                    <td>{pants.brand}</td>
                    <td>
                      <img
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTrjHFxDwtZMQ9F0JCVpll_UHj6RBqXkG0SJQ&usqp=CAU"
                        style={{ width: '100px', height: '100px' }}
                      />
                    </td>
                    <td>
                      <Button
                        variant="success"
                        onClick={() => {
                          relevantFunctions.choosePants(pants)
                          navigate('/createSet/shoes')
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
            <option value={0}>Select size</option>
            <option value={30}>30</option>
            <option value={31}>31</option>
            <option value={32}>32</option>
            <option value={34}>34</option>
            <option value={35}>35</option>
            <option value={36}>36</option>
            <option value={39}>39</option>
            <option value={42}>42</option>
            <option value={43}>43</option>
            <option value={48}>48</option>
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
            {filteredPants.length > 0 &&
              filteredPants.map((pants, index) => {
                return (
                  <tr key={pants.id}>
                    <td>{pants.id}</td>
                    <td>{pants.color}</td>
                    <td>{pants.size}</td>
                    <td>{pants.brand}</td>
                    <td>
                      <img
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTrjHFxDwtZMQ9F0JCVpll_UHj6RBqXkG0SJQ&usqp=CAU"
                        style={{ width: '100px', height: '100px' }}
                      />
                    </td>
                    <td>
                      <Button
                        variant="success"
                        onClick={() => {
                          relevantFunctions.choosePants(pants)
                          navigate('/createSet/shoes')
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

export default ChoosePantsScreen
