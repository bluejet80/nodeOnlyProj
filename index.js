import { readFileSync } from "fs";
import http from "http"; //for server
import url from "url"; // for routing
import path from "path";

const __dirname = path.resolve();

// pull in the data from all the files

const mainTemp = readFileSync(
  `${__dirname}/templates/main_template.html`,
  "utf-8"
);
const bookCard = readFileSync(
  `${__dirname}/templates/bookCard_template.html`,
  "utf-8"
);

// get the dataset

const mainData = readFileSync(`${__dirname}/files/fullData.json`);
const mainDataObject = JSON.parse(mainData);

//functions

const fillInFunction = function (template, item) {
  let output = template.replace("{@COVER@}", item.cover);
  output = output.replace("{@NAME@}", item.name);
  output = output.replace("{@DATE@}", item.date);
  output = output.replace("{@PAGES@}", item.pages);
  if (item.order[0] === 0)
    output = output.replace("{@COLOR@}", "bg-greengrey-100");
  if (item.order[0] === 1)
    output = output.replace("{@COLOR@}", "bg-redgrey-100");
  if (item.order[0] === 2)
    output = output.replace("{@COLOR@}", "bg-bluegrey-100");

  return output;
};

// create server
const server = http.createServer((req, res) => {
  const { pathname } = url.parse(req.url, true);
  const fileArr = pathname.split("/");
  const folder = fileArr[1];
  //   console.log(folder);
  //   console.log(pathname);

  const array1 = [],
    array2 = [],
    array3 = [];

// setup routing
  if (pathname === "/") {
    res.writeHead(200, { "Content-Type": "text/html" });

    const cardHTML = mainDataObject.map((item) => {
      if (item.order[0] === 0) {
        array1.push(fillInFunction(bookCard, item));
      } else if (item.order[0] === 1) {
        array2.push(fillInFunction(bookCard, item));
      } else if (item.order[0] === 2) {
        array3.push(fillInFunction(bookCard, item));
      }
    });

    const part1 = array1.join("");
    const part2 = array2.join("");
    const part3 = array3.join("");

    let output = mainTemp.replace("{@SECTION1@}", part1);
    output = output.replace("{@SECTION2@}", part2);
    output = output.replace("{@SECTION3@}", part3);

    res.write(output);
    res.end();
// handle multiple requests
  } else if (pathname === "/images/title_back4.jpg") {
    const fileToLoad = readFileSync(`${__dirname}${req.url}`);
    res.writeHead(200, { "Content-Type": "image/jpg" });
    res.end(fileToLoad, "binary");
  } else if (folder === "covers") {
    const fileToLoad = readFileSync(`${__dirname}${req.url}`);
    res.writeHead(200, { "Content-Type": "image/jpg" });
    res.end(fileToLoad, "binary");
  } else {
    res.end();
  }
});


// initialize server

const PORT = 3030;

server.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}...`);
});
