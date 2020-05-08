const express = require('express'); 

const Act = require('../data/helpers/actionModel'); 

const router = express.Router(); 

router.get('/', (req,res) => {
    Act.get() 
    .then(actions => {
        res.status(200).json(actions); 
    })
    .catch(err => {
        res.status(500).json({  errorMessage: "Sorry, could not retrieve actions", specificError: err.message})
    })
})

router.get('/:id', validateActionId,  (req,res) => {
    const id = req.params.id; 

    Act.get(id) 
    .then(actions => {
        res.status(200).json(actions); 
    })
    .catch(err => {
        res.status(500).json({  errorMessage: "Sorry, could not retrieve that action", specificError: err.message})
    })
})

router.post('/', validateActionPost, (req,res) => {
    Act.insert(req.body)
    .then(action => {
        res.status(201).json(action)
    })
    .catch(err => {
        res.status(500).json({  errorMessage: "Sorry, Could not add that action", specificError: err.message })
    })
})

router.put('/:id', validateActionId, (req,res) => {
    const id = req.params.id; 
    Act.update(id, req.body)
    .then(updatedAct => {
        res.status(201).json(updatedAct)
    })
    .catch(err => {
        res.status(500).json({ errorMessage: "Sorry, could not update that action", specificError: err.message })
    })
})

router.delete('/:id', validateActionId, (req,res) => {
    const id = req.params.id; 

    Act.remove(id)
    .then(delAct => {
        res.json(delAct); 
    })
    .catch(err => {
        res.status(500).json({ errorMessage: "Sorry, could not delete that action", specificError: err.message })
    })
})


// middleware 

function validateActionId(req,res,next) {

    const id = req.params.id; 

    Act.get()
    .then(actions => {
        const findActions = actions.find(action => action.id == id)

        if (!findActions) {
            res.status(400).json({ message: "invalid action id"})
        }
        else {
            req.user = findActions; 
            next(); 
        }
    })
    .catch(err => {
        console.log(err); 
        res.status(500).json({ errorMessage: "could not get users", specificError: err.message})
    })
}

function validateActionPost(req,res,next) {

    const { project_id, description, notes } = req.body; 
    // if the above doesn't work, use just req.body.project_id, etc etc. 

    if (Object.keys(req.body).length > 0) {
        if(!project_id || !description || !notes) {
            res.status(400).json({ errorMessage: "Missing required project id, description, or notes. please fill these fields out"})
        }
        else {
            if(description.length <= 128) {
                next(); 
            }
            else {
                res.status(400).json({ errorMessage: "Description can only be 128 characters long"})
            }
        }
    }
    else {
        res.status(400).json({ errorMessage: "Missing post data"})
    }
}





module.exports = router; 