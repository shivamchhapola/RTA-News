const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const Parser = require('rss-parser');
const asyncHandler = require('express-async-handler');

const app = express();
const parser = new Parser();
const port = 3069;

// Middleware
app.use(cors());
app.use(bodyParser.json());

const getNews = asyncHandler(async (req, res) => {
  try {
    const source = 'https://feeds.feedburner.com/ndtvnews-top-stories';
    const news = [];

    const feed = await parser.parseURL(source);
    console.log(feed);

    // for (let source in sources) {
    //   const feed = await parser.parseURL(source);
    //   news = [...news, ...feed.items];
    // }

    return res.status(200).send(news);
  } catch (err) {
    console.error('Error parsing feed:', err);
  }
});

// Routes
app.get('/', getNews);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
