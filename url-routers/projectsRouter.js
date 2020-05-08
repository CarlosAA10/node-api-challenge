const express = require('express'); 

const Proj = require('../data/helpers/projectModel'); 


const router = express.Router(); 

router.get('/', (req,res) => {
    Proj.get() 
    .then (projects => {
        res.status(200).json(projects); 
    })
    .catch(error => {
        res.status(500).json({ errorMessage: "Could not retrieve projects", specificError: error.message })
    })
}); 

router.get('/:id', (req,res) => {
    const id = req.params.id; 

    Proj.get(id)
    .then(project => {
        res.status(200).json(project); 
    })
    .catch(err => {
        console.log(err); 
        res.status(500).json({ errorMessage: "Sorry, could not render project", specificError: err.message })
    })
}); 

router.get('/:id/actions', (req,res) => {
    const id = req.params.id; 
    Proj.getProjectActions(id) 
    .then(actions => {
        res.status(200).json(actions); 
    })
    .catch(err => {
        res.status(500).json({ errorMessage: "Sorry, could not render actions", specificError: err.message })
    })
})

router.post('/', (req,res) => {
    Proj.insert(req.body) 
    .then(addedProj => {
        res.status(201).json(addedProj); 
    })
    .catch(err => {
        res.status(500).json({ errorMessage: "sorry, error in adding project", specificError: err.message })
    })
})

// router.post('/:id/actions', (req,res) => {
//     // will be needed when you create your middle ware
//     const id = req.params.id; 

//     Act.insert(req.body)
//     .then(action => {
//         res.status(201).json(action); 
//     })
//     .catch(err => {
//         res.status(500).json({ errorMessage: "Sorry, could not save action to database", specificError: err.message })
//     })
// })

router.delete('/:id', (req, res) => {
    const id = req.params.id; 

    Proj.remove(id)
    .then(delProj => {
        res.json(delProj); 
    })
    .catch(err => {
        res.status(500).json({ errorMessage: "Sorry, Could not delete the project", specificError: console.log(err.message,'the error')})
    })
})

router.put('/:id', (req,res) => {
    const id = req.params.id; 

    Proj.update(id, req.body)
    .then(updatedProj => {
        res.status(201).json(updatedProj); 
    })
    .catch(err => {
        res.status(500).json({ errorMessage: "Sorry, could not update the project", specificError: err.message })
    })
})

module.exports = router; 
