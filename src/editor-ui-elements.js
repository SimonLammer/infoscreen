var setArgument = function(argumentEditor){    
    currentContainer.view.arguments[this.getArgumentKey(argumentEditor.options.argumentName)] = argumentEditor.textbox[0].value;
}

var getArgumentKey = function(argumentName){
    var moduleType = getModuleTypeByName(currentContainer.view.type);
    return Object.keys(moduleType.inputs).find(function(key){ 
        return moduleType.inputs[key] == argumentName
    });
}

$(function(){
    // label and textbox for one view argument
    $.widget("custom.argumentEditor", {
        options: {
            argumentName: null,
        },
        _create: function(){
            this.label = $("<label>", {
                text: this.options.argumentName
            })
            .appendTo(this.element);
            
            var _this = this;
            this.textbox = $("<input>")
                .on("change", function(){ setArgument(_this); })
                .appendTo(this.element);
            
            setArgument(_this);
        },
        _destroy: function(){
            this.label.remove();
            this.textbox.remove();
        }
    });


});