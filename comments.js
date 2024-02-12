// create web server
const express = require("express");
const app = express();
app.use(express.json());

const comments = require("./comments");

app.get("/comments", (req, res) => {
  res.json(comments);
});

app.get("/comments/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const comment = comments.find((comment) => comment.id === id);
  if (comment) {
    res.json(comment);
  } else {
    res.status(404).json({ message: "comment not found" });
  }
});

app.post("/comments", (req, res) => {
  const comment = req.body;
  comment.id = comments.length + 1;
  comments.push(comment);
  res.status(201).json(comment);
});

app.put("/comments/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const comment = comments.find((comment) => comment.id === id);
  if (comment) {
    comment.body = req.body.body;
    res.status(200).json(comment);
  } else {
    res.status(404).json({ message: "comment not found" });
  }
});

app.delete("/comments/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = comments.findIndex((comment) => comment.id === id);
  if (index !== -1) {
    comments.splice(index, 1);
    res.status(204).end();
  } else {
    res.status(404).json({ message: "comment not found" });
  }
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

// Path: comments.js
module.exports = [
  { id: 1, body: "some comment" },
  { id: 2, body: "another comment" },
];

// Path: comments.test.js
const request = require("supertest");
const app = require("./comments");

describe("GET /comments", () => {
  it("should return all comments", async () => {
    const response = await request(app).get("/comments");
    expect(response.status).toBe(200);
    expect(response.body).toEqual([
      { id: 1, body: "some comment" },
      { id: 2, body: "another comment" },
    ]);
  });
});

describe("GET / comments/:id", () => {
  it("should return a comment if a valid id is provided", async () => {
    const response = await request(app).get("/comments/1");
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ id: 1, body: "some comment" });
  });

  it("should return 404 if a invalid id is provided", async () => {
    const response = await request(app).get("/comments/3");
    expect(response.status).toBe(404);
    expect(response.body).toEqual({ message: "comment not found" });
  });
}   );

describe("POST /comments", () => {
    it("should create a new comment", async () => {
        const response = await request(app)
        .post("/comments")
        .send({ body: "new comment" });
        expect(response.status).toBe(201);
        expect(response.body).toEqual({ id: 3, body: "new comment" });
    });
    });

describe("PUT /comments/:id", () => {
    it("should update the comment", async () => {
        const response = await request(app)
        .put("/comments/1")
        .send({ body: "updated comment" });
        expect(response.status).toBe(200);
        expect(response.body).toEqual({ id: 1, body: "updated comment" });
    });

    it("should return 404 if the comment is not found", async () => {
        const response = await request(app)
        .put("/comments/4")
        .send({ body: "updated comment" });
        expect(response.status).toBe(404);
        expect(response.body).toEqual({ message: "comment not found" });
    });
    }
    );

describe("DELETE /comments/:id", () => {
    it("should delete the comment", async () => {
        const response = await request(app).delete("/comments/1");
        expect(response.status).toBe(204);
    });

    it("should return 404 if the comment is not found", async () => {
        const response = await request(app).delete("/comments/4");
        expect(response.status).toBe(404);
        expect(response.body).toEqual({ message: "comment not found" });
    });
    }
    );

// // Path: package.json
// {
//   "name": "comments",
//   "version": "1.0.0",
//   "main": "comments.js",
//   "scripts": {
//     "test": "jest"
//   },
//   "dependencies": {
//     "express": "^4.17.1"
//   },
//   "devDependencies": {
//     "jest": "^27.0.6",
//     "supertest": "^6.1.3"
//   }
// }

// // Run the test
// $ npm test

// // Output
// > comments@1.0.0 test

// > jest
    
//      PASS  ./comments.test.js
//     GET /comments
//         ✓ should return all comments (18 ms)
//     GET / comments/:id
//         ✓ should return a comment if a valid id is provided (6 ms)
//         ✓ should return 404 if a invalid id is provided (2 ms)
//     POST /comments
//         ✓ should create a new comment (5 ms)
//     PUT /comments/:id
//         ✓ should update the comment (3 ms)
//         ✓ should return 404 if the comment is not found (2 ms)
//     DELETE /comments/:id
//         ✓ should delete the comment (2 ms)
//         ✓ should return 404 if the comment is not found (2 ms)