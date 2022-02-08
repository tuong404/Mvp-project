const Project = require('../models/project.model');
const Chart = require('../models/chart.model');
const Metric = require('../models/metrics.model');
const TokenAllocation = require('../models/tokenallocation.model');
const TokenCirculation = require('../models/tokencirculation.model');
const New = require('../models/news.model');
const Wallet = require('../models/wallet.model');
const Exchange = require('../models/exchange.model');

const request = require('request');


class ProjectController {

    // Projects
    show(req, res, next) {
        Project.find({})
            .then(projects => res.json(projects))
            .catch(next)
    }

    // Hot Project
    hotProject(req, res, next) {
        Project.find({})
            .then(projects => res.json(projects))
            .catch(next)
    }

    // Search
    search(req, res, next) {
        const contentSearch = req.query.content;

        Project.find({ name: { $regex: contentSearch, $options: '$i' } })
            .then((projects) => {
                if (projects) {
                    res.json(projects);
                } else {
                    res.json(null);
                }
            })
            .catch(next)
    }

    // Project detail
    detail(req, res, next) {
        Project.findById({ _id: req.params.id })
            .then(project => res.json(project))
            .catch(next)
    }

    // Chart
    chart(req, res, next) {
        Project.findOne({ _id: req.params.id })
            .then((project) => {
                const nameProject = project.name.toLowerCase();
                const newurl = `https://api.coingecko.com/api/v3/coins/${nameProject}/market_chart?vs_currency=usd&days=1`;
                request(newurl).pipe(res);
            })
            .catch(next)
    }

    // Key-metrics
    metrics(req, res, next) {
        Metric.findOne({ idProject: req.params.id })
            .then(metric => res.json(metric))
            .catch(next)
    }

    // token-allocation

    tokenAllow(req, res, next) {
        TokenAllocation.findOne({ idProject: req.params.id })
            .then(allow => res.json(allow))
            .catch(next)
    }

    // token-circulation
    tokenCri(req, res, next) {
        TokenCirculation.findOne({ idProject: req.params.id })
            .then(cir => res.json(cir))
            .catch(next)
    }

    // news
    news(req, res, next) {
        New.findOne({ idProject: req.params.id })
            .then(news => res.json(news))
            .catch(next)
    }

    // wallet
    wallet(req, res, next) {
        Wallet.findOne({ idProject: req.params.id })
            .then(wallet => res.json(wallet))
            .catch(next)
    }

    // exchang
    exchange(req, res, next) {
        Exchange.findOne({ idProject: req.params.id })
            .then(exchange => res.json(exchange))
            .catch(next)
    }



}

module.exports = new ProjectController;