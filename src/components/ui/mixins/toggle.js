export default{
    name : "toggle",
    props :{

    },
    data(){
        return{
            isActive : false
        }
    },
    mounted(){

    },
    methods:{
        toggle(){
            this.$emit('change',this);
        },
        Active(){
            return this.isActive
        }
    }
}