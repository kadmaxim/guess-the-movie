import Vue from 'vue'
import Menu from './../components/Menu.vue'
import Top from './../components/Top.vue'
import Game from './../components/Game.vue'
import Sound from './../components/Sound.vue'

Vue.component('sound-control', Sound);
const eventHub = new Vue();
Vue.prototype.$eventHub = eventHub;

const host = '';

new Vue({
    el: '.film-app',
    components: {
        'app-menu': Menu,
        'top': Top,
        'game':Game
    },
    created: function(){
        this.loadAll();
        this.$eventHub.$on('change-sound', this.toggleSound);
        this.$eventHub.$on('game-mode-changed', this.setMode);
        this.$eventHub.$on('start-game', this.showGame);
        this.$eventHub.$on('go-top', this.showTop);
        this.$eventHub.$on('show-menu', this.showMenu);

    },
    beforeDestroy: function () {
        this.$eventHub.$off('change-sound', this.toggleSound);
        this.$eventHub.$off('game-mode-changed', this.setMode);
        this.$eventHub.$off('start-game', this.showGame);
        this.$eventHub.$off('go-top', this.showTop);
        this.$eventHub.$off('show-menu', this.showMenu);
    },
    mounted: function() {
    },
    data: {
        gameMode: 0,
        isPlaySound: true,
        films: [],
        currentView: 'app-menu'
    },
    computed: {
    },
    methods: {
        setMode: function (numb) {
            if(this.gameMode !== numb){
                this.gameMode = numb;
            }
        },
        showGame: function () {
            if(this.films.length<4){
                swal(
                    "Oops...",
                    "Server isn't responding!<br/>Wait a sec and try again :)",
                    "error"
                );
                return false;
            }

            var el = document.getElementById("main-wrap");
            el.className = "film-app";
            this.currentView = 'game';
        },
        showTop: function () {
            var el = document.getElementById("main-wrap");
            el.className = "film-app";
            this.currentView = 'top';
        },
        showMenu : function (show) {
            var el = document.getElementById("main-wrap");
            el.className = "film-app main-menu";
            this.currentView = 'app-menu';
        },
        toggleSound: function(){
            console.log('Catch!');
            this.isPlaySound = !this.isPlaySound;
        },
        loadAll: function(){
            fetch(`${host}/api/films`)
                .then((response) => response.json())
                .then((movies) => this.films = movies);
        }
    }
});

