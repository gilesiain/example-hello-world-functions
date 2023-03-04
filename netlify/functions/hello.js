import axios from 'axios'

exports.handler = async (event, context) => {
  
  try {
    const response = await axios.post('https://iain-giles-s-workspace-89n65g.eu-west-1.xata.sh/db/deadly:main/tables/Users/query', {
      headers: {
        Authorization: 'Bearer xau_HYYuCnlGvu8BMIWTOD2eMPiUWLSipIx04',
        'Content-Type': 'application/json'
      },
      body: '{"page":{"size":15}}'
    });
    
    return {
      statusCode: 200,
      body: JSON.stringify(response.data)
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: error.message
    };
  }
};
