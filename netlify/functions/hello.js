import axios from 'axios'

exports.handler = async (event, context) => {
  
  var apiKey = 'Bearer ' + process.env.xata_api_key;
  
  try {
   const response = await axios({
    method: 'put',
    url: 'https://iain-giles-s-workspace-89n65g.eu-west-1.xata.sh/db/deadly:main/tables/Users/data?columns=id',
    data: {
        headers: {Authorization: apiKey, 'Content-Type': 'application/json'},
      body: '{"name":"string","email":"a@b.com","bio":"longer text"}'
    }
});
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
