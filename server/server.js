'use strict';

const express = require('express');
const app = express();
const jwt = require('express-jwt');
const jwks = require('jwks-rsa');
const cors = require('cors');
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

const authCheck = jwt({
  secret: jwks.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: "https://{YOUR-AUTH0-DOMAIN}/.well-known/jwks.json"
    }),
    // This is the identifier we set when we created the API
    audience: '{API-IDENTIFIER}',
    issuer: "{YOUR-AUTH0-DOMAIN}",
    algorithms: ['RS256']
});

app.get('/api/activities', (req, res) => {
  let whistleBlowerActivities = [
  {
    title: '200 Million dollars cash found in Burger King, Utah',
    location: 'Salt Lake City, Utah, America'
  },
  {
    title: '52 billion naira found by EFCC in a Bungalow in Ikoyi',
    location: 'Lagos, Nigeria',
  },
  {
    title: '2 Million Kenyan Shillings found in Yaya Supermarket laundry',
    location: 'Nairobi, Kenya',
  },
  {
    title: '10 Ferraris discovered in underground apartment in Bueno Aires',
    location: 'Bueno Aires, Argentina',
  },
  {
    title: 'Central Bank Printing Machine found in a church at Guanajuato',
    location: 'Guanajuato, Mexico',
  },
  {
    title: "32 Million Cedis cash found in Senator Daula's home in Accra",
    location: 'Accra, Ghana',
  }];

  res.json(whistleBlowerActivities);
})

app.get('/api/whistleblowers', (req,res) => {
  let whistleBlowers = [
  {
    id: 1111,
    name: 'Mark Fish',
    level: 'Junior Whistle Blower',
    avatar: 'http://svgavatars.com/style/svg/11.svg',
    uncoveredSpoils: 2
  },
  {
    id: 1112,
    name: 'Garly Sticker',
    level: 'Intermediate Whistle Blower',
    avatar: 'http://svgavatars.com/style/svg/01.svg',
    uncoveredSpoils: 10
  },
  {
    id: 1113,
    name: 'Prosper Otemuyiwa',
    level: 'Senior Whistle Blower',
    avatar: 'http://svgavatars.com/style/svg/15.svg',
    uncoveredSpoils: 186
  },
  {
    id: 1114,
    name: 'Lovelyn Tigereek',
    level: 'Intermediate Whistle Blower',
    avatar: 'http://svgavatars.com/style/svg/02.svg',
    uncoveredSpoils: 25
  },
  {
    id: 1115,
    name: 'Thank-God Okogbulor',
    level: 'Senior Whistle Blower',
    avatar: 'http://svgavatars.com/style/svg/03.svg',
    uncoveredSpoils: 174
  }];

  res.json(whistleBlowers);
})

app.get('/api/meetups', (req,res) => {
  let meetups = [
  {
    name: 'WhistleBlower London Meetup',
    date: '25, May 2017'
  },
  {
    name: 'WhistleBlower Lagos Meetup',
    date: '5, August 2017'
  },
  {
    name: 'WhistleBlower Nairobi Meetup',
    date: '15, September 2017'
  },
  {
    name: 'WhistleBlower Utah Meetup',
    date: '20, August 2017'
  },
  {
    name: 'WhistleBlower Oslo Meetup',
    date: '7, October 2017'
  }];

  res.json(meetups);
})

app.listen(3333);
console.log('Listening on localhost:3333');