<template>
    <div class="start" v-if="showStatus">
        <el-switch
                style="margin-left: 15px"
                v-model="startData.show"
                active-color="#77DC04"
                active-text="是否应用"
                inactive-color="#ff4949"
                @change="controlStartPage(startData.show)"        
        >
        </el-switch>
        <div v-if="startData.show" style="margin-top: 8px">
            <div class="start-title">
                <i :class="tabShowStatus.startBg?'el-icon-arrow-down':'el-icon-arrow-right'" ref="startBgTitle"
                   @click="tabShow('startBg','startBgTitle')"></i>
                <span @click="tabShow('startBg','startBgTitle')">
                    背景图
                </span>
            </div>
            <div class="start-inner" v-if="tabShowStatus.startBg">
                <div class="edit-checkbox-title">
                    <el-checkbox v-model="startData.startBg.image.show" size="small" @change="setResource('startBg','image')">图片</el-checkbox>
                </div>
                <!--<div>{{resourceData[startData.startBg.image.name]}}</div>-->
                <div class="upload">
                    <div class="img-box">
                        <img :src="resourceData[startData.startBg.image.name]" alt="" width="131" height="96"
                             @click='showBigImage($event)'>
                    </div>
                    <div class="upload-btn">
                        <div class="upload-btn-file">
                            <span>更改图片</span>
                            <input type="file" @change="uploadImage('startBg','image',$event)">
                        </div>
                    </div>
                </div>
                <div class="edit-checkbox-title">
                    <el-checkbox v-model="startData.startBg.sprite.show" size="small" @change="setResource('startBg','sprite')">精灵序列图</el-checkbox>
                </div>
                <div class="upload">
                    <span class="file-title">
                        精灵文件：
                    </span>
                    <div class="animate-box">
                        <span v-text="startData.startBg.sprite.name"></span>
                    </div>
                    <div class="upload-btn">
                        <div class="upload-btn-file">
                            <span>更改文件</span>
                            <input type="file" multiple="multiple" @change="uploadSprite('startBg',$event)">
                        </div>
                    </div>
                </div>

                <el-input placeholder="请输入内容" @input.native="setElementStatus('startBg','sprite','x')" v-model="startData.startBg.sprite.x" size="mini">
                    <template slot="prepend">X：</template>
                </el-input>
                <el-input placeholder="请输入内容" @input.native="setElementStatus('startBg','sprite','y')" v-model="startData.startBg.sprite.y" size="mini">
                    <template slot="prepend">Y：</template>
                </el-input>
                <el-input placeholder="请输入内容" @input.native="setElementStatus('startBg','sprite','scale')" v-model="startData.startBg.sprite.scale" size="mini">
                    <template slot="prepend">Scale：</template>
                </el-input>
                <div class="edit-switch">
                    <span>loop</span>
                    <el-switch
                            v-model="startData.startBg.sprite.loop"
                            active-color="#77DC04"
                            inactive-color="#ff4949">
                    </el-switch>
                </div>
                <div class="edit-checkbox-title">
                    <el-checkbox v-model="startData.startBg.animate.show" size="small" @change="setResource('startBg','animate')">动画</el-checkbox>
                </div>
                <div class="upload">
                    <span class="file-title">动画文件：</span>
                    <div class="animate-box">
                        <span v-text="startData.startBg.animate.name"></span>
                    </div>
                    <div class="upload-btn">
                        <div class="upload-btn-file">
                            <span>更改文件</span>
                            <input type="file" multiple="multiple" @change="uploadAnimation('startBg',$event)">
                        </div>
                    </div>
                </div>
                <el-input placeholder="请输入内容" @input.native="setElementStatus('startBg','animate','x')" v-model="startData.startBg.animate.x" size="mini">
                    <template slot="prepend">X：</template>
                </el-input>
                <el-input placeholder="请输入内容" @input.native="setElementStatus('startBg','animate','y')" v-model="startData.startBg.animate.y" size="mini">
                    <template slot="prepend">Y：</template>
                </el-input>
                <el-input placeholder="请输入内容" @input.native="setElementStatus('startBg','animate','scale')" v-model="startData.startBg.animate.scale" size="mini">
                    <template slot="prepend">Scale：</template>
                </el-input>
                <div class="edit-switch">
                    <span>loop</span>
                    <el-switch
                            v-model="startData.startBg.animate.loop"
                            active-color="#77DC04"
                            inactive-color="#ff4949">
                    </el-switch>
                </div>
            </div>
            <div class="start-title">
                <i :class="tabShowStatus.startBtn?'el-icon-arrow-down':'el-icon-arrow-right'"
                   @click="tabShow('startBtn','startBtnTitle')" ref="startBtnTitle"></i>
                <span @click="tabShow('startBtn','startBtnTitle')">
                    开始按钮
                </span>
            </div>
            <div class="start-inner" v-if="tabShowStatus.startBtn">
                <div class="edit-radio-title">
                    <el-radio v-model="label" label="1" @change="startBtn('image')">图片</el-radio>
                    <el-radio v-model="label" label="2" @change="startBtn('animate')">动画</el-radio>
                    <el-radio v-model="label" label="3" @change="startBtn('sprite')">精灵序列</el-radio>
                </div>
                <div v-if="label === '1'">
                    <div class="upload">
                        <div class="img-box">
                            <img :src="resourceData[startData.startBtn.image.name]" alt="" width="131" height="96"
                                 @click='showBigImage($event)'>
                        </div>
                        <div class="upload-btn">
                            <div class="upload-btn-file">
                                <span>更改图片</span>
                                <input type="file" @change="uploadImage('startBtn','image',$event)">
                            </div>
                        </div>
                    </div>
                    <el-input placeholder="请输入内容" @input.native="setElementStatus('startBtn','image','x')" v-model="startData.startBtn.image.x" size="mini">
                        <template slot="prepend">X：</template>
                    </el-input>
                    <el-input placeholder="请输入内容" @input.native="setElementStatus('startBtn','image','y')" v-model="startData.startBtn.image.y" size="mini">
                        <template slot="prepend">Y：</template>
                    </el-input>
                    <div class="lockStatus">
                        <el-input placeholder="请输入内容" @input.native="setElementStatus('startBtn','image','width',startData.startBtn.image.ratio)" v-model="startData.startBtn.image.width" size="mini">
                            <template slot="prepend">W：</template>
                        </el-input>
                        <span class="lock_block" :lockRatio="startData.startBtn.image.ratio"><img :src="startData.startBtn.image.lock?lockImg:unLockImg" data-lock="false" alt="" @click="lockStatusData(startData.startBtn,$event)"></span>
                        <el-input placeholder="请输入内容" @input.native="setElementStatus('startBtn','image','height',startData.startBtn.image.ratio)" v-model="startData.startBtn.image.height" size="mini">
                            <template slot="prepend">H：</template>
                        </el-input>
                    </div>
                </div>
                <div v-if="label === '2'">
                    <div class="upload">
                        <span class="file-title">动画文件：</span>
                        <div class="animate-box">
                            <span v-text="startData.startBtn.animate.name"></span>
                        </div>
                        <div class="upload-btn">
                            <div class="upload-btn-file">
                                <span>更改文件</span>
                                <input type="file" multiple="multiple" @change="uploadAnimation('startBtn',$event)">
                            </div>
                        </div>
                    </div>
                    <el-input placeholder="请输入内容" @input.native="setElementStatus('startBtn','animate','x')" v-model="startData.startBtn.animate.x" size="mini">
                        <template slot="prepend">X：</template>
                    </el-input>
                    <el-input placeholder="请输入内容" @input.native="setElementStatus('startBtn','animate','y')" v-model="startData.startBtn.animate.y" size="mini">
                        <template slot="prepend">Y：</template>
                    </el-input>
                    <el-input placeholder="请输入内容" @input.native="setElementStatus('startBtn','animate','scale')" v-model="startData.startBtn.animate.scale" size="mini">
                        <template slot="prepend">Scale：</template>
                    </el-input>
                    <div class="edit-switch">
                        <span>loop</span>
                        <el-switch
                                v-model="startData.startBtn.animate.loop"
                                active-color="#77DC04"
                                inactive-color="#ff4949">
                        </el-switch>
                    </div>
                </div>
                <div v-if="label === '3'">
                    <div class="upload">
                        <span class="file-title">
                            精灵文件：
                        </span>
                        <div class="animate-box">
                            <span v-text="startData.startBtn.sprite.name"></span>
                        </div>
                        <div class="upload-btn">
                            <div class="upload-btn-file">
                                <span>更改文件</span>
                                <input type="file" multiple="multiple" @change="uploadSprite('startBtn',$event)">
                            </div>
                        </div>
                    </div>
                    <el-input placeholder="请输入内容" @input.native="setElementStatus('startBtn','sprite','x')" v-model="startData.startBtn.sprite.x" size="mini">
                        <template slot="prepend">X：</template>
                    </el-input>
                    <el-input placeholder="请输入内容" @input.native="setElementStatus('startBtn','sprite','y')" v-model="startData.startBtn.sprite.y" size="mini">
                        <template slot="prepend">Y：</template>
                    </el-input>
                    <el-input placeholder="请输入内容" @input.native="setElementStatus('startBtn','sprite','scale')" v-model="startData.startBtn.sprite.scale" size="mini">
                        <template slot="prepend">Scale：</template>
                    </el-input>
                    <div class="edit-switch">
                        <span>loop</span>
                        <el-switch
                                v-model="startData.startBtn.sprite.loop"
                                active-color="#77DC04"
                                inactive-color="#ff4949">
                        </el-switch>
                    </div>
                </div>
            </div>
            <div class="start-title">
                <i :class="tabShowStatus.gameBgAudio?'el-icon-arrow-down':'el-icon-arrow-right'"
                   @click="tabShow('gameBgAudio','gameBgAudioTitle')" ref="gameBgAudioTitle"></i>
                <span @click="tabShow('gameBgAudio','gameBgAudioTitle')">
                    背景音乐
                </span>
                <el-switch class="edit-title-switch"
                           v-model="gameBgSoundData.show"
                           active-color="#77DC04"
                           @change="setbgAudioStatus()"
                           inactive-color="#ff4949">
                </el-switch>
            </div>
            <div class="start-inner" v-if="tabShowStatus.gameBgAudio&&gameBgSoundData.show === true">
                <div class="bg-audio-title">
                    音频
                </div>
                <div class="bg-audio-inner">

                    <div class="upload">
                        <span class="file-title">音频文件：</span>
                        <div class="animate-box">
                            <span v-text="gameBgSoundData.audio"></span>
                        </div>
                        <div class="upload-btn">
                            <div class="upload-btn-file">
                                <span>更改文件</span>
                                <input type="file" @change="uploadAudio($event)">
                            </div>
                        </div>
                    </div>
                    <div class="edit-range-audio">
                        <span>音量：</span>
                        <el-slider v-model="gameBgSoundData.audioVolume" :min='Number(0)' :max='Number(1)'
                                   :step='Number(0.1)'></el-slider>
                    </div>
                    <div class="edit-switch-audio">
                        <span>loop</span>
                        <el-switch
                                v-model="gameBgSoundData.loop"
                                active-color="#77DC04"
                                inactive-color="#ff4949">
                        </el-switch>
                    </div>
                </div>
                <div class="bg-audio-title">
                    图标动画
                </div>
                <div class="bg-audio-inner">
                    <div class="upload">
                        <span class="file-title">动画文件：</span>
                        <div class="animate-box">
                            <span v-text="gameBgSoundData.animate_name"></span>
                        </div>
                        <div class="upload-btn">
                            <div class="upload-btn-file">
                                <span>更改文件</span>
                                <input type="file" multiple="multiple" @change="uploadAnimation('gameBgAudio',$event)">
                            </div>
                        </div>
                    </div>
                    <el-input placeholder="请输入内容" @input.native="setBgSoundAttr('animate','x')" v-model="gameBgSoundData.x" size="mini">
                        <template slot="prepend">X：</template>
                    </el-input>
                    <el-input placeholder="请输入内容" @input.native="setBgSoundAttr('animate','y')" v-model="gameBgSoundData.y" size="mini">
                        <template slot="prepend">Y：</template>
                    </el-input>
                    <el-input placeholder="请输入内容" @input.native="setBgSoundAttr('animate','scale')" v-model="gameBgSoundData.scale" size="mini">
                        <template slot="prepend">Scale：</template>
                    </el-input>
                </div>
            </div>
        </div>
        <div class="mask" v-if="maskStatus" @click='maskStatus=false'>
            <img :src="publicImage" alt="">
        </div>
    </div>
