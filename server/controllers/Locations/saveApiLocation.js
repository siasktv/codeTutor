const axios = require('axios')
const Location = require('../../models/Location.models')
const { URL_API } = process.env;


const getApiData = async () => { 
  try {
    const response = await axios.get(`${URL_API}`)
    const countries = response.data.map((country) => ({
      id: country.cca3,
      name: country.translations.spa.common,
      timezones: country.timezones,
    }));

    return countries
    
  } catch (error) {

        return { error: error.message };
  }
};

const saveApiLocation = async (req, res) => {
  try {
    const allCountries = await getApiData();

    for (const country of allCountries) {
      const existingCountry = await Location.findOne({ id: country.id });

      if (existingCountry) {
        
        await Location.findOneAndUpdate({ id: country.id }, country);
      } else {
        
        await Location.create(country);
      }
    }

    res.status(200).json(allCountries);
  } catch (error) {

    res.status(500).json({ error: error.message });
  }
};

module.exports = saveApiLocation