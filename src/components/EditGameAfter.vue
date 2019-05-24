<template>
    <div>

        <div class="game-title" style="background:#313131;padding-left:8px">
            <i :class="tabShowStatus.option1?'el-icon-arrow-down':'el-icon-arrow-right'"
            @click="tabShow('option1')" ref="option1Title"></i>
            <span @click="tabShow('option1')">
                公共部分
            </span>
        </div>

        <div class="game-inner" v-show="tabShowStatus.option1">

            <div class="game-title">
                <i :class="tabShowStatus.option2?'el-icon-arrow-down':'el-icon-arrow-right'"
                @click="tabShow('option2')" ref="option2Title"></i>
                <span @click="tabShow('option2')">
                    键盘
                </span> 
            </div>

            <div class="game-inner" v-show="tabShowStatus.option2" style="padding-left:0px;padding-right:0px">
                <div class="option-animate" >
                    <div class="edit-radio-title" >
                        <el-radio-group v-model="temData.keyChoice">

                            <el-radio label="1">默认开启不可收回</el-radio>
                            <el-radio label="2">手动开启可收回</el-radio>
                        </el-radio-group>

                    </div>
                </div>
            </div>

            <div class="game-title">
                <i :class="tabShowStatus.option3?'el-icon-arrow-down':'el-icon-arrow-right'"
                @click="tabShow('option3')" ref="option3Title"></i>
                <span @click="tabShow('option3')">
                    按钮
                </span> 
            </div>

            <div class="game-inner" v-show="tabShowStatus.option3" style="padding-left:0px;padding-right:0px;">
                <div class="option-animate" >
                    <div class="option-animate-title" >
                        <span>上一题</span>
                        <div class="edit-switch" style="float:right;margin-top:-5px">
                            <el-switch 
                                    v-model="temData.commentBtn.prevBtn.show"
                                    active-color="#77DC04"
                                    inactive-color="#ff4949">
                            </el-switch>
                        </div>
                        
                    </div>

                </div>

                <div class="option-animate" style="border-bottom:1px solid #222;" v-show="temData.commentBtn.prevBtn.show">
                    <div>
                        <div class="upload">
                            <div class="img-box">
                                <img :src="resourceData[temData.commentBtn.prevBtn.image.name]" alt="" width="131" height="96">
                            </div>
                            <div class="upload-btn">
                                <div class="upload-btn-file">
                                    <span>更改图片</span>
                                    <input type="file" @change="uploadImage('prevBtn',$event)">
                                </div>
                            </div>
                        </div>
                        <div style="clear:both"></div>
                        <div class="pointItem">
                        
                            <div class="lockStatus">
                                <el-input placeholder="请输入其宽度" v-model="temData.commentBtn.prevBtn.image.width" size="mini" @input="setDragTrash('prevBtn','width',$event,temData.commentBtn.prevBtn.image.ratio,'image','')">
                                    <template slot="prepend">W :</template>
                                </el-input>
                                <span class="lock_block" :lockRadio="temData.commentBtn.prevBtn.image.ratio"><img :src="temData.commentBtn.prevBtn.image.lock?lockImg:unLockImg" data-lock="false" alt="" @click="lockStatusDragOption(temData.commentBtn.prevBtn,$event)"></span>
                                <el-input placeholder="请输入其高度" v-model="temData.commentBtn.prevBtn.image.height" size="mini" @input="setDragTrash('prevBtn','height',$event,temData.commentBtn.prevBtn.image.ratio,'image','')">
                                    <template slot="prepend">H :</template>
                                </el-input>
                            </div>

                            <el-input placeholder="请输入其起始x" v-model="temData.commentBtn.prevBtn.image.x" size="mini" @input="setDragTrash('prevBtn','x',$event,temData.commentBtn.prevBtn.image.ratio,'image','')">
                                <template slot="prepend">X :</template>
                            </el-input>

                            <el-input placeholder="请输入其起始y" v-model="temData.commentBtn.prevBtn.image.y" size="mini" @input="setDragTrash('prevBtn','y',$event,temData.commentBtn.prevBtn.image.ratio,'image','')">
                                <template slot="prepend">Y :</template>
                            </el-input>
                            <div style="clear:both;margin-bottom:5px;width:100%;"></div>

                        </div>

                    </div>
                </div>

                <div class="option-animate" >
                    <div class="option-animate-title" >
                        <span>下一题</span>
                    </div>

                    <div class="upload">
                        <div class="img-box">
                            <img :src="resourceData[temData.commentBtn.nextBtn.image.name]" alt="" width="131" height="96">
                        </div>
                        <div class="upload-btn">
                            <div class="upload-btn-file">
                                <span>更改图片</span>
                                <input type="file" @change="uploadImage('nextBtn',$event)">
                            </div>
                        </div>
                    </div>

                </div>

                <div class="option-animate" >
                    <div class="option-animate-title" >
                        <span>提交</span>
                    </div>

                    <div class="upload">
                        <div class="img-box">
                            <img :src="resourceData[temData.commentBtn.subBtn.image.name]" alt="" width="131" height="96">
                        </div>
                        <div class="upload-btn">
                            <div class="upload-btn-file">
                                <span>更改图片</span>
                                <input type="file" @change="uploadImage('submit',$event)">
                            </div>
                        </div>
                    </div>
                    
                </div>

                <div style="clear:both"></div>
                <div class="pointItem">
                
                    <div class="lockStatus">
                        <el-input placeholder="请输入其宽度" v-model="temData.commentBtn.nextBtn.image.width" size="mini" @input="setDragTrash('nextBtn','width',$event,temData.commentBtn.nextBtn.image.ratio,'image','')">
                            <template slot="prepend">W :</template>
                        </el-input>
                        <span class="lock_block" :lockRadio="temData.commentBtn.nextBtn.image.ratio"><img :src="temData.commentBtn.nextBtn.image.lock?lockImg:unLockImg" data-lock="false" alt="" @click="lockStatusDragOption(temData.commentBtn.nextBtn,$event)"></span>
                        <el-input placeholder="请输入其高度" v-model="temData.commentBtn.nextBtn.image.height" size="mini" @input="setDragTrash('nextBtn','height',$event,temData.commentBtn.nextBtn.image.ratio,'image','')">
                            <template slot="prepend">H :</template>
                        </el-input>
                    </div>

                    <el-input placeholder="请输入其起始x" v-model="temData.commentBtn.nextBtn.image.x" size="mini" @input="setDragTrash('nextBtn','x',$event,temData.commentBtn.nextBtn.image.ratio,'image','')">
                        <template slot="prepend">X :</template>
                    </el-input>

                    <el-input placeholder="请输入其起始y" v-model="temData.commentBtn.nextBtn.image.y" size="mini" @input="setDragTrash('nextBtn','y',$event,temData.commentBtn.nextBtn.image.ratio,'image','')">
                        <template slot="prepend">Y :</template>
                    </el-input>
                    <div style="clear:both;margin-bottom:5px;width:100%;"></div>

                </div>


            </div>

            <div class="game-title">
                <i :class="tabShowStatus.option4?'el-icon-arrow-down':'el-icon-arrow-right'"
                @click="tabShow('option4')" ref="option4Title"></i>
                <span @click="tabShow('option4')">
                    选中音效
                </span> 
            </div>

            <div class="game-inner" v-show="tabShowStatus.option4">
                <div class="option-animate" style="border:none;">
                    <div class="option-animate-title" >
                        <span>选中输入框</span>
                        <div class="edit-switch" style="float:right;margin-top:-5px">
                            <el-switch 
                                    v-model="temData.comentAudio.pickBlank.show"
                                    active-color="#77DC04"
                                    inactive-color="#ff4949"
                                    @change="showInput($event)"
                                    >
                            </el-switch>
                        </div>
                        
                    </div>
                </div>

                <div class="option-animate" style="border-bottom:1px solid #222">
                    <div class="upload" style="margin-top:0px;">
                        <div class="animate-box">
                            <span>音频文件：</span><span v-text="temData.comentAudio.pickBlank.audio"></span>
                        </div>
                        <div class="upload-btn">
                            <div class="upload-btn-file">
                                <span>更改文件</span>
                                <input type="file" @change="uploadAudio('pickBlank',$event)">
                            </div>
                        </div>
                    </div>
                </div>


                <div class="option-animate" style="border-bottom:none;">
                    <div class="option-animate-title" style="border-bottom:none;">
                        <span>点击键盘</span>
                        <div class="edit-switch" style="float:right;margin-top:-5px">
                            <el-switch 
                                    v-model="temData.comentAudio.keyBlank.show"
                                    active-color="#77DC04"
                                    inactive-color="#ff4949"
                                    @change="showKeys($event)"
                                    >
                            </el-switch>
                        </div>
                        
                    </div>
                </div>

                <div class="option-animate" style="border-bottom:1px solid #222">
                    <div class="upload" style="margin-top:0px;">
                        <div class="animate-box">
                            <span>音频文件：</span><span v-text="temData.comentAudio.keyBlank.audio"></span>
                        </div>
                        <div class="upload-btn">
                            <div class="upload-btn-file">
                                <span>更改文件</span>
                                <input type="file" @change="uploadAudio('keyBlank',$event)">
                            </div>
                        </div>
                    </div>
                </div>


            </div>

        </div>
        
    </div>
