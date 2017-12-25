<template>
    <div class="app-window">
        <ul class="user-panel">
            <li class="to-menu" @click="exitToMenu(1)"><i class="fa fa-chevron-left" aria-hidden="true"></i> Menu</li>
            <li class="reset-game" @click="resetAppData(1);"><i class="fa fa-undo" aria-hidden="true"></i> Restart</li>
            <li class="user-lives">
                Lives :
                <div class="hearts-wrap" v-show="appMode<2">
					<span v-for="(el, index) in 3">
						<i :class="getHeartClass(index)"></i>
					</span>
                </div>
                <img v-show="appMode>1" src="img/eternity.png" alt="Unlimited lives" class="eternity-loop">
            </li>
            <li class="user-points">
                Score : <b>{{ user.score }}</b> <i class="fa fa-superpowers" aria-hidden="true"></i>
            </li>
            <li class="sound-wrapp">
                <sound-control :mode="soundMode"></sound-control>
            </li>
        </ul>

        <div v-show="movies.length>0" class="inner-app-wrapper">
            <div class="img-wrapp">
                <img :src="question.img">
            </div>
            <div class="controls-wrapp">
                <i class="back-lasts" v-show="timeMode"></i>
                <i class="front-lasts" v-show="timeMode"></i>
                <ul>
                    <li v-for="item in buttons">
                        <a class="btn" @click="makeChoice" :data-id="item.id" choice-btn :key='item.id'>
                            {{ item.title}}
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
    import CoolTimer from './../js/CoolTimer';

    export default {
        name : 'app-menu',
        props : ['soundMode', 'movies', 'appMode'],
        data() {
            return {
                user : {
                    score : 0,
                    lives : 3,
                    answers : []
                },
                appTimer : new CoolTimer(this),
                films : [],
                btnPresed : false,
                buttons : [],
                question : {},
                seconds : 0
            }
        },
        mounted() {
            this.resetAppData(1);
            this.loadNext();
        },
        computed : {
            sessionSeconds : function () {
                var secCount = 0;
                switch (this.appMode) {
                    case 0 :
                        secCount = 0;
                        break;
                    case 1 :
                        secCount = 10;
                        break;
                    case 2 :
                        secCount = 100;
                        break;
                }
                return secCount;
            },
            timeMode : function () {
                return this.appMode > 0;
            },
            timeLeft : function () {
                var timeLeft = this.sessionSeconds - this.seconds;
                if (timeLeft === 3) {
                    this.$eventHub.$emit('play-sound', 'timer');
                }
                if (timeLeft === 0) {
                    this.user.lives = this.appMode === 2 ? 0 : this.user.lives;
                    this.appTimer.clearInterval();
                    this.skip();
                    this.seconds = 0;
                }
                return timeLeft;
            }
        },
        methods : {
            clearBtn : function () {
                var btns = document.querySelectorAll('.btn[choice-btn]');
                if (btns.length > 1) {
                    for (var i = btns.length - 1; i >= 0; i--) {
                        btns[i].className = 'btn';
                    }
                }
            },
            resetAppData : function (full) {
                this.user.answers.length = 0;
                this.user.lives = 3;
                this.user.score = 0;
                if (full) {
                    this.$eventHub.$emit('play-sound', 'loaded');
                }
                if (this.appMode > 0) {
                    var elemBar = document.querySelector('.controls-wrapp i.front-lasts');
                    elemBar.style.height = '100%';
                    this.appTimer.resetInterval();
                }
                this.clearBtn();
                this.btnPresed = false;
                this.loadNext();
            },
            exitToMenu : function (show) {
                if (show === 1) {
                    swal({
                        title : 'Are you sure?',
                        text : "The current scores won't be saved!",
                        type : 'warning',
                        showCancelButton : true,
                        confirmButtonColor : '#d33',
                        cancelButtonColor : '#3085d6',
                        confirmButtonText : 'Menu'
                    }).then(this.exitToMenu, console.log);
                } else {
                    this.$eventHub.$emit('show-menu');
                    this.appTimer.clearInterval();
                }
            },
            showTrue : function (elem) {
                this.user.answers.push(this.question);

                var lastIndex = this.user.answers.length - 1;

                if (elem) {
                    this.$eventHub.$emit('play-sound', 'bleep');
                    this.user.answers[lastIndex].status = true;
                } else {
                    this.$eventHub.$emit('play-sound', 'fail');
                    this.user.answers[lastIndex].status = false;
                }

                var trueElement = elem ? elem : document.querySelector(".btn[data-id='" + this.question.id + "']");
                trueElement.className = 'btn btn-green';
            },
            makeChoice : function (event) {
                var btn = event.target;
                var itemID = btn.getAttribute('data-id');

                if (this.btnPresed) {
                    this.loadNext();
                    this.btnPresed = false;
                    return;
                }

                if (itemID == this.question.id) {
                    this.showTrue(btn);
                    this.user.score++;
                } else {
                    btn.className = 'btn btn-red';
                    this.showTrue();
                    if (this.appMode != 2) {
                        this.user.lives--;
                    }
                }

                this.btnPresed = true;

                if (this.user.lives === 0) {
                    this.appTimer.clearInterval();
                    this.finishGame('wasted');
                } else {
                    setTimeout(this.skip, 750);
                }
            },
            loadNext(){
                var shuffled = _.shuffle(this.movies);
                var sampled = _.sample(shuffled, 4);
                var diff = _.difference(sampled, this.user.answers);

                if (diff.length > 0) {
                    this.buttons = _.shuffle(sampled);
                    this.$forceUpdate();
                    this.question = _.sample(diff);
                    if (this.appMode == 1) {
                        var elemBar = document.querySelector('.controls-wrapp i.front-lasts');
                        elemBar.style.height = '100%';
                        this.appTimer.resetInterval();
                    }
                } else {
                    var check = _.difference(this.films, this.user.answers);
                    if (check.length > 0) {
                        this.loadNext();
                    } else {
                        if (this.appMode > 0) {
                            this.appTimer.clearInterval();
                        }
                        this.finishGame();
                    }
                }
            },
            finishGame(wasted){
                var msgTitle = '';
                this.exitToMenu();
                if (wasted) {
                    this.$eventHub.$emit('play-sound', 'wasted');
                    msgTitle = 'Game over :(';
                } else {
                    this.$eventHub.$emit('play-sound', 'finish');
                    msgTitle = 'Congratulations!';
                }

                var pointText = this.user.score > 1 ? "points" : "point";
                var msgBody = "Your score <b>" + this.user.score + "</b> " + pointText;

                swal({
                    title : msgTitle,
                    html : msgBody,
                    input : "text",
                    showCancelButton : true,
                    confirmButtonText : 'Save score',
                    cancelButtonText : 'Close',
                    confirmButtonColor : '#319e3f',
                    inputPlaceholder : 'Your name..',
                    showLoaderOnConfirm : true,
                    preConfirm : function (name) {
                        return new Promise(function (resolve, reject) {
                            if (name.length < 1) {
                                reject('Enter your name to save your score');
                            } else {
                                resolve();
                            }
                        })
                    },
                    allowOutsideClick : false
                }).then(this.saveScores, console.log);
            },
            saveScores : function (name) {
                var userName = name || '';
                var fd = new FormData();
                fd.append('name', userName);
                fd.append('score', this.user.score);
                fd.append('mode', this.appMode);
                var params = {
                    method : 'POST',
                    body : fd
                };

                fetch('/api/gamer', params).then(console.log, console.log);

                if (userName !== '') {
                    swal("Score saved!", "Thank you for playing, " + userName + "!", "success");
                }
            },
            skip : function () {
                if (this.user.lives > 0) {
                    if (this.btnPresed) {
                        this.loadNext();
                        this.btnPresed = false;
                        return;
                    } else {
                        if (this.appMode != 2) {
                            this.user.lives--;
                        }
                        this.showTrue();
                        this.btnPresed = true;
                        if (this.appMode === 1) {
                            setTimeout(this.skip, 1500);
                        }
                    }
                } else {
                    this.appTimer.clearInterval();
                    this.finishGame('wasted');
                }
            },
            getHeartClass : function (index) {
                if ((index + 1) <= this.user.lives) {
                    return 'fa fa-heart';
                } else {
                    return 'fa fa-heart-o';
                }
            }
        }
    }
