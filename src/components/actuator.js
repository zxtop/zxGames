import {Application,Container,Graphics,Sprite,Point} from 'pixi.js';
import { getAnimation, getSound, load, createSprite,  getTexture} from '../loader';
import {TweenLite,TimeLine,TweenMax} from 'gsap';
import {AnswerInfo} from 'xes-answer';
import {RenderPageByIndex} from 'xes-tem-render';
import Animate from 'xes-animate';

class Actuator {

    constructor() {
        this.pixiStage = null;
        this.keycurrentTarget = null;
        this.keyComplete = true;
        this.temContainer = new Container();
        this.temContainer.name = 'temContainer';
        this.dragArr = null;
        this.drawArr = null;
        
        this.currentTarget = null;
        this.drawBlankArr = null;//画笔填空
        this.pen = null; //画笔
        this.backBtn = null; //撤销
        this.resBtn = null; //重置
        this.lineArea = {x:null,y:null,width:null,height:null};//画线区域
        
        this.lineWidthNum = null;
        this.lineColor = null;

        this.drawDownX = null; //画线时按下的位置
        this.drawDownY = null; 
        this.lineMc = null;    //画的线
        this.isStraight = null;
        this.draw = false;     

        this.dragBlankArr = null;   //拖拽填空
        this.dragOptionArr = null; //拖拽物
        this.trash = null; //垃圾桶
        this.currentDragTarget = null;
        this.dragHitArea = {x:null,y:null,width:null,height:null};
        this.hitArea = new PIXI.Sprite.fromImage(res['image_kk'].url);

        this.startPos = new Point(0,0); 
        this.offsetPos = new Point(0,0);
        this.startCos = null;
        this.complete = true;

        this.fontFamily = null;
        this.fontSize = null; 
        this.strLength = null;
        this.fontColor = null; 
        this.fontWeight = null;
        this.fontStyle = null;

        
        this.keySpriteArr = [];
        this.keyArr = [
            {
                name:"image_num1",
                x:60,
                y:70,
                width:86,
                height:87,
                keyValue:"1"
            },
            {
                name:"image_num2",
                x:155,
                y:70,
                width:86,
                height:87,
                keyValue:"2"

            },
            {
                name:"image_num3",
                x:250,
                y:70,
                width:86,
                height:87,
                keyValue:"3"

            },
            {
                name:"image_num4",
                x:345,
                y:70,
                width:86,
                height:87,
                keyValue:"4"

            },
            {
                name:"image_num5",
                x:440,
                y:70,
                width:86,
                height:87,
                keyValue:"5"

            },
            {
                name:"image_add",
                x:535,
                y:70,
                width:86,
                height:87,
                keyValue:"+"

            },
            {
                name:"image_jian",
                x:630,
                y:70,
                width:86,
                height:87,
                keyValue:"-"

            },
            {
                name:"image_deng",
                x:725,
                y:70,
                width:86,
                height:87,
                keyValue:"="

            },
            {
                name:"image_point",
                x:820,
                y:70,
                width:86,
                height:87,
                keyValue:"."

            },
            {
                name:"image_tui",
                x:915,
                y:70,
                width:86,
                height:87,
                keyValue:"tui"

            },
            {
                name:"image_num6",
                x:60,
                y:174,
                width:86,
                height:87,
                keyValue:"6"

            },
            {
                name:"image_num7",
                x:155,
                y:174,
                width:86,
                height:87,
                keyValue:"7"

            },
            {
                name:"image_num8",
                x:250,
                y:174,
                width:86,
                height:87,
                keyValue:"8"

            },
            {
                name:"image_num9",
                x:345,
                y:174,
                width:86,
                height:87,
                keyValue:"9"

            },
            {
                name:"image_num0",
                x:440,
                y:174,
                width:86,
                height:87,
                keyValue:"0"

            },
            {
                name:"image_cheng",
                x:535,
                y:174,
                width:86,
                height:87,
                keyValue:"×"

            },
            {
                name:"image_chu",
                x:630,
                y:174,
                width:86,
                height:87,
                keyValue:"÷"

            },
            {
                name:"image_left",
                x:725,
                y:174,
                width:86,
                height:87,
                keyValue:"("

            },
            {
                name:"image_right",
                x:820,
                y:174,
                width:86,
                height:87,
                keyValue:")"
            },{
                name:"image_del",
                x:915,
                y:174,
                width:86,
                height:87,
                keyValue:"del"
            }
        ];
        this.keyShow = true;

        this.keyMap = null;
        this.keyBg = null;
        this.key_btn = null;
        
        this.prevBtn = null;
        this.nextBtn = null;
        this.submit = null;
        
        
    }

    exec(){
        let _that = this;
        console.log("= 开始执行逻辑 =");
        this.initGame(store.state.pageNumber);
        
        stage.getChildByName('GAME').children.map((item,index)=>{
            item.getChildByName('componentContainer').lineArr = [];
        })
        this.initKeyMap();

        if(question.dragShow == '2'){
            // console.log("画笔画。。。。。。");
            stage.on("pointermove", this.stageMove.bind(this));
            stage.on("pointerup", this.stageUp.bind(this));
        }else{
            stage.on('pointermove',this.moveTarget.bind(this));
            stage.on('pointerup',this.leaveTarget.bind(this));
        }
        stage.on('pointerup',this.leaveKeyTarget.bind(this));
    }

