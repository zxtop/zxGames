<template>
    <div class="main">
        <!--<img src="static/images/reload.png" alt="" id="reload" @click="reload()">-->
        <div class="iframe" v-if="allData">
            <!--<button id="submitButton">强制提交</button>-->
            <index :allData="allData"  ref="container"></index>
        </div>
        <div class="edit" v-if="showStatus">
            <header>
                <h1 v-text="modelName"></h1>
                <p v-text="`版本号：v${version}`"></p>
            </header>
            <div class="edit-tab">
                <el-radio v-model="label" label="1" @change="changeType()">课件平台組课</el-radio>
                <el-radio v-model="label" label="2" @change="changeType()">ftp組课</el-radio>
            </div>
            <el-tabs type="border-card" value="内容页" v-model="activeName1" :stretch='true' v-if="label ==='1'" @tab-click="setContainer('new')">
                <el-tab-pane label="开始页" name="start1">
                    <start :allData="allData" @reload='reloadIframe' ref="start1" v-if="activeName1==='start1'">

                    </start>
                </el-tab-pane>
                <el-tab-pane label="内容页" name="game1">
                    <game :allData="allData" @reload='reloadIframe' ref="game1" v-if="activeName1==='game1'">>

                    </game>
                </el-tab-pane>
            </el-tabs>
            <el-tabs type="border-card" value="内容页" v-model="activeName" :stretch='true' v-if="label ==='2'" @tab-click="setContainer('ftp')">
                <el-tab-pane label="开始页" name="start">
                    <start :allData="allData" @reload='reloadIframe' ref="start" v-if="activeName==='start'">

                    </start>
                </el-tab-pane>
                <el-tab-pane label="内容页" name="game">
                    <game :allData="allData" @reload='reloadIframe' ref="game" v-if="activeName==='game'">

                    </game>
                </el-tab-pane>
                <el-tab-pane label="结果页" name="end">
                    <end :allData="allData" @reload='reloadIframe' ref="end" v-if="activeName==='end'">

                    </end>
                </el-tab-pane>
            </el-tabs>
            <div class="submit">
                <el-button class="submitBtn submitActive" type="primary" @click='writeJSON("preview")'>预览</el-button>
                <el-button class="submitBtn submitActive" type="primary" @click='writeJSON()' :disabled="submitStatus">保存</el-button>
            </div>
        </div>
    </div>
</template>

