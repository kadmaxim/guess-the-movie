<template>
    <div class="top-users">
        <span class="btn-back" @click='showMenu()'><i class="fa fa-chevron-left" aria-hidden="true"></i> Menu </span>
        <div class="top-headers">
            <img  @click="changeAppMode(0)" src="img/heart.png" alt="3 жизни">
            <img  @click="changeAppMode(1)" src="img/th.png" alt="3 жизни + время">
            <img  @click="changeAppMode(2)" src="img/time.png" alt="100 сек">
        </div>
        <h3>TOP 10 : <i>{{ modeNames[appMode] }}</i></h3>
        <span v-if="topUsers.length === 0"><i class="fa fa-spinner fa-spin fa-fw"></i>Loading...</span>
        <div class="users-list">
            <table v-if="filteredUsers.length>0">
                <tr>
                    <th>№ п/п</th>
                    <th>Name</th>
                    <th>Score</th>
                    <th></th>
                </tr>
                <tr v-for="(user, index) in filteredUsers">
                    <td>{{ index + 1 }} </td>
                    <td>{{ user.name }}</td>
                    <td>{{ user.score }}</td>
                    <td><img v-if="index<7" :src="'/img/'+(index+1)+'.png'" alt=""></td>
                </tr>
            </table>
			<span v-if="topUsers.length !== 0 & filteredUsers.length === 0">
			<i class="fa fa-exclamation-triangle"></i> No users found</span>
        </div>
    </div>
</template>

<script>
    export default {
        name : 'top',
        props : ['soundMode'],
        data () {
            return {
                topUsers: [""],
                appMode: 0,
                modeNames: ["3 Lives", "3 Lives + Time", "100 sec"]
            }
        },
        mounted() {
            //this.initModeApp(); тут нужно грузить пользователе
        },
        computed : {
            filteredUsers : function () {

                return [];
            },
        },
        methods : {
            showMenu() {
                this.$eventHub.$emit('show-menu');
            },
            initModeApp() {
                var modeList = document.querySelectorAll('.modes-list li');
                for (var i = modeList.length - 1; i >= 0; i--) {
                    if(i == this.appMode){
                        modeList[i].className = 'active';
                    }else {
                        modeList[i].className = '';
                    }
                }
            },
            changeAppMode(number) {
                if(this.appMode !== number){
                    this.appMode = number;
                    this.initModeApp();
                    this.$emit('mode-changed',number);
                }
            }
        }
    }
</script>

<style>
    .top-users {
        margin-top: 1em;
    }
    .top-headers {
        text-align: center;
    }
    .top-headers img {
        padding: 5px;
        margin: 0 1em;
        cursor: pointer;
    }
    .top-headers img:hover, .top-headers img.active {
        background: rgba(0, 200, 0, 0.1);
    }
    .top-users h3 {
        font: 22px 'Open Sans';
        text-align: center;
        font-weight: bold;
    }
    .top-users i {
        font-weight: 100;
    }
    .top-users {
        text-align: center;
        position: relative;
    }
    .users-list table {
        margin: auto;
    }
    .btn-back {
        position: absolute;
        left: 1em;
        top: 1em;
        font-size: 16px;
        cursor: pointer;
    }
    .users-list th {
        min-width: 150px;
    }
    .fa-exclamation-triangle {
        color: red;
    }
</style>