</template>

<script>
    let allData = null;
    import DragElement from 'xes-tem-render/DragElement.js'
    import {Application, Container, Graphics, Sprite,Texture, ParticleContainer} from 'pixi.js';
    export default {
        name: "EditStart",
        data() {
            return {
                lockImg:'',
                unLockImg:'',
                showStatus: false,
                startData: null,
                publicImage: null,
                maskStatus: false,
                label: '1',
                startBgStatus: true,
                startBtnStatus: true,
                gameBgSoundData: null,
                resourceData: null,
                tabShowStatus: {
                    startBg: false,
                    startBtn: false,
                    gameBgAudio: false
                }
            }
        },
        props: ['allData'],
        methods: {
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
            setElementStatus(name,type,attr,ratio){
                let componentName = name + type.substring(0,1).toUpperCase()+type.substring(1);
                let component = window.stage.getChildByName('START').children[0].getChildByName(name+'Container').getChildByName(componentName)
                // let componentContainer =stage.getChildByName('GAME').getChildByName('GAME'+this.index).getChildByName('componentContainer');
                // let component = componentContainer.getChildByName(name);

                let isFloat = function (number) {
                    return /^-?\d*\.\d+$/.test(number);
                };

                let data = this.startData[name][type];

                if(component){
                    if(attr === 'scale'){
                        if(isFloat(data[attr])){
                            data[attr] = parseFloat(data[attr].split('.')[0]+'.'+data[attr].split('.')[1].substr(0,1));
                        }
                        component[attr].set(data[attr]);
                    }
                    else{
                        if((attr === 'x'||attr === 'width') && data[attr] > 1920 && (type != 'sprite' && type != 'animate')){
                            data[attr] = parseFloat(component[attr]).toFixed(0);
                            this.$message.error('输入数值超出范围 应为0-1920');
                            return false;
                        }
                        if((attr === 'y'||attr === 'height') && data[attr] > 1080 && (type != 'sprite' && type != 'animate')){
                            data[attr] = parseFloat(component[attr]).toFixed(0);
                            this.$message.error('输入数值超出范围 应为0-1080');
                            return false;
                        }
                        if(attr === 'x'||attr === 'y'||attr === 'width'||attr === 'height'){
                            data[attr] = this.verifyNumber(data[attr]);
                            component[attr] = data[attr];
                        }
                        if(attr === 'width'){
                            if(data.lock){
                                data['height'] = (data[attr]/ratio).toFixed(0);
                                component['height'] = data['height']
                            }
                        }
                        if(attr === 'height'){
                            if(data.lock) {
                                data['width'] = (data[attr]*ratio).toFixed(0);
                                component['width'] = data['width']
                            }
                        }
                    }
                }else{
                    this.$message({
                        type:'warning',
                        message:'舞台未绑定元素'
                    });
                    data[attr] = 0;
                }
            },
            verifyAnimationFiles(filesArr) {
                let arr = Object.values(filesArr).map((item, index) => item.name);
                let extArr = [];
                let nameArr = arr.map((item)=>{
                    extArr.push(item.split('.')[1]);
                    return item.split('.')[0]
                });
                let extArrString = extArr.sort((a,b)=>a.length-b.length).toString();
                let extTestArrString = ["png", "json", "atlas"].toString();
                let testName = nameArr[0];
                let nameStatus = nameArr.every((item,index)=>{
                    return testName === item
                });
                let extStatus = extArrString === extTestArrString;
                return nameStatus&&extStatus;
            },
            setBgSoundAttr(type,attr){
                let component = window.stage.getChildByName('gameBgSound')

                let isFloat = function (number) {
                    return /^-?\d*\.\d+$/.test(number);
                };

                let data = this.gameBgSoundData;

                if(component){
                    if(attr === 'scale'){
                        if(isFloat(data[attr])){
                            data[attr] = parseFloat(data[attr].split('.')[0]+'.'+data[attr].split('.')[1].substr(0,1));
                        }
                        component[attr].set(data[attr]);
                    }
                    else{
                        if((attr === 'x'||attr === 'width') && data[attr] > 1920 && (type != 'sprite' && type != 'animate')){
                            data[attr] = parseFloat(component[attr]).toFixed(0);
                            this.$message.error('输入数值超出范围 应为0-1920');
                            return false;
                        }
                        if((attr === 'y'||attr === 'height') && data[attr] > 1080 && (type != 'sprite' && type != 'animate')){
                            data[attr] = parseFloat(component[attr]).toFixed(0);
                            this.$message.error('输入数值超出范围 应为0-1080');
                            return false;
                        }
                        if(attr === 'x'||attr === 'y'||attr === 'width'||attr === 'height'){
                            data[attr] = this.verifyNumber(data[attr]);
                            component[attr] = data[attr];
                        }
                        if(attr === 'width'){
                            if(data.lock){
                                data['height'] = (data[attr]/ratio).toFixed(0);
                                component['height'] = data['height']
                            }
                        }
                        if(attr === 'height'){
                            if(data.lock) {
                                data['width'] = (data[attr]*ratio).toFixed(0);
                                component['width'] = data['width']
                            }
                        }
                    }
                }else{
                    this.$message({
                        type:'warning',
                        message:'舞台未绑定元素'
                    });
                    data[attr] = 0;
                }
            },
            isFloat(n){
                return /^-?\d*\.\d+$/.test(n);
            },
            getJSON() {
                this.startData = this.allData.one.start;
                this.gameBgSoundData = this.allData.one.gameBgSound;
                this.getResourceData(() => {
                    this.showStatus = true;
                    if(this.startData.startBtn.image.show){
                        this.label = '1'
                    }else if(this.startData.startBtn.animate.show){
                        this.label = '2'
                    }else if(this.startData.startBtn.sprite.show){
                        this.label = '3'
                    }else{
                        this.label = '1'
                    }
                })
            },
            setResource(name,type){
                if(!this.startData[name][type].show){
                    this.startData[name][type].name = '';
                    this.startData[name][type].width?this.startData[name][type].width = 0:"";
                    this.startData[name][type].height?this.startData[name][type].height = 0:"";
                    this.startData[name][type].x?this.startData[name][type].x = 0:"";
                    this.startData[name][type].y?this.startData[name][type].y = 0:"";
                    this.startData[name][type].scale?this.startData[name][type].scale = 1:"";
                    let componentName = name + type.substring(0,1).toUpperCase()+type.substring(1);
                    let component = window.stage.getChildByName('START').children[0].getChildByName(name+'Container').getChildByName(componentName);
                    let container = window.stage.getChildByName('START').children[0].getChildByName(name+'Container');
                    if(component){
                        container.removeChild(component);
                    }
                }else{
                    let componentName = name + type.substring(0,1).toUpperCase()+type.substring(1);
                    let component = window.stage.getChildByName('START').children[0].getChildByName(name+'Container').getChildByName(componentName);
                    component?component.visible = true:"";
                }

            },
            getResourceData(callback) {
                this.$http.get('/getResourceJSON', {params: {}}).then((res) => {
                    this.resourceData = res;
                    this.lockImg = this.resourceData['image_lock_on'];
                    this.unLockImg = this.resourceData['image_lock_off'];
                    if (callback) {
                        callback();
                    }
                })
            },
            startBtn(name) {
                Object.values(this.startData.startBtn).forEach((item)=>{
                    item.show = false;
                    item.name = '';
                    item.x?item.x = 0:"";
                    item.y?item.y = 0:"";
                    item.width?item.width = 0:"";
                    item.height?item.height = 0:"";
                    item.scale?item.scale = 1:"";
                })
                window.stage.getChildByName('START').children[0].getChildByName('startBtnContainer').removeChildren();
                this.startData.startBtn[name].show = true;
            },
            setbgAudioStatus() {
                if (this.gameBgSoundData.show) {
                    this.tabShowStatus.gameBgAudio = true;
                } else {
                    if(window.stage.getChildByName('gameBgSound')){
                        window.stage.removeChild(window.stage.getChildByName('gameBgSound'))
                    }
                    this.gameBgSoundData.audio = '';
                    this.gameBgSoundData.animate_name = '';
                    this.gameBgSoundData.x = 0;
                    this.gameBgSoundData.y = 0;
                    this.tabShowStatus.gameBgAudio = false;
                }
            },
            tabShow(type, ref) {
                let title = this.$refs[ref];
                if (this.tabShowStatus[type]) {
                    this.tabShowStatus[type] = false;
                    title.className = 'el-icon-arrow-right'
                } else {
                    Object.keys(this.tabShowStatus).forEach((item, index) => {
                        this.tabShowStatus[item] = false;
                    });
                    this.tabShowStatus[type] = true;
                    title.className = 'el-icon-arrow-down'
                    if (!this.gameBgSoundData.show) {
                        this.tabShowStatus.gameBgAudio = false;
                        title.className = 'el-icon-arrow-right'
                    }
                }
            },
            uploadImage(name, type, e) {
                let ext = e.target.files[0].name.split('.')[e.target.files[0].name.split('.').length - 1];
                let extArr = ['jpg', 'png'];
                if (extArr.indexOf(ext) === -1) {
                    this.$message({
                        message: '上传类型不符',
                        type: 'error'
                    });
                    e.target.value = '';
                    return;
                }
                if (e.target.files.length === 0) {
                    this.$message({
                        message: '上传文件个数不符合',
                        type: 'warning',
                    });
                    e.target.value = '';
                    return;
                }
                if (e.target.files[0].size/1024/1024>1) {
                    this.$message({
                        message: '上传文件大小在1M以内',
                        type: 'warning'
                    });
                    e.target.value = '';
                    return;
                }
                this.$http.post('/uploadingImage',
                    {
                        image: e.target.files[0]
                    },
                    {
                        headers: {'Content-Type': 'multipart/form-data'}
                    }
                ).then((res) => {
                    this.startData[name][type].name = res.resourceName;
                    this.getResourceData();
                    let componentName = name + type.substring(0,1).toUpperCase()+type.substring(1);
                    let image = window.stage.getChildByName('START').children[0].getChildByName(name+'Container').getChildByName(componentName);
                    let container = window.stage.getChildByName('START').children[0].getChildByName(name+'Container');
                    if(image){
                        image.texture = new Texture.fromImage(res.path);
                        // image.x = 0;
                        // image.y = 0;
                        if (name !== 'startBg') {
                            new DragElement(image,(x,y)=>{
                                this.startData[name][type].x = x.toFixed(1);
                                this.startData[name][type].y = y.toFixed(1);
                            })
                        }

                        if(this.startData[name][type].show){
                            image.visible = true;
                        }else{
                            image.visible = false;
                        }
                    }
                    else{
                        image = new Sprite.fromImage(res.path);
                        image.name = componentName;
                        image.x = 0;
                        image.y = 0;
                        container.addChild(image);
                        if (name !== 'startBg') {
                            new DragElement(image,(x,y)=>{
                                this.startData[name][type].x = x.toFixed(1);
                                this.startData[name][type].y = y.toFixed(1);
                            })
                        }

                        if(this.startData[name][type].show){
                            image.visible = true;
                        }else{
                            image.visible = false;
                        }
                    }
                    if(name!=='startBg'){
                        this.startData[name][type].width = res.width;
                        this.startData[name][type].height = res.height;
                        this.startData[name][type].x?this.startData[name][type].x = this.startData[name][type].x:this.startData[name][type].x = 0;
                        this.startData[name][type].y?this.startData[name][type].y = this.startData[name][type].y:this.startData[name][type].y = 0;
                    }
                    image.width = res.width;
                    image.height = res.height;
                    e.target.value = '';
                })
            },
            verifySpriteFiles(filesArr) {
                let arr = Object.values(filesArr).map((item, index) => item.name);
                let extArr = [];
                let nameArr = arr.map((item)=>{
                    extArr.push(item.split('.')[1]);
                    return item.split('.')[0]
                });
                let extArrString = extArr.sort((a,b)=>a.length-b.length).toString();
                let extTestArrString = ["png", "json"].toString();
                let testName = nameArr[0];
                let nameStatus = nameArr.every((item,index)=>{
                    return testName === item
                });
                let extStatus = extArrString === extTestArrString;
                return nameStatus&&extStatus;
            },
            uploadAnimation(name, e) {
                if (e.target.files.length === 0 || e.target.files.length !== 3){
                    this.$message({
                        message: '上传文件个数不符合',
                        type: 'warning',
                    });
                    e.target.value = '';
                    return;
                }
                if(!this.verifyAnimationFiles(e.target.files)){
                    this.$message({
                        message: '上传文件不符合',
                        type: 'warning',
                    });
                    e.target.value = '';
                    return;
                }
                let object = {};
                let type = 'Animate';
                let files = Object.values(e.target.files);
                files.forEach((item, index) => {
                    object['animation' + (index + 1)] = item;
                });
                this.$http.post('/uploadingAnimation', object, {
                        headers: {'Content-Type': 'multipart/form-data'}
                    }
                ).then((res) => {
                    console.log(res.path);
                    e.target.value = '';
                    if (name === 'gameBgAudio') {
                        this.gameBgSoundData.animate_name = res.resourceName;
                        this.gameBgSoundData.scale = 1;
                        let container = window.stage;
                        let animate;
                        if(window.stage.getChildByName('gameBgSound')){
                            animate = window.stage.getChildByName('gameBgSound');
                            let xPos = animate.x;
                            let yPos = animate.y;
                            container.removeChild(animate);
                            let time = new Date().getTime();
                            PIXI.loader.add('animation'+time,res.path);
                            PIXI.loader.load((loader,resource)=>{
                                animate = new PIXI.spine.Spine(resource['animation'+time].spineData);
                                animate.x = xPos;
                                animate.y = yPos;
                                animate.name = 'gameBgSound';
                                animate.state.setAnimation(1,'animation',true);
                                container.addChild(animate);
                                container.setChildIndex(animate,container.children.length-1);
                                new DragElement(animate,(x,y)=>{
                                    this.gameBgSoundData.x = x.toFixed(1);
                                    this.gameBgSoundData.y = y.toFixed(1);
                                })
                            })

                            if(this.allData.one.gameBgSound.show&&this.allData.one.gameBgSound.audio){
                                animate?animate.visible = true:"";
                            }else{
                                animate?animate.visible = false:"";
                            }
                        }
                        else{
                            this.gameBgSoundData.x = 0;
                            this.gameBgSoundData.y = 0;
                            let time = new Date().getTime();
                            PIXI.loader.add('animation'+time,res.path);
                            PIXI.loader.load((loader,resource)=>{
                                animate = new PIXI.spine.Spine(resource['animation'+time].spineData);
                                animate.name = 'gameBgSound';
                                animate.x = 0;
                                animate.y = 0;
                                animate.state.setAnimation(1,'animation',true);
                                container.addChild(animate);
                                container.setChildIndex(animate,container.children.length-1);
                                new DragElement(animate,(x,y)=>{
                                    this.gameBgSoundData.x = x.toFixed(1);
                                    this.gameBgSoundData.y = y.toFixed(1);
                                });

                                if(this.allData.one.gameBgSound.show&&this.allData.one.gameBgSound.audio){
                                    animate?animate.visible = true:"";
                                }else{
                                    animate?animate.visible = false:"";
                                }
                            })
                        }
                    } else {
                        this.startData[name].animate.name = res.resourceName;
                        let componentName = name + type;
                        let animate = window.stage.getChildByName('START').children[0].getChildByName(name+'Container').getChildByName(componentName);
                        let container = window.stage.getChildByName('START').children[0].getChildByName(name+'Container');
                        if(animate){
                            let xPos = animate.x;
                            let yPos = animate.y;
                            container.removeChild(animate);
                            let time = new Date().getTime();
                            PIXI.loader.add('animation'+time,res.path);
                            PIXI.loader.load((loader,resource)=>{
                                animate = new PIXI.spine.Spine(resource['animation'+time].spineData);
                                animate.x = xPos;
                                animate.y = yPos;
                                animate.scale.set(this.startData[name].animate.scale);
                                animate.name = componentName;
                                animate.state.setAnimation(1,'animation',true);
                                container.addChild(animate);
                                new DragElement(animate,(x,y)=>{
                                    this.startData[name].animate.x = x.toFixed(1);
                                    this.startData[name].animate.y = y.toFixed(1);
                                })

                                if(this.startData[name].animate.show){
                                    animate?animate.visible = true:"";
                                }else{
                                    animate?animate.visible = false:"";
                                }
                            })
                        }else{
                            this.startData[name].animate.x = 0;
                            this.startData[name].animate.y = 0;
                            let time = new Date().getTime();
                            PIXI.loader.add('animation'+time,res.path);
                            PIXI.loader.load((loader,resource)=>{
                                animate = new PIXI.spine.Spine(resource['animation'+time].spineData);
                                animate.x = 0;
                                animate.y = 0;
                                animate.scale.set(this.startData[name].animate.scale);
                                animate.name = componentName;
                                animate.state.setAnimation(1,'animation',true);
                                container.addChild(animate);
                                new DragElement(animate,(x,y)=>{
                                    this.startData[name].animate.x = x.toFixed(1);
                                    this.startData[name].animate.y = y.toFixed(1);
                                })

                                if(this.startData[name].animate.show){
                                    animate?animate.visible = true:"";
                                }else{
                                    animate?animate.visible = false:"";
                                }
                            })
                        }
                    }
                })
            },
            uploadSprite(name, e) {
                if (e.target.files.length === 0 || e.target.files.length !== 2) {
                    this.$message({
                        message: '上传文件个数不符合',
                        type: 'warning',
                    });
                    e.target.value = '';
                    return;
                }
                if(!this.verifySpriteFiles(e.target.files)){
                    this.$message({
                        message: '上传文件不符合',
                        type: 'warning',
                    });
                    e.target.value = '';
                    return;
                }
                let object = {};
                let files = Object.values(e.target.files);
                files.forEach((item, index) => {
                    object['sprite' + (index + 1)] = item;
                });
                console.log(object);
                this.$http.post('/uploadingSprite', object, {
                        headers: {'Content-Type': 'multipart/form-data'}
                    }
                ).then((res) => {
                    e.target.value = '';
                    let type = 'Sprite';
                    this.startData[name].sprite.name = res.resourceName;
                    let componentName = name + type;
                    let sprite = window.stage.getChildByName('START').children[0].getChildByName(name+'Container').getChildByName(componentName);
                    let container = window.stage.getChildByName('START').children[0].getChildByName(name+'Container');
                    if(sprite){
                        let xPos = sprite.x;
                        let yPos = sprite.y;
                        container.removeChild(sprite);
                        let time = new Date().getTime();
                        console.log(time);
                        PIXI.loader.add('sprite'+time,res.path);
                        PIXI.loader.load((loader,resource)=>{
                            let frame = resource['sprite'+time].spritesheet;
                            let frameArray = [];
                            for (let i in frame.textures) {
                                frameArray.push(frame.textures[i]);
                            }
                            sprite = new PIXI.extras.AnimatedSprite(frameArray);
                            sprite.x = xPos;
                            sprite.y = yPos;
                            sprite.scale.set(this.startData[name].sprite.scale);
                            sprite.animationSpeed = 1;
                            sprite.play();
                            sprite.name = componentName;
                            container.addChild(sprite);
                            new DragElement(sprite,(x,y)=>{
                                this.startData[name].sprite.x = x.toFixed(1);
                                this.startData[name].sprite.y = y.toFixed(1);
                            })

                            if(this.startData[name].sprite.show){
                                sprite?sprite.visible = true:"";
                            }else{
                                sprite?sprite.visible = false:"";
                            }
                        })
                    }else{
                        this.startData[name].sprite.x = 0;
                        this.startData[name].sprite.y = 0;
                        let time = new Date().getTime();
                        PIXI.loader.add('sprite'+time,res.path);
                        PIXI.loader.load((loader,resource)=>{
                            let frame = resource['sprite'+time].spritesheet;
                            let frameArray = [];
                            for (let i in frame.textures) {
                                frameArray.push(frame.textures[i]);
                            }
                            sprite = new PIXI.extras.AnimatedSprite(frameArray);
                            sprite.x = 0;
                            sprite.y = 0;
                            sprite.scale.set(this.startData[name].sprite.scale);
                            sprite.animationSpeed = 1;
                            sprite.play();
                            sprite.name = componentName;
                            container.addChild(sprite);
                            new DragElement(sprite,(x,y)=>{
                                this.startData[name].sprite.x = x.toFixed(1);
                                this.startData[name].sprite.y = y.toFixed(1);
                            });

                            if(this.startData[name].sprite.show){
                                sprite?sprite.visible = true:"";
                            }else{
                                sprite?sprite.visible = false:"";
                            }
                        })
                    }
                })
            },
            uploadAudio(e) {
                let ext = e.target.files[0].name.split('.')[e.target.files[0].name.split('.').length - 1];
                let extArr = ['mp3', 'wav'];
                if (extArr.indexOf(ext) === -1) {
                    this.$message({
                        message: '上传类型不符',
                        type: 'error'
                    });
                    e.target.value = '';
                    return;
                }
                if (e.target.files.length === 0) {
                    this.$message({
                        message: '上传文件个数不符合',
                        type: 'warning',
                    });
                    e.target.value = '';
                    return;
                }
                this.$http.post('/uploadingAudio',
                    {audio: e.target.files[0]}, {
                        headers: {'Content-Type': 'multipart/form-data'}
                    }
                ).then((res) => {
                    e.target.value = '';
                    this.gameBgSoundData.audio = res.resourceName;

                    let animate = stage.getChildByName('gameBgSound');
                    if(this.allData.one.gameBgSound.show&&this.allData.one.gameBgSound.animate_name){
                        //显示
                        animate?animate.visible = true:"";
                    }else{
                        //隐藏
                        animate?animate.visible = false:"";
                    }
                })
            },
            showBigImage(e) {
                this.maskStatus = true;
                this.publicImage = e.target.src
            },
            controlStartPage(show){
                let bgSound = stage.getChildByName("gameBgSound");
                let start = stage.getChildByName("START")
                if(show){
                    bgSound?bgSound.visible = true:"";
                    start?start.visible = true:"";
                }else{
                    bgSound?bgSound.visible = false:"";
                    start?start.visible = false:"";
                }

            },
            lockStatusData(item,e){
                //判断当前状态是否锁定
                if(item.image.show&&item.image.name){
                    if(item.image.width&&item.image.height){
                        if(item.image.lock){
                            e.currentTarget.setAttribute('data-lock','false');
                            item.image.ratio = 0;
                            item.image.lock = false;
                        }else{
                            e.currentTarget.setAttribute('data-lock','true');
                            item.image.ratio = parseFloat(item.image.width)/parseFloat(item.image.height);
                            item.image.lock = true;
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
            }
        },
        mounted() {
            this.getJSON();
            this.controlStartPage(this.startData.show)
        }
    }
</script>

<style lang="scss" scoped>
    .start {
        margin-top: 8px;
    }

    .start-title {
        height: 40px;
        line-height: 40px;
        color: #fff;
        background: #313131;
        padding-left: 8px;
        border-bottom: 1px solid #232323;
        i, span {
            cursor: pointer;
        }
    }

    .start-inner {
        padding: 15px;
        padding-top: 0;
        overflow: hidden;
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
            line-height: 26px;
            text-align: center;
            img{
                cursor:pointer;
            }
        }
    }
</style>