</template>

<script>
    import {CopyAndRender,DeleteEleByName,UploadAndRenderEle,RenderElementByIndex} from 'xes-tem-render'

    export default {
        name: "EditGameAfter",
        props:['allData','resourceData'],
        data(){
            return{
                lockImg:this.resourceData['image_lock_on'],
                unLockImg:this.resourceData['image_lock_off'],
                tabShowStatus:{
                    option1:false,
                    option2:false,
                    option3:false,
                    option4:false
                },
                radio:1,
                switchStatus:false,
                image:{
                    "show": true,
                    "x": 0,
                    "y": 0,
                    "lock":false,
                    "width":0,
                    "height":0,
                    "name": "",
                    "ratio":0
                },
                audio_name:'dsadfs',
                temData:null,
                temResourceData:null
            }
        },
        created () {
          this.temData = this.allData;  
          this.temResourceData = this.resourceData;
    
        },
        methods:{
            showInput(e){
                if(!e){
                    this.temData.comentAudio.pickBlank.audio = '';
                }
            },
            showKeys(e){
                if(!e){
                    this.temData.comentAudio.keyBlank.audio = '';
                }
            },
            updateResourceData() {
                /*
                * 此方法在上传图片请求成功后执行
                * */
                this.$emit('updateResourceData')
            },
            tabShow(name) {
                let title = this.$refs[name + 'Title'];
                let nameTab = this.tabShowStatus[name];
                if (nameTab) {
                    this.tabShowStatus[name] = false;
                    title.className = 'el-icon-arrow-right'
                } else {
                    // Object.keys(this.tabShowStatus).forEach((item, index1) => {
                    //     this.tabShowStatus[item] = false
                    // })
                    this.tabShowStatus[name] = true;
                    title.className = 'el-icon-arrow-down'
                }
            },
            uploadImage(name,e){
                let ext = e.target.files[0].name.split('.')[e.target.files[0].name.split('.').length - 1];
                let extArr = ['jpg', 'png'];
                if (extArr.indexOf(ext) === -1) {
                    this.$message({
                        message: '上传类型不符',
                        type: 'error'
                    });
                    return;
                }
                if (e.target.files.length === 0) {
                    this.$message({
                        message: '上传文件个数不符合',
                        type: 'warning',
                    });
                    return;
                }
                this.$http.post('/uploadingImage',
                    {
                        image: e.target.files[0],
                        render:true
                    },
                    {
                        headers: {'Content-Type': 'multipart/form-data'}
                    }
                ).then((res) => {
                    if(name === 'prevBtn'){
                        this.temData.commentBtn.prevBtn.image.name = res.resourceName;
                       
                        this.temData.commentBtn.prevBtn.image.width = res.width;
                        this.temData.commentBtn.prevBtn.image.height = res.height;
                        this.temData.commentBtn.prevBtn.image.x?"":this.temData.commentBtn.prevBtn.image.x = 0;
                        this.temData.commentBtn.prevBtn.image.y?"":this.temData.commentBtn.prevBtn.image.y = 0;

                    }
                    if(name === 'nextBtn'){
                        this.temData.commentBtn.nextBtn.image.name = res.resourceName;
                       
                        this.temData.commentBtn.nextBtn.image.width = res.width;
                        this.temData.commentBtn.nextBtn.image.height = res.height;
                        this.temData.commentBtn.nextBtn.image.x?"":this.temData.commentBtn.nextBtn.image.x = 0;
                        this.temData.commentBtn.nextBtn.image.y?"":this.temData.commentBtn.nextBtn.image.y = 0;
                    }
                    if(name === 'submit'){
                        this.temData.commentBtn.subBtn.image.name = res.resourceName;
                        this.temData.commentBtn.nextBtn.image.width = res.width;
                        this.temData.commentBtn.nextBtn.image.height = res.height;
                        this.temData.commentBtn.nextBtn.image.x?"":this.temData.commentBtn.nextBtn.image.x = 0;
                        this.temData.commentBtn.nextBtn.image.y?"":this.temData.commentBtn.nextBtn.image.y = 0;
                    }
                    this.updateResourceData();
                    e.target.value = '';
                })
            },
            verifyNumber(number){
                let isFloat = function (number) {
                    return /^-?\d*\.\d+$/.test(number)
                };
                let reg = /^\d*\.+$/g;
                if(isNaN(number)){
                    number = 0;
                }
                if(parseFloat(number)>=0){
                    if(isFloat(parseFloat(number))){
                        number = parseFloat(number.split('.')[0]+'.'+number.split('.')[1].substr(0,1));
                    }else{
                        if(reg.test(number)){
                            number = parseFloat(number)+'.';
                        }else{
                            number = number?parseFloat(number):0;
                        }
                    }
                }else{
                    number = 0;
                }
                return number
            },
            setDragTrash(name,attr,e,ratio,type,ids){
               
                let temValue = null;
                let isFloat = function (number) {
                    return /^-?\d*\.\d+$/.test(number);
                };
                let data = null;
                
                    data = this.temData.commentBtn[name][type];
                
                
                    if(attr === 'scale'){
                        if(isFloat(data[attr])){
                            data[attr] = parseFloat(data[attr]).toFixed(1);
                        }
                       
                    }else{
                        if((attr === 'x'||attr === 'width') && data[attr] > 1920){
                         
                            data[attr] = data[attr].substr(0,data[attr].length-1);
                            this.$message.error('输入数值超出范围 应为0-1920');
                            return false;
                        }
                        if((attr === 'y'||attr === 'height') && data[attr] > 1080){
                         
                            data[attr] = data[attr].substr(0,data[attr].length-1);
                            this.$message.error('输入数值超出范围 应为0-1080');
                            return false;
                        }
                        if(attr === 'x'||attr === 'y'||attr === 'width'||attr === 'height'){
                            data[attr] = this.verifyNumber(data[attr]);
                        
                        }
                        if(attr === 'width'){
                            
                            if(data.lock){
                               
                                if(e){
                                    data['height'] = (parseFloat(e)/ratio).toFixed(0);
                                }else{

                                }
                            }
                        }
                        if(attr === 'height'){
                            if(data.lock) {
                                if(e){
                                    data['width'] = (parseFloat(e)*ratio).toFixed(0);
                                }else{
                                    
                                }
                            }
                        }
                    }
            },
            lockStatusDragOption(item,e){
                //判断当前状态是否锁定
                if(item.image.name){
                    if(item.image.width&&item.image.height){
                        if(e.currentTarget.getAttribute('data-lock')==='true'){
                            //锁定状态解除锁定，还原各变量
                            e.currentTarget.setAttribute('data-lock','false');
                            item.image.ratio = 0;
                            item.image.lock = false;
                        }else{
                            //未锁定添加锁定，添加变量
                            e.currentTarget.setAttribute('data-lock','true');
                            item.image.lock = true;
                            item.image.ratio = parseFloat(item.image.width)/parseFloat(item.image.height);
                        }
                    }else{
                        this.$message.error('绑定对象的宽高都不可为空');
                        return
                    }
                }else{
                    this.$message({
                        type: 'warning',
                        message: '舞台未绑定元素!'
                    });
                }
            },
            uploadAudio(name,e) {
                let ext = e.target.files[0].name.split('.')[e.target.files[0].name.split('.').length - 1];
                let extArr = ['mp3', 'wav'];
                if (extArr.indexOf(ext) === -1) {
                    this.$message({
                        message: '上传类型不符',
                        type: 'error'
                    });
                    return;
                }
                if (e.target.files.length === 0) {
                    this.$message({
                        message: '上传文件个数不符合',
                        type: 'warning',
                    });
                    return;
                }
                this.$http.post('/uploadingAudio',
                    {audio: e.target.files[0]}, {
                        headers: {'Content-Type': 'multipart/form-data'}
                    }
                ).then((res) => {
                    this.temData.comentAudio[name].audio = res.resourceName;
                    e.target.value = '';
                })
            }
        },
        mounted(){
            
            
        }
    }
