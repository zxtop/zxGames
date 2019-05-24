<template>
    <div class="end" v-if="showStatus">
        <div class="end-time">
            <el-input placeholder="" v-model="endData.jumpResultTime" style="width: 100%;margin-top: 0" size="mini">
                <template slot="prepend">最后一题停留时间</template>
                <template slot="append">ms</template>
            </el-input>
        </div>
        <div class="end-title">
            <i :class="tabShowStatus.endBg?'el-icon-arrow-down':'el-icon-arrow-right'"
               @click="tabShow('endBg','endBgTitle')" ref="endBgTitle"></i>
            <span @click="tabShow('endBg','endBgTitle')">
                背景图
            </span>
        </div>
        <div class="end-inner" v-if="tabShowStatus.endBg">
            <div class="edit-checkbox-title">
                <el-checkbox v-model="endData.endBg.image.show" size="small" @change="setResource('endBg','image')">图片</el-checkbox>
            </div>
            <div class="upload">
                <div class="img-box">
                    <img :src="resourceData[endData.endBg.image.name]" alt="" width="131" height="96"
                    >
                </div>
                <div class="upload-btn">
                    <div class="upload-btn-file">
                        <span>更改图片</span>
                        <input type="file" @change="uploadImage($event)">
                    </div>
                </div>
            </div>
            <el-input placeholder="请输入内容" v-model="endData.endBg.image.x" size="mini">
                <template slot="prepend">X：</template>
            </el-input>
            <el-input placeholder="请输入内容" v-model="endData.endBg.image.y" size="mini">
                <template slot="prepend">Y：</template>
            </el-input>
            <el-input placeholder="请输入内容" v-model="endData.endBg.image.width" size="mini">
                <template slot="prepend">W：</template>
            </el-input>
            <el-input placeholder="请输入内容" v-model="endData.endBg.image.height" size="mini">
                <template slot="prepend">H：</template>
            </el-input>
            <div class="edit-checkbox-title">
                <el-checkbox v-model="endData.endBg.animate.show" size="small" @change="setResource('endBg','animate')">动画</el-checkbox>
            </div>
            <div class="upload">
                <span class="file-title">
                    动画文件：
                </span>
                <div class="animate-box">
                    <span v-text="endData.endBg.animate.name"></span>
                </div>
                <div class="upload-btn">
                    <div class="upload-btn-file">
                        <span>更改文件</span>
                        <input type="file" multiple="multiple" @change="uploadAnimation($event)">
                    </div>
                </div>
            </div>
            <el-input placeholder="请输入内容" v-model="endData.endBg.animate.x" size="mini">
                <template slot="prepend">X：</template>
            </el-input>
            <el-input placeholder="请输入内容" v-model="endData.endBg.animate.y" size="mini">
                <template slot="prepend">Y：</template>
            </el-input>
            <el-input placeholder="请输入内容" v-model="endData.endBg.animate.scale" size="mini">
                <template slot="prepend">Scale：</template>
            </el-input>
            <div class="edit-switch">
                    <span>loop</span>
                    <el-switch
                            v-model="endData.endBg.animate.loop"
                            active-color="#77DC04"
                            inactive-color="#ff4949">
                    </el-switch>
            </div>
        </div>
        <div class="end-title">
            <i :class="tabShowStatus.goldNum?'el-icon-arrow-down':'el-icon-arrow-right'"
               @click="tabShow('goldNum','goldNumTitle')" ref="goldNumTitle"></i>
            <span @click="tabShow('goldNum','goldNumTitle')">
                金币文字
            </span>
        </div>
        <div class="end-inner" v-if="tabShowStatus.goldNum">
            <el-input placeholder="请输入内容" v-model="endData.goldText.x" size="mini">
                <template slot="prepend">X：</template>
            </el-input>
            <el-input placeholder="请输入内容" v-model="endData.goldText.y" size="mini">
                <template slot="prepend">Y：</template>
            </el-input>
            <div class="edit-select">
                <span>字体：</span>
                <el-select v-model="endData.goldText.fontFamily" placeholder="请选择" size="mini">
                    <el-option
                            v-for="item in fontFamily"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                    </el-option>
                </el-select>
            </div>
            <el-input placeholder="请输入内容" v-model="endData.goldText.fontSize" size="mini">
                <template slot="prepend">字号：</template>
            </el-input>
            <div class="edit-select">
                <span>颜色：</span>
                <el-color-picker v-model="endData.goldText.color"></el-color-picker>
            </div>
            <div class="font-style">
                <span :class="endData.goldText.strong?'font-style-color':''"
                      @click="setGoldTextFontStyle('strong')">B</span>
                <span :class="endData.goldText.italic?'font-style-color':''"
                      @click="setGoldTextFontStyle('italic')">I</span>
                <!--<span :class="endData.goldText.underline?'font-style-color':''"-->
                      <!--@click="setGoldTextFontStyle('underline')">U</span>-->
            </div>
        </div>
    </div>
