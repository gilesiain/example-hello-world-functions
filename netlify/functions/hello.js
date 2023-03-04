import axios from 'axios'

exports.handler = async (event, context) => {
  
  const apiKey = process.env.MY_API_KEY;
  
  try {
    const response = await axios.post(
      'https://iain-giles-s-workspace-89n65g.eu-west-1.xata.sh/db/deadly:main/tables/Users/query',
      {
        page: { size: 15 }
      },
      {
        headers: {
          Authorization: 'Bearer ${apiKey}',
          'Content-Type': 'application/json'
        }
      }
    );
    
    return {
      statusCode: 200,
      body: JSON.stringify(response.data)
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify(error.response.data)
    };
  }
};