<script>
    let allData;
    import EditStart from './EditStart';
    import EditGame from './EditGame';
    import EditEnd from './EditEnd';
    import port from '../../port';
    import $ from 'jquery';
    import myConfig from '@/../static/myConfig';
    let submitBtnDefault = true;
    import Index from './EditPreview'
    require('@/store/index.js');
    export default {
        name: "Edit",
        data() {
            return {
                allData: null,
                showStatus: false,
                publicImg: '',
                maskStatus: false,
                startData: null,
                activeName: 'game',
                activeName1: 'game1',
                modelName:myConfig.title,
                version:myConfig.version,
                label:"2",
                submitStatus:false
            }
        },
        components: {
            start: EditStart,
            game: EditGame,
            end: EditEnd,
            index:Index
        },
        methods: {
            setContainer(type){
                store.dispatch('setPageNumber',-1);
                if(type === 'ftp'){
                    if(this.activeName === 'start'){
                        if(this.allData.one.start.show){
                            window.stage.getChildByName('START').visible = true;
                        }
                        window.stage.getChildByName('GAME').visible = false;
                        if(window.stage.getChildByName('gameBgSound')){
                            window.stage.setChildIndex(window.stage.getChildByName('gameBgSound'),window.stage.children.length-1)
                        }
                    }else if(this.activeName === 'game'){
                        // window.stage.getChildByName('START').visible = false;
                        window.stage.getChildByName('GAME').visible = true;
                        window.stage.getChildByName('GAME').children.forEach((item)=>{
                            item.visible = false
                        });
                        window.stage.getChildByName('GAME').getChildByName('GAME0').visible = true;
                    }
                }else{
                    if(this.activeName1 === 'start1'){
                        if(this.allData.one.start.show){
                            window.stage.getChildByName('START').visible = true;
                        }
                        window.stage.getChildByName('GAME').visible = false;
                    }else if(this.activeName1 === 'game1'){
                        // window.stage.getChildByName('START').visible = false;
                        window.stage.getChildByName('GAME').visible = true;
                        window.stage.getChildByName('GAME').children.forEach((item)=>{
                            item.visible = false
                        });
                        window.stage.getChildByName('GAME').getChildByName('GAME0').visible = true;
                    }
                }
            },
            reload(){
                location.reload(true);
            },
            reloadIframe() {
                location.reload(true);
                //document.getElementById('iframeWindow').contentWindow.location.reload(true);
            },
            changeType(){
                if(this.label === '1'){
                    this.allData.interface = true;
                }else{
                    this.allData.interface = false;
                }
            },
            getJSON() {
                this.$http.get('/getJSON', {params: {}}).then((res) => {
                    this.allData = res;
                    console.log(this.allData.interface);
                    if(this.allData.interface){
                        this.label = '1'
                    }else{
                        this.label = '2'
                    }
                    let container = $('.container');
                    let width = (window.clientWidth - 340)+'px';
                    let height = ((window.clientWidth - 340)*(10.8/19.2))+'px'
                    container.css({
                        width:width,
                        height:height,
                    })

                    this.showStatus = true;
                })
            },
            writeJSON(type='submit') {
                if(submitBtnDefault){
                    submitBtnDefault = false;
                    let data = JSON.parse(JSON.stringify(this.allData.one.end));
                    function resetArr(arr) {
                        Object.values(arr).forEach((item, index) => {
                            if (typeof item === "object") {
                                resetArr(item)
                            } else if (typeof item === 'boolean') {
                                arr[Object.keys(arr)[index]] = false;
                            } else if (typeof item === 'string') {
                                arr[Object.keys(arr)[index]] = '';
                            } else if (typeof item === 'number') {
                                arr[Object.keys(arr)[index]] = 0;
                            }
                        })
                    }
                    resetArr(data);
                    if(this.allData.dragShow == '1'){
                        this.allData.sources.forEach((item,index)=>{
                            item.content.option2.back.image.name = '';
                            item.content.option2.back.image.componentName = '';
                            item.content.option2.back.image.x = 0;
                            item.content.option2.back.image.y = 0;
                            item.content.option2.back.image.width = 0;
                            item.content.option2.back.image.height = 0;

                            item.content.option2.blank.forEach((bitem,bindex)=>{
                                item.content.option2.blank[bindex].image.name = '';
                                item.content.option2.blank[bindex].image.componentName = '';
                                item.content.option2.blank[bindex].image.x = 0;
                                item.content.option2.blank[bindex].image.y = 0;
                                item.content.option2.blank[bindex].image.width = 0;
                                item.content.option2.blank[bindex].image.height = 0;
                                item.content.option2.blank[bindex].image.name_another.name = ''
                            })


                            item.content.option2.brash.image.name = '';
                            item.content.option2.brash.image.width = 0;
                            item.content.option2.brash.image.height = 0;

                           
                            item.content.option2.reset.image.name = '';
                            item.content.option2.reset.image.componentName = '';
                            item.content.option2.reset.image.x = 0;
                            item.content.option2.reset.image.y = 0;
                            item.content.option2.reset.image.width = 0;
                            item.content.option2.reset.image.height = 0;
                        })
                    }else{
                        this.allData.sources.forEach((item,index)=>{
                            item.content.option1.trash.image.name = '';
                            item.content.option1.trash.image.name_another.name = '';
                            item.content.option1.trash.image.width = 0;
                            item.content.option1.trash.image.height = 0;
                            item.content.option1.trash.image.x = 0;
                            item.content.option1.trash.image.y = 0;

                            item.content.option1.blank_drag.forEach((ditem,dindex)=>{
                                
                                item.content.option1.blank_drag[dindex].image.name = '';
                                item.content.option1.blank_drag[dindex].image.name_another.name = '';
                                item.content.option1.blank_drag[dindex].image.width = 0;
                                item.content.option1.blank_drag[dindex].image.height = 0;
                                item.content.option1.blank_drag[dindex].image.x = 0;
                                item.content.option1.blank_drag[dindex].image.y = 0;
                                
                            })
                            item.content.option1.option.forEach((oitem,oindex)=>{
                                
                                item.content.option1.option[oindex].image.name = '';
                                item.content.option1.option[oindex].image.width = 0;
                                item.content.option1.option[oindex].image.height = 0;
                                item.content.option1.option[oindex].image.x = 0;
                                item.content.option1.option[oindex].image.y = 0;

                            })

                        })
                    }
                    console.log("保存.....",this.allData)
                    if(this.label === '1'){
                        this.allData.one.end = data;
                        console.log(this.allData.one.end);
                    }
                    this.$http.post('/writeJSON', {
                        dataList: JSON.stringify(this.allData)
                    }).then((res) => {
                         this.$message({
                            type:res.type,
                            message:res.message
                        })
                        this.submitStatus = true;
                        $('.submitBtn').removeClass("submitActive");
                        if(type === 'preview'){
                            let publicPath;
                            let startStatus = this.activeName==='start'||this.activeName1==='start1'||store.state.pageNumber == -1?'true':'false';
                            if(startStatus === 'true'){
                                store.dispatch('setPageNumber',0)
                            }
                            if (process.env.NODE_ENV === 'development') {
                                publicPath = 'http://localhost:' + port.port + '/#/preview?id='+store.state.pageNumber+'&startStatus='+startStatus;
                            } else {
                                publicPath = 'http://localhost:8888/#/preview?id='+store.state.pageNumber+'&startStatus='+startStatus;
                            }
                            window.open(publicPath)
                        }
                        // this.$router.push({ path: 'preview', query: { id: '111' }})
                        setTimeout(()=>{
                            this.submitStatus = false;
                            submitBtnDefault = true;
                            $('.submitBtn').addClass("submitActive");
                        },1000)
                        // document.getElementById('iframeWindow').contentWindow.location.reload(true);
                    })
                }
                
            },
        },
        mounted() {
            this.getJSON();
            window.onresize = resize;
            this.$nextTick(()=>{
                resize()
            })
            let publicPath;
            if (process.env.NODE_ENV === 'development') {
                publicPath = 'http://localhost:' + port.port + '/#/';
            } else {
                publicPath = window.location.href.split('#')[0];
            }

            function resize(){
                let container = document.querySelectorAll('.container');
                for (let index = 0; index < container.length; index++) {
                    container[index].style.width = (window.clientWidth - 340)+'px'
                    container[index].style.height = ((window.clientWidth - 340)*(10.8/19.2))+'px'
                }
            }
        }
    }