</template>

<script>
    let allData;
    export default {
        name: "EditEnd",
        data() {
            return {
                time: 0,
                label: '1',
                endData: null,
                showStatus: false,
                tabShowStatus: {
                    endBg: false,
                    goldNum: false
                },
                fontFamily:[
                    {
                        label:'微软雅黑',
                        value:'Microsoft YaHei'
                    },
                    {
                        label:'宋体',
                        value:'SimSun'
                    },
                    {
                        label:'黑体',
                        value:'SimHei'
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
                resourceData:null
            }
        },
        props:['allData'],
        methods: {
            setGoldTextFontStyle(name) {
                this.endData.goldText[name] = !this.endData.goldText[name];
                this.endData.goldText[name]?this.endData.goldText.fontWeight = 'bold':this.endData.goldText.fontWeight = 'normal';
                if(name == 'italic'){this.endData.goldText[name]?this.endData.goldText.fontStyle = 'italic':this.endData.goldText.fontStyle=''}
            },
            setResource(name,type){
                if(!this.endData[name][type].show){
                    this.endData[name][type].name = '';
                }
            },
            tabShow(type, ref) {
                let title = this.$refs[ref];
                if (this.tabShowStatus[type]) {
                    this.tabShowStatus[type] = false;
                } else {
                    Object.keys(this.tabShowStatus).forEach((item,index)=>{
                        this.tabShowStatus[item] = false;
                    });
                    this.tabShowStatus[type] = true;
                }
            },
            getJSON() {
                this.endData = this.allData.one.end;
                this.getResourceData(()=>{
                    this.showStatus = true;
                })
            },
            getResourceData(callback){
                this.$http.get('/getResourceJSON', {params:{}}).then((res) => {
                    this.resourceData = res;
                    if(callback){
                        callback();
                    }
                })
            },
            uploadAnimation(e) {
                if (e.target.files.length === 0 || e.target.files.length !== 3) {
                    this.$message({
                        message: '上传文件个数不符合',
                        type: 'warning',
                    });
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
                    this.endData.endBg.animate.name = res.resourceName;
                })
            },
            uploadImage(e) {
                let ext = e.target.files[0].name.split('.')[e.target.files[0].name.split('.').length-1];
                let extArr = ['jpg','png'];
                if(extArr.indexOf(ext) === -1){
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
                if (e.target.files[0].size/1024/1024>1) {
                    this.$message({
                        message: '上传文件大小在1M以内',
                        type: 'warning'
                    });
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
                    console.log(res);
                    e.target.value = '';
                    this.endData.endBg.image.name = res.resourceName;
                    this.endData.endBg.image.width = res.width;
                    this.endData.endBg.image.height = res.height;
                    this.endData.endBg.image.x = 0;
                    this.endData.endBg.image.y = 0;
                    this.getResourceData();
                })
            },
        },
        mounted() {
            this.getJSON();
        }
    }
</script>

<style scoped lang="scss">
    .end{
        margin-top: 8px;
    }
    .end-title {
        height: 40px;
        line-height: 40px;
        background: #313131;
        padding-left: 8px;
        border-bottom: 1px solid #232323;
        color: #fff;
        i,span{
            cursor: pointer;
        }
    }
    .end-inner {
        padding: 0 15px;
        overflow: hidden;
    }

    .end-time {
        padding: 0 15px;
        overflow: hidden;
        margin-bottom: 8px;
    }
</style>