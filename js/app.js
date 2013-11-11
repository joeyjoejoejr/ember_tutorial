App = Ember.Application.create();

App.Router.map(function() {
  this.resource('widgets', { path: '/widgets' }, function(){
    this.resource('widget', { path: ':widget_id' });
    this.route('new', { path: 'new' });
  });
});

App.WidgetsRoute = Ember.Route.extend({
  model: function() {
           return this.store.find('widget')
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

App.Widget = DS.Model.extend({
  name: DS.attr(),
  description: DS.attr()
});

App.ApplicationAdapter = DS.RESTAdapter.extend({
  host: "http://jackson.local:3000",
});
