class ListOfToDoItemsView extends Backbone.View{
    preinitialize() {
        
        
      }
    
    initialize(){
        this.events= {
            "click .addObject"          : "addObject",
            "keypress #inpTitle"        : "createOnEnter",
            'dragstart .addItem'        : 'onDragViewFrom',
            'dragover .addItem'         : 'onDragView',
            'drop .addItem'             : 'onDragViewTo'
        }
        this.coll = new ToDoItemCollection();
        this.template = _.template($('#stats').html());   
        this.footer = this.$(".rocketsTotal");
        this.listenTo(this.coll, "all", this.render);
        this.listenTo(this.coll, "add", this.addOne);

    }

    render(){
        let done = this.coll.done().length;
        let isNotDone = this.coll.length-done;
        this.footer.html(this.template({done:done, isNotDone:isNotDone }));
        return this;
    }

    addObject(){
        let title = $("#inpTitle").attr("value");
        if(!title.length){
            return false
        }
        this.coll.add({});
    }

    addOne(model){
        let title = $("#inpTitle").attr("value");
        if(!title.length){
            return false
        }
        
        model.set({
            title,
            id: this.coll.length-1
            
        });
        let input = $("#inpTitle");
        input.val('');
        let view = new ToDoItemView({ model: model });
        this.$('.rocketsList').append(view.render());
        let statusView = new StatusItem({model});
        this.$('.rocketsList').append(statusView.render());

    }
    createOnEnter(e){
        if (e.key === "Enter") {
            let title = $("#inpTitle").attr("value");
            this.coll.create({ title });
            let input = $("#inpTitle");
            input.val('');
        }

    }
    onDragViewFrom(e){
        let draggableObjId = e.currentTarget.id;
        let model = this.coll.findWhere({id:Number(draggableObjId)});
        model.drag = 'y';
    //     for(let i=0;i<parentNode.children.length;i++){
    //         if(parentNode.children[i]!==draggableItem){
    //         parentNode.children[i].addEventListener('dragover',(e)=>{e.preventDefault();});
    //         let somthFunc = (e)=>{
    //             debugger
    //             let replacebleobj = e.currentTarget;
    //             clone = replacebleobj;
    //         }
    //         parentNode.children[i].addEventListener('drop',somthFunc);
    //         parentNode.children[i].removeEventListener('dragover',(e)=>{e.preventDefault();});
    //         parentNode.children[i].removeEventListener('drop',somthFunc);

    //        }
    //    }
       
       console.log('1111')
     }
     onDragView(e){
         e.preventDefault();
     }
    onDragViewTo(e){
        debugger
         let findDraggableModel = this.coll.models.filter(el=>{
             return el.drag === 'y';
         });
         
         let findReplaceableModel = this.coll.models.filter(el=>{
             return el.id === Number(e.currentTarget.id);
         });

        //  let findRemainingModel = this.coll.models.filter(el=>{
        //      return el.drag !== 'y';
        //  });
         let findIndexDraggableobj = this.coll.models.findIndex((el,i)=>{
             return i == findDraggableModel[0].id;
         })
         let findIndexReplaceableobj = this.coll.models.findIndex((el,i)=>{
             return i == e.currentTarget.id;
         })
         let draggableObj = findDraggableModel[0];
         delete draggableObj.drag;
         this.coll.remove(draggableObj.id);
         this.coll.remove(findReplaceableModel[0].id);
         this.coll.add(findDraggableModel,{at:findIndexReplaceableobj});
         this.coll.add(findReplaceableModel,{at:findIndexDraggableobj});
         this.render();
         console.log('222');
     }
     

};
