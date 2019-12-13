class ListOfToDoItemsView extends Backbone.View{
    preinitialize() {
        
        
      }
    
    initialize(){
        this.events= {
            "click .addObject": "addObject",
            "keypress #inpTitle": "createOnEnter"
        }
        this.coll = new ToDoItemCollection();
        this.template = _.template($('#stats').html());
        // this.$el.html(this.template());
        
        this.footer = this.$(".rocketsTotal");
        this.listenTo(this.coll, "all", this.render);
        this.listenTo(this.coll, "add", this.addOne);

    }

    render(){
        let done = this.coll.done().length;
        let isNotDone = this.coll.length-done;
        this.footer.html(this.template({done:done, isNotDone:isNotDone }))
        // this.$('.rockets-count').text(this.coll.length);

    }

    addObject(){
        let title = $("#inpTitle").attr("value");
        if(!title.length){
            return false
        }
        this.coll.add({});
    }

    addOne(model){
        debugger
        let nextId = 0;
        let title = $("#inpTitle").attr("value");
        if(!title.length){
            return false
        }
        model.set({
            title,
            id: nextId++
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
