const axios = require('axios');
const Dev = require('../models/Dev');

module.exports = {
  async store(request, response) {
    // Forma de fazer debug dentro do node
    // console.log(request.body);

    const { github_username, techs, latitude, longitude } = request.body;

    let dev = await Dev.findOne({ github_username });

    if (!dev) {
      const apiResponse = await axios.get(`https://api.github.com/users/${github_username}`);

      const { name = login, avatar_url, bio } = apiResponse.data;

      // Map: Percorre um array, similar ao foreach
      const techsArray = techs.split(',').map(tech => tech.trim());

      const location = {
        type: 'Point',
        coordinates: [longitude, latitude],
      };

      dev = await Dev.create({
        github_username,
        name,
        avatar_url,
        bio,
        techs: techsArray,
        location
      })

    }

    // continuar
    return response.json(dev);
  }
}