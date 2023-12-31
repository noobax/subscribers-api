const express = require('express')
const router = express.Router()

const Subscriber = require('../models/subscriber.js')

router.get('/', async (req, res) => {
	try {
		const subscribers = await Subscriber.find()
		res.json(subscribers)
	} catch(err) {
		res.status(500).json({ message: err.message})
	}
})

router.get('/:id', getSubscriber, (req, res) => {
	res.json(res.subscriber)
})

router.post('/', async (req, res) => {
	try {
		await Subscriber.create(req.body)
		res.status(201).json({ message: 'subscriber saved' })
	} catch(err) {
		res.status(400).json({ message: err.message })
	}
})

router.patch('/:id', getSubscriber, async (req, res) => {
	const newSubscriber = res.subscriber

	if (req.body.name != null)
		newSubscriber.name = req.body.name
	if (req.body.subscribedTo != null)
		newSubscriber.subscribedTo = req.body.subscribedTo
	try {
		res.json(await newSubscriber.save())
	} catch(err) {
		res.status(400).json({ message: err.message })
	}
})

router.delete('/:id', getSubscriber, async (req, res) => {
	try {
		await res.subscriber.deleteOne()
		res.json('subscriber deleted')
	} catch(err) {
		res.status(500).json({ message: err.message })
	}
})

async function getSubscriber(req, res, next) {
	let subscriber
	try {
		subscriber = await Subscriber.findById(req.params.id)
		if (subscriber === null)
			return res.status(404).json({ message: 'Cannot find subscriber' })
	} catch(err) {
		return res.status(500).json({ message: err.message })
	}
	res.subscriber = subscriber
	next()
}

module.exports = router
