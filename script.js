"use strict";

//State festlegen
const state = {
  contacts: [],
};

//Hilfsfunktion, um eine Id pro contactData zu generieren
function guidGenerator() {
  var S4 = function () {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
  };
  return (
    S4() +
    S4() +
    "-" +
    S4() +
    "-" +
    S4() +
    "-" +
    S4() +
    "-" +
    S4() +
    S4() +
    S4()
  );
}

async function getContactsFromApi() {
  //https://dummy-apis.netlify.app/api/contact-suggestions?count=8
  //Daten laden
  const response = await fetch(
    "https://dummy-apis.netlify.app/api/contact-suggestions?count=8"
  );
  const jsonData = await response.json();
  state.contacts = jsonData.map((contactData) => {
    return {
      ...contactData,
      id: guidGenerator(),
    };
  });
  render();
  console.table(state.contacts);
}

function generateContactCard(contactData) {
  const li = document.createElement("li");
  li.className = "contact-list__person";
  //li.style.backgroundImage = "url(" + contactData.backgroundImage + ")";

  const imgContainer = document.createElement("div");
  imgContainer.className = "contact-list__img-container";
  imgContainer.style.backgroundImage =
    "url(" + contactData.backgroundImage + ")";

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

    //Angeklickten Kontakt entfernen
    state.contacts = state.contacts.filter((contactEntryFromState) => {
      return contactEntryFromState.id !== contactData.id;
    });

    //State aktualisieren
    render();
    console.table(state.contacts);

    //Neu generierten Kontakt dafür einsetzen
    state.contacts.push(newPerson);
    render();
    console.table(state.contacts);
  });

  li.append(
    imgContainer,
    contactImg,
    h2name,
    h5jobTitle,
    pConnections,
    connectBtn,
    closeBtn
  );

  return li;
}

function render() {
  const contactList = document.querySelector(".contact-list");
  contactList.innerHTML = "";

  state.contacts.forEach((contactData, index) => {
    contactList.appendChild(generateContactCard(contactData, index));
  });
}

getContactsFromApi();

/*
<li class="contact-list__person">
    <img src="https://randomuser.me/api/portraits/men/27.jpg" alt="" class="contact-list__img">
    <h2 class="contact-list__name">Mr. Jeremy Pearson</h2>
    <h5 class="contact-list__job-title">Fullstack Developer</h5>
    <p class="contact-list__connections">Mutual Connections: 10</p>
    <button class="contact-list__btn-connect">Connect</button>
    <button class="contact-list__btn-close">X</button>
</li>
*/
