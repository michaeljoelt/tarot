let deck;
getDeck();

async function getDeck() {
  await fetch('tarot.json')
    .then((response) => response.json())
    .then((data) => {
      deck = data['cards'];
    });
}

document.querySelector('#draw').addEventListener('click', selectCard);

async function selectCard(event) {
  event.preventDefault(); //prevents submit button("Draw") from refreshing page

  // Filter the deck
  const userFilter = getFilter();
  const filteredDeck = deck.filter((card) =>
    userFilter.includes(card.type) || userFilter.includes(card.suit)
      ? true
      : false
  );

  // Returns a random integer based on filteredDeck length
  const randomNumber = Math.floor(Math.random() * filteredDeck.length);
  const card = filteredDeck[randomNumber];

  // Check if card is drawn reversed or not (if filter allows it)
  const isReversed = userFilter.includes('reversals')
    ? Math.floor(Math.random() * 2)
    : 0;

  // Prints all data to console for testing
  console.log(
    `Drawing random card from deck. \n(Filter: ${userFilter} | Deck size: ${
      filteredDeck.length
    }/${deck.length})
        \nCard drawn: ${card.name} ${isReversed ? '(reversed)' : ''}
        \nMeaning: ${card.meaning_up}
        \nReverse Meaning: ${card.meaning_rev}
        \nImage Description: ${card.desc}`
  );
  displayCard(card, isReversed);
  //   Brandon-Schefstad - 06/12
  //   setTimeout(() => {
  //     document
  //       .getElementById('chosenCard')
  //       .scrollIntoView(true, { block: 'start' });
  //   }, 30);
  if (document.getElementById('chosenCard')) {
    document
      .getElementById('chosenCard')
      .scrollIntoView(true, { block: 'center' });
  }
}

function getFilter() {
  let selectedCheckboxes = [];
  let checkboxes = document.querySelectorAll("input[type='checkbox']");
  console.log('************');
  console.log('UPDATING FILTER:');
  console.log('************');
  checkboxes.forEach((checkbox) => {
    if (checkbox.checked) {
      console.log(`${checkbox.name} ON`);
      selectedCheckboxes.push(checkbox.name);
    } else {
      console.log(`${checkbox.name} OFF`);
    }
  });
  console.log('************');
  return selectedCheckboxes;
}

function displayCard(card, isReversed) {
  addCardToDom();

  function addCardToDom() {
    const fragment = document.createDocumentFragment();
    fragment.appendChild(createFrontOfCard());
    fragment.appendChild(createBackOfCard());

    const section = document.querySelector('#drawing');
    section.innerHTML = '';
    section.appendChild(fragment);
    // document.querySelector('div.front').focus();
  }

  function createFrontOfCard() {
    const divFront = document.createElement('div');
    divFront.addEventListener('click', flipCard);
    divFront.addEventListener('keypress', function (e) {
      if (e.key === 'Enter') {
        flipCard(e);
      }
    });

    divFront.classList.add('front');
    divFront.setAttribute('tabindex', '0');
    const heading = document.createElement('h2');
    heading.innerText = isReversed ? `${card.name} (reversed)` : card.name;
    divFront.appendChild(heading);

    const img = document.createElement('img');
    img.setAttribute('id', 'chosenCard');
    img.src = card.image;
    if (isReversed) {
      img.classList.add('reverse');
    }
    divFront.appendChild(img);
    return divFront;
  }

  function createBackOfCard() {
    const divBack = document.createElement('div');
    divBack.classList.add('back');
    divBack.classList.add('hide');
    divBack.setAttribute('tabindex', '0');
    divBack.addEventListener('click', flipCard);
    divBack.addEventListener('keypress', function (e) {
      if (e.key === 'Enter') {
        flipCard(e);
      }
    });
    const paragraph1 = document.createElement('p');
    paragraph1.innerText = `${card.name} Meaning:  \r\n${card.meaning_up}`;
    divBack.appendChild(paragraph1);

    const paragraph2 = document.createElement('p');
    paragraph2.innerText = `Reverse Meaning:  \r\n${card.meaning_rev}`;
    divBack.appendChild(paragraph2);

    const paragraph3 = document.createElement('p');
    paragraph3.innerText = `Image Description: \r\n${card.desc}`;
    divBack.appendChild(paragraph3);

    return divBack;
  }
}

function flipCard(event) {
  console.log('*flipping card*');
  document.querySelector('.back').classList.toggle('hide');
  document.querySelector('.front').classList.toggle('hide');
  if (event.type == 'keypress') {
    // document.querySelector('.cards div:not(.hide)').focus();
  }
}