    btn(){
        let _that = this;
        if(question.commentBtn.prevBtn.show){
            if(store.state.pageNumber == 0){
                this.prevBtn.visible = false;
                this.prevBtn.interactive = false;
            }else if(store.state.pageNumber != question.sources.length-1){
                this.prevBtn.visible = true;
                this.submit.interactive = false;
                this.nextBtn.interactive = true;
            }else{
                
                this.prevBtn.visible = true;
                this.prevBtn.interactive = true;
                this.nextBtn.interactive = false;
                this.submit.interactive = true;
            }
        }else{
            this.prevBtn.interactive = false;
            this.prevBtn.visible = false;
        };

        if(store.state.pageNumber == question.sources.length-1){
            this.nextBtn.visible = false;
            this.submit.visible = true;
            this.nextBtn.interactive = false;
        }else{
            this.nextBtn.visible = true;
            this.submit.visible = false;
            this.submit.interactive = false;
        };

        this.prevBtn.on('pointerdown',function(){
            
            let answer = new AnswerInfo();
            let AnswerMap = [];
            let userAnswerMap = [];
            let rightnum = 0;
            let wrongnum = 1;
            if(_that.dragBlankArr.length>0){
                _that.dragBlankArr.map((item,index)=>{
                    item.isClick = false;
                    item.texture = item.default;
                    userAnswerMap.push(item.wenzi.text);
                    AnswerMap[index] = item.keys[0].value;
                    
                    item.keys.map((kitem,kindex)=>{
                        
                        if(String(item.wenzi.text) == String(kitem.value)){
                            
                            AnswerMap[index] = item.wenzi.text;
                            rightnum ++;
                            wrongnum --;
                        }
                    })
                })
                answer.init({type: 2, useranswer: userAnswerMap,times:[], answer: AnswerMap, id: store.state.pageNumber, rightnum: rightnum, wrongnum: wrongnum});
                store.dispatch('pushToPostArr', answer);
            }else if(_that.drawBlankArr.length>0){

                _that.drawBlankArr.map((item,index)=>{
                    item.isClick = false;
                    item.texture = item.default;
                    userAnswerMap.push(item.wenzi.text);
                    AnswerMap[index] = item.keys[0].value;
                    
                    item.keys.map((kitem,kindex)=>{
                        
                        if(String(item.wenzi.text) == String(kitem.value)){
                            
                            AnswerMap[index] = item.wenzi.text;
                            rightnum ++;
                            wrongnum --;
                        }
                    })
                })
                answer.init({type: 2, useranswer: userAnswerMap,times:[], answer: AnswerMap, id: store.state.pageNumber, rightnum: rightnum, wrongnum: wrongnum});
                store.dispatch('pushToPostArr', answer);
                _that.pixiStage.removeChild(_that.backBtn);
                
            }
            _that.keyMap.removeChildren();
            _that.temContainer.removeChildren();
            _that.pixiStage.removeChild(_that.temContainer);
            _that.stemAudioPause(store.state.pageNumber);
            if(_that.pen){
                _that.pen.visible = false;
            }
            if(question.comentAudio.keyBlank.show && question.comentAudio.keyBlank.audio){
                res[question.comentAudio.keyBlank.audio].sound.pause();
            }
            store.state.pageNumber --;
            if(store.state.pageNumber == 0){
                _that.prevBtn.visible = false;
                _that.prevBtn.interactive = false;
                _that.nextBtn.visible = true;
                _that.nextBtn.interactive = true; 
                _that.submit.visible = false;
                _that.submit.interactive = false;
            }
            _that.initGame(store.state.pageNumber);
            
        });

        this.nextBtn.on('pointerdown',function(){

            let answer = new AnswerInfo();
            let AnswerMap = [];
            let userAnswerMap = [];
            let rightnum = 0;
            let wrongnum = 1;
            if(_that.dragBlankArr.length>0){
                _that.dragBlankArr.map((item,index)=>{
                    item.isClick = false;
                    item.texture = item.default;
                    userAnswerMap.push(item.wenzi.text);
                    AnswerMap[index] = item.keys[0].value;
                    
                    item.keys.map((kitem,kindex)=>{
                        
                        if(String(item.wenzi.text) == String(kitem.value)){
                            
                            AnswerMap[index] = item.wenzi.text;
                            rightnum ++;
                            wrongnum --;
                        }
                    })
                })
                answer.init({type: 2, useranswer: userAnswerMap,times:[], answer: AnswerMap, id: store.state.pageNumber, rightnum: rightnum, wrongnum: wrongnum});
                store.dispatch('pushToPostArr', answer);
            }else if(_that.drawBlankArr.length>0){
                _that.drawBlankArr.map((item,index)=>{
                    item.isClick = false;
                    item.texture = item.default;
                    userAnswerMap.push(item.wenzi.text);
                    
                    AnswerMap[index] = item.keys[0].value;
                    
                    item.keys.map((kitem,kindex)=>{
                        
                        if(String(item.wenzi.text) == String(kitem.value)){
                            
                            AnswerMap[index] = item.wenzi.text;
                            rightnum ++;
                            wrongnum --;
                        }
                    })
                })
                answer.init({type: 2, useranswer: userAnswerMap,times:[], answer: AnswerMap, id: store.state.pageNumber, rightnum: rightnum, wrongnum: wrongnum});
                store.dispatch('pushToPostArr', answer);
                _that.pixiStage.removeChild(_that.backBtn);
            }
            

            _that.keyMap.removeChildren();
            _that.temContainer.removeChildren();
            _that.pixiStage.removeChild(_that.temContainer);
            if(_that.pen){
                _that.pen.visible = false;
            }
            _that.stemAudioPause(store.state.pageNumber);
            if(question.comentAudio.keyBlank.show && question.comentAudio.keyBlank.audio){
                res[question.comentAudio.keyBlank.audio].sound.pause();
            }
            store.state.pageNumber ++;
            if(store.state.pageNumber == question.sources.length-1){
                _that.nextBtn.visible = false;
                _that.nextBtn.interactive = false;
                _that.submit.visible = true;
                _that.submit.interactive = true;
                if(question.commentBtn.prevBtn.show){
                    _that.prevBtn.visible = true;
                    _that.prevBtn.interactive = true;
                }else{
                    _that.prevBtn.visible = false;
                    _that.prevBtn.interactive = false;
                }
            }else{
                _that.nextBtn.visible = true;
                _that.nextBtn.interactive = true;
                _that.submit.visible = false;
                _that.submit.interactive = false;
                if(question.commentBtn.prevBtn.show){
                    _that.prevBtn.visible = true;
                    _that.prevBtn.interactive = true;
                }else{
                    _that.prevBtn.visible = false;
                    _that.prevBtn.interactive = false;
                }
            }
            _that.initGame(store.state.pageNumber);            
            
        });

        this.submit.on('pointerdown',function(){
            console.log("提交答案");
            let answer = new AnswerInfo();
            let AnswerMap = [];
            let userAnswerMap = [];
            let rightnum = 0;
            let wrongnum = 1;
            if(_that.dragBlankArr.length>0){
                _that.dragBlankArr.map((item,index)=>{
                    item.isClick = false;
                    item.texture = item.default;

                    userAnswerMap.push(item.wenzi.text);
                    AnswerMap[index] = item.keys[0].value;
                    item.keys.map((kitem,kindex)=>{
                        
                        if(String(item.wenzi.text) == String(kitem.value)){
                            
                            AnswerMap[index] = item.wenzi.text;
                            rightnum ++;
                            wrongnum --;
                        }
                    })
                })
                answer.init({type: 2, useranswer: userAnswerMap,times:[], answer: AnswerMap, id: store.state.pageNumber, rightnum: rightnum, wrongnum: wrongnum});
                store.dispatch('pushToPostArr', answer);
                store.dispatch('postAnswer');//提交答案
                // console.log("数据================",store.state.postArr)

            }else if(_that.drawBlankArr.length>0){
                _that.drawBlankArr.map((item,index)=>{
                    item.isClick = false;
                    item.texture = item.default;

                    userAnswerMap.push(item.wenzi.text);
                    AnswerMap[index] = item.keys[0].value;
                    
                    item.keys.map((kitem,kindex)=>{
                        
                        if(String(item.wenzi.text) == String(kitem.value)){
                            
                            AnswerMap[index] = item.wenzi.text;
                            rightnum ++;
                            wrongnum --;
                        }
                    })
                })
                _that.stemAudioPause(store.state.pageNumber);
                if(question.comentAudio.keyBlank.show && question.comentAudio.keyBlank.audio){
                    res[question.comentAudio.keyBlank.audio].sound.pause();
                }
                answer.init({type: 2, useranswer: userAnswerMap,times:[], answer: AnswerMap, id: store.state.pageNumber, rightnum: rightnum, wrongnum: wrongnum});
                store.dispatch('pushToPostArr', answer);
                store.dispatch('postAnswer');//提交答案
                // console.log("数据================",store.state.postArr)

            }
        });
        this.submit.on('pointerup',function(e){
            TweenLite.to(_that.submit,.2,{width:_that.submit.startWidth,height:_that.submit.startHeight})
        })
    }

