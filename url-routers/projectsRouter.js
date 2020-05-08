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

router.get('/:id', validateProjectId, (req,res) => {
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

router.get('/:id/actions', validateProjectId,(req,res) => {
    const id = req.params.id; 
    Proj.getProjectActions(id) 
    .then(actions => {
        res.status(200).json(actions); 
    })
    .catch(err => {
        res.status(500).json({ errorMessage: "Sorry, could not render actions", specificError: err.message })
    })
})

router.post('/', validateProject,(req,res) => {
    Proj.insert(req.body) 
    .then(addedProj => {
        res.status(201).json(addedProj); 
    })
    .catch(err => {
        res.status(500).json({ errorMessage: "sorry, error in adding project", specificError: err.message })
    })
})

router.delete('/:id', validateProjectId, (req, res) => {
    const id = req.params.id; 

    Proj.remove(id)
    .then(delProj => {
        res.json(delProj); 
    })
    .catch(err => {
        res.status(500).json({ errorMessage: "Sorry, Could not delete the project", specificError: console.log(err.message,'the error')})
    })
})

router.put('/:id', validateProjectId, (req,res) => {
    const id = req.params.id; 

    Proj.update(id, req.body)
    .then(updatedProj => {
        res.status(201).json(updatedProj); 
    })
    .catch(err => {
        res.status(500).json({ errorMessage: "Sorry, could not update the project", specificError: err.message })
    })
})

// middleware 

function validateProjectId(req,res,next) {

    const id = req.params.id; 
    Proj.get()
    .then(projects => {

        const findProjects = projects.find(project => project.id == id); 

        if(!findProjects) {
            res.status(400).json({ message: "Invalid project id"})
        }
        else {
            req.user = findProjects; 
            next()
        }
    })
    .catch(err => {
        res.status(500).json({ errorMessage: "Sorry, could not retrieve projects", specificError: err.message })
    })
}

function validateProject(req,res,next) {
    const { name, description } = req.body; 

    if(Object.keys(req.body).length > 0) {

        if(!name || !description) {
            res.status(400).json({ errorMessage: "Missing required name or description field."}); 
        }
        else {
            next(); 
        }
    }
    else {
        res.status(400).json({ errorMessage: "Missing project data"})
    }
}

module.exports = router; 