</script>

<style>
    .inner-app-wrapper {
        position: relative;
    }

    .user-lives i {
        color: #ea0000;
    }

    .fa-superpowers {
        color: #ff7800;
    }

    .img-wrapp {
        width: 100%;
        position: absolute;
        height: 482px;
        background: url('./../img/giphy.gif') no-repeat center;
    }

    .img-wrapp img {
        height: 100%;
        width: 100%;
    }

    .controls-wrapp {
        position: relative;
        width: 100%;
        height: 482px;
    }

    .controls-wrapp ul {
        list-style: none;
        margin: 0;
        padding: 0;
        width: 100%;
        position: relative;
        height: 100%;
    }

    .controls-wrapp i.back-lasts,
    .controls-wrapp i.front-lasts {
        content: '';
        position: absolute;
        height: 100%;
        width: 7px;
        left: -7px;
        background: red;
        border-radius: 0px;
        transition: all 1s ease-in-out;
    }

    .controls-wrapp i.front-lasts {
        background: green;
        bottom: 0;
    }

    .controls-wrapp a {
        margin: 0 0px 0px 0em;
        text-align: center;
        font-size: 20px;
        font-weight: bold;
        line-height: 1;
        padding: 15px 20px;
        height: auto;
        width: 250px;
        border-radius: 0;
        background: #DDD;
        background: rgba(123, 92, 92, 0.5);
        color: white;
        text-shadow: 0 1px black;
        display: inline-block;
        cursor: pointer;
        text-decoration: none !important;
        border: 0;
        box-shadow: none;
    }

    .controls-wrapp a:hover {
        background: #F0F6FA;
        background: linear-gradient(top, #FEFEFF, #F1F6FB 50%, #E7F0F7);
        border-color: #93B8D3 #8EB4CF #94BAD5;
        color: #044E8C;
        box-shadow: 0 1px #fff inset, 0 -1px #fff inset, -1px 0 #fff inset, 1px 0 #fff inset, 0 1px #95BBD7;
    }

    .controls-wrapp a.btn-green, .controls-wrapp a.btn-green:hover {
        border-color: #276710 #296C0B #296C0C;
        background: #589047;
        background: linear-gradient(top, #5F9D4D, #589047 50%, #508142);
        box-shadow: 0 1px #276710 inset;
        color: #fff;
        text-shadow: 0 -1px #33721E;
        cursor: pointer;
    }

    .controls-wrapp a.btn-red, .controls-wrapp a.btn-red:hover {
        border-color: #821700 #831600 #831600;
        background: #B8422A;
        background: linear-gradient(top, #C94933, #B74129 50%, #A63A20);
        box-shadow: 0 1px #821700 inset;
        color: #fff;
        text-shadow: 0 1px #91220B;
        cursor: pointer;
    }

    .controls-wrapp li {
        position: absolute;
    }

    .controls-wrapp li:first-child {
        left: 0;
        top: 0;
    }

    .controls-wrapp li:last-child {
        right: 0;
        bottom: 0;
    }

    .controls-wrapp li:nth-child(2) {
        right: 0;
        top: 0;
    }

    .controls-wrapp li:nth-child(3) {
        left: 0;
        bottom: 0;
    }

    .user-panel {
        list-style: none;
        margin: 0;
        padding: 0;
        text-align: right;
    }

    .user-lives, .user-points, .sound-wrapp, .user-panel li {
        width: 15%;
        margin: 1em 1em 1em 0;
        display: inline-block;
        text-align: right;
    }

    li.user-lives {
        width: 25%;
        text-align: center;
    }

    .sound-wrapp {
        text-align: center;
        cursor: pointer;
    }

    .eternity-loop {
        position: absolute;
        margin-top: -5px;
        margin-left: 10px;
    }

    .to-menu {
        text-align: left;
        cursor: pointer;
    }

    .reset-game {
        text-align: center;
        cursor: pointer;
    }

    .hearts-wrap {
        display: inline;
    }
</style>
