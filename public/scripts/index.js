
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
