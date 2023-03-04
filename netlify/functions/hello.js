import axios from 'axios'

exports.handler = async (event, context) => {
  
  try {
    const response = await axios.post(
      'https://iain-giles-s-workspace-89n65g.eu-west-1.xata.sh/db/deadly:main/tables/Users/query',
      {
        page: { size: 15 }
      },
      {
        headers: {
          Authorization: 'Bearer eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJodHRwczovL3hhdGEuaW8iLCJzdWIiOiJ1c3JfZ2ttMDBlcWw2dDdrMWNvcjd0OHJtMW82YzQiLCJleHAiOjE2Nzc5Njg4NjIsImlhdCI6MTY3Nzk2Nzk2Miwid29ya3NwYWNlcyI6eyI4OW42NWciOnsicm9sZSI6Im93bmVyIn19fQ.WklRAugGyb1u2eqUd6YAz-vCPN2vAc3z1W9YpttP3_URIxShVkZDh1HwRlEu_0oCJmXg5Vx3tST1V1H6abVJAA',
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
