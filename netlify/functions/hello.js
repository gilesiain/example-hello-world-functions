var api = 'Bearer ' + process.env.xata_api_key
    const options = {
  method: 'POST',
  headers: {Authorization: api, 'Content-Type': 'application/json'},
  body: '{"name":"string","email":"a@b.com","bio":"longer text"}'
};

fetch('https://iain-giles-s-workspace-89n65g.eu-west-1.xata.sh/db/deadly:main/tables/Users/data?columns=id', options)
  .then(response => response.json())
  .then(response => console.log(response))
  .catch(err => console.error(err));
</script>
