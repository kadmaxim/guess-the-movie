<template>
    <span class="sound" @click="changeSound()"><i :class="soundIconClass"></i></span>
</template>

<script>
    export default {
        name : 'sound-control',
        props : ['mode'],
        computed : {
            soundIconClass : function () {
                if (this.mode) {
                    return 'fa fa-volume-up';
                } else {
                    return 'fa fa-volume-off';
                }
            }
        },
        methods: {
            changeSound() {
                this.$eventHub.$emit('change-sound');
            }
        }
    }
</script>

<style>
    .sound-wrapp {
        position: relative;
    }
    .sound-wrapp .sound{
        top: -5px;
    }
    span.sound {
        background: rgba(0,0,0,0.05);
        padding: 5px;
        position: absolute;
        top: 10px;
        border-radius: 30%;
        cursor: pointer;
        right: 10%;
        display: block;
        width: 20px;
        text-align: center;
    }
    .fa-volume-up {
        font-size: 20px;
        color: #92dd59;
    }
    .fa-volume-off {
        font-size: 20px;
        color: grey;
    }
</style>
