var app = angular.module("app.user",[]);

app.controller("userController",['$scope','svUsers',function ($scope,svUsers){
    $scope.users = [];
    $scope.formData = {};
    $scope.loading = true;
    $scope.isEdit = false;
    $scope.editForm={};
    svUsers.get().then(function(response){
        $scope.users = response.data;
        $scope.loading = false;
    });
    $scope.createUser = function(){
        var user = {
            name: $scope.formData.name,
            username: $scope.formData.username,
            password: $scope.formData.password,
            admin: 1,
            isDone: false
        }
        svUsers.create(user).then(function(response){
            $scope.loading=true;
            $scope.users=response.data;
            $scope.formData.name="";
            $scope.formData.username="";
            $scope.formData.password="";
            $scope.loading=false;
        })    
    }
    $scope.deleteUser = function(user){
        $scope.loading=true;
        svUsers.delete(user._id).then(function(response){
            $scope.users=response.data;
            $scope.loading=false;
        })
    }
    $scope.editUser = function(user){
        $scope.isEdit = true;
        $scope.editForm.id = user._id;
        $scope.editForm.username = user.username;
        $scope.editForm.name = user.name;
    }

    $scope.CancelEdit = function(){
        $scope.isEdit = false;
        $scope.editForm.username = ""
        $scope.editForm.name = ""
    };

    $scope.updateUser = function(){
        var user = {
            id: $scope.editForm.id,
            name: $scope.editForm.name,
            username: $scope.editForm.username,
        }
        $scope.loading=true;
        svUsers.update(user).then(function(response){
            $scope.users=response.data;
            $scope.loading=false;
            $scope.isEdit = false;
            $scope.editForm.id = ""
            $scope.editForm.username = ""
            $scope.editForm.name = ""
        })
    }
}])