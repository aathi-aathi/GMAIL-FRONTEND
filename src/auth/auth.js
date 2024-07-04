const backendURL = import.meta.env.VITE_BACKEND_URL

const postData =async(userData)=>{
    const response = await fetch(`${backendURL}/user`,{
        method:"POST",
        body:JSON.stringify(userData),
        headers:{
        "Content-Type":"application/json; charset=utf-8"
    }
}) 
    return await response.json()
}

const userLogin =async(userData)=>{
    const response = await fetch(`${backendURL}/login`,{
        method:"POST",
        body:JSON.stringify(userData),
        headers:{
        "Content-Type":"application/json; charset=utf-8"
    }

    }) 
    return await response.json()
}

const forgotPassword = async(userData)=>{
    const response = await fetch(`${backendURL}/forgot-password`,{
        method:"POST",
        body:JSON.stringify(userData),
        headers:{
        "Content-Type":"application/json; charset=utf-8"
    }
    })
    return await response.json()
}

const resetpassword = async(token,password)=>{
    const response = await fetch(`${backendURL}/reset-password`,{
     method:"POST",
     body:JSON.stringify({
         token,
         password
     }),
     headers:{
          "Content-Type":"application/json; charset=utf-8"
     }
    })
    return await response.json()
 }

 const mailSent =async(userData)=>{
    const response = await fetch(`${backendURL}/mail-sent`,{
        method:"POST",
        body:JSON.stringify(userData),
        headers:{
        "Content-Type":"application/json; charset=utf-8"
    }

    }) 
    return await response.json()
}

const  mailurl=`${backendURL}/mails`;
const getMails = async(userData)=>{
    const response = await fetch(`${mailurl}/${userData}`,{
        headers:{  "Authorization": localStorage.getItem("token"),}
      
    })
     return await response.json()
}

const trashMails = async(userData)=>{
    const response = await fetch(`${backendURL}/trash`,{
        method:"PUT",
        body:JSON.stringify(userData),
        headers:{
        "Content-Type":"application/json; charset=utf-8"
    }
    })
     return await response.json()
}

const moveMails = async(userData)=>{
    const response = await fetch(`${backendURL}/move-to-inbox`,{
        method:"PUT",
        body:JSON.stringify(userData),
        headers:{
        "Content-Type":"application/json; charset=utf-8"
    }
    })
     return await response.json()
}

const deleteMails = async(userData)=>{
    const response = await fetch(`${backendURL}/delete-mail`,{
        method:"PUT",
        body:JSON.stringify(userData),
        headers:{
        "Content-Type":"application/json; charset=utf-8"
    }
    })
     return await response.json()
}

const draftMails =async(userData)=>{
    const response = await fetch(`${backendURL}/draft`,{
        method:"POST",
        body:JSON.stringify(userData),
        headers:{
        "Content-Type":"application/json; charset=utf-8"
    }

    }) 
    return await response.json()
}

const starredMails = async(userData)=>{
    const response = await fetch(`${backendURL}/starred`,{
        method:"PUT",
        body:JSON.stringify(userData),
        headers:{
        "Content-Type":"application/json; charset=utf-8"
    }
    })
     return await response.json()
}

const unstarMails = async(userData)=>{
    const response = await fetch(`${backendURL}/unstar`,{
        method:"PUT",
        body:JSON.stringify(userData),
        headers:{
        "Content-Type":"application/json; charset=utf-8"
    }
    })
     return await response.json()
}

export {
    postData,
    userLogin,
    forgotPassword,
    resetpassword,
    mailSent,
    getMails,
    trashMails,
    moveMails,
    deleteMails,
    draftMails,
    starredMails,
    unstarMails
}