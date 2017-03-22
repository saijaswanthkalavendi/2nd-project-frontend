var app = angular.module("myApp", ["ngRoute","ngCookies","blogapp","jobApp"])
.run(run);
app.config(function($routeProvider,$locationProvider) {
	
    $routeProvider
    .when("/", {
        templateUrl : "viewblog.html",
    
    })
     
    .when("/home", {
        templateUrl : "Home.html",
        controller:'LoginController',
    	controllerAs:'vm'
    })
    .when("/blog", {
        templateUrl : "Blog/blog.html",
        controller :'blogctrl'
       
    })
    .when("/viewblog", {
        templateUrl : "Blog/viewblog.html",
        controller :'blogctrl'
       
    })
    .when("/forum", {
        templateUrl : "Forum/Forum.html",
        controller :  'forumctrl'
   
    })
     .when("/viewforum", {
        templateUrl : "Forum/viewforum.html",
        controller :'forumctrl'
       
    })
    .when("/register",{
    	templateUrl: "Users/register.html",
    	controller: "userctrl"
    })
    .when("/login",{
    	templateUrl:"Login/Login.html",
    	controller:'LoginController',
    	controllerAs:'vm'
    })
    .when("/users",{
    	templateUrl: "Friend/AllUsers.html",
    	controller:'alluserctrl'
    })
    .when("/chat",{
    	templateUrl: "Chat/chat.html",
    	controller: "chatController",
    })
    .when("/jobs",{
    	templateUrl: "Job/CreateJob.html",
    	controller: "jobctrl"
    })
    .when("/applyjob",{
    	templateUrl: "Job/ViewJob.html",
    	controller: "jobctrl"
    })
    .when("/individualforum",{
    	templateUrl: "Forum/IndividualForum.html",
	controller: "commentctrl"
    })
    .when("/myprofile",{
    	templateUrl: "Users/UserProfile.html",
    	controller: "userctrl"
    })
    .when("/myfriends",{
    	templateUrl: "Friend/MyFriends.html",
    	controller: "myfriendctrl"
    })
    .when("/newrequests",{
    	templateUrl: "Friend/newrequests.html",
    	controller: "myfriendctrl"
    })
    .when("/admin",{
    	templateUrl: "Admin/admin.html",
    	controller: "adminctrl"
    });
    console.log("route");    });
run.$inject = ['$rootScope', '$location', '$cookieStore', '$http'];
function run($rootScope, $location, $cookieStore, $http) {
    // keep user logged in after page refresh
    $rootScope.globals = $cookieStore.get('globals') || {};
    $rootScope.currentuser = $cookieStore.get('currentuser') || {};
    if ($rootScope.globals.currentUser) {
        $http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.globals.currentUser.authdata; // jshint ignore:line
    }

    $rootScope.$on('$locationChangeStart', function (event, next, current) {
        // redirect to login page if not logged in and trying to access a restricted page
        var restrictedPage = $.inArray($location.path(), ['/login', '/register','/home','/viewblog','/viewforum']) === -1;
        var adminPage = $.inArray($location.path(),['/admin']) === 1;
        var role=$rootScope.currentuser.role;
        var loggedIn = $rootScope.globals.currentUser;
        if (restrictedPage && !loggedIn) {
            $location.path('/login');
        }else if(adminPage && !loggedIn){
        	$location.path('/login');
        }
    });
}