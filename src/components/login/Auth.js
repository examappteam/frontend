class Auth{
    constructor(){
        this.studentAuthenticated = false;
    }

setAuthenticatedUser(studentUser){
sessionStorage.setItem('studentAuthenticated',studentUser);

}
setAuthenticatedTeacher(teacherUser){
    sessionStorage.setItem('teacherAuthenticated',teacherUser);
    
    }

logOutAuthentication(){
    sessionStorage.removeItem('teacherAuthenticated');
    sessionStorage.removeItem('studentAuthenticated');
    
}

    studentIsAuthenticated(){
        this.studentAuthenticated = sessionStorage.getItem('studentAuthenticated');
        
        
        return sessionStorage.getItem('studentAuthenticated');
    }
    
    teacherIsAuthenticated(){
        this.studentAuthenticated = sessionStorage.getItem('teacherAuthenticated');
        
        
        return sessionStorage.getItem('teacherAuthenticated');
    }

}
export default new Auth();