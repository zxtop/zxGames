<template>
    <div>

        <!-- 拖拽 -->
        <div class="drag" ref="drag" v-if="allData.dragShow == '1'">
            <div class="game-title">
                <i :class="tabShowStatus[index].child.option1?'el-icon-arrow-down':'el-icon-arrow-right'"
                @click="tabShow(index,'option1')" ref="option1Title"></i>
                <span @click="tabShow(index,'option1')">
                    拖拽
                </span>
            </div>

            <div class="game-inner" v-show="tabShowStatus[index].child.option1">

                <div class="game-title">
                    <i :class="tabShowStatus[index].child.option2?'el-icon-arrow-down':'el-icon-arrow-right'"
                    @click="tabShow(index,'option2')" ref="option2Title"></i>
                    <span @click="tabShow(index,'option2')">
                        拖拽区
                    </span>
                </div>
               
                <div class="game-inner" v-show="tabShowStatus[index].child.option2" style="padding-left:0px;padding-right:0px;">

                    <div class="lockStatus">
                        <el-input placeholder="请输入其宽度" v-model="gameData[index].content.option1.dragArea.width" size="mini" @input="setDragArea(index,'dragArea','width',$event,gameData[index].content.option1.dragArea.ratio,'','option1')">
                            <template slot="prepend">W :</template>
                        </el-input>
                        <span class="lock_block" :lockRadio="gameData[index].content.option1.dragArea.ratio"><img :src="item.content.option1.dragArea.lock?lockImg:unLockImg" data-lock="false" alt="" @click="lockStatusDrag(gameData[index].content.option1.dragArea,$event)"></span>
                        <el-input placeholder="请输入其高度" v-model="gameData[index].content.option1.dragArea.height" size="mini" @input="setDragArea(index,'dragArea','height',$event,gameData[index].content.option1.dragArea.ratio,'','option1')">
                            <template slot="prepend">H :</template>
                        </el-input>
                    </div>

                    <el-input placeholder="请输入其起始x" v-model="gameData[index].content.option1.dragArea.x" size="mini" @input="setDragArea(index,'dragArea','x',$event,gameData[index].content.option1.dragArea.ratio,'','option1')">
                        <template slot="prepend">X :</template>
                    </el-input>
                    <el-input placeholder="请输入其起始y" v-model="gameData[index].content.option1.dragArea.y" size="mini" @input="setDragArea(index,'dragArea','y',$event,gameData[index].content.option1.dragArea.ratio,'','option1')">
                        <template slot="prepend">Y :</template>
                    </el-input>
                    <div style="clear:both;margin-bottom:5px;width:100%;"></div>
                </div>

                <!-- 拖拽物 -->
                <div style="clear:both;"></div>

                <div class="game-title">
                    <i :class="tabShowStatus[index].child.option3?'el-icon-arrow-down':'el-icon-arrow-right'"
                    @click="tabShow(index,'option3')" ref="option3Title"></i>
                    <span @click="tabShow(index,'option3')">
                        拖拽物
                    </span>
                </div>

                <div class="game-inner" v-show="tabShowStatus[index].child.option3" style="padding-left:0px;padding-right:0px;">

                    <div class="option-animate">
                        <div class="option-animate-title" >
                            <span>是否重复拖拽</span>
                            <div class="edit-switch" style="float:right;margin-top:-5px">
                                <el-switch 
                                        v-model="item.content.option1.dragRepeat"
                                        active-color="#77DC04"
                                        inactive-color="#ff4949">
                                </el-switch>
                            </div>
                        </div>
                    </div>

                    <div class="optionItem">
                        <div v-for="(option1,ids) in gameData[index].content.option1.option" v-bind:key="ids">
                            <div class="dragTitle title">
                                <span style="color:#fff;margin-top:20px">拖拽物 {{ids+1}}</span>
                                <i @click="changeOptionArr('del',ids)" class="game-title-icon el-icon-delete" style="color:#fff"></i>
                                <i @click="changeOptionArr('copy',ids)" class="game-title-icon el-icon-tickets" style="color:#fff"></i>
                                <i @click="changeOptionArr('add',ids)" class="game-title-icon el-icon-plus" style="color:#fff"></i>
                            </div>

                            <div class="pointItem">

                                <div class="upload">
                                    <div class="img-box">
                                        <img :src="resourceData[option1.image.name]" alt="" width="131" height="96">
                                    </div>
                                    <div class="upload-btn">
                                        <div class="upload-btn-file">
                                            <span>更改图片</span>
                                            <input type="file" @change="uploadImageDrag(index,'option',ids ,$event)">
                                        </div>
                                    </div>
                                </div>

                                <div class="lockStatus">
                                    <el-input placeholder="请输入其宽度" v-model="option1.image.width" size="mini" @input="setDragOption(index,'option'+ids,'width',$event,option1.image.ratio,'image',ids)">
                                        <template slot="prepend">W :</template>
                                    </el-input>
                                    <span class="lock_block" :lockRadio="option1.image.ratio"><img :src="option1.image.lock?lockImg:unLockImg" data-lock="false" alt="" @click="lockStatusDragOption(option1,$event)"></span>
                                    <el-input placeholder="请输入其高度" v-model="option1.image.height" size="mini" @input="setDragOption(index,'option'+ids,'height',$event,option1.image.ratio,'image',ids)">
                                        <template slot="prepend">H :</template>
                                    </el-input>
                                </div>
                                <el-input placeholder="请输入其起始x" v-model="option1.image.x" size="mini" @input="setDragOption(index,'option'+ids,'x',$event,option1.image.ratio,'image',ids)">
                                    <template slot="prepend">X :</template>
                                </el-input>
                                <el-input placeholder="请输入其起始y" v-model="option1.image.y" size="mini" @input="setDragOption(index,'option'+ids,'y',$event,option1.image.ratio,'image',ids)">
                                    <template slot="prepend">Y :</template>
                                </el-input>
                            </div>


                        </div>
                        <div style="clear:both;margin-bottom:5px;width:100%;"></div>
                    </div>

                </div>


                <!-- 垃圾桶 -->
                <div style="clear:both"></div>

                <div class="game-title">

                    <i :class="tabShowStatus[index].child.option4?'el-icon-arrow-down':'el-icon-arrow-right'"
                    @click="tabShow(index,'option4')" ref="option4Title"></i>
                    <span @click="tabShow(index,'option4')">
                        垃圾桶
                    </span>

                    <el-switch style="float: right;margin-top:10px" @input="trashed(index,'trash',$event)"
                            v-model="item.content.option1.trash.show"
                            active-color="#77DC04"
                            inactive-color="#ff4949">
                    </el-switch>

                </div>

                <div class="game-inner" v-show="tabShowStatus[index].child.option4" style="padding-left:0px;padding-right:0px;">

                    <div class="option-animate" style="border-bottom:none;">
                        <div class="option-animate-title" >
                            <span>默认状态：</span>
                        </div>
                        <div class="upload">
                            <div class="img-box">
                                <img :src="resourceData[gameData[index].content.option1.trash.image.name]" alt="" width="131" height="96">
                            </div>
                            <div class="upload-btn">
                                <div class="upload-btn-file">
                                    <span>更改图片</span>
                                    <input type="file" @change="uploadImageTrash(index,'trash',$event)">
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="option-animate" style="border-bottom:none;">
                        <div class="option-animate-title">
                            <span>触碰状态：</span>
                        </div>
                        <div class="upload">
                            <div class="img-box">
                                <img :src="resourceData[gameData[index].content.option1.trash.image.name_another.name]" alt="" width="131" height="96">
                            </div>
                            <div class="upload-btn">
                                <div class="upload-btn-file">
                                    <span>更改图片</span>
                                    <input type="file" @change="uploadChangeImage(index,'trash_unable',0,$event)">
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="pointItem">
                        
                        <div class="lockStatus">
                            <el-input placeholder="请输入其宽度" v-model="item.content.option1.trash.image.width" size="mini" @input="setDragTrash(index,'trash','width',$event,item.content.option1.trash.image.ratio,'image','')">
                                <template slot="prepend">W :</template>
                            </el-input>
                            <span class="lock_block" :lockRadio="item.content.option1.trash.image.ratio"><img :src="item.content.option1.trash.image.lock?lockImg:unLockImg" data-lock="false" alt="" @click="lockStatusDragOption(item.content.option1.trash,$event)"></span>
                            <el-input placeholder="请输入其高度" v-model="item.content.option1.trash.image.height" size="mini" @input="setDragTrash(index,'trash','height',$event,item.content.option1.trash.image.ratio,'image','')">
                                <template slot="prepend">H :</template>
                            </el-input>
                        </div>

                        <el-input placeholder="请输入其起始x" v-model="item.content.option1.trash.image.x" size="mini" @input="setDragTrash(index,'trash','x',$event,item.content.option1.trash.image.ratio,'image','')">
                            <template slot="prepend">X :</template>
                        </el-input>

                        <el-input placeholder="请输入其起始y" v-model="item.content.option1.trash.image.y" size="mini" @input="setDragTrash(index,'trash','y',$event,item.content.option1.trash.image.ratio,'image','')">
                            <template slot="prepend">Y :</template>
                        </el-input>
                        <div style="clear:both;margin-bottom:5px;width:100%;"></div>

                    </div>

                </div>

            </div>

            <!-- 输入样式 -->
            <div style="clear:both"></div>

            <div class="game-title">
                <i :class="tabShowStatus[index].child.option5?'el-icon-arrow-down':'el-icon-arrow-right'"
                @click="tabShow(index,'option5')" ref="option5Title"></i>
                <span @click="tabShow(index,'option5')">
                    输入样式
                </span>
            </div>

            <div class="game-inner" v-show="tabShowStatus[index].child.option5" >

                <div class="edit-select" style="width: 100%">
                    <span style="width: 55px">字体 :</span>
                    <el-select v-model="item.content.option1.style_drag.fontFamily" placeholder="请选择" size="mini" style="width: 60%">
                        <el-option
                            v-for="itemd in testData.fontFamily"
                                :key="itemd.value"
                                :label="itemd.label"
                                :value="itemd.value">
                        </el-option>
                    </el-select>
                </div>
                
                <div style="width:100%;float:left;">
                    <el-input style="width:50%;" placeholder="请输入内容" v-model="item.content.option1.style_drag.fontSize" size="mini" @input="InputFonSize($event)">
                        <template slot="prepend">字号 :</template>
                    </el-input>
                </div>

                <div style="width:100%;float:left;">
                    <el-input style="width:50%;" placeholder="请输入内容" v-model="item.content.option1.style_drag.length" size="mini" @input="InputLength($event)">
                        <template slot="prepend">字符长度:</template>
                    </el-input>
                </div>

                <div class="edit-select">
                    <span>颜色：</span>
                    <el-color-picker v-model="item.content.option1.style_drag.color"></el-color-picker>
                </div>

                <div class="font-style">
                    <span :class="item.content.option1.style_drag.strong?'font-style-color':''"
                        @click="setGoldTextFontStyle('strong',index,'option1','style_drag')">B
                    </span>
                    <span :class="item.content.option1.style_drag.italic?'font-style-color':''"
                        @click="setGoldTextFontStyle('italic',index,'option1','style_drag')">I
                    </span>
                </div>
                <div style="clear:both;margin-bottom:5px;width:100%;"></div>

            </div>

            <!-- 填空 -->
            <div style="clear:both"></div>
            <div class="game-title">
                <i :class="tabShowStatus[index].child.option6?'el-icon-arrow-down':'el-icon-arrow-right'"
                @click="tabShow(index,'option6')" ref="option6Title"></i>
                <span @click="tabShow(index,'option6')">
                    填空
                </span>
            </div>

            <div class="game-inner" v-show="tabShowStatus[index].child.option6" >
                
                <div class="optionItem">
                    <div v-for="(blank2,ids) in gameData[index].content.option1.blank_drag" v-bind:key="ids">
                        
                        <div class="dragTitle title">
                            <span style="color:#fff;margin-top:20px">填空 {{ids+1}}</span>
                            <i @click="changeBlankArr('del',ids)" class="game-title-icon el-icon-delete" style="color:#fff"></i>
                            <i @click="changeBlankArr('copy',ids)" class="game-title-icon el-icon-tickets" style="color:#fff"></i>
                            <i @click="changeBlankArr('add',ids)" class="game-title-icon el-icon-plus" style="color:#fff"></i>
                        </div>
                        <div style="clear:both"></div>
                        
                        <div class="option-animate-title" style="margin-top:10px;">
                            <span style="color:#fff;">默认状态：</span>
                        </div>
                        
                        <div class="upload">
                            <div class="img-box">
                                <img :src="resourceData[blank2.image.name]" alt="" width="131" height="96">
                            </div>
                            <div class="upload-btn">
                                <div class="upload-btn-file">
                                    <span>更改图片</span>
                                    <input type="file" @change="uploadBlankImage(index,'blank_drag',ids ,$event)">
                                </div>
                            </div>
                        </div>


                        <div class="option-animate-title" style="margin-top:10px;">
                            <span style="color:#fff;">选中状态：</span>
                        </div>

                        <div class="upload">
                            <div class="img-box">
                                <img :src="resourceData[blank2.image.name_another.name]" alt="" width="131" height="96">
                            </div>
                            <div class="upload-btn">
                                <div class="upload-btn-file">
                                    <span>更改图片</span>
                                    <input type="file" @change="uploadChangeImage(index,'blank_drag_unable',ids ,$event)">
                                </div>
                            </div>
                        </div>

                        <div class="pointItem">
                            
                            <div class="lockStatus">
                                <el-input placeholder="请输入其宽度" v-model="blank2.image.width" size="mini" @input="setBlankStatus(index,'blank_drag'+ids,'width',$event,blank2.image.ratio,'image',ids,'option1')">
                                    <template slot="prepend">W :</template>
                                </el-input>
                                <span class="lock_block" :lockRadio="blank2.image.ratio"><img :src="blank2.image.lock?lockImg:unLockImg" data-lock="false" alt="" @click="lockStatusDragOption(blank2,$event)"></span>
                                <el-input placeholder="请输入其高度" v-model="blank2.image.height" size="mini" @input="setBlankStatus(index,'blank_drag'+ids,'height',$event,blank2.image.ratio,'image',ids,'option1')">
                                    <template slot="prepend">H :</template>
                                </el-input>
                            </div>
                            <el-input placeholder="请输入其起始x" v-model="blank2.image.x" size="mini" @input="setBlankStatus(index,'blank_drag'+ids,'x',$event,blank2.image.ratio,'image',ids,'option1')">
                                <template slot="prepend">X :</template>
                            </el-input>
                            <el-input placeholder="请输入其起始y" v-model="blank2.image.y" size="mini" @input="setBlankStatus(index,'blank_drag'+ids,'y',$event,blank2.image.ratio,'image',ids,'option1')">
                                <template slot="prepend">Y :</template>
                            </el-input>
                        </div>
                        <div style="clear:both;"></div>

                        <div class="option-animate" style="border-bottom:none;">


                            <div v-for="(rightAnswer,id) in blank2.image.keys" v-bind:key="id">

                                <div class="option-animate-title" v-if="id === 0">
                                    <span>正确答案</span>
                                    <i @click="changeRightArr('add',ids,id)" class="game-title-icon el-icon-plus" style="margin-top:-1px"></i>
                                </div>

                                <div style="width:100%;float:left;">
                                    <el-input style="width:80%;" placeholder="请输入内容" v-model="rightAnswer.value" size="mini" >
                                        <template slot="prepend">
                                            <span>正确答案:{{id+1}}</span>
                                        </template>
                                    </el-input>
                                    <div style="float:right;color:#fff;margin-top:12px;">
                                        <i @click="changeRightArr('del',ids,id)" class="game-title-icon el-icon-delete" style="margin:6px 4px;"></i>
                                    </div>
                                </div>

                            </div>


                        </div>

                    </div>
                </div>
            </div>

        </div>

        <!-- 画笔 -->
        <div class="draw" ref="draw" v-if="allData.dragShow == '2'">

            <div class="game-title">
                <i :class="tabShowStatus[index].child.option1?'el-icon-arrow-down':'el-icon-arrow-right'"
                @click="tabShow(index,'option1')" ref="option1Title"></i>
                <span @click="tabShow(index,'option1')">
                    画笔
                </span>
            </div>

            <div class="game-inner" v-show="tabShowStatus[index].child.option1">

                <div class="game-title">
                    <i :class="tabShowStatus[index].child.option2?'el-icon-arrow-down':'el-icon-arrow-right'"
                    @click="tabShow(index,'option2')" ref="option2Title"></i>
                    <span @click="tabShow(index,'option2')">
                        画线区域
                    </span>
                </div>

                <div class="game-inner" v-show="tabShowStatus[index].child.option2" style="padding-left:0px;padding-right:0px;">

                    <div class="lockStatus">
                        <el-input placeholder="请输入其宽度" v-model="gameData[index].content.option2.dragArea.width" size="mini" @input="setDragArea(index,'dragArea','width',$event,gameData[index].content.option2.dragArea.ratio,'','option2')">
                            <template slot="prepend">W :</template>
                        </el-input>
                        <span class="lock_block" :lockRadio="gameData[index].content.option2.dragArea.ratio"><img :src="item.content.option2.dragArea.lock?lockImg:unLockImg" data-lock="false" alt="" @click="lockStatusDrag(gameData[index].content.option2.dragArea,$event)"></span>
                        <el-input placeholder="请输入其高度" v-model="gameData[index].content.option2.dragArea.height" size="mini" @input="setDragArea(index,'dragArea','height',$event,gameData[index].content.option2.dragArea.ratio,'','option2')">
                            <template slot="prepend">H :</template>
                        </el-input>
                    </div>

                    <el-input placeholder="请输入其起始x" v-model="gameData[index].content.option2.dragArea.x" size="mini" @input="setDragArea(index,'dragArea','x',$event,gameData[index].content.option2.dragArea.ratio,'','option2')">
                        <template slot="prepend">X :</template>
                    </el-input>
                    <el-input placeholder="请输入其起始y" v-model="gameData[index].content.option2.dragArea.y" size="mini" @input="setDragArea(index,'dragArea','y',$event,gameData[index].content.option2.dragArea.ratio,'','option2')">
                        <template slot="prepend">Y :</template>
                    </el-input>
                    <div style="clear:both;margin-bottom:5px;width:100%;"></div>

                </div>

                <div class="game-title">
                    <i :class="tabShowStatus[index].child.option3?'el-icon-arrow-down':'el-icon-arrow-right'"
                    @click="tabShow(index,'option3')" ref="option3Title"></i>
                    <span @click="tabShow(index,'option3')">
                        画笔属性
                    </span>
                </div>

                <div class="game-inner" v-show="tabShowStatus[index].child.option3" style="padding-left:0px;padding-right:0px;">
                    <div class="option-animate" style="padding-left:15px;border-bottom:none;">
                        <div class="edit-radio-title">
                            <el-radio-group v-model="item.content.option2.brashChoice.choice">
                                <el-radio  label="1">自由画笔</el-radio>
                                <el-radio  label="2">直线画笔</el-radio>
                            </el-radio-group>
                        </div>
                    </div>
                    <div class="option-animate" style="border-bottom:none;">
                        <div class="option-animate-title">
                            <span>画笔（左上角为笔头）</span>
                        </div>

                        <div class="upload">
                            <div class="img-box">
                                <img :src="resourceData[item.content.option2.brash.image.name]" alt="" width="131" height="96">
                            </div>
                            <div class="upload-btn">
                                <div class="upload-btn-file">
                                    <span>更改图片</span>
                                    <input type="file" @change="uploadChangeImage(index,'brash',0,$event)">
                                </div>
                            </div>
                        </div>

                        <div class="lockStatus">
                            <el-input placeholder="请输入其宽度" v-model="item.content.option2.brash.image.width" size="mini" @input="setDragArea(index,'brash','width',$event,gameData[index].content.option2.brash.image.ratio,'image','option2')">
                                <template slot="prepend">W :</template>
                            </el-input>
                            <span class="lock_block" :lockRadio="item.content.option2.brash.image.ratio"><img :src="item.content.option2.brash.image.lock?lockImg:unLockImg" data-lock="false" alt="" @click="lockStatusDragOption(gameData[index].content.option2.brash,$event)"></span>
                            <el-input placeholder="请输入其高度" v-model="item.content.option2.brash.image.height" size="mini" @input="setDragArea(index,'brash','height',$event,gameData[index].content.option2.brash.image.ratio,'image','option2')">
                                <template slot="prepend">H :</template>
                            </el-input>
                        </div>

                        <el-input style="width:50%;" placeholder="请输入内容" v-model="item.content.option2.brash.degree" size="mini">
                            <template slot="prepend">画线粗细:</template>
                        </el-input>
                        <div class="edit-select" style="width:66%">
                                <span>画线颜色：</span>
                                <el-color-picker v-model="item.content.option2.brash.color"></el-color-picker>
                        </div>
                    </div>
                </div>

                <div class="game-title">
                    <i :class="tabShowStatus[index].child.option4?'el-icon-arrow-down':'el-icon-arrow-right'"
                    @click="tabShow(index,'option4')" ref="option4Title"></i>
                    <span @click="tabShow(index,'option4')">
                        按钮
                    </span>
                </div>

                <div class="game-inner" v-show="tabShowStatus[index].child.option4" style="padding-left:0px;padding-right:0px;">
                    
                    <div class="option-animate" style="border-bottom:none;">
                        <div class="option-animate-title">
                            <span>撤销按钮：</span>
                        </div>
                        <div class="upload">
                            <div class="img-box">
                                <img :src="resourceData[item.content.option2.back.image.name]" alt="" width="131" height="96">
                            </div>
                            <div class="upload-btn">
                                <div class="upload-btn-file">
                                    <span>更改图片</span>
                                    <input type="file" @change="uploadImageDrag(index,'back','' ,$event)">
                                </div>
                            </div>
                        </div>

                        <div class="pointItem">
                            
                            <div class="lockStatus">
                                <el-input placeholder="请输入其宽度" v-model="item.content.option2.back.image.width" size="mini" @input="setDragOption(index,'back','width',$event,item.content.option2.back.image.ratio,'image','')">
                                    <template slot="prepend">W :</template>
                                </el-input>
                                <span class="lock_block" :lockRadio="item.content.option2.back.image.ratio"><img :src="item.content.option2.back.image.lock?lockImg:unLockImg" data-lock="false" alt="" @click="lockStatusDragOption(item.content.option2.back,$event)"></span>
                                <el-input placeholder="请输入其高度" v-model="item.content.option2.back.image.height" size="mini" @input="setDragOption(index,'back','height',$event,item.content.option2.back.image.ratio,'image','')">
                                    <template slot="prepend">H :</template>
                                </el-input>
                            </div>
                            <el-input placeholder="请输入其起始x" v-model="item.content.option2.back.image.x" size="mini" @input="setDragOption(index,'back','x',$event,item.content.option2.back.image.ratio,'image','')">
                                <template slot="prepend">X :</template>
                            </el-input>
                            <el-input placeholder="请输入其起始y" v-model="item.content.option2.back.image.y" size="mini" @input="setDragOption(index,'back','y',$event,item.content.option2.back.image.ratio,'image','')">
                                <template slot="prepend">Y :</template>
                            </el-input>
                        </div>

                    </div>

                    <div class="option-animate" style="border-bottom:none;">
                        <div class="option-animate-title">
                            <span>重置按钮：</span>
                        </div>
                        <div class="upload">
                            <div class="img-box">
                                <img :src="resourceData[item.content.option2.reset.image.name]" alt="" width="131" height="96">
                            </div>
                            <div class="upload-btn">
                                <div class="upload-btn-file">
                                    <span>更改图片</span>
                                    <input type="file" @change="uploadImageDrag(index,'reset','' ,$event)">
                                </div>
                            </div>
                        </div>

                        <div class="pointItem">
                            
                            <div class="lockStatus">
                                <el-input placeholder="请输入其宽度" v-model="item.content.option2.reset.image.width" size="mini" @input="setDragOption(index,'reset','width',$event,item.content.option2.reset.image.ratio,'image','')">
                                    <template slot="prepend">W :</template>
                                </el-input>
                                <span class="lock_block" :lockRadio="item.content.option2.reset.image.ratio"><img :src="item.content.option2.reset.image.lock?lockImg:unLockImg" data-lock="false" alt="" @click="lockStatusDragOption(item.content.option2.reset,$event)"></span>
                                <el-input placeholder="请输入其高度" v-model="item.content.option2.reset.image.height" size="mini" @input="setDragOption(index,'reset','height',$event,item.content.option2.reset.image.ratio,'image','')">
                                    <template slot="prepend">H :</template>
                                </el-input>
                            </div>
                            <el-input placeholder="请输入其起始x" v-model="item.content.option2.reset.image.x" size="mini" @input="setDragOption(index,'reset','x',$event,item.content.option2.reset.image.ratio,'image','')">
                                <template slot="prepend">X :</template>
                            </el-input>
                            <el-input placeholder="请输入其起始y" v-model="item.content.option2.reset.image.y" size="mini" @input="setDragOption(index,'reset','y',$event,item.content.option2.reset.image.ratio,'image','')">
                                <template slot="prepend">Y :</template>
                            </el-input>
                        </div>

                    </div>

                </div>

                

            </div>

            <!-- 输入样式 -->
            <div class="game-title">
                <i :class="tabShowStatus[index].child.option5?'el-icon-arrow-down':'el-icon-arrow-right'"
                @click="tabShow(index,'option5')" ref="option5Title"></i>
                <span @click="tabShow(index,'option5')">
                    输入样式
                </span>
            </div>

            <div class="game-inner" v-show="tabShowStatus[index].child.option5">

                <div class="edit-select" style="width: 100%">
                    <span style="width: 55px">字体 :</span>
                    <el-select v-model="item.content.option2.style.fontFamily" placeholder="请选择" size="mini" style="width: 60%">
                        <el-option
                            v-for="itemd in testData.fontFamily"
                                :key="itemd.value"
                                :label="itemd.label"
                                :value="itemd.value">
                        </el-option>
                    </el-select>
                </div>
                
                <div style="width:100%;float:left;">
                    <el-input style="width:50%;" placeholder="请输入内容" v-model="item.content.option2.style.fontSize" size="mini" @input="InputFonSize2($event)">
                        <template slot="prepend">字号 :</template>
                    </el-input>
                </div>

                <div style="width:100%;float:left;">
                    <el-input style="width:50%;" placeholder="请输入内容" v-model="item.content.option2.style.length" size="mini" @input="InputLength2($event)">
                        <template slot="prepend">字符长度:</template>
                    </el-input>
                </div>

                <div class="edit-select">
                    <span>颜色：</span>
                    <el-color-picker v-model="item.content.option2.style.color"></el-color-picker>
                </div>

                <div class="font-style">
                    <span :class="item.content.option2.style.strong?'font-style-color':''"
                        @click="setGoldTextFontStyle('strong',index,'option2','style')">B
                    </span>
                    <span :class="item.content.option2.style.italic?'font-style-color':''"
                        @click="setGoldTextFontStyle('italic',index,'option2','style')">I
                    </span>
                </div>

                <div style="clear:both;margin-bottom:5px;width:100%;"></div>

            </div>

            <!-- 填空 -->
            <div style="clear:both"></div>
            <div class="game-title">
                <i :class="tabShowStatus[index].child.option6?'el-icon-arrow-down':'el-icon-arrow-right'"
                @click="tabShow(index,'option6')" ref="option6Title"></i>
                <span @click="tabShow(index,'option6')">
                    填空
                </span>
            </div>

            <div class="game-inner" v-show="tabShowStatus[index].child.option6">
                
                <div class="optionItem">
                    <div v-for="(blank2,ids) in gameData[index].content.option2.blank" v-bind:key="ids">
                        
                        <div class="dragTitle title">
                            <span style="color:#fff;margin-top:20px">填空 {{ids+1}}</span>
                            <i @click="changeBlankArrAnother('del',ids)" class="game-title-icon el-icon-delete" style="color:#fff"></i>
                            <i @click="changeBlankArrAnother('copy',ids)" class="game-title-icon el-icon-tickets" style="color:#fff"></i>
                            <i @click="changeBlankArrAnother('add',ids)" class="game-title-icon el-icon-plus" style="color:#fff"></i>
                        </div>
                        <div style="clear:both"></div>
                        
                        <div class="option-animate-title" style="margin-top:10px;">
                            <span style="color:#fff;">默认状态：</span>
                        </div>
                        
                        <div class="upload">
                            <div class="img-box">
                                <img :src="resourceData[blank2.image.name]" alt="" width="131" height="96">
                            </div>
                            <div class="upload-btn">
                                <div class="upload-btn-file">
                                    <span>更改图片</span>
                                    <input type="file" @change="uploadBlankImage(index,'blanked',ids ,$event)">
                                </div>
                            </div>
                        </div>


                        <div class="option-animate-title" style="margin-top:10px;">
                            <span style="color:#fff;">选中状态：</span>
                        </div>

                        <div class="upload">
                            <div class="img-box">
                                <img :src="resourceData[blank2.image.name_another.name]" alt="" width="131" height="96">
                            </div>
                            <div class="upload-btn">
                                <div class="upload-btn-file">
                                    <span>更改图片</span>
                                    <input type="file" @change="uploadChangeImage(index,'blank_unable',ids ,$event)">
                                </div>
                            </div>
                        </div>

                        <div class="pointItem">
                            
                            <div class="lockStatus">
                                <el-input placeholder="请输入其宽度" v-model="blank2.image.width" size="mini" @input="setBlankStatus(index,'blanked'+ids,'width',$event,blank2.image.ratio,'image',ids,'option2')">
                                    <template slot="prepend">W :</template>
                                </el-input>
                                <span class="lock_block" :lockRadio="blank2.image.ratio"><img :src="blank2.image.lock?lockImg:unLockImg" data-lock="false" alt="" @click="lockStatusDragOption(blank2,$event)"></span>
                                <el-input placeholder="请输入其高度" v-model="blank2.image.height" size="mini" @input="setBlankStatus(index,'blanked'+ids,'height',$event,blank2.image.ratio,'image',ids,'option2')">
                                    <template slot="prepend">H :</template>
                                </el-input>
                            </div>
                            <el-input placeholder="请输入其起始x" v-model="blank2.image.x" size="mini" @input="setBlankStatus(index,'blanked'+ids,'x',$event,blank2.image.ratio,'image',ids,'option2')">
                                <template slot="prepend">X :</template>
                            </el-input>
                            <el-input placeholder="请输入其起始y" v-model="blank2.image.y" size="mini" @input="setBlankStatus(index,'blanked'+ids,'y',$event,blank2.image.ratio,'image',ids,'option2')">
                                <template slot="prepend">Y :</template>
                            </el-input>
                        </div>
                        <div style="clear:both;"></div>

                        <div class="option-animate" style="border-bottom:none;">
                            <div v-for="(rightAnswer,id) in blank2.image.keys" v-bind:key="id">

                                <div class="option-animate-title" v-if="id==0">
                                    <span>正确答案</span>
                                    <i @click="changeRightArrAnother('add',ids,id)" class="game-title-icon el-icon-plus" style="margin-top:-1px"></i>
                                </div>
                                <div style="width:100%;float:left;">
                                    <el-input style="width:80%;" placeholder="请输入内容" v-model="rightAnswer.value" size="mini" >
                                        <template slot="prepend">
                                            <span>正确答案:{{id+1}}</span>
                                        </template>
                                    </el-input>
                                    <div style="float:right;color:#fff;margin-top:12px;">
                                        <i @click="changeRightArrAnother('del',ids,id)" class="game-title-icon el-icon-delete" style="margin:6px 4px;"></i>
                                    </div>
                                </div>

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
        name: "EditGamePrivate",
        data() {
            return {
                lockImg:this.resourceData['image_lock_on'],
                unLockImg:this.resourceData['image_lock_off'],
                checkbox:false,
                radio:1,
                switchStatus:false,
                audio_name:'',
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
                sprite:{
                    "show": false,
                    "x": "500",
                    "y": "0",
                    "name": "",
                    "scale": "1",
                    "loop": false
                },
                animate:{
                    "show": false,
                    "x": "100",
                    "y": "100",
                    "name": "",
                    "scale": "3",
                    "loop": true
                },

                testData:{
                    switch:true,
                    animateName:'animateName',
                    audioName:'audioName',
                    spriteName:'spriteName',
                    input:111,
                    select:16,
                    checked:true,
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
                fontSize: [
                    {
                        label: '16px',
                        value: 16
                    },
                    {
                        label: '18px',
                        value: 18
                    },
                    {
                        label: '20px',
                        value: 20
                    },
                    {
                        label: '22px',
                        value: 22
                    },
                    {
                        label: '24px',
                        value: 24
                    },
                    {
                        label: '26px',
                        value: 26
                    },
                    {
                        label: '30px',
                        value: 30
                    },
                    {
                        label: '40px',
                        value: 40
                    },
                    {
                        label: '50px',
                        value: 50
                    }
                ]
                },
            }
        },
        props: [
            "allData",
            "gameData",
            "resourceData",
            "item",
            "index",
            "tabShowStatus"
        ],
        mounted() {
            // console.log(this.resourceData,this.item.content.option2)
            // if(this.allData.dragShow == false){
            //     stage.getChildByName('GAME').children.map((item,index)=>{
            //        let componentContainer = item.getChildByName('componentContainer');
                   
            //        componentContainer.children.map((citem,cindex)=>{
            //            if(citem.name.indexOf('blanked')!=-1 || citem.name.indexOf('back')!= -1 || citem.name.indexOf('reset')!= -1){
            //                citem.visible = false;
            //            }else{
            //                citem.visible = true;
            //            }
            //        })
            //     });
            // }else{
            //     stage.getChildByName('GAME').children.map((item,index)=>{
            //         let componentContainer1 = item.getChildByName('componentContainer');
                    
            //         componentContainer1.children.map((citem,cindex)=>{
            //             if(citem.name.indexOf('blank_drag')!=-1 || citem.name.indexOf('option')!= -1 || citem.name.indexOf('trash')!= -1){
            //                 citem.visible = false;
            //             }else{
            //                 citem.visible = true;
            //             }
            //         })
            //     })
            // }
        },
        methods: {
            InputFonSize(e){
                if(e==0){
                    this.item.content.option1.style_drag.fontSize = '';
                    this.$message.error('不可输入0');
                    return false;
                }
            },
            InputLength(e){
                if(e==0){
                    this.item.content.option1.style_drag.length = '';
                    this.$message.error('不可输入0');
                    return false;
                }
            },
            InputFonSize2(e){
                if(e==0){
                    this.item.content.option2.style.length = '';
                    this.$message.error('不可输入0');
                    return false;
                }
            },
            InputLength2(e){
                if(e==0){
                    this.item.content.option1.style_drag.length = '';
                    this.$message.error('不可输入0');
                    return false;
                }
            },
            trashed(index,name,e){
                let componentContainer =stage.getChildByName('GAME').getChildByName('GAME'+this.index).getChildByName('componentContainer');
                let component = componentContainer.getChildByName(name);
                if(!e){
                    console.log('关闭')
                    if(component){
                        componentContainer.removeChild(component);
                    }
                    // component.alpha = 0;
                    this.gameData[index].content.option1.trash.image.name = '';
                    this.gameData[index].content.option1.trash.another.name = '';
                    this.gameData[index].content.option1.trash.image.width = 0;
                    this.gameData[index].content.option1.trash.image.height = 0;
                    this.gameData[index].content.option1.trash.image.x = 0;
                    this.gameData[index].content.option1.trash.image.y = 0;

                }else{
                    console.log("打开");
                    if(component){
                        component.alpha = 1;
                        // this.gameData[index].content.option1.trash.image.name = '';
                        // this.gameData[index].content.option1.trash.another.name = '';
                        // this.gameData[index].content.option1.trash.image.width = 0;
                        // this.gameData[index].content.option1.trash.image.height = 0;
                        // this.gameData[index].content.option1.trash.image.x = 0;
                        // this.gameData[index].content.option1.trash.image.y = 0;
                        // component.width = this.gameData[index].content.option1.trash.image.width;
                        // component.height = this.gameData[index].content.option1.trash.image.height;
                        // component.x = this.gameData[index].content.option1.trash.image.x;
                        // component.y = this.gameData[index].content.option1.trash.image.y;
                        // UploadAndRenderEle(this.index,'trash',res,this.allData);
                    }
                }

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
            setDragArea(index,name,attr,e,ratio,type,option){
                let temValue = null;
                let isFloat = function (number) {
                    return /^-?\d*\.\d+$/.test(number);
                };
                let data = null;
                if(type=='image'){
                    data = this.item.content[option][name][type];
                }else{
                    data = this.item.content[option][name];
                }
                
                    if(attr === 'scale'){
                        if(isFloat(data[attr])){
                            data[attr] = parseFloat(data[attr]).toFixed(1);
                        }
                       
                    }else{
                        if((attr === 'x'||attr === 'width') && data[attr] > 1920){
                         
                            // data[attr] = parseFloat(data[attr]).toFixed(0);
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

            lockStatusDrag(item,e){
                //判断当前状态是否锁定
                if(item.name){
                    if(item.width&&item.height){
                        if(e.currentTarget.getAttribute('data-lock')==='true'){
                            //锁定状态解除锁定，还原各变量
                            e.currentTarget.setAttribute('data-lock','false');
                            item.ratio = 0;
                            item.lock = false;
                        }else{
                            //未锁定添加锁定，添加变量
                            e.currentTarget.setAttribute('data-lock','true');
                            item.lock = true;
                            item.ratio = parseFloat(item.width)/parseFloat(item.height);
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

            uploadImageDrag(index, name, ids, e) {
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
                    if(name === 'option'){
                        this.gameData[this.index].content.option1.option[ids].image.name = res.resourceName;
                        this.gameData[this.index].content.option1.option[ids].image.componentName = name+ids;
                        this.gameData[this.index].content.option1.option[ids].image.width = res.width;
                        this.gameData[this.index].content.option1.option[ids].image.height = res.height;
                        this.gameData[this.index].content.option1.option[ids].image.x?"":this.gameData[this.index].content.option1.option[ids].image.x = 0;
                        this.gameData[this.index].content.option1.option[ids].image.y?"":this.gameData[this.index].content.option1.option[ids].image.y = 0;
                        // console.log(this.gameData[this.index].option[ids].image.name)
                        UploadAndRenderEle(this.index,name+ids,res,this.allData);
                    }
                    if(name === 'back'){
                        this.gameData[this.index].content.option2.back.image.name = res.resourceName;
                        this.gameData[this.index].content.option2.back.image.componentName = name;
                        this.gameData[this.index].content.option2.back.image.width = res.width;
                        this.gameData[this.index].content.option2.back.image.height = res.height;
                        this.gameData[this.index].content.option2.back.image.x?"":this.gameData[this.index].content.option2.back.image.x = 0;
                        this.gameData[this.index].content.option2.back.image.y?"":this.gameData[this.index].content.option2.back.image.y = 0;
                        UploadAndRenderEle(this.index,name,res,this.allData);
                    }
                    if(name === 'reset'){
                        this.gameData[this.index].content.option2.reset.image.name = res.resourceName;
                        this.gameData[this.index].content.option2.reset.image.componentName = name;
                        this.gameData[this.index].content.option2.reset.image.width = res.width;
                        this.gameData[this.index].content.option2.reset.image.height = res.height;
                        this.gameData[this.index].content.option2.reset.image.x?"":this.gameData[this.index].content.option2.reset.image.x = 0;
                        this.gameData[this.index].content.option2.reset.image.y?"":this.gameData[this.index].content.option2.reset.image.y = 0;
                        UploadAndRenderEle(this.index,name,res,this.allData);
                    }
                    this.updateResourceData();
                    e.target.value = '';
                })
            },

            setDragOption(index,name,attr,e,ratio,type,ids){
                let componentContainer =stage.getChildByName('GAME').getChildByName('GAME'+this.index).getChildByName('componentContainer');
                let component = componentContainer.getChildByName(name);

                let isFloat = function (number) {
                    return /^-?\d*\.\d+$/.test(number);
                };
                let data = null;
                if(ids!==''){
                    data = this.item.content.option1.option[ids][type];
                }else{
                    data = this.item.content.option2[name][type];
                }
              
                if(component){
                    if(attr === 'scale'){
                        if(isFloat(data[attr])){
                            data[attr] = parseFloat(data[attr]).toFixed(1);
                        }
                        component[attr].set(data[attr]);
                    }else{
                        if((attr === 'x'||attr === 'width') && data[attr] > 1920){
                            data[attr] = parseFloat(component[attr]).toFixed(0);
                            this.$message.error('输入数值超出范围 应为0-1920');
                            return false;
                        }
                        if((attr === 'y'||attr === 'height') && data[attr] > 1080){
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
                                // console.log(parseFloat(e)/ratio,ratio)
                                if(e){
                                    data['height'] = (e/ratio).toFixed(0);
                                    component['height'] = data['height']
                                }
                            }
                        }
                        if(attr === 'height'){
                            if(data.lock) {
                                if(e){
                                    data['width'] = (e*ratio).toFixed(0);
                                    component['width'] = data['width']
                                }
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

            changeOptionArr(type, ids) {
                if (type === 'add') {
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

                    let arr = JSON.parse(JSON.stringify(this.gameData[this.index].content.option1.option[ids]));
                    resetArr(arr);
                    arr.image.width = 0;
                    arr.image.height = 0;
                    arr.image.x = 0;
                    arr.image.y = 0;
                    arr.image.lockImg = 'image_lock_off';
                    arr.image.lock = false;
                    
                    this.gameData[this.index].content.option1.option.push(arr);
                }
                else if (type === 'copy') {

                    let data = JSON.parse(JSON.stringify(this.gameData[this.index].content.option1.option[ids]));
                    console.log(data);
                    data.image.ratio = 0;
                    data.image.lockImg = 'image_lock_off';
                    data.image.lock = false;
                    
                    this.gameData[this.index].content.option1.option.push(data);
                    this.gameData[this.index].content.option1.option.forEach((item,idx)=>{
                        item.image.componentName = 'option'+idx;
                    })
                    RenderElementByIndex(this.index,this.allData);
               }
                else if (type === 'del') {
                    if(this.gameData[this.index].content.option1.option.length>1){
                        this.$confirm('此操作将删除选项, 是否继续?', '提示', {
                            confirmButtonText: '确定',
                            cancelButtonText: '取消',
                            type: 'warning'
                        }).then(() => {
                            this.gameData[this.index].content.option1.option.splice(ids, 1);
                            this.gameData[this.index].content.option1.option.forEach((item,idx)=>{
                                item.image.componentName = 'option'+idx
                            })
                            RenderElementByIndex(this.index,this.allData);
                            this.$message({
                                type: 'success',
                                message: '删除成功!'
                            });
                        }).catch((e) => {
                            this.$message({
                                type: 'info',
                                message: '已取消'
                            });
                        });
                    }
                }
            },

            setDragTrash(index,name,attr,e,ratio,type,ids){
                let componentContainer =stage.getChildByName('GAME').getChildByName('GAME'+this.index).getChildByName('componentContainer');
                let component = componentContainer.getChildByName(name);

                let isFloat = function (number) {
                    return /^-?\d*\.\d+$/.test(number);
                };
                
                let data = this.item.content.option1.trash[type];
              
                if(component){
                    if(attr === 'scale'){
                        if(isFloat(data[attr])){
                            data[attr] = parseFloat(data[attr]).toFixed(1);
                        }
                        component[attr].set(data[attr]);
                    }else{
                        if((attr === 'x'||attr === 'width') && data[attr] > 1920){
                            data[attr] = parseFloat(component[attr]).toFixed(0);
                            this.$message.error('输入数值超出范围 应为0-1920');
                            return false;
                        }
                        if((attr === 'y'||attr === 'height') && data[attr] > 1080){
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
                                // console.log(parseFloat(e)/ratio,ratio)
                                if(e){
                                    data['height'] = (e/ratio).toFixed(0);
                                    component['height'] = data['height']
                                }
                            }
                        }
                        if(attr === 'height'){
                            if(data.lock) {
                                if(e){
                                    data['width'] = (e*ratio).toFixed(0);
                                    component['width'] = data['width']
                                }
                            }
                        }
                    }
                }
            },
            uploadImageTrash(index,name,e){
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
                    if(name === 'trash'){
                        this.gameData[this.index].content.option1.trash.image.name = res.resourceName;
                        this.gameData[this.index].content.option1.trash.image.componentName = name;
                        this.gameData[this.index].content.option1.trash.image.width = res.width;
                        this.gameData[this.index].content.option1.trash.image.height = res.height;
                        UploadAndRenderEle(this.index,name,res,this.allData);
                        
                    }
                    
                    if(name === 'brash'){
                        this.gameData[this.index].content.option2.brash.image.name = res.resourceName;
                        this.gameData[this.index].content.option2.brash.image.width = res.width;
                        this.gameData[this.index].content.option2.brash.image.height = res.height;
                    }
                    this.updateResourceData();
                    e.target.value = '';
                })
            },

            setGoldTextFontStyle(name, index,option,style) {
                this.gameData[index].content[option][style][name] = !this.gameData[index].content[option][style][name];
            },


            uploadBlankImage(index, name, ids, e){
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
                    if(name === 'blank_drag'){
                        this.gameData[this.index].content.option1.blank_drag[ids].image.name = res.resourceName;
                        this.gameData[this.index].content.option1.blank_drag[ids].image.componentName = name+ids;
                        this.gameData[this.index].content.option1.blank_drag[ids].image.width = res.width;
                        this.gameData[this.index].content.option1.blank_drag[ids].image.height = res.height;
                        
                        UploadAndRenderEle(this.index,name+ids,res,this.allData);
                    }
                    
                    if(name === 'blanked'){
                        console.log(this.gameData[this.index].content.option2.blank[ids].image.x)
                        this.gameData[this.index].content.option2.blank[ids].image.name = res.resourceName;
                        this.gameData[this.index].content.option2.blank[ids].image.componentName = name+ids;
                        this.gameData[this.index].content.option2.blank[ids].image.width = res.width;
                        this.gameData[this.index].content.option2.blank[ids].image.height = res.height;
                        
                        UploadAndRenderEle(this.index,name+ids,res,this.allData);
                    }
                    
                    this.updateResourceData();
                    e.target.value = '';
                })
            },


            uploadChangeImage(index, name,ids, e) {
                if (e.target.files.length === 0) {
                    this.$message({
                        message: '上传文件个数不符合',
                        type: 'warning',
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
                    /*
                    * res.fieldName 图片原始name
                    * res.path 图片路径
                    * res.resourceName 资源name  需要更改gameData相应字段
                    * res.size 图片大小
                    * res.headers http headers
                    * */
                   if(name === 'blank_drag_unable'){
                        this.gameData[this.index].content.option1.blank_drag[ids].image.name_another.name = res.resourceName;
                        // this.gameData[this.index].content.option1.blank_drag[ids].image.width = res.width;
                        // this.gameData[this.index].content.option1.blank_drag[ids].image.height = res.height;
                    }
                    if(name === 'blank_unable'){
                        console.log("上传。。。。。")
                        this.gameData[this.index].content.option2.blank[ids].image.name_another.name = res.resourceName;
                        // this.gameData[this.index].content.option2.blank[ids].image.width = res.width;
                        // this.gameData[this.index].content.option2.blank[ids].image.height = res.height;
                        
                    }
                    if(name === 'trash_unable'){
                        this.gameData[this.index].content.option1.trash.image.name_another.name = res.resourceName;
                        // this.gameData[this.index].content.option1.trash.image.width = res.width;
                        // this.gameData[this.index].content.option1.trash.image.height = res.height;
                    }
                    if(name === 'brash'){
                        this.gameData[this.index].content.option2.brash.image.name = res.resourceName;
                        this.gameData[this.index].content.option2.brash.image.width = res.width;
                        this.gameData[this.index].content.option2.brash.image.height = res.height;
                    }
                    
                    this.updateResourceData();
                })
            },

            setBlankStatus(index,name,attr,e,ratio,type,ids,option){
                let componentContainer =stage.getChildByName('GAME').getChildByName('GAME'+this.index).getChildByName('componentContainer');
                let component = componentContainer.getChildByName(name);

                let isFloat = function (number) {
                    return /^-?\d*\.\d+$/.test(number);
                };
                let data = null;
                if(option == 'option1'){
                    data = this.item.content.option1.blank_drag[ids][type];
                }else{
                    data = this.item.content.option2.blank[ids][type];
                }
                // console.log("ddddd",this.item.content.option1.blank_drag)
                if(component){
                    if(attr === 'scale'){
                        if(isFloat(data[attr])){
                            data[attr] = parseFloat(data[attr]).toFixed(1);
                        }
                        component[attr].set(data[attr]);
                    }else{
                        if((attr === 'x'||attr === 'width') && data[attr] > 1920){
                            data[attr] = parseFloat(component[attr]).toFixed(0);
                            this.$message.error('输入数值超出范围 应为0-1920');
                            return false;
                        }
                        if((attr === 'y'||attr === 'height') && data[attr] > 1080){
                            data[attr] = parseFloat(component[attr]).toFixed(0);
                            this.$message.error('输入数值超出范围 应为0-1080');
                            return false;
                        }
                        if(attr === 'x'||attr === 'y'||attr === 'width'||attr === 'height'){
                            data[attr] = this.verifyNumber(data[attr]);
                            component[attr] = data[attr];
                        }
                        if(attr === 'width'){
                            console.log(data)
                            if(data.lock){
                                // console.log(parseFloat(e)/ratio,ratio)
                                if(e){
                                    data['height'] = (e/ratio).toFixed(0);
                                    component['height'] = data['height']
                                }
                            }
                        }
                        if(attr === 'height'){
                            if(data.lock) {
                                if(e){
                                    data['width'] = (e*ratio).toFixed(0);
                                    component['width'] = data['width']
                                }
                            }
                        }
                    }
                }
            },


            changeBlankArr(type, ids) {
                if (type === 'add') {
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

                    let arr = JSON.parse(JSON.stringify(this.gameData[this.index].content.option1.blank_drag[ids]));
                    resetArr(arr);
                    arr.image.width = 0;
                    arr.image.height = 0;
                    arr.image.x = 0;
                    arr.image.y = 0;
                    arr.image.lockImg = 'image_lock_off';
                    arr.image.lock = false;
                    
                    this.gameData[this.index].content.option1.blank_drag.push(arr);
                }
                else if (type === 'copy') {

                    let data = JSON.parse(JSON.stringify(this.gameData[this.index].content.option1.blank_drag[ids]));
                    console.log(data);
                    data.image.ratio = 0;
                    data.image.lockImg = 'image_lock_off';
                    data.image.lock = false;
                    
                    this.gameData[this.index].content.option1.blank_drag.push(data);
                    this.gameData[this.index].content.option1.blank_drag.forEach((item,idx)=>{
                        item.image.componentName = 'blank_drag'+idx;
                    })
                    RenderElementByIndex(this.index,this.allData);
               }
                else if (type === 'del') {
                    if(this.gameData[this.index].content.option1.blank_drag.length>1){
                        this.$confirm('此操作将删除选项, 是否继续?', '提示', {
                            confirmButtonText: '确定',
                            cancelButtonText: '取消',
                            type: 'warning'
                        }).then(() => {
                            this.gameData[this.index].content.option1.blank_drag.splice(ids, 1);
                            this.gameData[this.index].content.option1.blank_drag.forEach((item,idx)=>{
                                item.image.componentName = 'blank_drag'+idx
                            })
                            RenderElementByIndex(this.index,this.allData);
                            this.$message({
                                type: 'success',
                                message: '删除成功!'
                            });
                        }).catch((e) => {
                            this.$message({
                                type: 'info',
                                message: '已取消'
                            });
                        });
                    }
                }
            },

            changeRightArr(type, ids,id) {
                if (type === 'add') {
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

                    let arr = JSON.parse(JSON.stringify(this.gameData[this.index].content.option1.blank_drag[ids].image.keys[id]));
                    resetArr(arr);
                    this.gameData[this.index].content.option1.blank_drag[ids].image.keys.push(arr);
                    console.log("添加....",this.gameData[this.index].content.option1.blank_drag[ids].image.keys);
                   
                }
                else if (type === 'copy') {
                    this.gameData[this.index].content.option1.blank_drag[ids].image.keys.push(JSON.parse(JSON.stringify(this.gameData[this.index].content.option1.blank_drag[ids].image.keys[id])));
                }
                else if (type === 'del') {
                    if(this.gameData[this.index].content.option1.blank_drag[ids].image.keys.length>1){
                        this.$confirm('此操作将删除选项, 是否继续?', '提示', {
                            confirmButtonText: '确定',
                            cancelButtonText: '取消',
                            type: 'warning'
                        }).then(() => {
                            this.gameData[this.index].content.option1.blank_drag[ids].image.keys.splice(id, 1);
                            // this.tabShowStatus.splice(index, 1);
                            this.$message({
                                type: 'success',
                                message: '删除成功!'
                            });
                        }).catch(() => {
                            this.$message({
                                type: 'info',
                                message: '已取消'
                            });
                        });
                    }
                }
            },


            changeRightArrAnother(type, ids,id) {
                if (type === 'add') {
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

                    let arr = JSON.parse(JSON.stringify(this.gameData[this.index].content.option2.blank[ids].image.keys[id]));
                    resetArr(arr);
                    this.gameData[this.index].content.option2.blank[ids].image.keys.push(arr);
                }
                else if (type === 'copy') {
                    this.gameData[this.index].content.option2.blank[ids].image.keys.push(JSON.parse(JSON.stringify(this.gameData[this.index].content.option2.blank[ids].image.keys[id])));
                }
                else if (type === 'del') {
                    if(this.gameData[this.index].content.option2.blank[ids].image.keys.length>1){
                        this.$confirm('此操作将删除选项, 是否继续?', '提示', {
                            confirmButtonText: '确定',
                            cancelButtonText: '取消',
                            type: 'warning'
                        }).then(() => {
                            this.gameData[this.index].content.option2.blank[ids].image.keys.splice(id, 1);
                            // this.tabShowStatus.splice(index, 1);
                            this.$message({
                                type: 'success',
                                message: '删除成功!'
                            });
                        }).catch(() => {
                            this.$message({
                                type: 'info',
                                message: '已取消'
                            });
                        });
                    }
                }
            },

            changeBlankArrAnother(type, ids){
                if (type === 'add') {
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

                    let arr = JSON.parse(JSON.stringify(this.gameData[this.index].content.option2.blank[ids]));
                    resetArr(arr);
                    arr.image.width = 0;
                    arr.image.height = 0;
                    arr.image.x = 0;
                    arr.image.y = 0;
                    arr.image.lockImg = 'image_lock_off';
                    arr.image.lock = false;
                    
                    this.gameData[this.index].content.option2.blank.push(arr);
                }
                else if (type === 'copy') {

                    let data = JSON.parse(JSON.stringify(this.gameData[this.index].content.option2.blank[ids]));
                    console.log(data);
                    data.image.ratio = 0;
                    data.image.lockImg = 'image_lock_off';
                    data.image.lock = false;
                    
                    this.gameData[this.index].content.option2.blank.push(data);
                    this.gameData[this.index].content.option2.blank.forEach((item,idx)=>{
                        item.image.componentName = 'blanked'+idx;
                    })
                    RenderElementByIndex(this.index,this.allData);
               }
                else if (type === 'del') {
                    if(this.gameData[this.index].content.option2.blank.length>1){
                        this.$confirm('此操作将删除选项, 是否继续?', '提示', {
                            confirmButtonText: '确定',
                            cancelButtonText: '取消',
                            type: 'warning'
                        }).then(() => {
                            this.gameData[this.index].content.option2.blank.splice(ids, 1);
                            this.gameData[this.index].content.option2.blank.forEach((item,idx)=>{
                                item.image.componentName = 'blanked'+idx
                            });
                            console.log("dddd",this.gameData[this.index].content.option2.blank)
                            RenderElementByIndex(this.index,this.allData);
                            this.$message({
                                type: 'success',
                                message: '删除成功!'
                            });
                        }).catch((e) => {
                            this.$message({
                                type: 'info',
                                message: '已取消'
                            });
                        });
                    }
                }
            },




            setImageLock(){
                this.image.lock = !this.image.lock;
                if(!this.image.height||!this.image.width){
                    this.$message({
                        message: 'X或Y为0或为空 无法计算比例',
                        type: 'warning'
                    });
                    return;
                }
                if(this.image.lock){
                    this.image.ratio = this.image.width/this.image.height;
                }
            },
            setAttr(name,attr){
                if(this.image.ratio>0&&(attr === 'width'||attr === 'height')&&this.image.lock){
                    if(attr === 'width'){
                        console.log(this.image.width,this.image.ratio);
                        this.image.height = this.image.width/this.image.ratio;
                    }else if(attr === 'height'){
                        this.image.width = this.image.height*this.image.ratio;
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
                    // Object.keys(this.tabShowStatus[index].child).forEach((item, index1) => {
                    //     this.tabShowStatus[index].child[item] = false
                    // })
                    this.tabShowStatus[index].child[name] = true;
                    title.className = 'el-icon-arrow-down'
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
                    return;
                }
                if(!this.verifyAnimationFiles(e.target.files)){
                    this.$message({
                        message: '上传文件不符合',
                        type: 'warning',
                    });
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
                    this.animate.name = res.resourceName;
                    e.target.value = '';
                })
            },
            uploadSprite(name, e) {
                if (e.target.files.length === 0 || e.target.files.length !== 2) {
                    this.$message({
                        message: '上传文件个数不符合',
                        type: 'warning',
                    });
                    return;
                }
                if(!this.verifySpriteFiles(e.target.files)){
                    this.$message({
                        message: '上传文件不符合',
                        type: 'warning',
                    });
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
                    this.sprite.name = res.resourceName;
                    e.target.value = '';
                })
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
                    this.audio_name = res.resourceName;
                    e.target.value = '';
                })
            },
            updateResourceData() {
                this.$emit('updateResourceData')
            },
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