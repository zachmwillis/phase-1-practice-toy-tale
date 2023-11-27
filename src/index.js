let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const toyCollection = document.getElementById("toy-collection");
  const toyForm = document.querySelector(".add-toy-form");

  function fetchToys() {
    fetch("http://localhost:3000/toys")
      .then((response) => response.json())
      .then((toys) => {
        toys.forEach((toy) => {
          showToy(toy);
        });
      });
  }

  function showToy(toy) {
    const toyPic = document.createElement("div");
    toyPic.className = "card";
    const h2 = document.createElement("h2");
    h2.textContent = toy.name;
    const img = document.createElement("img");
    img.src = toy.image;
    img.className = "toy-avatar";
    const p = document.createElement("p");
    p.textContent = `${toy.likes} likes`;
    const likeButton = document.createElement("button");
    likeButton.className = "like-btn";
    likeButton.textContent = "Like";
    likeButton.addEventListener("click", () => likeToy(toy));
    toyPic.appendChild(h2);
    toyPic.appendChild(img);
    toyPic.appendChild(p);
    toyPic.appendChild(likeButton);
    toyCollection.appendChild(toyPic);
  }

  toyForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const name = event.target.name.value;
    const pic = event.target.image.value;

    const newToy = {
      name: name,
      image: pic,
      likes: 0,
    };
    post(newToy);
  });

  function likeToy(toy) {
    const updatedLikes = toy.likes + 1;
    const updatedToy = { likes: updatedLikes };
    fetch(`http://localhost:3000/toys/${toy.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(updatedToy),
    })
      .then((response) => response.json())
      .then((updatedToy) => {
        const toyCards = document.querySelectorAll('.card');
        toyCards.forEach((card) => {
          if (card.querySelector("h2").textContent === toy.name) {
            card.querySelector("p").textContent = `${updatedToy.likes} likes`;
          }
        });
      });
  }

  function post(newToy) {
    fetch("http://localhost:3000/toys", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(newToy),
    })
      .then((response) => response.json())
      .then((toy) => {
        showToy(toy);
        toyForm.reset();
      });
  }

  fetchToys();
});