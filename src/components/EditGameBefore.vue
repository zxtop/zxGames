<template>
    <div>
        <p style="color:#fff;padding-left:15px;margin-bottom:0px;">操作区类别选择</p>
        <div class="option-animate" style="padding-left:15px;border-bottom:none;">
            <div class="edit-radio-title">
                <el-radio-group v-model="allData.dragShow" @input="change($event)">
                    <el-radio label="1">拖拽</el-radio>
                    <el-radio label="2">画笔</el-radio>
                </el-radio-group>
            </div>
        </div>
    </div>
</template>

<script>
    import {CopyAndRender,DeleteEleByName,UploadAndRenderEle,RenderElementByIndex,RenderAllData} from 'xes-tem-render'
    export default {
        name: "EditGameBefore",
        props: [
            "allData",
            "resourceData",
        ],
        data(){
            return{
                
            }
        },
        // watch: {
        //     allData:{
        //         handler:function(){
                    
        //             if(this.allData.dragShow == "1"){
        //                 stage.getChildByName('GAME').children.map((item,index)=>{
        //                     let componentContainer = item.getChildByName('componentContainer');
                            
        //                     componentContainer.children.map((citem,cindex)=>{
        //                         if(citem.name.indexOf('blanked')!=-1 || citem.name.indexOf('back')!= -1 || citem.name.indexOf('reset')!= -1){
        //                             citem.visible = false;
        //                         }else{
        //                             citem.visible = true;
        //                         }
        //                     })
        //                 })

        //             };
        //             if(this.allData.dragShow == '2'){
        //                 stage.getChildByName('GAME').children.map((item,index)=>{
        //                     let componentContainer = item.getChildByName('componentContainer');
                           
        //                     componentContainer.children.map((citem,cindex)=>{
        //                         if(citem.name.indexOf('blank_drag')!=-1 || citem.name.indexOf('option')!= -1 || citem.name.indexOf('trash')!= -1){
        //                             citem.visible = false;
        //                         }else{
        //                             citem.visible = true;
        //                         }
        //                     })
        //                 });

                        
        //             }
                    
        //         },deep:true
        //     }
        // },
        
        computed: {
         
        },
        methods:{
            change(e){
                console.log(e);
                
                let _that = this;
                 
                    
                this.allData.sources.forEach((item,index)=>{
                    if(e == '1'){
                       
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

                    }else{
                        
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
                    }

                    RenderElementByIndex(index,_that.allData)
                })


                
            },
            updateResourceData() {
                /*
                * 此方法在上传图片请求成功后执行
                * */
                this.$emit('updateResourceData')
            },
        },
        mounted(){
            

        }
    }
</script>
<style scoped>

</style>