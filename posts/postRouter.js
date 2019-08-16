const express = require('express');
const db = require('./postDb')
const router = express.Router();

router.get('/', async (req, res) => {
    try{
        const posts = await db.get();
    res.status(200).json(posts);
    } catch (err) {
        res.status(500).json({error: "Cannot GET"})
    }
});

router.get('/:id', validateId, async (req, res) => {
    const {id} = req.params
    try{
        const posts = await db.getById(id);
    res.status(200).json(posts);
    } catch (err) {
        res.status(500).json({error: "Cannot GET"})
    }
});

router.delete('/:id', async (req, res) => {
    const {id} = req.params
    try{
        const posts = await db.remove(id);
    res.status(200).json({delete: `Deleted ${id} successfully`});
    } catch (err) {
        res.status(500).json({error: "Cannot DEL"})
    }
});

router.put('/:id', async (req, res) => {
    const {id} = req.params
    const {text} = req.body
    try{
        const posts = await db.update(id, {text});
    res.status(200).json({updated: "Post successfully updated."});
    } catch (err) {
        res.status(500).json({error: "Cannot PUT"})
    }
});

// custom middleware
async function validateId(req, res, next) {
    const { id } = req.params;
    try{
        const user = await db.getById(id)
        if (user) {
            req.user = user
            next()
        } else {
            res.status(404).json({error: 'Resource not found'})
        }
    } catch(err) {
        res.status(500).json({error: 'Unable to validate user'});
    }
};

module.exports = router;