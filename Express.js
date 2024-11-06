const express = require("express");
const data = require("./MOCK_DATA.json");
let app = express();
const PORT = 8000;

app.get("/", (req, res) => {
  res.send("home page");
});

app
  .route("/api/users/:id")
  .get((req, res) => {
    let id = parseInt(req.params.id);
    console.log(id);
    let specData = data.filter((i) => {
      // console.log(i)
      return i.id == id;
    });
    // console.log(specData)
    res.json(specData);
  })
  .post((req, res) => {
    res.json({status:"pending"}
    )
  })
  .delete((req, res) => {
    res.json({status:"pending"}
    )
  });

app.get("/api/users/:id", (req, res) => {
  let id = parseInt(req.params.id);
  console.log(id);
  let specData = data.filter((i) => {
    // console.log(i)
    return i.id == id;
  });
  // console.log(specData)
  res.json(specData);
});

app.get("/users/:id", (req, res) => {
  const html = `
    <ul>
        ${data
          .map((obj) => {
            return `<li> ${obj.first_name}</li>`;
          })
          .join("")}
    </ul>
    `;
  res.send(html);
});

app.post();

app.listen(PORT, () => console.log("Server started succcessfully"));
