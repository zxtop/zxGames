<template>
    <div class="container">
        <div class="canvas" ref="canvas"></div>
        <img src="static/images/logo.png" class="logo" id="logo"/>
    </div>
</template>

<script>
    import {Application, Container, Sprite,Texture} from 'pixi.js';
    import {load} from './loader';
    import {RenderAllData,RenderPageByIndex,DeletElementByName} from 'xes-tem-render'
    import {AnswerInfo,Loading,Question,postAnswer} from 'xes-answer';
    import START from 'xes-editor-start';
    let question;
    let allData;
    export default {
        name: "start",
        data() {
            return {
                isShow: false,
                number: 0,
                answerStatus:[],
                answerData:[],
                option:['A','B','C','D','E','F','G','H']
            }
        },
        methods: {
            createApp() {
                return new Application({
                    width: 1920,
                    height: 1080,
                    autoSize: true,
                    transparent: true //背景是否设为透明
                })
            }
        },
        components: {},
        created() {
            let loading = document.getElementsByClassName('page-loading')[0];
            loading.style.display = 'block';
        },
        props:['allData'],
        destroyed() {
            PIXI.sound.stopAll();
            app.destroy();
        },
        mounted() {
            PIXI.sound.stopAll();
            let loading = document.getElementsByClassName('page-loading')[0];
            loading.style.display = 'block';
            window.app = this.createApp();
            app.view.style.width = '19.2rem';
            app.view.style.height = '10.8rem';
            app.view.id = 'appCanvas';
            window.stage = app.stage;

            const self = this;
            self.$refs.canvas.appendChild(app.view);
            stage.interactive = true;
            load().then(res => {
                console.log("%c资源加载完啦✌️", "color:#FF323B;font-weight:bold;");
                this.$nextTick(()=>{
                    window.question = res.question.data;
                    question = res.question.data;
                    allData = res.question.data;
                    let startComponent = new START(question.one.start, res);
                    stage.addChild(startComponent);
                    store.state.testNum = res.question.data.sources.length;
                    let loading = document.getElementsByClassName('page-loading')[0];
                    loading.style.display = 'none';
                    RenderAllData(true,this.allData);
                    resize();
                    function resize(){
                        let container = document.querySelectorAll('.container');
                        for (let index = 0; index < container.length; index++) {
                            container[index].style.width = (window.clientWidth - 340)+'px'
                            container[index].style.height = ((window.clientWidth - 340)*(10.8/19.2))+'px'
                        }
                    }
                });
            })
        }
    }
</script>
<style scoped>

    .canvas {
        width: 19.2rem;
        height: 10.8rem;
        position: absolute;
        left: 50%;
        top: 50%;
        margin-left: -9.6rem;
        margin-top: -5.4rem;
    }

    .logo {
        position: absolute;
        z-index: 999;
        left: .5rem;
        bottom: .3rem;
        width: 1.9rem;
    }
</style>