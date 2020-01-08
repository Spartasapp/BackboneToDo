class StatusItem extends Backbone.View {
    preinitialize() {}
    initialize() {
        debugger
        // this.events = {
        //     'click .deleteRow'         : 'deleteRow',
        //     "click .toggle"            : 'toggleDone',
        //     'click .title'             : 'changeTitle',
        //     'blur .changeTitle'        : 'removeEditClass',
        //     'keypress .changeTitle'    : 'onEnter',
        //     'dragstart .addItem'       : 'onDragViewFrom',
        //     'dragover .addItem'        : 'onDragView',
        //     'drop .addItem'            : 'onDragViewTo',
        // }
        this.template = _.template($('#status').html());
        this.listenTo(this.model, 'change', this.render);
    }
    render() {
        debugger
        let view = this.template({done: this.model.get("done")});
        this.$el.html(view);
        return this.$el;
    }
}