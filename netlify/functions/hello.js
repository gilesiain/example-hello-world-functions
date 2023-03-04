import axios from 'axios'

exports.handler = async (event, context) => {
  const data = {
    body: '{"page":{"size":15}}'
  };
  
  try {
    const response = await axios.post('https://iain-giles-s-workspace-89n65g.eu-west-1.xata.sh/db/deadly:main/tables/Users/query', data, {
      headers: {
        Authorization: 'Bearer eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJodHRwczovL3hhdGEuaW8iLCJzdWIiOiJ1c3JfZ2ttMDBlcWw2dDdrMWNvcjd0OHJtMW82YzQiLCJleHAiOjE2Nzc5Njc4MjEsImlhdCI6MTY3Nzk2NjkyMSwid29ya3NwYWNlcyI6eyI4OW42NWciOnsicm9sZSI6Im93bmVyIn19fQ.9B5UbrMmIbgAMi49tVa2EvtvOa7yMhfz-fYgVbE_djn5b6x_wHb5eaTbSpGHXkgswhLJ-LZBjx4pO23kWei9Bg',
    'Content-Type': 'application/json'
      }
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
