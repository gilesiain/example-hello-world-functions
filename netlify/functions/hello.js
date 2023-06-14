import axios from 'axios'

exports.handler = async (event, context) => {
  
  const apiKey = process.env.xata_api_key;
  
  const options = {
  headers: {Authorization: `Bearer` + apiKey, 'Content-Type': 'application/json'},
  body: '{"name":"string","email":"a@b.com","bio":"longer text"}'
};
  
  try {
    const response = await axios.post('https://iain-giles-s-workspace-89n65g.eu-west-1.xata.sh/db/deadly:main/tables/Users/data?columns=id',options);
    
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