    initGame(pageNum){     //初始化页面数据

        let _that = this;
        console.log("第"+pageNum+'页');
        this.pixiStage = stage.getChildByName('GAME').getChildByName('GAME'+pageNum).getChildByName('componentContainer');
        RenderPageByIndex(pageNum);
        // if(stage.getChildByName('GAME').getChildByName('GAME'+pageNum).children[1].children[0].children[0]){
        //     stage.getChildByName('GAME').getChildByName('GAME'+pageNum).children[1].children[0].children[0].style.padding = 20;
        // }
        this.keyMap = null;
        this.keyBg = null; 
        this.key_btn = null;
        
        this.prevBtn = null;
        this.nextBtn = null;
        this.submit = null; 
        this.keySpriteArr = [];
        this.resBtn = null;
        this.backBtn = null;
        _that.pixiStage.children.map((item,index)=>{
            if(item.name!=null){

                if(item.name.indexOf('back')!=-1){
                    _that.pixiStage.removeChild(item);
                }
            }
        })
        if(question.dragShow == '2'){
            if(question.sources[pageNum].content.option2.back.image.name){
                _that.backBtn = new PIXI.Sprite.fromImage(res[question.sources[pageNum].content.option2.back.image.name].url);
                _that.backBtn.anchor.set(.5,.5);
                _that.backBtn.width = parseInt(question.sources[pageNum].content.option2.back.image.width);
                _that.backBtn.height = parseInt(question.sources[pageNum].content.option2.back.image.height);
                _that.backBtn.x = parseInt(question.sources[pageNum].content.option2.back.image.x) + parseInt(question.sources[pageNum].content.option2.back.image.width)/2;
                _that.backBtn.y = parseInt(question.sources[pageNum].content.option2.back.image.y) + parseInt(question.sources[pageNum].content.option2.back.image.height)/2;
                _that.backBtn.interactive = true;
                _that.backBtn.startWidth = question.sources[pageNum].content.option2.back.image.width;
                _that.backBtn.startHeight = question.sources[pageNum].content.option2.back.image.height;
                _that.pixiStage.addChild(_that.backBtn);
            }
    
            
            if(question.sources[pageNum].content.option2.reset.image.name){
                _that.resBtn = new PIXI.Sprite.fromImage(res[question.sources[pageNum].content.option2.reset.image.name].url);
                _that.resBtn.anchor.set(.5,.5);
                _that.resBtn.width = parseInt(question.sources[pageNum].content.option2.reset.image.width);
                _that.resBtn.height = parseInt(question.sources[pageNum].content.option2.reset.image.height);
                _that.resBtn.x = parseInt(question.sources[pageNum].content.option2.reset.image.x) + parseInt(question.sources[pageNum].content.option2.reset.image.width)/2;
                _that.resBtn.y = parseInt(question.sources[pageNum].content.option2.reset.image.y) + parseInt(question.sources[pageNum].content.option2.reset.image.height)/2;
                _that.resBtn.interactive = true;
                _that.resBtn.startWidth = question.sources[pageNum].content.option2.reset.image.width;
                _that.resBtn.startHeight = question.sources[pageNum].content.option2.reset.image.height;
                _that.pixiStage.addChild(_that.resBtn);
            }
        }
        
        

        this.keyMap = new Container();
        this.keyBg = new PIXI.Sprite.fromImage(res['image_key_bg'].url);
        this.keyMap.addChild(this.keyBg);
        this.keyMap.x = 510;
        this.keyMap.y = 858;

        this.key_btn = new PIXI.Sprite.fromImage(res['image_spread'].url);
        this.key_btn.x = 984;
        this.key_btn.y = 40;
        this.keyMap.addChild(this.key_btn);

        
        this.keyArr.map((item,index)=>{
            let sprite = new PIXI.Sprite.fromImage(res[item.name].url);
            sprite.interactive = true;
            sprite.anchor.set(.5,.5);
            sprite.x = item.x;
            sprite.y = item.y;
            sprite.startWidth = item.width;
            sprite.startHeight = item.height;
            sprite.key = item.keyValue;
            sprite.cursor = 'pointer';
            this.keySpriteArr.push(sprite);
            this.keyMap.addChild(sprite);
        });
        this.initKeyMap();
        this.prevBtn = new PIXI.Sprite.fromImage(res[question.commentBtn.prevBtn.image.name].url);
        this.prevBtn.anchor.set(.5,.5);
        this.prevBtn.interactive = true;
        this.prevBtn.x = parseFloat(question.commentBtn.prevBtn.image.x) + parseFloat(question.commentBtn.prevBtn.image.width)/2;
        this.prevBtn.y = parseFloat(question.commentBtn.prevBtn.image.y) + parseFloat(question.commentBtn.prevBtn.image.height)/2;
        this.prevBtn.width = parseFloat(question.commentBtn.prevBtn.image.width);
        this.prevBtn.height = parseFloat(question.commentBtn.prevBtn.image.height);
        this.prevBtn.startWidth = question.commentBtn.prevBtn.image.width;
        this.prevBtn.startHeight = question.commentBtn.prevBtn.image.height;
        this.prevBtn.on('pointerover',this.overAndScale.bind(this));
        this.prevBtn.on('pointerout',this.outAndScale.bind(this));
        

        this.nextBtn = new PIXI.Sprite.fromImage(res[question.commentBtn.nextBtn.image.name].url);
        this.nextBtn.anchor.set(.5,.5);
        this.nextBtn.interactive = true;
        this.nextBtn.x = parseFloat(question.commentBtn.nextBtn.image.x) + parseFloat(question.commentBtn.nextBtn.image.width)/2;
        this.nextBtn.y = parseFloat(question.commentBtn.nextBtn.image.y) + parseFloat(question.commentBtn.nextBtn.image.height)/2;
        this.nextBtn.width = parseFloat(question.commentBtn.nextBtn.image.width);
        this.nextBtn.height = parseFloat(question.commentBtn.nextBtn.image.height);
        this.nextBtn.startWidth = question.commentBtn.nextBtn.image.width;
        this.nextBtn.startHeight = question.commentBtn.nextBtn.image.height;
        this.nextBtn.on('pointerover',this.overAndScale.bind(this));
        this.nextBtn.on('pointerout',this.outAndScale.bind(this));

        this.submit = new PIXI.Sprite.fromImage(res[question.commentBtn.subBtn.image.name].url);
        this.submit.anchor.set(.5,.5);
        this.submit.interactive = true;
        this.submit.x = parseFloat(question.commentBtn.nextBtn.image.x) + parseFloat(question.commentBtn.nextBtn.image.width)/2;
        this.submit.y = parseFloat(question.commentBtn.nextBtn.image.y) + parseFloat(question.commentBtn.nextBtn.image.height)/2;
        this.submit.width = parseFloat(question.commentBtn.nextBtn.image.width);
        this.submit.height = parseFloat(question.commentBtn.nextBtn.image.height);
        this.submit.startWidth = question.commentBtn.nextBtn.image.width;
        this.submit.startHeight = question.commentBtn.nextBtn.image.height;
        this.submit.on('pointerover',this.overAndScale.bind(this));
        this.submit.on('pointerout',this.outAndScale.bind(this));


        this.temContainer.addChild(this.prevBtn,this.nextBtn,this.submit);
        this.temContainer.addChild(this.keyMap);
        this.pixiStage.addChild(this.temContainer);
        this.btn();

        this.dragArr = [];
        this.drawArr = [];
        this.dragBlankArr = [];//拖拽填空
        this.drawBlankArr = [];//画笔填空
        this.dragOptionArr = [];//拖拽物 

        this.fontFamily = null;
        this.fontSize = null; 
        this.strLength = null;
        this.fontColor = null;
        this.fontWeight = null;
        this.fontStyle = null;

        this.trash = null; //垃圾桶

        _that.getChoice(); //选择舞台
        
        _that.getBlankChoice(store.state.pageNumber); //初始化公共键盘

        if(question.dragShow == '1'){ //拖拽逻辑
            _that.setOptionArr(store.state.pageNumber);
        }

        if(question.dragShow == '2'){ //画笔逻辑
            _that.setDrawArr(store.state.pageNumber);
        }

    }

