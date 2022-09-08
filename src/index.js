let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});

const divToyCollection = document.querySelector('#toy-collection');

const form = document.querySelector('.add-toy-form');
form.addEventListener('submit', handleSubmit)

function handleSubmit(e){
  e.preventDefault();

  const toyObject = {
      name: e.target.input1.value,
      image: e.target.input2.value,
      likes: 0
  }

 // console.log(e.target.input2.value)
  // const toyObject = {
  // console.log(e.target.input[0])

  // }
    postToyFromSubmit(toyObject)
}

function postToyFromSubmit(toyObject){
  fetch('http://localhost:3000/toys', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(toyObject)
  })
  .then(resp=>resp.JSON)
  //.then(data=>console.log(data))

};


function patchLikes(toyObject){
  fetch(`http://localhost:3000/toys/${toyObject.id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(toyObject)
  })
  .then(resp=>resp.json())
  .then(data=>console.log(data))
};

function loadAnimals (){
fetch('http://localhost:3000/toys')
.then(resp=>resp.json())
.then(data=>{
  data.forEach(element=>{
    const div = document.createElement('div');
    div.className='card'
    const h2 = document.createElement('h2');
    const img = document.createElement('img');
    let pTag = document.createElement('p');
    const bttn = document.createElement('button');
    
    h2.innerText = element.name;
    img.src = element.image;
    img.className = 'toy-avatar'
    pTag.innerText = `${element.likes} Likes`;
    bttn.className = 'like-btn';
    bttn.setAttribute('id', `${element.id}`);
    bttn.innerText = 'Like ❤️'

    divToyCollection.appendChild(div);
    div.appendChild(h2);
    div.appendChild(img);
    div.appendChild(pTag);
    div.appendChild(bttn);


    bttn.addEventListener('click', ()=>{
      element.likes+=1
      pTag.innerText=`${element.likes} Likes`

    patchLikes(element);
      

    }
    )})})}

function start(){
  loadAnimals();
 
}

start();