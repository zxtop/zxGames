<template>
    <div>
        <div class="game-title">
            <i :class="tabShowStatus[index].child.bgImage?'el-icon-arrow-down':'el-icon-arrow-right'"
               @click="tabShow(index,'bgImage')" ref="bgImageTitle"></i>
            <span @click="tabShow(index,'bgImage')">
            背景图
        </span>
        </div>
        <div class="game-inner" v-show="tabShowStatus[index].child.bgImage">
            <div class="edit-checkbox-title">
                <el-checkbox v-model="item.bgImage.image.show" size="small"
                             @change="setResource(index,'bgImage','image')">图片
                </el-checkbox>
            </div>
            <div class="upload">
                <div class="img-box">
                    <img :src="resourceData[item.bgImage.image.name]" alt="" width="131" height="96">
                </div>
                <div class="upload-btn">
                    <div class="upload-btn-file">
                        <span>更改图片</span>
                        <input type="file" @change="uploadImage(index,'bgImage',$event)">
                    </div>
                </div>
            </div>
            <div class="edit-checkbox-title">
                <el-checkbox v-model="item.bgImage.sprite.show" size="small"
                             @change="setResource(index,'bgImage','sprite')">精灵序列
                </el-checkbox>
            </div>
            <div class="upload">
                <span class="file-title">
                    精灵文件：
                </span>
                <div class="animate-box">
                    <span v-text="item.bgImage.sprite.name"></span>
                </div>
                <div class="upload-btn">
                    <div class="upload-btn-file">
                        <span>更改文件</span>
                        <input type="file" multiple="multiple" @change="uploadSprite(index,'bgImage',$event)">
                    </div>
                </div>
            </div>
            <el-input placeholder="请输入内容" @input.native="setElementStatus(index,'bgImage','sprite','x')"  v-model="item.bgImage.sprite.x" size="mini">
                <template slot="prepend">X：</template>
            </el-input>
            <el-input placeholder="请输入内容" @input.native="setElementStatus(index,'bgImage','sprite','y')"  v-model="item.bgImage.sprite.y" size="mini">
                <template slot="prepend">Y：</template>
            </el-input>
            <el-input placeholder="请输入内容" @input.native="setElementStatus(index,'bgImage','sprite','scale')"  v-model="item.bgImage.sprite.scale" size="mini">
                <template slot="prepend">Scale：</template>
            </el-input>
            <div class="edit-switch">
                <span>loop</span>
                <el-switch
                        v-model="item.bgImage.sprite.loop"
                        active-color="#77DC04"
                        inactive-color="#ff4949">
                </el-switch>
            </div>
            <div class="edit-checkbox-title">
                <el-checkbox v-model="item.bgImage.animate.show" size="small"
                             @change="setResource(index,'bgImage','animate')">动画
                </el-checkbox>
            </div>
            <div class="upload">
                <span class="file-title">动画文件：</span>
                <div class="animate-box">
                    <span v-text="item.bgImage.animate.name"></span>
                </div>
                <div class="upload-btn">
                    <div class="upload-btn-file">
                        <span>更改文件</span>
                        <input type="file" multiple="multiple"
                               @change="uploadAnimation(index,'bgImage',$event)">
                    </div>
                </div>
            </div>
            <el-input placeholder="请输入内容" @input.native="setElementStatus(index,'bgImage','animate','x')"  v-model="item.bgImage.animate.x" size="mini">
                <template slot="prepend">X：</template>
            </el-input>
            <el-input placeholder="请输入内容" @input.native="setElementStatus(index,'bgImage','animate','y')"  v-model="item.bgImage.animate.y" size="mini">
                <template slot="prepend">Y：</template>
            </el-input>
            <el-input placeholder="请输入内容" @input.native="setElementStatus(index,'bgImage','animate','scale')"  v-model="item.bgImage.animate.scale" size="mini">
                <template slot="prepend">Scale：</template>
            </el-input>
            <div class="edit-switch">
                <span>loop</span>
                <el-switch
                        v-model="item.bgImage.animate.loop"
                        active-color="#77DC04"
                        inactive-color="#ff4949">
                </el-switch>
            </div>
        </div>
        <div class="game-title">
            <i :class="tabShowStatus[index].child.stemImg?'el-icon-arrow-down':'el-icon-arrow-right'"
               @click="tabShow(index,'stemImg')" ref="stemImgTitle"></i>
            <span @click="tabShow(index,'stemImg')">
                题干
            </span>
        </div>
        <div class="game-inner" v-show="tabShowStatus[index].child.stemImg">
            <div class="edit-checkbox-title">
                <el-checkbox v-model="item.stemImg.image.show" size="small"
                             @change="setResource(index,'stemImg','image')">图片
                </el-checkbox>
            </div>
            <div>
                <div class="upload">
                    <div class="img-box">
                        <img :src="resourceData[item.stemImg.image.name]" alt="" width="131" height="96">
                    </div>
                    <div class="upload-btn">
                        <div class="upload-btn-file">
                            <span>更改图片</span>
                            <input type="file" @change="uploadImage(index,'stemImg',$event)">
                        </div>
                    </div>
                </div>
                <el-input placeholder="请输入内容" @input.native="setElementStatus(index,'stemImg','image','x')"  v-model="item.stemImg.image.x" size="mini">
                    <template slot="prepend">X：</template>
                </el-input>
                <el-input placeholder="请输入内容" @input.native="setElementStatus(index,'stemImg','image','y')"  v-model="item.stemImg.image.y" size="mini">
                    <template slot="prepend">Y：</template>
                </el-input>
                <div class="lockStatus">
                    <el-input placeholder="请输入内容" @input.native="setElementStatus(index,'stemImg','image','width',item.stemImg.image.ratio)"  v-model="item.stemImg.image.width" size="mini">
                        <template slot="prepend">W：</template>
                    </el-input>
                    <span class="lock_block" :lockRatio="item.stemImg.image.ratio"><img :src="item.stemImg.image.lock?lockImg:unLockImg" data-lock="false" alt="" @click="lockStatusData(item.stemImg,$event)"></span>
                    <el-input placeholder="请输入内容" @input.native="setElementStatus(index,'stemImg','image','height',item.stemImg.image.ratio)"  v-model="item.stemImg.image.height" size="mini">
                        <template slot="prepend">H：</template>
                    </el-input>
                </div>
            </div>
            <div class="edit-checkbox-title">
                <el-checkbox v-model="item.stemImg.sprite.show" size="small"
                             @change="setResource(index,'stemImg','sprite')">精灵序列
                </el-checkbox>
            </div>
            <div>
                <div class="upload">
                <span class="file-title">
                    精灵文件：
                </span>
                    <div class="animate-box">
                        <span v-text="item.stemImg.sprite.name"></span>
                    </div>
                    <div class="upload-btn">
                        <div class="upload-btn-file">
                            <span>更改文件</span>
                            <input type="file" multiple="multiple" @change="uploadSprite(index,'stemImg',$event)">
                        </div>
                    </div>
                </div>
                <el-input placeholder="请输入内容" @input.native="setElementStatus(index,'stemImg','sprite','x')" v-model="item.stemImg.sprite.x" size="mini">
                    <template slot="prepend">X：</template>
                </el-input>
                <el-input placeholder="请输入内容" @input.native="setElementStatus(index,'stemImg','sprite','y')" v-model="item.stemImg.sprite.y" size="mini">
                    <template slot="prepend">Y：</template>
                </el-input>
                <el-input placeholder="请输入内容" @input.native="setElementStatus(index,'stemImg','sprite','scale')" v-model="item.stemImg.sprite.scale" size="mini">
                    <template slot="prepend">Scale：</template>
                </el-input>
                <div class="edit-switch">
                    <span>loop</span>
                    <el-switch
                            v-model="item.stemImg.sprite.loop"
                            active-color="#77DC04"
                            inactive-color="#ff4949">
                    </el-switch>
                </div>
            </div>
            <div class="edit-checkbox-title">
                <el-checkbox v-model="item.stemImg.animate.show" size="small"
                             @change="setResource(index,'stemImg','animate')">动画
                </el-checkbox>
            </div>
            <div>
                <div class="upload">
                    <span class="file-title">动画文件：</span>
                    <div class="animate-box">
                        <span v-text="item.stemImg.animate.name"></span>
                    </div>
                    <div class="upload-btn">
                        <div class="upload-btn-file">
                            <span>更改文件</span>
                            <input type="file" multiple="multiple"
                                   @change="uploadAnimation(index,'stemImg',$event)">
                        </div>
                    </div>
                </div>
                <el-input placeholder="请输入内容" @input.native="setElementStatus(index,'stemImg','animate','x')" v-model="item.stemImg.animate.x" size="mini">
                    <template slot="prepend">X：</template>
                </el-input>
                <el-input placeholder="请输入内容" @input.native="setElementStatus(index,'stemImg','animate','y')" v-model="item.stemImg.animate.y" size="mini">
                    <template slot="prepend">Y：</template>
                </el-input>
                <el-input placeholder="请输入内容" @input.native="setElementStatus(index,'stemImg','animate','scale')" v-model="item.stemImg.animate.scale" size="mini">
                    <template slot="prepend">Scale：</template>
                </el-input>
                <div class="edit-switch">
                    <span>loop</span>
                    <el-switch
                            v-model="item.stemImg.animate.loop"
                            active-color="#77DC04"
                            inactive-color="#ff4949">
                    </el-switch>
                </div>
            </div>
            <div class="edit-checkbox-title">
                <el-checkbox v-model="item.subTitle.audioShow" size="small"
                             @change="setResource(index,'subTitle','audio')">音频
                </el-checkbox>
            </div>
            <div>
                <div class="upload">
                    <span class="file-title">音频文件：</span>
                    <div class="animate-box">
                        <span v-text="item.subTitle.audio"></span>
                    </div>
                    <div class="upload-btn">
                        <div class="upload-btn-file">
                            <span>更改文件</span>
                            <input type="file" @change="uploadAudio(index,$event)">
                        </div>
                    </div>
                </div>
                <div class="edit-range-audio">
                    <span>音量：</span>
                    <el-slider v-model="item.subTitle.audio_volume" :min='Number(0)' :max='Number(1)'
                               :step='Number(0.1)'></el-slider>
                </div>
                <div class="upload">
                    <span class="file-title">图标动画</span>
                    <div class="animate-box">
                        <span v-text="item.subTitle.soundImg.animate_name"></span>
                    </div>
                    <div class="upload-btn">
                        <div class="upload-btn-file">
                            <span>更改文件</span>
                            <input type="file" multiple="multiple"
                                   @change="uploadAnimation(index,'soundImg',$event)">
                        </div>
                    </div>
                </div>
                <el-input placeholder="请输入内容" @input.native="setSubTitileAttr('soundImg','x')" v-model="item.subTitle.soundImg.x" size="mini">
                    <template slot="prepend">X：</template>
                </el-input>
                <el-input placeholder="请输入内容" @input.native="setSubTitileAttr('soundImg','y')" v-model="item.subTitle.soundImg.y" size="mini">
                    <template slot="prepend">Y：</template>
                </el-input>
            </div>
            <div class="edit-checkbox-title">
                <el-checkbox v-model="item.subTitle.stem.show" size="small" @change="setStemTextStatus(item.subTitle.stem.show)">题干文字</el-checkbox>
            </div>
            <div>
                <div class="edit-textarea">
                    <span>内容：</span>
                    <textarea name="" id="" cols="30" rows="10" @input="setStemText('text')" v-model="item.subTitle.stem.text"
                              placeholder="请输入文字">
                </textarea>
                </div>
                <el-input placeholder="请输入内容" @input.native="setStemText('width')"  v-model="item.subTitle.stem.width" size="mini">
                    <template slot="prepend">段落宽度：</template>
                </el-input>
                <div class="edit-select">
                    <span>字体：</span>
                    <el-select @change="setStemText('fontFamily')"  v-model="item.subTitle.stem.fontFamily" placeholder="请选择" size="mini">
                        <el-option
                                v-for="item in fontFamily"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>
                </div>
                <el-input placeholder="请输入内容" @input.native="setStemText('fontSize')" maxlength="3" v-model="item.subTitle.stem.fontSize" size="mini">
                    <template slot="prepend">字号：</template>
                </el-input>
                <div class="edit-select">
                    <span>对齐：</span>
                    <el-select @change="setStemText('textAlign')" v-model="item.subTitle.stem.textAlign" placeholder="请选择" size="mini">
                        <el-option
                                v-for="item in textAlign"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>
                </div>
                <el-input placeholder="请输入内容" @input.native="setStemText('letterSpacing')" maxlength="3" v-model="item.subTitle.stem.letterSpacing" size="mini">
                    <template slot="prepend">字间距：</template>
                </el-input>
                <el-input placeholder="请输入内容" @input.native="setStemText('lineHeight')" maxlength="3" v-model="item.subTitle.stem.lineHeight" size="mini">
                    <template slot="prepend">行间距：</template>
                </el-input>
                <div class="edit-select">
                    <span>颜色：</span>
                    <el-color-picker v-model="item.subTitle.stem.color" @change="setStemText('color')" ></el-color-picker>
                </div>
                <div class="font-style">
                <span :class="item.subTitle.stem.strong?'font-style-color':''"
                      @click="setGoldTextFontStyle('strong',index)">B
                </span>
                    <span :class="item.subTitle.stem.italic?'font-style-color':''"
                          @click="setGoldTextFontStyle('italic',index)">I
                </span>
                </div>
                <el-input placeholder="请输入内容" @input.native="setSubTitileAttr('stem','x')" v-model="item.subTitle.stem.x" size="mini">
                    <template slot="prepend">X：</template>
                </el-input>
                <el-input placeholder="请输入内容" @input.native="setSubTitileAttr('stem','y')" v-model="item.subTitle.stem.y" size="mini">
                    <template slot="prepend">Y：</template>
                </el-input>
            </div>
            <!-- <el-input placeholder="请输入内容" v-model="item.subTitle.top" size="mini" style="width: 100%">
                <template slot="prepend">Top：</template>
            </el-input> -->
        </div>
    </div>