    initKeyMap(){ //初始化键盘
        let _that = this;
        if(question.keyChoice == '1'){
            this.key_btn.visible = false;
            _that.keyShow = true;
        }else if(question.keyChoice == '2'){
            _that.keyShow = false;
            _that.keyMap.y = 1080;
            this.key_btn.visible = true;
            this.key_btn.interactive = true;
            this.key_btn.on('pointerdown',function(){
                TweenLite.to(_that.keyMap,.5,{y:1080,onComplete:function(){
                    _that.keyShow = false;
                }});
            })
        }
        // _that.keySpriteArr.map((item,index)=>{
        //     // item.on('pointerover',_that.overAndScale.bind(this));
        //     // item.on('pointerout',_that.outAndScale.bind(this));
        // })
    }

    
    setDrawArr(pageNum){
        let _that = this;
        if(question.sources[pageNum].content.option2.brash.image.name){
            this.pen = new PIXI.Sprite.fromImage(res[question.sources[pageNum].content.option2.brash.image.name].url)
            _that.pixiStage.addChild(this.pen);
            _that.pen.interactive = true;
            _that.pen.buttonMode = false;
            _that.pen.x = -100;
            _that.pen.y = -100;
            
            if(_that.pen.visible){
                stage.on('pointerdown',this.penMouseDown.bind(this));
            };
        }

        _that.lineArea.x = question.sources[pageNum].content.option2.dragArea.x;
        _that.lineArea.y = question.sources[pageNum].content.option2.dragArea.y;
        _that.lineArea.width = question.sources[pageNum].content.option2.dragArea.width;
        _that.lineArea.height = question.sources[pageNum].content.option2.dragArea.height;

        _that.lineWidthNum = question.sources[pageNum].content.option2.brash.degree;
        _that.lineColor = question.sources[pageNum].content.option2.brash.color;

        _that.isStraight = question.sources[pageNum].content.option2.brashChoice.choice;

        

        
        stage.on('pointermove',this.penStageMove.bind(this));
        
        if(_that.resBtn){
            _that.resBtn.on('pointerover',this.overAndScale.bind(this));
            _that.resBtn.on('pointerout',this.outAndScale.bind(this));
            _that.resBtn.on('pointerdown',this.resetClick.bind(this));
        }

        if(_that.backBtn){
            _that.backBtn.on('pointerover',this.overAndScale.bind(this));
            _that.backBtn.on('pointerout',this.outAndScale.bind(this));
            _that.backBtn.on('pointerdown',this.backClick.bind(this));
        }

    }

    setOptionArr(pageNum){
        let _that = this;
        question.sources[pageNum].content.option1.option.map((oitem,oindex)=>{
            _that.dragOptionArr.map((ditem,dindex)=>{
                if(oitem.image.componentName == ditem.name){
                    ditem.interactive = true;
                    ditem.anchor.set(.5,.5);
                    ditem.x = parseInt(oitem.image.x) + parseInt(oitem.image.width/2);
                    ditem.y = parseInt(oitem.image.y) + parseInt(oitem.image.height/2);
                    ditem.startWidth = parseFloat(oitem.image.width);
                    ditem.startHeight = parseFloat(oitem.image.height);
                    
                    ditem.startX = parseInt(oitem.image.x) + parseInt(oitem.image.width/2);
                    ditem.startY = parseInt(oitem.image.y) + parseInt(oitem.image.height/2);
                    ditem.name = oitem.image.name;
                    ditem.hit = false;
                    ditem.isUp = false;
                    ditem.upX = null;
                    ditem.unY = null;
                    ditem.dragging = false;
                    ditem.repeat = false;
                    ditem.isTrash = false;
                }
            })
        });

        //设置垃圾桶
        // console.log("垃圾桶.....",question.sources[pageNum].content.option1.trash.show)
        if(question.sources[pageNum].content.option1.trash.show && question.sources[pageNum].content.option1.trash.image.name){
            this.trash.dicked = PIXI.Texture.fromImage(question.sources[pageNum].content.option1.trash.image.name_another.name);
            this.trash.default = PIXI.Texture.fromImage(question.sources[pageNum].content.option1.trash.image.name);
            this.trash.visible = true;
        }else{
            // this.trash.visible = false;
            this.trash = null;
        }
        //设置碰撞区
        
        this.dragHitArea.x = question.sources[pageNum].content.option1.dragArea.x;
        this.dragHitArea.y = question.sources[pageNum].content.option1.dragArea.y;
        this.dragHitArea.width = question.sources[pageNum].content.option1.dragArea.width;
        this.dragHitArea.height = question.sources[pageNum].content.option1.dragArea.height;
        this.hitArea.x = parseFloat(this.dragHitArea.x);
        this.hitArea.y = parseFloat(this.dragHitArea.y);
        this.hitArea.width = parseFloat(this.dragHitArea.width);
        this.hitArea.height = parseFloat(this.dragHitArea.height);
        _that.pixiStage.addChild(this.hitArea)
        

        _that.dragOptionArr.map((item,index)=>{
            item.on('pointerover',this.overAndScale.bind(this));
            item.on('pointerout',this.outAndScale.bind(this));
            item.on('pointerdown',function(ev){_that.getCurrentTarget.bind(_that)(ev,pageNum)})
        })
    }

