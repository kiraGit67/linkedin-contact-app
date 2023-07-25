"use strict";

//State festlegen
const state = {
  contacts: [],
};

async function getContactsFromApi() {
  //https://dummy-apis.netlify.app/api/contact-suggestions?count=8
  //Daten laden
  const response = await fetch(
    "https://dummy-apis.netlify.app/api/contact-suggestions?count=8"
  );
  const jsonData = await response.json();
  state.contacts = jsonData;
  render();
  console.log(jsonData);
}

function generateContactCard(contactData, cardIndex) {
  const li = document.createElement("li");
  li.style.backgroundImage = "url(" + contactData.backgroundImage + ")";

  const contactImg = document.createElement("img");
  contactImg.className = "contact-list__img";
  contactImg.src = contactData.picture;
  contactImg.alt =
    contactData.name.first +
    " " +
    contactData.name.last +
    ", " +
    contactData.title;

  const h2name = document.createElement("h2");
  h2name.className = "contact-list__name";
  h2name.innerText =
    contactData.name.title +
    " " +
    contactData.name.first +
    " " +
    contactData.name.last;

  const h5jobTitle = document.createElement("h5");
  h5jobTitle.className = "contact-list__job-title";
  h5jobTitle.innerText = contactData.title;

  const pConnections = document.createElement("p");
  pConnections.className = "contact-list__connections";
  pConnections.innerText =
    "Mutual Connections: " + contactData.mutualConnections;

  const connectBtn = document.createElement("button");
  connectBtn.className = "contact-list__btn-connect";
  connectBtn.innerText = "Connect";

  const closeBtn = document.createElement("button");
  closeBtn.className = "contact-list__btn-close";
  closeBtn.innerText = "X";

  closeBtn.addEventListener("click", async () => {
    //Neue Person von der API laden
    const response = await fetch(
      "https://dummy-apis.netlify.app/api/contact-suggestions?count=1"
    );
    const jsonData = await response.json();
    const newPerson = jsonData[0];
    console.log(newPerson);
    console.log("Clicked Card Item: " + cardIndex);
    console.log(state.contacts[cardIndex]);
    //State aktualisieren
    //Angeklickten Kontakt entfernen
    //Neu generierten Kontakt dafür einsetzen
  });

  li.append(contactImg, h2name, h5jobTitle, pConnections, connectBtn, closeBtn);

  return li;
}

function render() {
  const contactList = document.querySelector(".contact-list");

  state.contacts.forEach((contactData, index) => {
    contactList.appendChild(generateContactCard(contactData, index));
  });
}

getContactsFromApi();

/*
<li>
    <img src="https://randomuser.me/api/portraits/men/27.jpg" alt="" class="contact-list__img">
    <h2 class="contact-list__name">Mr. Jeremy Pearson</h2>
    <h5 class="contact-list__job-title">Fullstack Developer</h5>
    <p class="contact-list__connections">Mutual Connections: 10</p>
    <button class="contact-list__btn-connect">Connect</button>
    <button class="contact-list__btn-close">X</button>
</li>
*/
