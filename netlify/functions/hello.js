// hello there!
// 
// I'm a serverless function that you can deploy as part of your site.
// I'll get deployed to AWS Lambda, but you don't need to know that. 
// You can develop and deploy serverless functions right here as part
// of your site. Netlify Functions will handle the rest for you.


exports.handler = async event => {
    const options = {
  method: 'POST',
  headers: {Authorization: 'Bearer xau_HYYuCnlGvu8BMIWTOD2eMPiUWLSipIx04', 'Content-Type': 'application/json'},
  body: '{"page":{"size":15}}'
};

fetch('https://iain-giles-s-workspace-89n65g.eu-west-1.xata.sh/db/deadly:main/tables/Users/query', options)
  .then(response => response.json())
  .then(response => console.log(response))
  .catch(err => console.error(err));
    return {
        statusCode: 200,
        body: `Hello ${subject}!`,
    }
}


