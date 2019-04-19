const peopleRoutes = require("./people");
const path = require("path");

const constructorMethod = app => {
    app.use("/", peopleRoutes);
    
    app.get("/", function (req, res) {
        res.sendFile(path.resolve("static/homepage.html"))
    })

    app.use("*", (req, res) => {
        res.status(404).json({ error: "Not found" });
    });
};

module.exports = constructorMethod;