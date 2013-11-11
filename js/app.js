App = Ember.Application.create();

App.Router.map(function() {
  this.resource('widgets', { path: '/widgets' }, function(){
    this.resource('widget', { path: ':widget_id' });
    this.route('new', { path: 'new' });
    this.route('edit', { path: ':widget_id/edit' });
  });
});

App.WidgetsRoute = Ember.Route.extend({
  model: function() {
           return this.store.find('widget')
         },
  actions: {
             delete: function(model){
                      model.deleteRecord();
                      model.save();
                      this.transitionTo('widgets')
                     }
           }
});

App.WidgetsNewRoute = Ember.Route.extend({
  model: function() {
           return this.store.createRecord('widget')
         },
  actions: {
             create: function(model) {
                       model.save();
                       this.transitionTo('widgets');
                     }
           }

});

App.WidgetsEditRoute = Ember.Route.extend({
  actions: {
             update: function(model) {
                     model.save();
                     this.transitionTo('widget', model);
                   }
           }
});

App.Widget = DS.Model.extend({
  name: DS.attr(),
  description: DS.attr()
});

App.ApplicationAdapter = DS.RESTAdapter.extend({
  host: "http://jackson.local:3000",
});

source = new EventSource('http://jackson.local:3000/widgets/events')
source.addEventListener('message', function(e) {
  widget = $.parseJSON(e.data);
  if(widget.deleted_at) {
    App.Widget.store.find('widget', widget.id).then(function(widget){
      widget.deleteRecord();
    });
  } else {
    App.Widget.store.push('widget', widget);
  }
});
