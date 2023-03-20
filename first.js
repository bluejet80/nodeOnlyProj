import { readFile, readFileSync } from "fs";
import http from "http"; //for server
import url from "url"; // for routing
import path from "path";

const __dirname = path.resolve();

//First thing, get data from file, store it in project

const data = readFileSync(`${__dirname}/files/data.json`, "utf-8");
const jsonData = JSON.parse(data); //convert to Javascript Object

// GetDate Function
const getDate = function () {
  const months = ["Jan", "Feb", "Mar", "Apr", "May"];
  const weekDay = ["Sun", "Mon", "Tue", "Wed", "Thur"];
  const date = new Date();
  const dayName = date.getDay();
  const month = date.getMonth();
  const day = date.getDate();
  const year = date.getFullYear();
  return `${weekDay[dayName]} ${months[month]} ${day}, ${year}`;
};

//SERVER

//Very Basic Server and Routing
const PORT = 3000;

const server = http.createServer((req, res) => {
  const pathName = req.url;
  if (pathName === "/") {
    const homeHTML = `
    <div>
    <h1>This is the Home Page</h1>
    </div>
    `;
    res.writeHead(200, {
      "Content-type": "text/html",
      "my-own-header": "hello-world",
      "my-date": `${getDate()}`,
    });
    res.end(homeHTML);
  } else if (pathName === "/user") {
    const userHTML = `
        <div>
        <h1>This is the User Page.</h1>
        </div
        `;
    res.writeHead(200, {
      "Content-type": "text/html",
      "my-own-header": "hello-world",
    });
    res.end(userHTML);
  } else if (pathName === "/computer") {
    res.writeHead(200, {
      "Content-type": "application/json",
    });
    res.end(data);
  } else if (pathName === "/contact") {
    const contactHTML = `
        <div>
        <h1>This is the Contact page.</h1>
        </div>
        `;
    res.writeHead(200, {
      "Content-type": "text/html",
      "my-own-header": "hello-world",
    });
    res.end(contactHTML);
  } else {
    const errHTML = `
    <div>
    <h1>Page Not found!</h1>
    </div>
    `;
    res.writeHead(404, {
      "Content-type": "text/html",
      "my-own-header": "hello-world",
    });
    res.end(errHTML);
  }
});

// Initialize Server

server.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
