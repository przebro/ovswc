<template>
  <div>
    <div v-if="disabled == true" :class="classP" >{{formatDate()}}</div>
    <div v-else :class="classP" @click="showMenu">{{formatDate()}}</div>
    <ui-menu v-model="isVisible" :maxWidth="230">
            <div class="ui-date-container">
                <div class="flex-row flex">
                    <div class="ui-date-month-selector" v-if="inputLevel == 0">
                        <div :class="classN" @click="updateMonth(-1)" >
                            <svg xmlns="http://www.w3.org/2000/svg" class="ui-svg-triangle" role="img" viewBox="0 0 24 24">
                                <path d="M 18,5 L9,12 L18,19" />
                            </svg>
                        </div>
                        <div :class="classH" @click="setLevel(1)"> {{ mnames[date.getMonth()] }}</div>
                        <div :class="classN" @click="updateMonth(1)">
                            <svg xmlns="http://www.w3.org/2000/svg" class="ui-svg-triangle" role="img" viewBox="0 0 24 24">
                                <path d="M 6,5 L15,12 L6,19" />
                            </svg>
                        </div>
                    </div>

                    <div class="ui-date-month-selector" v-if="inputLevel == 1">
                        <div :class="classN" @click="updateYear(-1)" >
                            <svg xmlns="http://www.w3.org/2000/svg" class="ui-svg-triangle" role="img" viewBox="0 0 24 24">
                                <path d="M 18,5 L9,12 L18,19" />
                            </svg>
                        </div>
                        <div :class="classH" @click="setLevel(1)"> {{ date.getFullYear() }}</div>
                        <div :class="classN" @click="updateYear(1)">
                            <svg xmlns="http://www.w3.org/2000/svg" class="ui-svg-triangle" role="img" viewBox="0 0 24 24">
                                <path d="M 6,5 L15,12 L6,19" />
                            </svg>
                        </div>
                    </div>
                </div>
                <div v-if="inputLevel == 0">
                    <div class="ui-day-header">
                        <div class="ui-date-item" v-for="(item,i) in dnames" :key="i">{{item}}</div>
                    </div>
                    <div class="ui-date-days">
                        <div :class="classD(item)" v-for="(item,i) in days" :key="i" @click="selectDay(i)">{{item.day}}</div>
                    </div>
                </div>
                <div v-if="inputLevel == 1">
                    <div class="ui-date-months">
                        <table style="width:100%;height=100%;">
                            <tr v-for="(n) in [0,3,6,9]"  :key="n" ><td v-for="(i) in [0,1,2]" :key="i+n" @click="selectMonth(i+n)" :class="classM" >{{months[i+n]}}</td></tr>
                        </table>
                    </div>
                </div>
            </div>
    </ui-menu>
  </div>
</template>

<script>

