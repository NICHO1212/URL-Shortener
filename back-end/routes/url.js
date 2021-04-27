const express = require('express');
const router = express.Router();
const Url = require('../models/Url');
const verifyJWT = require('./verifyJWT');
const {addUrlValidation} = require('../validation');

//SHORT URL GENERATOR
const get_short_url = size => {
  let result = '';
  let abc = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 
    'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 
    'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 
    'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 
    'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
  for (let n = 0; n < size; n++) {
    result += abc[Math.floor(Math.random() * abc.length)];
  }
  return result;
}

//ALL URLS
router.get('/', async (req, res) => {
  try {
    const urls = await Url.find();
    return res.status(200).send(urls);
  } catch (error) {
    return res.status(400).send('Oops! Something went wrong');
  };
});

//ADD AN URL TO DB
router.post('/add_url', async (req, res) => {

  //VALIDATE INPUTS
  const {error} = addUrlValidation(req.body);
  if (error) { return res.status(400).send(error.details[0].message); }

  //VALIDATE IF URL IS IN DB
  var url = await Url.findOne({url: req.body.url});
  if (url) return res.status(200).send({url: url.url, short_url: url.short_url});

  //VALIDATES IF NEW SHORT URL IS IN DB 
  //TRIES 10 TIMES AND RAISE SHORT URL SIZE
  var short_url = get_short_url(6);
  url = await Url.findOne({short_url: short_url});
  var size = 6;
  var count = 0
  while (url) {
    count++;
    if (count >= 10) {
      size++;
      count = 0;
    }
    short_url = get_short_url(size);
    url = await Url.findOne({short_url: short_url});
  }

  //SAVES NEW URL MODEL
  url = new Url({
    url: req.body.url,
    short_url: short_url
  });
  try {
    url = await url.save();
    return res.status(200).send({url: url.url, short_url: url.short_url});
  } catch (err) {
    return res.status(400).send('Oops! Something went wrong');
  };
});

//GET ORIGINAL URL
router.get('/:short_url', async (req, res) => {
  try {
    //VALIDATE IF URL IS IN DB
    var url = await Url.findOne({short_url: req.params.short_url});
    if (url) {
      //UPDATE THE COUNT
      var updatedUrl = await Url.updateOne(
        {short_url: req.params.short_url},
        {$set: {
            count: url.count + 1
          }
        }
      );
      return res.status(200).send({url: url.url});
    }
    return res.status(404).send('Url not found!');
  } catch (err) {
    return res.status(400).send('Oops! Something went wrong');
  };
});

module.exports = router;