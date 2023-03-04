const axios = require('axios')

const API_ENDPOINT = 'https://jsonplaceholder.typicode.com/todos/1'

exports.handler = async (event, context) => {
  let response
  try {
    response = await axios.get(API_ENDPOINT)
  } catch (err) {
    return {
      statusCode: err.statusCode || 500,
      body: JSON.stringify({
        error: err.message
      })
    }
  }

  return {
    statusCode: 200,
    body: JSON.stringify({
      data: response.data
    })
  }
}
