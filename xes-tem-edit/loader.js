'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.load = load;
exports.getAnimation = getAnimation;
exports.getSound = getSound;
exports.createSprite = createSprite;
exports.getOptionTexture = getOptionTexture;
exports.getTexture = getTexture;

var _pixi = require('pixi.js');

var PIXI_SPINE = require('pixi-spine');
var loader = PIXI.loader;
function load() {
    if (!window.res) {
        console.info(1);
        return new Promise(function (resolve, reject) {
            loader.add('question', 'static/content.json');
            loader.add('resources', 'static/resource.json');
            loader.load(function () {
                var content = PIXI.loader.resources["resources"].data;
                content.forEach(function (value) {
                    loader.add(value.key, value.path);
                    if (value.key.indexOf('image') > -1) {

                        var newImg = new Image();
                        newImg.src = value.path;
                        newImg.onerror = function (e) {
                            if (process.env.NODE_ENV !== 'development') {
                                console.log(e);
                                errorArr.unshift(dataAssembling({
                                    msg: 'Resource not loaded error',
                                    url: e.target.src,
                                    type: 'resourceLoadERROR'
                                }));
                            }
                        };
                    } else if (value.key.indexOf('audio') > -1) {
                        var newAudio = new Audio();
                        newAudio.src = value.path;
                        newAudio.onerror = function (e) {
                            if (process.env.NODE_ENV !== 'development') {
                                errorArr.unshift(dataAssembling({
                                    msg: 'Resource not loaded error',
                                    url: value.path,
                                    type: 'resourceLoadERROR'
                                }));
                            }
                        };
                    }
                });
                loader.load(function (l, r) {
                    window.res = r;
                    resolve(r);
                });
                loader.onError.add(function (e) {
                    console.log(e);
                });
                loader.onProgress.add(function (e) {
                    // console.log("loader加载进程中");
                    document.getElementsByClassName('runner')[0].style.width = e.progress * 6.8 / 100 + 'rem';
                });
                loader.onComplete.add(function (e) {

                    // console.log("loader加载完成");
                });
            });
        });
    } else {
        return new Promise(function (resolve, reject) {
            console.info(2);
            resolve(window.res);
        });
    }
}
function getAnimation(animationStr) {
    return new PIXI.spine.Spine(res[animationStr].spineData);
}

function getSound(resourceStr) {
    return res[resourceStr].data;
}

function createSprite(texture) {
    console.log(new _pixi.Sprite(texture));
    return new _pixi.Sprite(texture);
}

function getOptionTexture(resourceJsonStr, texture) {
    return res[resourceJsonStr].textures[texture];
}
function getTexture(resourceStr) {
    return res[resourceStr].texture;
}