</script>

<style scoped lang="scss">
.game-inner{overflow: visible!important;}
    .title{
        width:100%;
        height: 40px;
        line-height: 40px;
        background: #555555;
        margin-top: 15px;
        padding-left: 15px;
        color: #fff;
        padding-right: 8px;
        float:left;
    }
    .lockStatus{
        .el-input{
            width: 110px;
        }
        .lock_block{
            display: inline-block;
            width: 42px;
            height: 28px;
            float: left;
            margin-top: 15px;
            margin-left: 15px;

            img{
                cursor:pointer;
            }
        }
    }
    .option-item {
        border-top:1px solid #ccc;
        overflow: hidden;
        width: 100%;
        margin-top: 15px;
        float: left;
        &:nth-of-type(1){
            border: none;
        }
    }
    .game-icon {
        height: 40px;
        line-height: 40px;
        color: #fff;
        float: left;
        width: 100%;
    }
    .audio-title{
        margin-top: 15px;
        margin-bottom: 0;
        float: left;
        padding: 0 5px;
    }
    .option-animate{
        color: #eee;
        border-bottom: 1px solid #ccc;
        padding-bottom: 15px;
        overflow: hidden;
        .option-animate-radio{
            >label{
                margin: 5px 0;
            }
        }
        .option-checkbox{
            overflow: hidden;
            &>*{
                overflow: hidden;
            }
        }
        .option-animate-title{
            margin-top: 15px;
            border-left: 4px solid #eee;
            padding-left: 10px;
            height: 16px;
            line-height: 16px;
        }
        .option-animate-radio{
            margin: 10px 0 0 0;
            >label{
                width: 50%;
            }
        }
    }
    .option-audio{
        color: #eee;
        .option-audio-title{
            margin-bottom: 10px;
            margin-top: 10px;
            border-left: 4px solid #eee;
            padding-left: 10px;
            height: 16px;
            line-height: 16px;
        }
        .option-audio-inner{
            padding-left: 15px;
        }
    }
    .styleTitle{
        float: left;
        width: 100%;
        color: #fff;
        padding:0 10px;
    }
    .feedbackArea{
        clear: both;
        overflow: hidden;
    }
    .feedbackArea .edit-animate-checkbox{
        float: left;
        margin: 15px 10px 0 0;
        width: 45%;
    }
    .feedbackArea .edit-animate-checkbox span{
        color: #f5f5f5;
    }
    .feedbackArea .edit-animate-checkbox div{
        width:50%;
    }
</style>