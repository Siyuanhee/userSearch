const express = require("express");
const router = express.Router();
const data = require("../data");
const peopleData = data.people;

router.post("/search", async (req,res) =>{
    const name = req.body
    let errors = [];
    if(!name.personName){
        errors.push("No name provided")
    }
    if (errors.length > 0){
        res.status(400)
        res.render("search", {
            status: 400,
            errors: errors,
            hasErrors: true,
        });
        return;
    }

    try{
        const matchingPeople = {
            title: "People Found",
            suppliedName: name.personName,
            personName: await peopleData.searchByName(name.personName)
        }
        if (matchingPeople.personName.length === 0){
            res.render("search", {
                personName: name.personName,
                noMatches: true
            });
            return
        }
        res.render("search",matchingPeople)
    } catch (e) {
        res.status(500).json({ error: e });
    }
})

// router.get("/", async (req, res) => {
//     try {
//         const people = await peopleData.getPeople();
//         res.json(people);
//     } catch (e) {
//         res.status(404).json({ message: "not found!" });
//     }
// });

router.get("/details/:id", async (req, res) => {
    try {
        const person =  Object.assign(await peopleData.getPersonById(parseInt(req.params.id)),{title: "Person Found"})
        res.render("details",person)
    } catch (e) {
        res.status(404).json({ message: "not found!" });
    }
});
module.exports = router