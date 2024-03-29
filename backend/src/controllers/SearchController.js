const Dev = require('../models/Dev');
const parseStringAsArray = require('../utils/parseStringAsArray');

module.exports = {
  async index(request, response) {
    const { latitude, longitude, techs } = request.query;

    const techsArray = parseStringAsArray(techs);

    // Filtro de tecnologias
    // Querys do MongoDB
    const devs = await Dev.find({
      techs: {
        $in: techsArray,
      },      
      location: {
        $near: {
          $geometry: {
            type: 'Point',
            coordinates: [longitude, latitude],
          },
          $maxDistance: 10000,
        },
      },
    });

    return response.json({ devs });
  }
}

    // console.log(request.query);
    // Buscar todos devs num raio de 10Km
    // Filtrar por tecnologias