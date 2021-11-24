export default{
    name : "themeable",
    data(){
        return {

        
        tvalue : "default"
        }
    },
    methods :{
        getTheme(tp){
            
            let theme = ""
            
            if (tp === 'container'){
                theme += 'ui-container-theme-'+this.tvalue
            }else if (tp === 'item'){
                theme += 'ui-item-theme-'+this.tvalue
            }
            else{
                theme += 'ui-control-theme-'+this.tvalue
            }
            return theme;
        },
        getBackgroundByName(colorName){
            return 'ui-background-'+colorName
        },
        getTextColorByName(colorName){
            return 'ui-text-'+colorName
        }
        
    }
}