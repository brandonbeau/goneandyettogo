const Destination = require('../models/destination');

module.exports.index = async (req, res) => {
    const destinations = await Destination.find({});
    res.render('destinations/index', { destinations });
}

module.exports.renderNewForm = (req, res) => {
    res.render('destinations/new');
}

module.exports.createDestination = async (req, res, next) => {
    const destination = new Destination(req.body.destination);
    destination.author = req.user._id;
    await destination.save();
    req.flash('success', 'Sucessfully made a new destination!');
    res.redirect(`/destinations/${destination._id}`)
}

module.exports.showDestination = async (req, res,) => {
    const destination = await Destination.findById(req.params.id).populate('author');
    if (!destination) {
        req.flash('error', 'Cannot find that destination!');
        return res.redirect('/destinations');
    }
    res.render('destinations/show', { destination });
}

module.exports.renderEditForm = async (req, res) => {
    const { id } = req.params;
    const destination = await Destination.findById(id)
    if (!destination) {
        req.flash('error', 'Cannot find that destination!');
        return res.redirect('/destinations');
    }
    res.render('destinations/edit', { destination });
}

module.exports.updateDestination = async (req, res) => {
    const { id } = req.params;
    const destination = await Destination.findByIdAndUpdate(id, { ...req.body.destination });
    res.redirect(`/destinations/${destination._id}`)
}

module.exports.deleteDestination = async (req, res) => {
    const { id } = req.params;
    await Destination.findByIdAndDelete(id);
    req.flash('success', 'Sucessfully deleted a destination!');
    res.redirect('/destinations');
}