class ListOfToDoItemsView extends Backbone.View{
    preinitialize() {
        debugger
        
      }
    
    initialize(){
        debugger
        this.events= {
            "click .addObject": "addObject",
            "keypress #inpTitle": "createOnEnter"
        }
        this.template = _.template($('#todoContainer').html());
        this.$el.html(this.template());
        this.coll = new ToDoItemCollection();
        // this.footer = this.$(".rocketsTotal");
        this.listenTo(this.coll, "all", this.render);
        this.listenTo(this.coll, "add", this.addOne);

    }

    render(){
        debugger
        // let done = this.coll.done().length;
        // let isNotDone = this.coll.done().length;
        // this.footer.text(this.template({done:done, isNotDone:isNotDone }))
        this.$('.rockets-count').text(this.coll.length);
    }

    addObject(){
        debugger
        this.coll.add({});
    }

    addOne(model){
        debugger
        let title = $("#inpTitle").attr("value");
        model.set({
            title
        });
        let input = $("#inpTitle");
        input.val('');
        let view = new ToDoItemView({ model: model });
        this.$('.rocketsList').append(view.render());

    }
    createOnEnter(e){
        if (e.key === "Enter") {
            let title = $("#inpTitle").attr("value");
            this.coll.create({ title });
            let input = $("#inpTitle");
            input.val('');
        }

    }

};
