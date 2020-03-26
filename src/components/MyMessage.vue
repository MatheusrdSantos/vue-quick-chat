<template>
    <div class="myself-message-body">
        <div class="message-content">
            <div class="message-text">
                <p class="message-username">{{myself.name}}</p>
                <p>{{message.content}}</p>
            </div>
            <div class="thum-container">
                <img class="participant-thumb" src="https://lh3.googleusercontent.com/-G1d4-a7d_TY/AAAAAAAAAAI/AAAAAAAAAAA/AAKWJJPez_wX5UCJztzEUeCxOd7HBK7-jA.CMID/s83-c/photo.jpg" alt="">
            </div>
        </div>
        <div class="message-timestamp" :style="{'justify-content': 'flex-end'}">
            {{message.timestamp.toFormat('HH:mm')}}
            <CheckIcon v-if="asyncMode && message.uploaded && !message.viewed" :size="14" class="icon-sent"/>
            <CheckAll v-else-if="asyncMode && message.uploaded && message.viewed" :size="14" class="icon-sent"/>
            <div v-else-if="asyncMode" class="message-loading"></div>
        </div>
    </div>
</template>

<script>
    import CheckIcon from 'vue-material-design-icons/Check';
    import CheckAll from 'vue-material-design-icons/CheckAll';
    import {mapGetters, mapMutations} from 'vuex';
    export default {
        components:{
            CheckIcon,
            CheckAll,
        },
        props:{
            message: {
                type: Object,
                required: true
            },
            asyncMode: {
                type: Boolean,
                required: false,
                default: false
            },
        },
        computed: {
            ...mapGetters([
                'getParticipantById',
                'messages',
                'myself'
            ]),
        }
    }
</script>

<style lang="less">
    .container-message-display .myself-message-body{
        display: flex;
        align-items: flex-end;
        flex-direction: column;
        justify-content: flex-end;

        .message-content{
            display: flex;
            align-items: flex-end;
            justify-content: flex-end;
        }
        .participant-thumb{
            width: 25px;
            height: 25px;
            border-radius: 50%;
            margin-left: 10px;
        }
    }
</style>