    resetClick(e){
        let _that = this;
        
        for (let i = 0; i < _that.pixiStage.lineArr.length; i++) {
            _that.pixiStage.removeChild(_that.pixiStage.lineArr[i]);
        }
        _that.pixiStage.lineArr = [];
    }

    backClick(e){
        console.log("撤销....")
        let _that = this;
        
        _that.pixiStage.removeChild(_that.pixiStage.lineArr[_that.pixiStage.lineArr.length - 1]);
        _that.pixiStage.lineArr.pop();
        
    }

    penStageMove(e){
        
        let _that = this;
        let newPos = e.data.getLocalPosition(_that.pixiStage);
       
        if(_that.pen && _that.resBtn && _that.backBtn){
            
            _that.pen.x = e.data.global.x - 5;
            _that.pen.y = e.data.global.y - 5;
            _that.pixiStage.setChildIndex(_that.pen,_that.pixiStage.children.length - 3);
            _that.pixiStage.setChildIndex(_that.resBtn,_that.pixiStage.children.length - 1);
            _that.pixiStage.setChildIndex(_that.backBtn,_that.pixiStage.children.length - 2);
            if (_that.pen.x >_that.lineArea.x && _that.pen.x < (_that.lineArea.x+_that.lineArea.width) && _that.pen.y>_that.lineArea.y && _that.pen.y<(_that.lineArea.y+_that.lineArea.height)) {
                
                if(newPos.x > _that.resBtn.x - _that.resBtn.width/2 &&
                    newPos.x <  _that.resBtn.x + _that.resBtn.width/2 &&
                    newPos.y > _that.resBtn.y - _that.resBtn.height/2  &&
                    newPos.y < _that.resBtn.y + _that.resBtn.height/2
                ){
                   
                    stage.cursor = 'pointer';
                    _that.pixiStage.cursor = 'pointer';
                    _that.pen.visible = false;
                    
                }else if(
                    newPos.x > _that.backBtn.x-_that.backBtn.width/2 &&
                    newPos.x <  _that.backBtn.x + _that.backBtn.width/2 &&
                    newPos.y > _that.backBtn.y - _that.backBtn.height/2 &&
                    newPos.y < _that.backBtn.y + _that.backBtn.height/2
                ){
                    _that.pen.visible = false;
                    stage.cursor = 'pointer';
                    _that.pixiStage.cursor = 'pointer';
                }else{
                    _that.pen.visible = true;
                    stage.cursor = 'none';
                    _that.pixiStage.cursor = 'none';
                }
            } else {
                stage.cursor = 'auto';
                _that.pixiStage.cursor = 'auto';
                _that.pen.visible = false;
                _that.pen.x = _that.pen.y = -100;
                if (_that.lineMc) {
                    _that.lineMc.endFill();
                    _that.draw = false;
                }
            }

        }
        
        
    }

    penMouseDown(e){
        let _that = this;
        // console.log("点击画线.....",_that.draw)
        if(!_that.draw){

            _that.draw = true;
            
            _that.pen.x = e.data.global.x - 5;
            _that.pen.y = e.data.global.y - 5;
            
            if(_that.pen.x >_that.lineArea.x && _that.pen.x < (_that.lineArea.x+_that.lineArea.width) && _that.pen.y>_that.lineArea.y && _that.pen.y<(_that.lineArea.y+_that.lineArea.height)){
                _that.drawDownX = _that.pen.x;
                _that.drawDownY = _that.pen.y;
                _that.lineMc = new PIXI.Graphics();
                _that.pixiStage.lineArr.push(_that.lineMc);
                if(_that.isStraight == 1){
                    _that.lineMc.moveTo(_that.drawDownX, _that.drawDownY);
                }
                _that.pixiStage.addChild(_that.lineMc);
                _that.pixiStage.setChildIndex(_that.pen,_that.pixiStage.children.length - 3);
                _that.pixiStage.setChildIndex(_that.resBtn,_that.pixiStage.children.length - 1);
                _that.pixiStage.setChildIndex(_that.backBtn,_that.pixiStage.children.length - 2);
                // console.log("开始画线.......",_that.pixiStage.lineArr)

            }
        }

    }

    stageMove(e){
        let _that = this;
        if(_that.lineMc && _that.draw){
            // console.log('画.....')
            if (_that.isStraight == 2) {
                _that.lineMc.clear();
                _that.lineMc.moveTo(_that.drawDownX, _that.drawDownY);
            }
            _that.lineMc.lineStyle(_that.lineWidthNum, "0x"+_that.lineColor.substring(1,7), 1);
            _that.lineMc.lineTo(e.data.global.x, e.data.global.y);
        }
    }

    stageUp(e){
        let _that = this;
        
        if(_that.lineMc){
            if (Math.abs(_that.drawDownX - _that.pen.x) < 5 && Math.abs(_that.drawDownY - _that.pen.y) < 5) {
                _that.pixiStage.removeChild(this.pixiStage.lineArr[this.pixiStage.lineArr.length - 1]);
                _that.pixiStage.lineArr.pop();
            }
            _that.lineMc.endFill();
            _that.draw = false;
            if(_that.pen){
                _that.pen.visible = false;
            }
        }
        if(_that.pen){
            _that.pen.visible = false;
        }

    }

