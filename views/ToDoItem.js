class ToDoItemView extends Backbone.View {
    preinitialize() {
        this.tagName = "li";

    }
    initialize() {
        this.events = {
            'click .deleteRow'         : 'deleteRow',
            'click .toggle'            : 'toggleDone',
            'click .title'             : 'changeTitle',
            'blur .changeTitle'        : 'removeEditClass',
            'keypress .changeTitle'    : 'onEnter',
            'dragstart .addItem'         : 'onDragViewFrom',
            'dragover .addItem'        : 'onDragView',
            'drop .addItem'            : 'onDragViewTo',
        }
        this.template = _.template($('#todoItem').html());
        this.listenTo(this.model, 'change', this.render);
        this.listenTo(this.model, 'destroy', this.remove);
    }

    render() {
        let view = this.template(this.model.toJSON());
        this.$el.html(view);
        return this.$el;
    }
    toggleDone() {
        this.model.toggle();
        this.$('li').toggleClass('done', this.model.get('done'));

    }
    deleteRow() {
        this.model.destroy();
    }
    changeTitle() {
        this.$('.changeTaskStatus').addClass('editing');
        $('.changeTitle').focus();
    }
    removeEditClass() {
        this.$('.changeTaskStatus').removeClass('editing');
        let title = $('.changeTitle').attr('value');
        this.model.set('title', title)
    }
    onEnter(e) {
        if (e.key === "Enter") {
            this.$('.changeTaskStatus').removeClass('editing');
            let title = $('.changeTitle').attr('value');
            this.model.set('title', title)
        }
    }
    onDragViewFrom(e){
        
        let obj = e.currentTarget;
        let posX = e.pageX;
        let posY = e.pageY;
        console.log(e.pageX,  e.pageY)
    }
    onDragView(e){
       
        e.preventDefault();
    }
    onDragViewTo(e){
        debugger
        let obj = e.currentTarget;
    }
};