import UiMenu from '../menu/menu.vue'
import themeable from '../mixins/themeable'
export default {
    name : "UiDatePicker",
    components : {UiMenu},
    mixins : [themeable],
    props : {
        value : null,
        format :{
            type : String,
            default : () => "YYYY-MM-DD"
        },
        disabled :{
            type : Boolean
        }
    },
    data(){
        return{
            isVisible : false,
            days : [],
            date : null,
            selectedDays :0,
            selectedDate : "",
            dnames : ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"],
            mnames : ["January","February","March","April","May","June","July","August","September","October","November","December"],
            inputLevel : 0,
            months : ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],
        }
    },
    provide(){
        return {
          isAttached : true,
          onDataChange : this.onItemSelected
          
        }
    },
    watch :{
        isVisible(n){
            if (n == true) this.generateCal();
        }
    },
    computed : {
        classM(){
            return ["ui-month-item"]
        },
        classN(){
            return [this.getTheme("item"),"ui-nav-triangle"]
        },
        classP(){
            return [this.getTheme(""),"ui-date-picker"]
        },
        classH(){
            return [this.getTheme("item"),"header-selector"]
        }
    },
    methods:{
        showMenu(){
            this.isVisible = !this.isVisible
        },
        classD(day){
            return [this.getTheme("item"),"ui-date-item",
                    (day.date == this.selectedDays ? " ui-date-item-selected" : ""),
                    (day.m == "p" || day.m == "n"? " ui-date-item-other":"")
                   ]
            
        },
        updateMonth(value){
            this.date = new Date( this.date.getFullYear(), this.date.getMonth() + value,this.date.getDate())
            this.generateCal()

        },
        updateYear(value){
            this.date = new Date( this.date.getFullYear() + value, this.date.getMonth(),this.date.getDate())
            this.generateCal()
        },
        selectMonth(value){
            this.date =  new Date(this.date.getFullYear(), value,this.date.getDate())
            this.setLevel(0)
            this.generateCal()
        },
        setLevel(val){
            this.inputLevel = val 
        },
        generateCal(){
            
            let month = this.date.getMonth()
            let year = this.date.getFullYear();

            let prev = new Date(year, month, 0)
            prev = new Date(prev.getFullYear(),prev.getMonth(),prev.getDate() + 1  - prev.getDay() )

            let sdayofweek = new Date(year, month, 0).getDay()
            let eday = new Date(year, month + 1, 0).getDate()
            let edayofweek =  7 - ( new Date(year, month + 1, 0).getDay())
            edayofweek = edayofweek == 7 ? 0:edayofweek;

            this.days = []

            for(let i=0;i<sdayofweek;i++){
                let pmonthdate = new Date(prev.getFullYear(),prev.getMonth(), prev.getDate() + i  )
                this.days.push( { day : prev.getDate() + i , m : "p",date : pmonthdate})
            }
            for(let i=0;i<eday;i++){
                this.days.push( {day : i + 1,m  : "c", date : new Date(year, month, i + 1)})
            }

            for(let i=0;i<edayofweek;i++){
                this.days.push( {day : i + 1, m : "n", date : new Date(year, month, i + 1)})
            }
        },
        selectDay(idx){
            this.selectedDays = this.days[idx].date
            this.date = this.days[idx].date
            this.isVisible = false
            this.formatDate()
            this.$emit("input",this.selectedDate)
        },
        formatDate(){
            let m = this.date.getMonth()  + 1 < 10 ? "0" + (this.date.getMonth()  + 1) : (this.date.getMonth()  + 1)
            let d = this.date.getDate() < 10 ? "0"  + this.date.getDate() : this.date.getDate()
            
            if (this.format == "YYYY-MM-DD"){
                this.selectedDate =  this.date.getFullYear().toString() + "-" + m.toString() + "-" + d.toString()
            }
            if (this.format == "YYYYMMDD"){
                this.selectedDate =  this.date.getFullYear().toString()  + m.toString()  + d.toString()
            }
            
            return this.selectedDate
        }
    },
    beforeMount(){
        this.date = new Date()
        
    },
    mounted(){
        this.formatDate()
        this.$emit("input",this.selectedDate)
    }

}
</script>

<style lang="scss" scoped>
@import "../../../sass/variables.scss";
.ui-date-picker{
    display: flex;
    flex-grow:  0;
    padding: 6px;
    font-size: 12px;
    text-align: left;
}
.ui-date-container{
    font-weight: bold;
    height: 215px;
}

.ui-date-month-selector{
    height: 24px;
    display: flex;
    flex-grow: 1;
    border-radius: 5px;
}

.ui-nav-triangle{
    align-items: center;
    justify-content: center;
    display: flex;
    width:24px;
    height:24px;
}

.ui-svg-triangle{
    fill: none;
    stroke : #777;
}

.ui-date-item{
    display: inline-flex;
    vertical-align: middle;
    justify-content: center;
    padding : 1px;
    width: 14.285% !important;
    height:26px;
    align-items: center;
    cursor: pointer;
}

.ui-date-item-other{
    color: gray;
}

.ui-day-header .ui-date-item:last-child{
    color: red;
}


.header-selector{
    padding: 5px;
    flex-grow: 1;
    cursor: pointer;
}

.ui-month-item{
    vertical-align: middle;
    justify-content: center;
    padding : 10px;
}
</style>