    getCurrentTarget(e,pageNum){
        let _that = this;
        if(_that.complete && _that.currentDragTarget == null){
            _that.currentDragTarget = e.target;
            
            if(question.sources[pageNum].content.option1.dragRepeat && !_that.currentDragTarget.repeat){
                // console.log("复制了....")
                _that.copyCurrentTarget(pageNum);
               _that.currentDragTarget.repeat = true;
            }
            //提升当前对象的层级
            let pixiStageParent = stage.getChildByName('GAME').getChildByName('GAME'+pageNum)
            pixiStageParent.setChildIndex(_that.pixiStage,pixiStageParent.children.length-1)
            _that.pixiStage.setChildIndex(_that.currentDragTarget,_that.pixiStage.children.length-1);

            if(!_that.currentDragTarget.dragging){
                _that.currentDragTarget.dragging = true
                _that.currentDragTarget.width = _that.currentDragTarget.startWidth;
                _that.currentDragTarget.height = _that.currentDragTarget.startHeight;
    
                _that.startCos = e.data.getLocalPosition(_that.pixiStage);

                //获取初始位置
                _that.startPos.x = _that.currentDragTarget.x;
                _that.startPos.y = _that.currentDragTarget.y;

                //获取鼠标偏移量
                _that.offsetPos.x = _that.startCos.x - _that.startPos.x;
                _that.offsetPos.y = _that.startCos.y - _that.startPos.y;
                
            }
            _that.complete = false;
        }
    }

    moveTarget(e){
        let _that = this;
        if(_that.currentDragTarget && _that.currentDragTarget.dragging){
            let _that = this;
            let nowPos = e.data.getLocalPosition(_that.pixiStage);
            _that.currentDragTarget.x = nowPos.x - _that.offsetPos.x;
            _that.currentDragTarget.y = nowPos.y - _that.offsetPos.y;
            // console.log(this.hitArea,'pppppppppp',this.dragHitArea)
            // console.log(_that.currentDragTarget.y+_that.currentDragTarget.height/2,_that.trash.y+_that.trash.height)
            //碰撞检测
            if(_that.currentDragTarget.x>20&&_that.currentDragTarget.x<1900&&_that.currentDragTarget.y>20&&_that.currentDragTarget.y<1060){
                if((_that.currentDragTarget.x + _that.currentDragTarget.width/2) < parseFloat(_that.hitArea.x) + parseFloat(_that.hitArea.width) &&
                    (_that.currentDragTarget.x - _that.currentDragTarget.width/2) > (parseFloat(_that.hitArea.x) ) &&
                    (_that.currentDragTarget.y + _that.currentDragTarget.height/2) < parseFloat(_that.hitArea.y) + parseFloat(_that.hitArea.height) &&
                    (_that.currentDragTarget.y - _that.currentDragTarget.height/2) > (parseFloat(_that.hitArea.y) )
                ){
                    // console.log('碰到');
                    _that.currentDragTarget.hit = true;
                }else{
                    // console.log('没碰到了');
                    _that.currentDragTarget.hit = false;
                }

                //碰撞检测是否碰到垃圾桶
                if(_that.trash!=null){
                    if((_that.currentDragTarget.x + _that.currentDragTarget.width/2) < parseFloat(_that.trash.x) ||
                        (_that.currentDragTarget.x - _that.currentDragTarget.width/2) > (parseFloat(_that.trash.x) + parseFloat(_that.trash.width)) ||
                        (_that.currentDragTarget.y + _that.currentDragTarget.height/2) < parseFloat(_that.trash.y) ||
                        (_that.currentDragTarget.y - _that.currentDragTarget.height/2) > (parseFloat(_that.trash.y) + parseFloat(_that.trash.height))
                    ){
                        // console.log('没碰到垃圾桶');
                        _that.trash.texture = _that.trash.default;
                        _that.currentDragTarget.isTrash = false;
                    }else{
                        // console.log('碰到了垃圾桶');
                        _that.trash.texture = _that.trash.dicked;
                        _that.currentDragTarget.isTrash = true;

                    }
                }


            }


        }
    }

    leaveTarget(e){
        let _that = this;
        if(_that.currentDragTarget){
            _that.currentDragTarget.dragging = false;
            let nowPos = e.data.getLocalPosition(_that.pixiStage);

            if(_that.currentDragTarget.hit){ //碰到了
                
                _that.currentDragTarget.isUp = true;
                _that.currentDragTarget.upX = _that.currentDragTarget.x;
                _that.currentDragTarget.upY = _that.currentDragTarget.y;
                //垃圾桶是否碰到 
                if(_that.currentDragTarget.isTrash){ //碰到垃圾桶
                    _that.pixiStage.removeChild(_that.currentDragTarget);
                    _that.currentDragTarget = null;
                    _that.complete = true;
                    _that.trash.texture = _that.trash.default;
                }else{
                    
                    _that.currentDragTarget = null;
                    _that.complete = true;
                    
                }
            }else{
                
                if(_that.currentDragTarget.repeat){
                    //垃圾桶是否碰到
                    if(_that.currentDragTarget.isTrash){ //碰到垃圾桶
                        
                        _that.pixiStage.removeChild(_that.currentDragTarget);
                        _that.currentDragTarget = null;
                        _that.complete = true;
                        _that.trash.texture = _that.trash.default;

                    }else{
                        if(_that.currentDragTarget.isUp){
                            TweenLite.to(_that.currentDragTarget,.5,{x:_that.currentDragTarget.upX,y:_that.currentDragTarget.upY,onComplete:function(){
                                _that.currentDragTarget = null;
                                _that.complete = true;
                            }})
                        }else{
                            TweenLite.to(_that.currentDragTarget,.5,{x:_that.currentDragTarget.startX,y:_that.currentDragTarget.startY,onComplete:function(){
                                _that.pixiStage.removeChild(_that.currentDragTarget);
                                _that.currentDragTarget = null;
                                _that.complete = true;
                            }})
                        }
                    }
                }else{
                    //垃圾桶是否碰到
                    if(_that.currentDragTarget.isTrash){ //碰到垃圾桶
                        
                        _that.pixiStage.removeChild(_that.currentDragTarget);
                        _that.currentDragTarget = null;
                        _that.complete = true;
                        _that.trash.texture = _that.trash.default;

                    }else{
                        if(_that.currentDragTarget.isUp){
                            TweenLite.to(_that.currentDragTarget,.5,{x:_that.currentDragTarget.upX,y:_that.currentDragTarget.upY,onComplete:function(){
                                
                                _that.currentDragTarget = null;
                                _that.complete = true;
                            }})
                        }else{

                            TweenLite.to(_that.currentDragTarget,.5,{x:_that.currentDragTarget.startX,y:_that.currentDragTarget.startY,onComplete:function(){
                                
                                _that.currentDragTarget = null;
                                _that.complete = true;
                            }})
                        }
                    }
                }
                
            }

            
        }
    }

    getCurrentKey(ev){ //处理点击键盘
        let _that = this;
        if(_that.keycurrentTarget == null && _that.keyComplete){
            _that.keycurrentTarget = ev.target;
            TweenLite.to(_that.keycurrentTarget,.15,{width:_that.keycurrentTarget.width*0.8,height:_that.keycurrentTarget.height*0.8});
            _that.keyComplete = false;
        }
    }
    
