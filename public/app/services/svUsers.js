var app = angular.module("app.user");
app.factory("svUsers",["$http",function($http){
    return {
        get: function(){
            return $http.get("/api/users");
        },
        create: function(userData){
            return $http.post("/api/users",userData)
        },
        update: function (user){
            return $http.put("/api/users/"+user.id,user)
        },
        delete:function(id){
            return $http.delete("/api/users/"+id);
        }
    }
}]);