</script>

<style lang="scss">
    #reload{
        position: absolute;
        left: 0;
        top: 0;
        z-index: 100;
        width: 0.6rem;
        height: 0.6rem;
        cursor: pointer;
        &:hover {
            cursor: pointer;
        }
        &:active {
            transform: scale(0.9);
            -webkit-transform: scale(0.9);
            -moz-transform: scale(0.9);
        }
    }
    .edit-title-switch{
        float: right;
        margin-top: 10px;
        margin-right: 15px;
    }
    .edit-tab{
        height: 40px;
        line-height: 40px;
        padding: 0 15px;
        border-top: 1px solid #2b2b2b;
        background: #3d3d3d;
    }
    .el-message {
        font-size: 16px !important;
        min-width: 260px !important;
    }
    .edit-switch{
        margin-top: 15px;
        color: #fff;
        overflow: hidden;
        width: 50%;
        float: left;
        box-sizing: border-box;
        > span {
            padding: 0 10px;
            vertical-align: middle;
            float: right;
            height: 28px;
            line-height: 28px;
            box-sizing: border-box;
            width: 40%;
        }
        > div {
            float: right;
            width: 35%;
            margin-top: 4px;
        }
    }
    .edit-switch-audio{
        margin-top: 15px;
        color: #fff;
        overflow: hidden;
        width: 28%;
        float: right;
        box-sizing: border-box;
        > span {
            padding: 0 10px;
            vertical-align: middle;
            float: right;
            height: 28px;
            line-height: 28px;
            box-sizing: border-box;
            width: 50%;
        }
        > div {
            float: right;
            width: 50%;
            margin-top: 4px;
        }
    }
    .edit-range-audio {
        overflow: hidden;
        margin-top: 15px;
        color: #fff;
        float: left;
        width: 70%;
        > span {
            float: left;
            height: 28px;
            line-height: 28px;
            width: 30%;
            padding: 0 10px;
            box-sizing: border-box;
        }
        > div {
            float: left;
            width: 70%;
            padding: 0 30px 0 0;
            box-sizing: border-box;
        }
        .el-slider{
            height: 28px;
        }
        .el-slider__runway{
            margin: 12px 0!important;
        }
    }



    .edit-select {
        margin-top: 15px;
        color: #fff;
        overflow: hidden;
        width: 50%;
        float: left;
        box-sizing: border-box;
        > span {
            padding: 0 10px;
            vertical-align: middle;
            float: left;
            height: 28px;
            line-height: 28px;
            box-sizing: border-box;
            width: 46%;
        }
        > div {
            float: left;
            width: 54%;
            border-radius: 0!important;
        }
        > .el-switch{
            margin-top: 4px;
        }
    }
    .bg-audio-title{
        margin-top: 15px;
        border-left: 4px solid #eee;
        padding-left: 10px;
        height: 16px;
        line-height: 16px;
        color: #eee;
    }
    .edit-checkbox-title,.edit-radio-title{
        margin-top: 15px;
        float: left;
        height: 20px;
        overflow: hidden;
        width: 100%;
    }
    .bg-audio-inner{
        overflow: hidden;
    }
    .edit-range {
        overflow: hidden;
        margin-top: 15px;
        color: #fff;
        float: left;
        width: 100%;
        > span {
            float: left;
            height: 28px;
            line-height: 28px;
            width: 22%;
            padding: 0 10px;
            box-sizing: border-box;
        }
        > div {
            float: left;
            width: 78%;
            padding: 0 15px;
            box-sizing: border-box;
        }
        .el-slider{
            height: 28px;
        }
        .el-slider__runway{
            margin: 12px 0!important;
        }
    }
    .edit-textarea {
        margin-top: 15px;
        color: #fff;
        overflow: hidden;
        float: left;
        width: 100%;
        > span {
            padding: 0 10px;
            vertical-align: middle;
            float: left;
            margin-top: 3px;
            width: 30%;
            box-sizing: border-box;
        }
        textarea {
            resize: none;
            width: 70%;
            float: left;
            background: #666666;
            color: #fff;
            box-sizing: border-box;
            border: none;
            padding: 10px;
            height: 100px;
            outline: none;
        }

    }
    .font-style {
        height: 28px;
        margin-top: 15px;
        height: 28px;
        line-height: 28px;
        float: left;
        overflow: hidden;
        .font-style-color {
            color: #77DC04;
        }
        span {
            font-weight: bold;
            font-size: 26px;
            color: #999999;
            float: left;
            margin-right: 20px;
            cursor: pointer;
            width: 20px;
        }
        span:nth-of-type(1) {
            margin-left: 15px;
        }
        span:nth-of-type(2) {
            font-style: italic;
            margin-right: 15px;
        }
        span:nth-of-type(3) {
            text-decoration: underline;
        }
    }
    .edit {
        width: 340px;
        height: 100%;
        position: absolute;
        right: 0;
        top: 0;
        bottom: 0;
        overflow-y: auto;
        overflow-x: hidden;
        font-size: 14px;
        background: #343434;
        header {
            background: #3d3d3d;
            >*{
                margin: 0;
                padding: 0;

            }
            width: 100%;
            height: 80px;
            margin: 0;
            padding: 0 15px;
            box-sizing: border-box;
            h1 {
                font-size: 26px;
                color: #fff;
                font-weight: normal;
                height: 50px;
                line-height: 70px;
            }
            p{
                line-height: 30px;
                height: 30px;
                color: #eee;
            }
        }
    }
    .mask {
        width: 100%;
        height: 100%;
        position: fixed;
        left: 0;
        top: 0;
        z-index: 1000000;
        background: rgba(0, 0, 0, 0.6);
        img {
            width: 8rem;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
        }
    }
    .main {
        width: 100%;
        height: 100%;
        background: #ffffff;
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
    }
    .iframe {
        position: absolute;
        left: 0;
        right: 340px;
        bottom: 0%;
        top: 0;
        background: #000;
        iframe {
            width: 100%;
            height: 100%;
        }
        .canvas{
            width: 100%!important;
            height: 100%!important;
            position: static!important;
            margin: 0!important;
            canvas{
                width: 100%!important;
                height: 100%!important;
            }
        }
        #submitButton {
            position: absolute;
            left: 0;
            right: 0;
            top: 0rem;
            width: 1.6rem;
            height: 0.6rem;
            font-size: 0.26rem;
            border: none;
            color: #fff;
            background: #666;
            margin: 0 auto;
            border-radius: 5px;
            outline: none;
            &:hover {
                cursor: pointer;
            }
            &:active {
                transform: scale(0.9);
                -webkit-transform: scale(0.9);
                -moz-transform: scale(0.9);
            }
        }
    }

    .submit {
        height: 70px;
        background: #3D3D3D;
        text-align: center;
        margin-top: 15px;
        position: absolute;
        bottom: 0;
        left:0;
        right: 0;
        box-shadow:0px -10px 20px #171717;
        .el-button--primary {
            padding: 12px 50px;
            margin-top: 16px;
            background: #2E88AA!important;
            border-radius: 10px!important;
            border-color: #2E88AA!important;
        }
    }
    .submitActive:active{
            transform: scale(0.9);
    }
    .edit {
        .el-color-picker{
            height: 28px!important;

        }
        .el-color-picker__trigger{
            height: 28px!important;
        }
        .el-slider__button{
            border-color: #77DC04!important;
        }
        .el-slider__bar{
            background: #77DC04!important;
        }
        div[role=tablist] {
            width: 100% !important;
            > div {
                border: none !important;
                text-align: center;
                background: #292929 !important;
            }
        }
        .el-tabs--border-card {
            border: none !important;
        }
        .el-tabs__item.is-active {
            background: #383838 !important;
            color: #fff !important;
            border: none !important;
        }
        .el-tabs__nav-scroll {
            background: #292929 !important;
        }
        .el-tabs__content {
            background: #383838 !important;
            padding: 0 0 15px 0!important;
            position: absolute;
            left: 0;
            right: 0;
            top: 160px;
            bottom: 70px;
            overflow-y: auto;
            &::-webkit-scrollbar-track-piece { //滚动条凹槽的颜色，还可以设置边框属性
                background-color:#f8f8f8;
            }
            &::-webkit-scrollbar {//滚动条的宽度
                width:9px;
            }
            &::-webkit-scrollbar-thumb {//滚动条的设置
                background-color:#bbb;
                background-clip:padding-box;
                min-height:10px;
            }
            &::-webkit-scrollbar-thumb:hover {
                background-color:#aaa;
            }
        }
        .el-tabs--border-card {
            border: none;
        }
        .el-checkbox__input.is-checked + .el-checkbox__label {
            color: #fff !important;
        }
        .el-checkbox__input.is-checked .el-checkbox__inner, .el-checkbox__input.is-indeterminate .el-checkbox__inner {
            background: #77DC04 !important;
            border-color: #77DC04 !important;
        }
        .el-checkbox__inner:hover {
            border-color: #77DC04 !important;
        }
        .el-radio__input.is-checked .el-radio__inner {
            background: #77DC04 !important;
            border-color: #77DC04 !important;
        }
        .el-radio__label {
            color: #fff !important;
        }
        .el-radio__input.is-checked + .el-radio__label {
            color: #fff !important;
        }
        .el-radio__inner:hover {
            color: #77DC04 !important;
        }
        .upload {
            width: 100%;
            margin: 15px 0 0 0;
            overflow: hidden;
            float: left;
            .file-title{
                float: left;
                width: 28%;
                color: #fff;
                height: 32px;
                line-height: 32px;
            }
            .img-box {
                width: 60%;
                float: left;
                height: 100px;
                text-align: center;
                border: 2px dashed #ccc;
                box-sizing: border-box;
                text-align: center;
                background: #666666;
                line-height: 96px;
                overflow: hidden;
                img {
                    height: 80px;
                    width: auto;
                    vertical-align: middle;
                }
            }
            .animate-box {
                width: 42%;
                float: left;
                height: 32px;
                box-sizing: border-box;
                text-align: left;
                line-height: 32px;
                padding: 0 5px;
                font-size: 14px;
                color: #999;
                white-space: nowrap;
                text-overflow: ellipsis;
                overflow: hidden;
            }
            .upload-btn {
                float: right;
                width: 30%;
                .upload-btn-file {
                    position: relative;
                    width: 80px;
                    height: 32px;
                    line-height: 30px;
                    text-align: center;
                    border-radius: 5px;
                    background: #666666;
                    color: #fff;
                    float: right;
                    span {
                        font-size: 14px;
                    }
                    input[type=file] {
                        width: 80px;
                        height: 30px;
                        opacity: 0;
                        position: absolute;
                        left: 0;
                        top: 0;
                        cursor: pointer;
                    }
                }
            }
        }
        .el-input-group {
            margin-top: 15px;
            width: 50%;
            float: left;
        }
        .el-input-group__append, .el-input-group__prepend {
            border: none !important;
            background: #383838 !important;
            color: #fff !important;
            font-size: 14px !important;
            padding: 0 10px;
        }
        .el-input__inner {
            background: #2E2E2E !important;
            color: #fff !important;
            border: none !important;
            border-radius: 0!important;
            border: 1px solid #6C6C6C!important;
        }
        .el-switch__label.is-active {
            color: #fff !important;
        }
        .el-switch__label {
            color: #fff !important;
        }
        .el-switch {
            /*margin-left: 15px;*/
        }
    }
</style>