    leaveKeyTarget(e){ //处理键盘up
        let _that = this;
        if(_that.keycurrentTarget){
            TweenLite.to(_that.keycurrentTarget,.15,{width:_that.keycurrentTarget.startWidth,height:_that.keycurrentTarget.startHeight,onComplete:function(){
                _that.keycurrentTarget = null;
                _that.keyComplete = true;
            }});
        }
        _that.draw = false;
    }

    copyCurrentTarget(pageNum){
        let _that = this;
        let sprite = new PIXI.Sprite.fromImage(res[_that.currentDragTarget.name].url);
        sprite.interactive = true;
        sprite.anchor.set(.5,.5);
        sprite.x = _that.currentDragTarget.startX;
        sprite.y = _that.currentDragTarget.startY;
        sprite.width = parseFloat(_that.currentDragTarget.startWidth);
        sprite.height = parseFloat(_that.currentDragTarget.startHeight);
        sprite.startWidth = _that.currentDragTarget.startWidth;
        sprite.startHeight = _that.currentDragTarget.startHeight;
        sprite.startX = _that.currentDragTarget.startX;
        sprite.startY = _that.currentDragTarget.startY;
        sprite.name = _that.currentDragTarget.name;
        sprite.hit = false;
        sprite.isUp = false;
        sprite.upX = null;
        sprite.unY = null;
        sprite.dragging = false;
        sprite.repeat = false;
        sprite.isTrash = false;
        _that.pixiStage.addChild(sprite);
        
        _that.dragOptionArr.unshift(sprite);
        _that.dragOptionArr.map((item,index)=>{
            item.on('pointerover',this.overAndScale.bind(this));
            item.on('pointerout',this.outAndScale.bind(this));
            item.on('pointerdown',function(ev){_that.getCurrentTarget.bind(_that)(ev,pageNum)});
        })

    }

    getChoice(){
        let _that = this;
        if(question.dragShow == '2'){   //画笔
            console.log('画笔舞台....')
           
            _that.pixiStage.children.map((citem2,cindex)=>{
                if(citem2.name!=null){
                    if(citem2.name.indexOf('blank_drag')!=-1 || citem2.name.indexOf('option')!= -1 || citem2.name.indexOf('trash')!= -1){
                        citem2.visible = false;
                    }
                    if(citem2.name.indexOf('blanked')!=-1){
                        _that.drawBlankArr.unshift(citem2);
                        _that.drawArr.push(citem2);
                    }
                   
                }
            });
            console.log(_that.drawBlankArr)
            // console.log(_that.drawBlankArr,'画线数组',_that.drawArr)
        }else if(question.dragShow == '1'){  //拖拽
            console.log('拖拽舞台....')
            _that.pixiStage.children.map((citem,cindex)=>{
                // console.log(citem.name)
                if(citem.name != null){
                    if(citem.name.indexOf('blanked')!=-1 || citem.name.indexOf('back')!= -1 || citem.name.indexOf('reset')!= -1){
                        citem.visible = false;
                    }else{
                        citem.visible = true;
                        _that.dragArr.push(citem);
                        if(citem.name.indexOf('blank_drag')!=-1){
                            _that.dragBlankArr.unshift(citem);
                        }
                        if(citem.name.indexOf('option')!=-1){
                            new Animate(citem,{
                                "type":'bounceIn',
                                "delay":Math.random()*.3
                            });
                            _that.dragOptionArr.unshift(citem);
                        }
                        if(citem.name.indexOf('trash')!=-1){
                            _that.trash = citem;
                        }
                    }
                }
            })
        }
        
    }

