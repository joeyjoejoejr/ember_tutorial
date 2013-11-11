App = Ember.Application.create();

App.Router.map(function() {
  this.resource('widgets', { path: '/widgets' }, function(){
  });
});

App.WidgetsRoute = Ember.Route.extend({
  model: function() {
           return this.store.find('widget')
         }
});

App.Widget = DS.Model.extend({
  name: DS.attr(),
  description: DS.attr()
});

App.ApplicationAdapter = DS.RESTAdapter.extend({
  host: "http://jackson.local:3000"
});
