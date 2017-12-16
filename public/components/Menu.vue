<template>
    <div class="main-app-menu-wrapp">
        <h3 class="logo"><a>Guess the movie</a></h3>
        <sound-control :mode="soundMode"></sound-control>
        <a class="btn-start" @click="startTheGame()">START</a>
        <div class="modes-wrap">
            <p class="modes-main-title">Game mode:</p>
            <ul class="modes-list">
                <li @click="changeAppMode(0)" :class="{active: appMode === 0 }"><img src="img/heart.png" alt="3 lives"> <i>3 lives</i></li>
                <li @click="changeAppMode(1)" :class="{active: appMode === 1 }"><img src="img/th.png" alt="3 жизни + время"> <i>3 lives <br/> + 7 sec</i></li>
                <li @click="changeAppMode(2)" :class="{active: appMode === 2 }"><img src="img/time.png" alt="100 sek"><i>100 sec</i></li>
            </ul>
        </div>
		<span class="top-10" @click="goTop()">
			<a><i class="fa fa-star" aria-hidden="true"></i> Top <b>10</b> <i class="fa fa-star" aria-hidden="true"></i></a>
		</span>

    </div>
</template>

<script>
    export default {
        name : 'app-menu',
        props : ['soundMode', 'appMode'],
        methods : {
            startTheGame() {
                this.$eventHub.$emit('start-game');
            },
            goTop() {
                this.$eventHub.$emit('go-top');
            },
            changeAppMode(number) {
                this.$eventHub.$emit('game-mode-changed',number);
            }
        }
    }
</script>

<style>
    #main-wrap.main-menu {
        height: 320px;
    }

    .main-app-menu-wrapp::before {
        content: '';
        background: url(./../img/corn.png) no-repeat;
        position: absolute;
        left: -45px;
        bottom: 6px;
        width: 200px;
        height: 174px;
        z-index: 0;
    }

    .main-app-menu-wrapp::after {
        content: '';
        background: url(./../img/right.png) no-repeat;
        width: 200px;
        height: 134px;
        display: block;
        position: absolute;
        bottom: 5px;
        right: -20px;
    }

    .main-app-menu-wrapp {
        position: relative;
        height: 100%;
    }

    .main-app-menu-wrapp h3 {
        font-family: 'Open Sans';
        text-align: center;
        margin: 1em 0;
        padding: 0;
        font-size: 24px;
        text-shadow: 2px 1px 0px white, 1px 1px 1px black;
    }

    .modes-wrap {
        position: absolute;
        right: 10%;
    }

    .modes-main-title {
        margin: 0;
        padding: 0;
        font-size: 18px;
        font-family: 'Open Sans';
        text-align: center;
    }

    .modes-list li {
        border: 1px solid transparent;
        display: inline-block;
        list-style: none;
        padding: 5px 5px 0px 5px;
        border-radius: 10px;
        cursor: pointer;
        width: 25%;
        position: relative;
        transition: all 0.5s ease-in-out;
        z-index: 1;
    }

    .modes-list {
        width: 300px;
        text-align: center;
    }

    .modes-list i {
        opacity: 0;
        display: block;
        position: absolute;
        visibility: hidden;
        font-size: 17px;
        margin-left: 0;
        background: #80c080;
        border-radius: 5px;
        padding: 0px 0px 2px;
        color: white;
        font-weight: 500;
        font-family: 'Open Sans';
        font-style: normal;
        width: 120%;
        left: -10%;
        box-shadow: 0 0 5px black;
        transition: all 0.5s ease-in-out;
    }

    .modes-list img {
        max-width: 40px;
    }
    .modes-list li.active, .modes-list li:hover{
        border-bottom-left-radius: 0;
        border-bottom-right-radius: 0;
        border: 1px solid rgba(0, 128, 0, 0.5);
    }

    .modes-list li.active::before {
        content: '';
        background: url(./../img/checked.png) no-repeat;
        padding: 12px;
        position: absolute;
        bottom: 40px;
        right: 0px;
    }

    .modes-list .active i, .modes-list li:hover i {
        opacity: 1;
        visibility: visible;
    }

    .modes-list li:hover {
        z-index: 2;
    }
    a.btn-start {
        text-transform: uppercase;
        cursor: pointer;
        text-decoration: none;
        color: white;
        padding: 5px 15px 7px;
        background: linear-gradient(to bottom,#06e403,#00c301 50%,#1dab00);
        font: bold 20px 'Open Sans';
        border-radius: 10px;
        box-shadow: 0 1px 4px rgba(107, 107, 107, 0.55);
        text-shadow: 1px 1px 0 #989898;
        width: 150px;
        position: absolute;
        display: block;
        text-align: center;
        margin: 2em 0 0 20%;
    }
    .top-10 {
        text-align: center;
        position: absolute;
        bottom: 5%;
        left: 0;
        right: 0;
        margin: auto;
        display: inline-block;
        width: 100px;
    }
    .top-10 a {
        color: #060606;
        cursor: pointer;
        text-decoration: none;
        background: gold;
        padding: 2px 5px;
        text-shadow: 0 0 2px white;
        border-radius: 2px;
        display: block;
    }
    .logo {
        margin: 50px auto;
        text-align: center;
    }
    .logo a {
        text-decoration: none;
        transform: perspective(2em) rotateX(0deg) scaleY(0.8);
        transition: all 0.5s;
        display: inline-block;
        text-align: center;
        text-transform: uppercase;
        font: 700 50px 'Exo 2';
        line-height: .95;
        margin-top: -20px;
        color: #fbd62a;
        text-shadow: 0 1px 0 #7f6303, 0 3px 0 #846703, 0 3px 0 #896b03, 0 4px 0 #8e6f03, 0 5px 0 #ffffff, 0 6px 8px rgba(255, 255, 255, 0.8);
    }
    .logo a:first-line {
        font-size: 0.8em;
    }
    .logo a:hover {
        transform: perspective(1em) rotateX(0deg) scale(1);
        text-shadow: 0 1px 0 #7f6303, 0 2px 0 #846703, 0 0px 0 #896b03, 0 1px 0 #8e6f03, 0 2px 0 #937203, 0 2px 4px rgba(252, 223, 92, 0.6);
    }
</style>
