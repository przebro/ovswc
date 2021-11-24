export default {
    name : "groupable",
    provide(){
        return{
            ItemGroup:{
              insert : this.insert,
              remove : this.remove
            }
        }
    },
    data (){
      return {
        items : [],
      }
    },
    methods:{
        insert(item){
            item.$on("change",this.onItemCahnge)
            this.items.push(item)
            
          },
        remove(item){
            let idx = this.items.indexOf(item)
            if (idx < 0) return
            this.items.splice(idx,1)
        },
        onItemCahnge(item){
            this.$emit("input",this.items.indexOf(item))

            this.items.forEach(element => { 
              if (element != item){
                element.$emit("changed")
              }
             });
          }
    }

}