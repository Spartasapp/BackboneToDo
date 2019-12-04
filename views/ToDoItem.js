class ToDoItemView extends Backbone.View{
    preinitialize() {
        this.tagName = "li";
        
      }
    initialize(){
        debugger
        this.events= {
            'click .deleteRow':  'deleteRow',
            'click .toggle'   : 'toggleDone'
        }
        this.template = _.template($('#todoItem').html());
        this.listenTo(this.model,'change', this.render);
        this.listenTo(this.model,'destroy', this.remove);
    }

    render(){
        debugger
        let view = this.template(this.model.toJSON());
        this.$el.html(view);
        return this.$el;
    }
    toggleDone(){
        debugger
        this.model.toggle();
        this.$el.toggleClass('done', this.model.get('done'));

      }
    deleteRow(){
        this.model.destroy();
    }
};