</template>

<script>
    import DragElement from 'xes-tem-render/DragElement.js'
    import {Application, Container, Graphics, Sprite,Texture, ParticleContainer,Text} from 'pixi.js';
    export default {
        name: "EditGamePublic",
        data() {
            return {
                lockImg:this.resourceData['image_lock_on'],
                unLockImg:this.resourceData['image_lock_off'],
                fontFamily: [
                    {
                        label: '微软雅黑',
                        value: 'Microsoft YaHei'
                    },
                    {
                        label: '宋体',
                        value: 'SimSun'
                    },
                    {
                        label: '黑体',
                        value: 'SimHei'
                    },
                    {
                        label: '方正粗圆',
                        value: 'FZCuYuan-M03S'
                    },
                    {
                        label: '方正粗圆简',
                        value: 'FZZhunYuan-M02S'
                    }
                ],
                textAlign: [
                    {
                        label: '左对齐',
                        value: 'left'
                    },
                    {
                        label: '右对齐',
                        value: 'right'
                    },
                    {
                        label: '居中对齐',
                        value: 'center'
                    },
                    {
                        label: '两端对齐',
                        value: 'justify'
                    }
                ]
            }
        },
        props: [
            'allData',
            'gameData',
            'resourceData',
            'tabShowStatus',
            'item',
            'index'
        ],
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
            setElementStatus(index,name,type,attr,ratio){
                let newName = '';
                if(name ==='bgImage'){
                    newName = 'gameBg'
                }else{
                    newName = 'stem'
                }
                let componentName = newName + type.substring(0,1).toUpperCase()+type.substring(1);
                let GAME = window.stage.getChildByName('GAME');
                let component = GAME.getChildByName('GAME'+index).children[0].getChildByName(newName+'Container').getChildByName(componentName);

                let isFloat = function (number) {
                    return /^-?\d*\.\d+$/.test(number);
                };

                let data = this.gameData[index][name][type];

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
            setSubTitileAttr(name,attr){
                let newName = '';
                if(name === 'soundImg'){
                    newName = 'stemSound'
                }else{
                    newName = 'stemText'
                }
                let GAME = window.stage.getChildByName('GAME');
                let component = GAME.getChildByName('GAME'+this.index).getChildByName('STEMTITLE').children[0].getChildByName(newName);
                if(component){
                    if(attr === 'x'&&this.item.subTitle[name][attr] > 1920){
                        this.$message.error('输入数值超出范围 应为0-1920');
                        this.item.subTitle[name][attr] = component[attr]
                        return
                    }
                    if(attr === 'y'&this.item.subTitle[name][attr] > 1080){
                        this.$message.error('输入数值超出范围 应为0-1080');
                        this.item.subTitle[name][attr] = component[attr]
                        return
                    }
                    if(this.isFloat(parseFloat(this.item.subTitle[name][attr]))){
                        this.item.subTitle[name][attr] = parseFloat(this.item.subTitle[name][attr].split('.')[0]+'.'+this.item.subTitle[name][attr].split('.')[1].substr(0,1));
                    }else{
                        this.item.subTitle[name][attr]
                        var reg = /^\d*\.+$/g;
                        if(this.item.subTitle[name][attr]&&reg.test(this.item.subTitle[name][attr])){
                            this.item.subTitle[name][attr] = parseFloat(this.item.subTitle[name][attr])+'.';
                        }else{
                            this.item.subTitle[name][attr] = this.item.subTitle[name][attr]?parseFloat(this.item.subTitle[name][attr]):0;
                        }
                    }
                    if(parseFloat(this.item.subTitle[name][attr])<0){
                        this.item.subTitle[name][attr] = component[attr]
                    }
                    component[attr] = this.item.subTitle[name][attr];
                }
            },
            setStemTextStatus(status){
                let GAME = window.stage.getChildByName('GAME');
                let container = GAME.getChildByName('GAME'+this.index).getChildByName('STEMTITLE').children[0];
                let component = container.getChildByName('stemText');
                if(component){
                    if(status){
                        component.visible = true
                    }else{
                        component.visible = false
                    }
                }
            },
            setStemText(attr){
                let subTitle = this.item.subTitle;
                let GAME = window.stage.getChildByName('GAME');
                let component = GAME.getChildByName('GAME'+this.index).getChildByName('STEMTITLE').children[0].getChildByName('stemText');
                let reg = /^\d{1,3}$/;
                if(attr==='letterSpacing'||attr==='lineHeight'){
                    reg = /^0?-\d?\.?\d?$/;
                }
                if(attr === 'width' && (subTitle.stem[attr] > 1920 || subTitle.stem[attr] < 0)){
                    subTitle.stem.width = component._style.wordWrapWidth
                    this.$message.error('输入数值超出范围 应为0-1920');
                    return
                }
                if(attr == 'fontSize'){
                    if(subTitle.stem[attr]==0){
                        if(component){
                            component.visible = false;
                            return;
                        }
                    }
                    else{
                        if(component){
                            component.visible = true
                        }
                    }
                }
                if(attr == 'fontSize'){
                    if(!reg.test(subTitle.stem[attr])){
                        this.$message({
                            type:'error',
                            message:'输入错误'
                        });
                        return;
                    }
                    if(subTitle.stem[attr]>120){
                        subTitle.stem[attr] = 120
                        this.$message({
                            type:'warning',
                            message:'超过最大字体120'
                        });
                    }
                }
                if(attr == 'lineHeight'||attr == 'letterSpacing'){
                    if(reg.test(subTitle.stem[attr])){
                        subTitle.stem[attr] = parseFloat(subTitle.stem[attr])?parseFloat(subTitle.stem[attr]).toFixed(0):'-';
                    }else{
                        subTitle.stem[attr] = parseFloat(subTitle.stem[attr])?parseFloat(subTitle.stem[attr]).toFixed(0):0
                    }
                }
                if(attr == 'width'){
                    subTitle.stem[attr] = this.verifyNumber(subTitle.stem[attr]);
                }
                subTitle.stem.color = subTitle.stem.color?subTitle.stem.color:'#000';



                let style = new PIXI.TextStyle({
                    fontFamily: subTitle.stem.fontFamily,
                    fontSize: parseInt(subTitle.stem.fontSize),
                    wordWrap: true,
                    wordWrapWidth: parseInt(subTitle.stem.width),
                    breakWords: true,
                    lineHeight: parseInt(subTitle.stem.lineHeight),
                    letterSpacing: parseInt(subTitle.stem.letterSpacing),
                    align: subTitle.stem.textAlign,
                    fill: subTitle.stem.color,
                    width: subTitle.stem.width,
                    fontWeight: subTitle.stem.strong ? 'bold' : '',
                    fontStyle: subTitle.stem.italic ? 'italic' : '',
                    padding:40
                });
                if(component){
                    if(attr === 'text'){
                        component.setText(subTitle.stem.text);
                        return;
                    }
                    component.setStyle(style);
                    if(subTitle.stem.show){
                        component.visible =  true;
                    }else{
                        component.visible =  false;
                    }
                }else{
                    let text = new Text(subTitle.stem.text,style);
                    new DragElement(text,(x,y)=>{
                        this.item.subTitle.stem.x = x.toFixed(1);
                        this.item.subTitle.stem.y = y.toFixed(1);
                    });
                    text.name = 'stemText';
                    console.log(text);
                    GAME.getChildByName('GAME'+this.index).getChildByName('STEMTITLE').children[0].addChild(text);
                    if(subTitle.stem.show){
                        text.visible =  true;
                    }else{
                        text.visible =  false;
                    }
                }
            },
            setResource(index, name, type) {
                if (name === 'subTitle') {
                    if (!this.gameData[index][name].audioShow) {
                        this.gameData[index][name].audio = '';
                        this.gameData[index][name].soundImg.animate_name = '';
                        this.gameData[index][name].soundImg.x?this.gameData[index][name].soundImg.x = 0:"";
                        this.gameData[index][name].soundImg.y?this.gameData[index][name].soundImg.y = 0:"";
                        this.gameData[index][name].soundImg.width?this.gameData[index][name].soundImg.width = 0:"";
                        this.gameData[index][name].soundImg.height?this.gameData[index][name].soundImg.height = 0:"";
                        this.gameData[index][name].soundImg.scale?this.gameData[index][name].soundImg.scale = 1:"";
                        let GAME = window.stage.getChildByName('GAME');
                        let container = GAME.getChildByName('GAME'+this.index).getChildByName('STEMTITLE').children[0];
                        let animate = GAME.getChildByName('GAME'+this.index).getChildByName('STEMTITLE').children[0].getChildByName('stemSound');
                        if(animate){
                            container.removeChild(animate);
                        }
                    }
                    else{
                        let newName = "";
                        if(name ==='bgImage'){
                            newName = 'gameBg'
                        }else{
                            newName = 'stem'
                        }
                        let GAME = window.stage.getChildByName('GAME');
                        let animate = GAME.getChildByName('GAME'+this.index).getChildByName('STEMTITLE').children[0].getChildByName('stemSound');

                        if(animate&&this.gameData[index][name].audio){
                            animate.visible = true;
                        }
                    }
                } else {
                    if (!this.gameData[index][name][type].show) {
                        this.gameData[index][name][type].name = '';
                        this.gameData[index][name][type].x?this.gameData[index][name][type].x = 0:"";
                        this.gameData[index][name][type].y?this.gameData[index][name][type].y = 0:"";
                        this.gameData[index][name][type].width?this.gameData[index][name][type].width = 0:"";
                        this.gameData[index][name][type].height?this.gameData[index][name][type].height = 0:"";
                        this.gameData[index][name][type].scale?this.gameData[index][name][type].scale = 1:"";
                        let newName = "";
                        if(name ==='bgImage'){
                            newName = 'gameBg'
                        }else{
                            newName = 'stem'
                        }
                        let GAME = window.stage.getChildByName('GAME');
                        let componentName = newName + type.substring(0,1).toUpperCase()+type.substring(1);
                        let animate = GAME.getChildByName('GAME'+index).children[0].getChildByName(newName+'Container').getChildByName(componentName);
                        let container = GAME.getChildByName('GAME'+index).children[0].getChildByName(newName+'Container');
                        if(animate){
                            container.removeChild(animate);
                        }
                    }else{
                        let newName = "";
                        if(name ==='bgImage'){
                            newName = 'gameBg'
                        }else{
                            newName = 'stem'
                        }
                        let GAME = window.stage.getChildByName('GAME');
                        let componentName = newName + type.substring(0,1).toUpperCase()+type.substring(1);
                        let animate = GAME.getChildByName('GAME'+index).children[0].getChildByName(newName+'Container').getChildByName(componentName);
                        if(animate){
                            animate.visible = true;
                        }
                    }
                }
            },
            tabShow(index, name) {
                let title = this.$refs[name + 'Title'];
                let nameTab = this.tabShowStatus[index].child[name];
                if (nameTab) {
                    this.tabShowStatus[index].child[name] = false;
                    title.className = 'el-icon-arrow-right'
                } else {
                    Object.keys(this.tabShowStatus[index].child).forEach((item, index1) => {
                        this.tabShowStatus[index].child[item] = false
                    })
                    this.tabShowStatus[index].child[name] = true;
                    title.className = 'el-icon-arrow-down'
                }
            },
            setGoldTextFontStyle(name, index) {
                this.gameData[index].subTitle.stem[name] = !this.gameData[index].subTitle.stem[name];
                let subTitle = this.item.subTitle;
                let GAME = window.stage.getChildByName('GAME');
                let component = GAME.getChildByName('GAME'+this.index).getChildByName('STEMTITLE').children[0].getChildByName('stemText');
                if(component){
                    let style = new PIXI.TextStyle({
                        fontFamily: subTitle.stem.fontFamily,
                        fontSize: parseInt(subTitle.stem.fontSize),
                        wordWrap: true,
                        wordWrapWidth: parseInt(subTitle.stem.width),
                        breakWords: true,
                        lineHeight: parseInt(subTitle.stem.lineHeight),
                        letterSpacing: parseInt(subTitle.stem.letterSpacing),
                        align: subTitle.stem.textAlign,
                        fill: subTitle.stem.color,
                        width: subTitle.stem.width,
                        fontWeight: subTitle.stem.strong ? 'bold' : '',
                        fontStyle: subTitle.stem.italic ? 'italic' : '',
                        padding:40
                    });
                    component.setStyle(style);
                }
            },
            isFloat(n){
                return /^-?\d*\.\d+$/.test(n);
            },
            uploadImage(index, name, e) {
                let ext = e.target.files[0].name.split('.')[e.target.files[0].name.split('.').length - 1];
                let extArr = ['jpg', 'png', 'JPG'];
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
                    this.gameData[index][name].image.name = res.resourceName;
                    this.updateResourceData();
                    let type = 'Image'
                    let newName = ''
                    if(name ==='bgImage'){
                        newName = 'gameBg'
                    }else{
                        newName = 'stem'
                    }
                    let GAME = window.stage.getChildByName('GAME');
                    let componentName = newName + type.substring(0,1).toUpperCase()+type.substring(1);
                    let image =GAME.getChildByName('GAME'+index).children[0].getChildByName(newName+'Container').getChildByName(componentName);
                    let container = GAME.getChildByName('GAME'+index).children[0].getChildByName(newName+'Container');
                    if(image){
                        PIXI.loader.add(res.resourceName,res.path);
                        PIXI.loader.load((loader,resource)=>{
                            // container.addChild(image)
                            image.texture = new Texture.fromImage(resource[res.resourceName].url);
                            image.width = res.width;
                            image.height = res.height;
                            // image.x = 0;
                            // image.y = 0;
                            if(name !== 'bgImage'){
                                new DragElement(image,(x,y)=>{
                                    this.gameData[index][name].image.x = x.toFixed(1);
                                    this.gameData[index][name].image.y = y.toFixed(1);
                                })
                            }
                            if(this.gameData[index][name].image.show){
                                image.visible = true;
                            }else{
                                image.visible = false;
                            }
                        })
                    }
                    else{
                        this.gameData[index][name].image.x = 0;
                        this.gameData[index][name].image.y = 0;

                        PIXI.loader.add(res.resourceName,res.path);
                        PIXI.loader.load((loader,resource)=>{
                            image = new Sprite.fromImage(resource[res.resourceName].url);
                            image.name = componentName;
                            image.x = 0;
                            image.y = 0;
                            image.width = res.width;
                            image.height = res.height;
                            container.addChild(image)
                            if(name !== 'bgImage'){
                                new DragElement(image,(x,y)=>{
                                    this.gameData[index][name].image.x = x.toFixed(1);
                                    this.gameData[index][name].image.y = y.toFixed(1);
                                })
                            }
                            if(this.gameData[index][name].image.show){
                                image.visible = true;
                            }else{
                                image.visible = false;
                            }
                        })
                    }
                    if (name !== 'bgImage') {
                        this.gameData[index][name].image.width = res.width;
                        this.gameData[index][name].image.height = res.height;
                    }

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
            uploadSprite(index, name, e) {
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
                    this.gameData[index][name].sprite.name = res.resourceName;
                    let type = 'Sprite';
                    let newName = '';
                    if(name ==='bgImage'){
                        newName = 'gameBg'
                    }else{
                        newName = 'stem'
                    }

                    let componentName = newName + type;
                    let GAME = window.stage.getChildByName('GAME');
                    let sprite = GAME.getChildByName('GAME'+index).children[0].getChildByName(newName+'Container').getChildByName(componentName);
                    let container = GAME.getChildByName('GAME'+index).children[0].getChildByName(newName+'Container');
                    console.log(container);
                    if(sprite){
                        let xPos = sprite.x;
                        let yPos = sprite.y;
                        container.removeChild(sprite);
                        if(!window.res.hasOwnProperty(res.resourceName)){
                            PIXI.loader.add(res.resourceName,res.path);
                        }
                        PIXI.loader.load((loader,resource)=>{
                            let frame = resource[res.resourceName].spritesheet;
                            let frameArray = [];
                            for (let i in frame.textures) {
                                frameArray.push(frame.textures[i]);
                            }
                            sprite = new PIXI.extras.AnimatedSprite(frameArray);
                            sprite.x = xPos;
                            sprite.y = yPos;
                            sprite.scale.set(this.gameData[index][name].sprite.scale);
                            sprite.animationSpeed = 1;
                            sprite.play();
                            sprite.name = componentName;
                            container.addChild(sprite);
                            new DragElement(sprite,(x,y)=>{
                                this.gameData[index][name].sprite.x = x.toFixed(1);
                                this.gameData[index][name].sprite.y = y.toFixed(1);
                            })

                            if(this.gameData[index][name].sprite.show){
                                sprite.visible = true;
                            }else{
                                sprite.visible = false;
                            }
                        })
                    }else{
                        this.gameData[index][name].sprite.x = 0;
                        this.gameData[index][name].sprite.y = 0;
                        if(!window.res.hasOwnProperty(res.resourceName)){
                            PIXI.loader.add(res.resourceName,res.path);
                        }
                        PIXI.loader.load((loader,resource)=>{
                            let frame = resource[res.resourceName].spritesheet;
                            let frameArray = [];
                            for (let i in frame.textures) {
                                frameArray.push(frame.textures[i]);
                            }
                            sprite = new PIXI.extras.AnimatedSprite(frameArray);
                            sprite.x = 0;
                            sprite.y = 0;
                            sprite.scale.set(this.gameData[index][name].sprite.scale);
                            sprite.animationSpeed = 1;
                            sprite.play();
                            sprite.name = componentName;
                            container.addChild(sprite);

                            new DragElement(sprite,(x,y)=>{
                                this.gameData[index][name].sprite.x = x.toFixed(1);
                                this.gameData[index][name].sprite.y = y.toFixed(1);
                            });
                            if(this.gameData[index][name].sprite.show){
                                sprite.visible = true;
                            }else{
                                sprite.visible = false;
                            }
                        })
                    }
                })
            },
            uploadAudio(index, e) {
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
                        this.gameData[index]['subTitle'].audio = res.resourceName;
                        e.target.value = '';
                        //获取组件
                        let GAME = window.stage.getChildByName('GAME');
                        let animate = GAME.getChildByName('GAME'+this.index).getChildByName('STEMTITLE').children[0].getChildByName('stemSound');
                        if(this.gameData[index]['subTitle'].audioShow&&this.gameData[index]['subTitle'].soundImg.animate_name){
                            //显示
                            animate?animate.visible = true:"";
                        }else{
                            //隐藏
                            animate?animate.visible = false:"";
                        }
                        // this.getResourceData();
                    }
                )
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
            uploadAnimation(index, name, e) {
                if (e.target.files.length === 0 || e.target.files.length !== 3) {
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
                let files = Object.values(e.target.files);
                files.forEach((item, index) => {
                    object['animation' + (index + 1)] = item;
                });
                this.$http.post('/uploadingAnimation', object, {
                        headers: {'Content-Type': 'multipart/form-data'}
                    }
                ).then((res) => {
                    e.target.value = '';
                    if (name !== 'soundImg') {
                        this.gameData[index][name].animate.name = res.resourceName;
                        let newName = '';
                        let type = 'Animate';
                        if(name ==='bgImage'){
                            newName = 'gameBg'
                        }else{
                            newName = 'stem'
                        }
                        let componentName = newName + type;
                        let GAME = window.stage.getChildByName('GAME');
                        let animate = GAME.getChildByName('GAME'+index).children[0].getChildByName(newName+'Container').getChildByName(componentName);
                        let container = GAME.getChildByName('GAME'+index).children[0].getChildByName(newName+'Container');
                        if(animate){
                            let xPos = animate.x;
                            let yPos = animate.y;
                            container.removeChild(animate)
                            if(!window.res.hasOwnProperty(res.resourceName)){
                                PIXI.loader.add(res.resourceName,res.path);
                            }
                            PIXI.loader.load((loader,resource)=>{
                                animate = new PIXI.spine.Spine(resource[res.resourceName].spineData);
                                animate.x = xPos;
                                animate.y = yPos;
                                animate.scale.set(this.gameData[index][name].animate.scale);
                                animate.name = componentName;
                                animate.state.setAnimation(1,'animation',false);
                                container.addChild(animate);

                                new DragElement(animate,(x,y)=>{
                                    this.gameData[index][name].animate.x = x.toFixed(1);
                                    this.gameData[index][name].animate.y = y.toFixed(1);
                                })

                                if(this.gameData[index][name].animate.show){
                                    animate.visible = true;
                                }else{
                                    animate.visible = false;
                                }
                            })
                        }else{
                            this.gameData[index][name].animate.x = 0;
                            this.gameData[index][name].animate.y = 0;
                            let time = new Date().getTime();
                            if(!window.res.hasOwnProperty(res.resourceName)){
                                PIXI.loader.add(res.resourceName,res.path);
                            }
                            PIXI.loader.load((loader,resource)=>{
                                animate = new PIXI.spine.Spine(resource[res.resourceName].spineData);
                                animate.x = 0;
                                animate.y = 0;
                                animate.scale.set(this.gameData[index][name].animate.scale);
                                animate.name = componentName;
                                animate.state.setAnimation(1,'animation',false);
                                container.addChild(animate);
                                new DragElement(animate,(x,y)=>{
                                    this.gameData[index][name].animate.x = x.toFixed(1);
                                    this.gameData[index][name].animate.y = y.toFixed(1);
                                });
                                if(this.gameData[index][name].animate.show){
                                    animate.visible = true;
                                }else{
                                    animate.visible = false;
                                }
                            })
                        }
                    } else {
                        this.gameData[index]['subTitle'][name].animate_name = res.resourceName;
                        this.gameData[index]['subTitle']['soundImg'].scale = 1;
                        let componentName = 'stemSound';
                        let GAME = window.stage.getChildByName('GAME');
                        let animate = GAME.getChildByName('GAME'+this.index).getChildByName('STEMTITLE').children[0].getChildByName(componentName);
                        let container = GAME.getChildByName('GAME'+this.index).getChildByName('STEMTITLE').children[0];
                        if(animate){
                            let xPos = animate.x;
                            let yPos = animate.y;
                            container.removeChild(animate);
                            if(!window.res.hasOwnProperty(res.resourceName)){
                                PIXI.loader.add(res.resourceName,res.path);
                            }
                            PIXI.loader.load((loader,resource)=>{
                                animate = new PIXI.spine.Spine(resource[res.resourceName].spineData);
                                animate.name = componentName;
                                animate.state.setAnimation(1,'animation',false);
                                container.addChild(animate);
                                animate.x = xPos;
                                animate.y = yPos;

                                new DragElement(animate,(x,y)=>{
                                    this.gameData[index]['subTitle']['soundImg'].x = x.toFixed(1);
                                    this.gameData[index]['subTitle']['soundImg'].y = y.toFixed(1);
                                })

                                if(this.gameData[index]['subTitle'].audioShow&&this.gameData[index]['subTitle'].audio){
                                    animate.visible = true;
                                }else{
                                    animate.visible = false;
                                }
                            })
                        }else{
                            this.gameData[index]['subTitle']['soundImg'].x = 0;
                            this.gameData[index]['subTitle']['soundImg'].y = 0;
                            if(!window.res.hasOwnProperty(res.resourceName)){
                                PIXI.loader.add(res.resourceName,res.path);
                            }
                            PIXI.loader.load((loader,resource)=>{
                                animate = new PIXI.spine.Spine(resource[res.resourceName].spineData);
                                animate.x = 0;
                                animate.y = 0;
                                animate.name = componentName;
                                animate.state.setAnimation(1,'animation',false);
                                container.addChild(animate);
                                new DragElement(animate,(x,y)=>{
                                    this.gameData[index]['subTitle']['soundImg'].x = x.toFixed(1);
                                    this.gameData[index]['subTitle']['soundImg'].y = y.toFixed(1);
                                });
                                if(this.gameData[index]['subTitle'].audioShow&&this.gameData[index]['subTitle'].audio){
                                    animate.visible = true;
                                }else{
                                    animate.visible = false;
                                }
                            })
                        }
                    }
                    e.target.value = '';
                })
            },
            updateResourceData() {
                this.$emit('updateResourceData')
            },
            lockStatusData(item,e){
                //判断当前状态是否锁定
                if(item.image.show&&item.image.name){
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
            }
        },
    }
</script>

<style scoped lang="scss">
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