const express = require('express')
const router = express.Router()
const Subscriber = require('../models/subscriber')


router.get('/', async (req, res) => {
    try{  //rota raiz do subscriber
        const subscribers = await Subscriber.find()
        res.json(subscribers)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
    //res.send('REST API ok.')  //http://localhost:3000/subscribers
})

router.get('/:id', getSubscriber, (req, res) => {
    res.json(res.subscriber)
})

router.post('/', async (req, res) => {
    const subscriber = new Subscriber({
        userName: req.body.userName,
        userChannel: req.body.userChannel
    })

    try {
        const newSubscriber = await subscriber.save()
        res.status(201).json(newSubscriber)
    } catch (error) {
        res.status(400).json({message: error.message})
    }

})

router.patch('/:id', getSubscriber, async (req, res) => {
    if(req.body.userName != null){
        res.subscriber.userName = req.body.userName
    }
    if(req.body.userChannel != null){
        res.subscriber.userChannel = req.body.userChannel
    }
    try {
        const updateSubscriber = await res.subscriber.save()
        res.json(updateSubscriber)
    } catch (error) {
        res.status(400).json({message: error.message})
    }
})

router.delete('/:id', getSubscriber, async (req, res) => {
    try {
        await res.subscriber.remove()
        res.json({message: 'O Subscriber foi apagado'})
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

async function getSubscriber(req, res, next) {
    try {
        subscriber = await Subscriber.findById(req.params.id)  //validará o id, caso já exista a função getSubscriber
        if(subscriber == null){
            return res.status(404).json({message: 'subscriber não encontrado'})
        }
    } catch (error) {
        return res.status(500).json({message: error.message})
    }

    res.subscriber = subscriber
    next()
}

module.exports = router