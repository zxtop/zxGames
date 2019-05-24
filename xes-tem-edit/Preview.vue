<template>
    <div class="main">
        <img src="static/images/reload.png" alt="" id="reload" @click="reload()">
        <div class="iframe">
            <button id="submitButton">强制提交</button>
            <iframe src="/" id="iframeWindow" frameborder="0">
            </iframe>
        </div>
    </div>
</template>
<script>
    import port from '@/../port';
    import $ from 'jquery';
    import myConfig from '@/../static/myConfig';
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
        methods: {
            reload(){
                location.reload(true);
            },
        },
        mounted() {
            $('#submitButton').on("click", function () {
               
                if(window.store.state.pShow){
                    console.log("新接口强制提交");
                    let resubmitdata = {type: 'getAnswer'};
                    $(".iframe iframe")[0].contentWindow.postMessage(resubmitdata, '*');
                }else{
                     console.log("旧接口强制提交");
                    let resubmitdata = {type: 'resubmitAnswer'};
                    $(".iframe iframe")[0].contentWindow.postMessage(resubmitdata, '*');
                } 
            })
            window.addEventListener('message', function (e) {
                if (e.data.type == 'onload') {
                    console.log("onload接口");
                    //  let jsonData = {goldnum: 10, result: []};
                    //  let data = {type: 'answerResult', data: jsonData};
                    //  $(".iframe iframe")[0].contentWindow.postMessage(data, '*');
                } else if (e.data.type == 'submitAnswer') {
                    let testAnswer = e.data.data.testAnswer;
                    let testNum = e.data.data.testNum;
                    // 总的正确率
                    let allRate = 0;
                    // 答对总数
                    let allRigetNum = 0;
                    let gold = 0;
                    for (let i = 0; i < testNum; i++) {
                        if (testAnswer[i] == undefined) {
                            continue;
                        }
                        let stuAnswerData = testAnswer[i];
                        // 每道题的空数
                        let answernum = stuAnswerData['answer'].length;
                        if (typeof stuAnswerData['answer'] == 'string') {
                            answernum = 1;
                        }
                        let isRightNum = stuAnswerData['rightnum'];
                        // 一个页面一共答对几道题
                        if (stuAnswerData['isright']) {
                            allRigetNum++;
                        }
                        if (isRightNum == 0 && stuAnswerData['type'] == 0) {
                            gold++;
                            isRightNum = 0;
                        }
                        if (isRightNum > 0 && stuAnswerData['type'] == 0) {
                            isRightNum = answernum;
                        }
                        stuAnswerData['is_right'] = (isRightNum == answernum) ? 1 : 0;
                        // 一道题的正确率
                        stuAnswerData['rate'] = isRightNum / answernum;
                        allRate += stuAnswerData['rate'];
                    }
                    // 用户答题平均正确率
                    let average_rate = allRate / testNum;
                    // 获取金币数，向上取整
                    gold = gold + Math.ceil(10 * average_rate);
                    gold = gold > 10 ? 10 : gold;
                    // 更新数据
                    let newData = {goldnum: gold, result: e.data.data.testAnswer};
                    console.log("newData");
                    console.log(newData);
                    let datas = {type: 'answerResult', data: newData};
                    $(".iframe iframe")[0].contentWindow.postMessage(datas, '*');
                } else if (e.data.type == "submitData") {
                    let resubmitdata = {type: 'resubmitAnswer'};
                    $(".iframe iframe")[0].contentWindow.postMessage(resubmitdata, '*');
                } else if (e.data.type == "close") {
                    $('.iframe iframe').attr('src', '');
                    $('.submitData').hide();
                } else if (e.data.type == "answer"){
                    let nData = e.data.data;
                    let datas = {type: 'answerTextResult', data: nData};
                    $(".iframe iframe")[0].contentWindow.postMessage(datas, '*');
                }
            });
            let publicPath;
            if (process.env.NODE_ENV === 'development') {
                publicPath = 'http://localhost:' + port.port + '/#/?id='+this.$route.query.id+'&startStatus='+this.$route.query.startStatus;
            } else {
                publicPath = 'http://localhost:8888/#/?id='+this.$route.query.id+'&startStatus='+this.$route.query.startStatus;
            }
            document.getElementById('iframeWindow').src = publicPath;
        }
    }
</script>

<style lang="scss" scoped>
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
        right: 0;
        bottom: 0;
        top: 0;
        iframe {
            width: 100%;
            height: 100%;
        }
        #submitButton {
            position: absolute;
            left: 0;
            right: 0;
            top: 0;
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
            padding: 16px 80px;
            margin-top: 12px;
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