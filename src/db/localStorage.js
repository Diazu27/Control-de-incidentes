

export const getUserAuth = ()=>{
    const user = JSON.parse(localStorage.getItem('User'));
    if(user) return user 
    return false;
}

export const LogoutUserAuth = ()=>{
    localStorage.removeItem('User')
}