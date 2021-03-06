function SchoolLeaderController($scope, SchoolLeader,Department, Pagination, $timeout, $rootScope,$injector){
  $injector.invoke(BasicController, this, {$scope: $scope});

  $scope.resource = SchoolLeader
  $scope.searchOptions.fields = ['name']
  $scope.editView ="views/basicdata/schoolLeader/edit.html"
  $scope.topEditView ="views/basicdata/topEditView.html"
  $scope.topNaviBar ="views/basicdata/schoolLeader/naviBar.html"
  $scope.isQuery = false
  $scope.isManage = true
  $scope.itemName = '学校领导'
  $scope.options = {}

  Department.getAll(function(result){
    $scope.options = {
      departments : result.entities
    }
  })

  // profile
  $scope.profileFields = [
    {name: "username", title: "用户名", readonly:true},
    {name: "emp_id", title: "工号", readonly:true},
    {name: "staffname", title: "姓名", creatable:true,required:true},
    {name: "phone", title: "手机号", creatable:true,required:true},
    {name: "departmentname", title: "部门",hide:true ,creatable:true}
  ]

  $scope.checkDuplication = function(callback){
    if(!$scope.entity.emp_id) return;
    SchoolLeader.checkDuplication({ emp_id : $scope.entity.emp_id,sid:$scope.entity.id},function(result){
      if(result.message === 'not exist'){
        $scope.Duplication = "";
        if(callback){
          callback();
        }
      }else{
        $scope.entity.emp_id = "";
        $scope.Duplication = "工号已存在！请重新输入。";
      }
    });
  }

  $scope.setPSNID = function(entity){
    $rootScope.psnID = entity.userid;
    console.log("entity.$rootScope.psnID:",$rootScope.psnID)
  }

}