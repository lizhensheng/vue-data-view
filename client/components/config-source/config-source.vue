<template>
    <div class="config-source">
        <div class="config-source_refresh">
            <div><y-checkbox v-model="value.isRefresh">自动更新请求</y-checkbox></div>
            <div class="config-refresh_interval"><y-input v-model="value.refreshInterval" :height="20"></y-input></div>秒一次
        </div>
        <div class="config-source_data">
            <div class="data-source_title">数据源<span>{{dataSourceType === '数据库' ? '数据库>' + dataSourceListDefault : dataSourceType}}</span></div>
            <y-button text="配置数据源" :hollow="true" :showIcon="false" :width="100" :height="30" popper="data-source_button"  @click="onSettingData"></y-button>
        </div>
        <div class="config-source_setting" v-show="showConfig">
            <div class="config-source_header">
                <span class="config-source_header_title">设置数据源</span>
                <i class="el-icon-close" @click="onClosePopup"></i>
            </div>
             <y-form-item   title="数据源类型" 
                            :width="332" 
                            height="auto" 
                            align="topToBottom"
                            :staticTitle = "true">
                <y-select :options="dataSourceOptions" v-model="dataSourceType"></y-select>
             </y-form-item>
             <y-form-item   title="选择已有数据源" 
                            :width="332" 
                            height="auto" 
                            align="topToBottom"
                            :staticTitle = "true"
                            v-show="dataSourceType === '数据库'">
                <y-select :options="dataSourceList" v-model="dataSourceListDefault"></y-select>
             </y-form-item>
              <y-form-item  :title="dataSourceType === '数据库' ? 'SQL': '文本'" 
                            :width="332" 
                            height="auto" 
                            align="topToBottom"
                            :staticTitle="true"
                            >
                           <div>
                                <monaco  id="config-source" 
                                         :value="configTextValue" 
                                         :language="dataSourceType !== 'static' ? 'sql' : 'json'" 
                                         :readOnly="false" 
                                         :height="200"
                                         @blur="onBlur">
                                </monaco>
                           </div>            
             </y-form-item>
              <y-form-item  title="数据响应结果为列表,列表元素包含如下字段" 
                            :width="332" 
                            height="auto" 
                            align="topToBottom"
                            :staticTitle="true"
                            >
                           <div class="config-description">
                               <y-table :data="value.model">
                                   <y-table-column label="字段" prop="field" :width="60"></y-table-column>
                                   <y-table-column label="映射" prop="mapping" :width="60"></y-table-column>
                                   <y-table-column label="说明" prop="description" width="auto"></y-table-column>
                               </y-table>
                           </div>            
             </y-form-item>
              <y-form-item  title="数据响应结果(只读)" 
                            :width="332" 
                            height="auto" 
                            align="topToBottom"
                            :staticTitle="true"
                            >
                           <div>
                                <monaco  id="config-source-result" 
                                         :value="value.json" 
                                         :height="350">
                                </monaco>
                           </div>            
             </y-form-item>
        </div>        
    </div>
</template>

<script>
import Monaco from '../monaco/monaco'
export default  {
   name:'ConfigSource',
   data(){
       return {
           dataSourceType: 'static',
           dataSourceOptions:[
               {
                   label: 'static',
                   value: 'static'
               },
               {
                   label: '数据库',
                   value: '数据库'
               }
           ],
           showConfig: false,
           dataSourceListDefault: '选择已有数据源',
           dataSourceList: []
       }
   },
   props:{
       value: Object
   },
   created(){
       this.dataSourceType = this.value.dataType
       this.$axios.post('/connection/all')
        .then((res) => {
            if(res.code === 200){
                res.body.forEach(element => {
                    this.dataSourceList.push({
                        label: element.dbconnectionname,
                        value: element._id
                    })
                    this.dataSourceListDefault = this.value.data.connectionSourceId ? this.value.data.connectionSourceId : '选择已有数据源'
                })
            }
        })
        .catch((e) => {
            console.warn(e.message)
        })
   },
   mounted(){
       
   },
   computed:{
       configTextValue(){
           if(this.value.dataType === 'static'){
               return this.value.data.staticJson
           }
           else {
               return this.value.data.sql
           }
       }
   },
    methods:{
        onClosePopup(){
            this.showConfig = false
        },
        onSettingData(){
            this.showConfig = true
        },
        onBlur(val){
            this.value.dataType = this.dataSourceType
            if(this.value.dataType === 'static')
            {
                this.value.data.staticJson = val
                this.value.json = val
                this.value.data.sql = ''
                this.value.data.connectionSourceId = ''
                this.$emit('input', this.value)
            }
            else if(this.dataSourceListDefault != '选择已有数据源' && this.value.data.sql != val){
                this.$axios.post('/connection/excuteSql', {id: this.dataSourceListDefault, sql: val, limit: this.value.data.limit })
                .then((res) =>{
                    if(res.code === 200){
                        let json = JSON.stringify(res.body)
                        this.value.json = json
                        this.value.data.staticJson = ''
                        this.value.data.sql = val
                        this.value.data.connectionSourceId = this.dataSourceListDefault
                        this.$emit('input', this.value)
                    }
                })
				.catch(e => {
					console.warn(e.message)
				})
            }
            else {
                console.warn('请选择数据源,或者修改数据返回结果')
            }
        }
    },
    components:{
        Monaco
    },
    watch:{
        dataSourceType(val){
            this.$bus.$emit('setLanguage', val!== 'static' ? 'sql' : 'json')
        },
        showConfig(val){
            if(val){
                this.$bus.$emit('createMonacoInstance')
            }
        }
    }
}
</script>

<style lang="stylus" scoped>
.editor {
  width: 600px;
  height: 800px;
}
.config-source{
    .config-source_refresh{
        display: flex;
        flex-direction: row;
        align-items: center;
        .config-refresh_interval{
            width: 40px;
            margin-left: 10px;
        }
    }
    .config-source_data{
        display: flex;
        flex-direction: row;
        align-items: center;
        .data-source_title{
            flex: 1;
            span{
                background: rgb(57,65,77);
                padding: 2px 5px;
                margin-left: 5px;
            }
        }
    }
    .config-source_setting{
        .config-source_header{
            height: 50px;
            display: flex;
            align-items: center;
            .config-source_header_title{
                font-size: 16px;
                flex: 1;
            }
            i.el-icon-close{
                font-size: 20px;
                cursor: pointer;
            }
        }
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        display: flex;
        flex-direction: column;
        width: 100%;
        background: rgb(29,33,38);
        z-index: 1;
        padding: 10px 10px;
    }
}
</style>