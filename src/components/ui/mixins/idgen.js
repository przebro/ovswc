
function Idg(){

    const $this = this
    this._id = 0
    this.NextValue  = function(scope){

        let id = ""
        if (typeof scope === 'string' || scope instanceof String){
            id += scope
        }else{
            id = "vcomp"
        }
        $this._id += 1
        return  id + "-" + $this._id
    }

}

const generator = new Idg()

export default{
    name :"idgen",
    methods: {
        Next: function(scope){
            return generator.NextValue(scope)
        }
    }

}