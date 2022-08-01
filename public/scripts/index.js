
function discard(){
    let collection = document.getElementById('collection');
    let description = document.getElementById('description')
    let coverpage = document.getElementById('coverpage')
    let thumbnail = document.getElementById('thumbnail')

    thumbnail.value = coverpage.value= description.value = collection.value= ''
  }

  function deleteCollection (id){
      console.log(id)
  }

function handleLogin  () {
    try {
       fetch('/session/init',{
            method:'POST',
            headers:{
                "Content-type": "application/x-www-form-urlencoded; charset=UTF-8",
                
            },
            body:`email=${document.getElementById('email').value}&password=${document.getElementById('password').value}`
        })
        .then(response => {
           response.json().then(res => {
                if (res.msg ==='Email o contraseña invalidos') {
                    const div = document.getElementById('errorLogin')
                    div.innerHTML = '<h1 class="text-2xl font-bold text-red-600">Email o contraseña invalidos</h1>'
                }else{
                    
                }
           })
        })
    } catch (error) {
        
    }
}

async function  handleRegister  ()  {
    try {
      await fetch('/session/register',{
            method:'POST',
            headers:{
                "Content-type": "application/x-www-form-urlencoded; charset=UTF-8",
                
            },
            body:`email=${document.getElementById('email').value}&password=${document.getElementById('password').value}`
        })
        .then(response => {
          response.json()
          .then(res => {
            if(res.msg === 'Usuario ya registrado'){
                const div = document.getElementById('errorRegister')
                div.innerHTML = '<h1 class="text-2xl font-bold text-red-600">Usuario ya registrado</h1>'
            }else if (res.msg === 'DONE') {
                const div = document.getElementById('errorRegister')
                div.innerHTML = '<h1 class="text-2xl font-bold text-green-600">Usuario registrado exitosamente</h1>'
            
            }
            
          })
          
        })
        .catch(err =>console.log(err))
    } catch (error) {
        
    }
}