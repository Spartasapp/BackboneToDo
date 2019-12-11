class ToDoItemModel extends Backbone.Model{
    preinitialize() {}
    defaults(){
        this.title= '',
        this.done = true,
        this.isNotDone = 0
    }
    validate(attrs){
        if (!((attrs.size) > 0)) {
            console.log('Incorrect size');
            return 'Incorrect size';
        }
    }
    toggle(){
        this.save({done: !this.get("done")});
    }
};

class ToDoItemCollection extends Backbone.Collection{
    preinitialize() {}
    initialize(){
        this.model=ToDoItemModel
    }
    done() {
        return this.where({done: true});
      }
    isNotDone() {
        return this.where({done:false });
      }
}

