const signup = document.getElementById('Signupbtn')
const signModel = document.getElementById('signup-popup')
const submitBtn= document.getElementById('sign-btn')
const logInBtn = document.getElementById('login-btn')
const logModel = document.getElementById('login-popup')
const subBtn = document.getElementById('sub-btn')
const closeBtn = document.getElementById('cancel-icon')
const closeBtnLogin = document.getElementById('cancel-icon-login')

closeBtnLogin.addEventListener('click',function(){
    console.log('close button clicked!')
    logModel.style.display = "none"
   
})
closeBtn.addEventListener('click',function(){
    console.log('close button clicked!')
    signModel.style.display = "none"
   
})

logInBtn.addEventListener('click',function(){
    console.log('log in btn clicked ! ')
    logModel.style.display = "block"
})
signup.addEventListener('click', function () {
    signModel.style.display = "block"
 document.body.classList.toggle('opacity-effect');
 console.log('sign up clicked!',password,email)
});
subBtn.addEventListener('click',async function(){
    event.preventDefault();
const email = document.getElementById('semail').value
const password = document.getElementById('spassword').value
const response = await fetch('https://gym-log-v2.onrender.com/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
    });
    if(response.ok){
        const data = await response.json()
        console.log(data)
        const id = data.data.user._id
        function redirect(url){
            window.location.href = `https://gym-log-v2.onrender.com/${url}`;
            console.log('redirect')
        }
        redirect(id)
       
    }

})


submitBtn.addEventListener('click', async function () {
    event.preventDefault();
const name = document.getElementById('name').value
const email = document.getElementById('email').value
const password = document.getElementById('password').value
    console.log(name,email,password)
    console.log('user in client side registered!')
    const response = await fetch('https://gym-log-v2.onrender.com/signUp', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
    });

    if(response.ok){
        const data = await response.json()
        console.log(data)
        const id = data.data.user._id
        function redirect(url){
            window.location.href = `https://gym-log-v2.onrender.com/${url}`;
            console.log('redirect')
        }
        redirect(id)
       
    }
        
   

    });

 