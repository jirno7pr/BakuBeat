var express = require('express');
var router = express.Router();
var request = require('request');
var music = require('../public/js/music');
/* GET home page. */

router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express',session: req.session.passport });
});

router.get('/select', function(req, res, next) {
    res.render('select', {music: music.g_music, title: 'Express',session: req.session.passport });
});

router.get('/game/:id', function(req, res, next) {
    console.log(music.g_music[req.params.id]);
    res.render('game', {music: music.g_music[req.params.id], title: 'Express',session: req.session.passport });
});

router.get('/select', function(req, res, next) {
    res.render('select', { title: 'Express',session: req.session.passport });
});
module.exports = router;