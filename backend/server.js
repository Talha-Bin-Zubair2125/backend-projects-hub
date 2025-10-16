const express = require("express");
const cors = require("cors");
// importing the nanoid and by destructing (we extract a function nanoid() and via this we generate uniqueid's)
const { nanoid } = require("nanoid");
// via nanoid i generate id's of length 6
const shortid = nanoid(6);
const url = require("url");
const { log } = require("console");
const app = express();
app.use(cors());
app.use(express.json());

// it stores the mapping frontend sends a longurl and the url is stored at shortid in url_mapping obj so when we wnat to redirect backend searches it in url_mapping
const url_mapping = {};
const port = 3000;

// Default Route -- (/)
app.get("/", (req, res) => {
  res.send("Hey There I Am Backend");
});

// Route for Shortening the URL (/shortURL) -- POST

app.post("/ShortURL", (req, res) => {
  let data_from_frontend = req.body;
  // For Debugging
  console.log(data_from_frontend);

  /*
        if i use req.url it gives me the path part 
        and path consists of path + querystring
        and pathname consists of only path

    */
  let myurl = url.parse(data_from_frontend.URL_SHORTNING, true);

  // Used for Debugging
  console.log(myurl);
  console.log(myurl.pathname);

  // Adding Property
  url_mapping[shortid] = data_from_frontend.URL_SHORTNING;

  /*
        // it stores the pathname
        let path_name = shortid;
        console.log(path_name);
    */

  // Generating New URL
  const new_url = `http://localhost:3000/${shortid}`;
  res.json({ New_URL: new_url });

  /* it is giving me error 404 because of no-mapping */
});

// when a new url is generated it extracts the shortid and finds it in url_mapping obj

app.get("/:shortid", (req, res) => {
  const shortid = req.params.shortid;
  console.log("Hey", shortid);

  const originalUrl = url_mapping[shortid];

  if (originalUrl) {
    res.redirect(originalUrl);
  } else {
    res.status(404).send("No mapping found for this short URL");
  }
});

app.listen(port, () => {
  console.log(`Server is Running On Port ${port}`);
});