    getBlankChoice(pageNum){ //设置公共填空
        let _that = this;
        if(question.dragShow == '2'){
            _that.fontFamily = question.sources[pageNum].content.option2.style.fontFamily;
            _that.fontSize = question.sources[pageNum].content.option2.style.fontSize;
            _that.strLength = question.sources[pageNum].content.option2.style.length;
            _that.fontColor = question.sources[pageNum].content.option2.style.color;
            _that.fontWeight = question.sources[pageNum].content.option2.style.strong ? 'bold' : 'normal';
            _that.fontStyle = question.sources[pageNum].content.option2.style.italic ? 'italic' :'normal';
        }else{
            _that.fontFamily = question.sources[pageNum].content.option1.style_drag.fontFamily;
            _that.fontSize = question.sources[pageNum].content.option1.style_drag.fontSize;
            _that.strLength = question.sources[pageNum].content.option1.style_drag.length;
            _that.fontColor = question.sources[pageNum].content.option1.style_drag.color;
            _that.fontWeight = question.sources[pageNum].content.option1.style_drag.strong ? 'bold' : 'normal';
            _that.fontStyle = question.sources[pageNum].content.option1.style_drag.italic ? 'italic' : '';
        }
        question.sources[pageNum].content.option1.blank_drag.map((item,index)=>{
            _that.dragBlankArr.map((gitem,gindex)=>{
                if(item.image.componentName == gitem.name){
                    gitem.isClick = false;
                    gitem.anchor.set(.5,.5);
                    gitem.x = parseFloat(item.image.x) + parseFloat(item.image.width/2);
                    gitem.y = parseFloat(item.image.y) + parseFloat(item.image.height/2);
                    gitem.dicked = PIXI.Texture.fromImage(item.image.name_another.name);
                    gitem.default = PIXI.Texture.fromImage(item.image.name);
                    gitem.keys = item.image.keys;
                    gitem.cursor = 'text';
                    gitem.mingzi = 'dragText'+gindex;

                    
                    
                    // console.log(gitem.children.length == 0)
                    // if(gitem.children.length == 0){
                    //     gitem.addChild(text);
                    // }
                    if(_that.pixiStage.getChildByName(gitem.mingzi) == null){
                        // console.log("1111");
                        let text = new PIXI.Text('',{fontFamily:_that.fontFamily,fontSize:_that.fontSize+'px',fill:_that.fontColor,fontWeight:_that.fontWeight,fontStyle:_that.fontStyle,padding:8});
                        text.anchor.set(.5,.5);
                        text.x = gitem.x;
                        text.y = gitem.y;
                        gitem.wenzi = text;
                        text.name = gitem.mingzi;
                        _that.pixiStage.addChild(gitem.wenzi);
                    }
                }
            });
        });

        question.sources[pageNum].content.option2.blank.map((item,index)=>{
            _that.drawBlankArr.map((gitem,gindex)=>{
                if(item.image.componentName == gitem.name){
                    gitem.isClick = false;
                    gitem.anchor.set(.5,.5);
                    gitem.x = parseFloat(item.image.x) + parseFloat(item.image.width/2);
                    gitem.y = parseFloat(item.image.y) + parseFloat(item.image.height/2);
                    gitem.dicked = PIXI.Texture.fromImage(item.image.name_another.name);
                    gitem.default = PIXI.Texture.fromImage(item.image.name);
                    gitem.keys = item.image.keys;
                    gitem.cursor = 'text';

                    gitem.mingzi = 'drawText'+gindex;

                    
                    
                    // console.log(gitem.children.length == 0)
                    // if(gitem.children.length == 0){
                    //     gitem.addChild(text);
                    // }
                    if(_that.pixiStage.getChildByName(gitem.mingzi) == null){
                        // console.log("1111");
                        let text = new PIXI.Text('',{fontFamily:_that.fontFamily,fontSize:_that.fontSize+'px',fill:_that.fontColor,fontWeight:_that.fontWeight,fontStyle:_that.fontStyle,padding:8});
                        text.anchor.set(.5,.5);
                        text.x = gitem.x;
                        text.y = gitem.y;
                        gitem.wenzi = text;
                        text.name = gitem.mingzi;
                        _that.pixiStage.addChild(gitem.wenzi);
                    }
                    
                }
            })
        });
        
        if(_that.dragBlankArr.length>0){ //默认第一个填空显示
            if(question.keyChoice == '1'){
                _that.dragBlankArr[0].texture = _that.dragBlankArr[0].dicked;
                _that.dragBlankArr[0].isClick = true;
            }else{
                _that.dragBlankArr[0].texture = _that.dragBlankArr[0].default;
                _that.dragBlankArr[0].isClick = false;
            }
        }
        if(_that.drawBlankArr.length>0){
            if(question.keyChoice == '1'){
                _that.drawBlankArr[0].texture = _that.drawBlankArr[0].dicked;
                _that.drawBlankArr[0].isClick = true;
            }else{
                _that.drawBlankArr[0].texture = _that.drawBlankArr[0].default;
                _that.drawBlankArr[0].isClick = false;
            }
        }

        _that.dragBlankArr.map((item,index)=>{ //点击拖拽填空
            item.on('pointerdown',function(){
                if(question.comentAudio.pickBlank.show && question.comentAudio.pickBlank.audio){
                    res[question.comentAudio.pickBlank.audio].sound.play();
                }
                _that.dragBlankArr.map((ditem,dindex)=>{
                    ditem.texture = ditem.default;
                    ditem.isClick = false;
                });
                item.texture = item.dicked;
                item.isClick = true;
                item.cursor = 'text';
                if(!_that.keyShow){
                    TweenLite.to(_that.keyMap,.5,{y:858,onComplete:function(){
                        _that.keyShow = true;
                    }});
                }

            });
            _that.keySpriteArr.map((kitem,kindex)=>{
                kitem.on('pointerdown',function(ev){
                    _that.getCurrentKey.bind(_that)(ev)
                    if(item.isClick){
                        _that.getKeyValue.bind(_that)(ev,item);
                    }
                });
                // kitem.on('pointerup',function(ev){
                //     TweenLite.to(kitem,.2,{width:kitem.startWidth,height:kitem.startHeight});
                // })
            })


        });
        
        _that.drawBlankArr.map((item,index)=>{ //点击画笔填空
            item.on('pointerdown',function(){
                if(question.comentAudio.pickBlank.show && question.comentAudio.pickBlank.audio){
                    res[question.comentAudio.pickBlank.audio].sound.play();
                }
                _that.drawBlankArr.map((ditem,dindex)=>{
                    ditem.texture = ditem.default;
                    ditem.isClick = false;
                });
                item.texture = item.dicked;
                console.log(item,"点击")
                item.isClick = true;
                item.cursor = 'text';

                if(!_that.keyShow){
                    TweenLite.to(_that.keyMap,.5,{y:858,onComplete:function(){
                        _that.keyShow = true;
                    }});
                }
                if(_that.pen){
                    _that.pen.visible = false;
                }

            });

            item.on('pointerup',function(e){
                _that.draw = false;
                if(_that.pen){
                    _that.pen.visible = false;
                }
            });
            _that.keySpriteArr.map((kitem,kindex)=>{
                kitem.on('pointerdown',function(ev){
                    if(_that.pen){
                        _that.pen.visible = false;
                    }
                    _that.getCurrentKey.bind(_that)(ev);
                    if(item.isClick){
                        _that.getKeyValue.bind(_that)(ev,item);
                    }
                });
                // kitem.on('pointerup',function(ev){
                //     TweenLite.to(kitem,.2,{width:kitem.startWidth,height:kitem.startHeight});
                // })
            })

        });

    }

    getKeyValue(e,item){ //绑定键盘点击
        let _that = this;
        
        _that.draw = false;
        _that.currentTarget = e.target;
        if(question.comentAudio.keyBlank.show && question.comentAudio.keyBlank.audio){
            res[question.comentAudio.keyBlank.audio].sound.play();
        }
        if(_that.strLength == '' || _that.fontSize == ''){
            item.wenzi.text = '';
        }else{
            if(_that.currentTarget.key == 'del'){
                item.wenzi.text = '';
            }else if(_that.currentTarget.key == 'tui'){
                item.wenzi.text = item.wenzi.text.substring(0,item.wenzi.text.length-1).replace(/\s*/g,"");
            }else if(item.wenzi.text.length < _that.strLength){
                // console.log(_that.currentTarget.key)
                item.wenzi.text += _that.currentTarget.key;
                item.wenzi.text = item.wenzi.text.replace(/\s*/g,"");
                // console.log("文本........",item.children[0]);
            }else if(item.wenzi.text.length == 1){
                console.log("111111");
                item.wenzi.text = _that.currentTarget.key;
                item.wenzi.text = item.wenzi.text.replace(/\s*/g,"");
            }else{
                return;
            }

        }
        
    }

    overAndScale(e){
        let _that = this;
        let target = e.currentTarget;
        target.cursor = 'pointer';
        stage.cursor = 'pointer';
        _that.pixiStage.cursor = 'pointer';
        TweenLite.to(target,.4,{width:1.05*target.width,height:1.05*target.height});
    }

    outAndScale(e){
        let _that = this;
        let target = e.currentTarget;
       
        TweenLite.to(target,.4,{width:target.startWidth,height:target.startHeight});
    }

    stemAudioPause(index){
        let game = stage.getChildByName('GAME').getChildByName('GAME'+index);
        if(window.gameBgAudioStr){
            window.gameBgAudioStr.volume = 1;
        }
        if(game.children[1].stemAudioStr){
            game.children[1].stemAudioStr.pause();
            game.children[1].stemAudioStr.playIng = false;
        }
        if(game.children[1].stemSound){
            game.children[1].stemSound.timeScale = 0;
        }
        if(game.children[1].stemSoundAn){
            game.children[1].stemSoundAn.timeScale = 0;
        }
    }
}

export {Actuator};