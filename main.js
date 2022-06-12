let simplytarot; 
getDeck();

async function getDeck() {
            await fetch('tarot.json').then(response => response.json()).then( (data) => {simplytarot =  data}  )
}


let isFront = 0

document.querySelector("#draw").addEventListener('click', selectCard)

function selectCard() {
    // Returns a random integer from 0 to 77:
    const randomNumber = Math.floor(Math.random() * 78);
    const card = simplytarot["cards"][randomNumber]

    console.log(card.name)
    console.log(card.meaning_rev)

    displayCard(card)
}

function displayCard(card) {
    const isReversed = Math.floor(Math.random() * 2)
    console.log(`Reversed: ${Boolean(isReversed)}`)

    const divFront = document.createElement('div')
    divFront.addEventListener('click', flipCard)
    divFront.addEventListener('keypress', function (e) {
        if (e.key === 'Enter') {
            flipCard(e)
        }
    })
    isFront = 1
    divFront.classList.add("front")
    divFront.setAttribute("tabindex", "0")
    const heading = document.createElement('h2')
    heading.innerText = isReversed ? `${card.name} (reversed)` : card.name
    divFront.appendChild(heading)

    const img = document.createElement('img')
    img.src = card.image
    if (isReversed) {
        img.classList.add("reverse")
    }
    divFront.appendChild(img)

    const divBack = document.createElement('div')
    divBack.classList.add("back");
    divBack.classList.add("hide");
    divBack.setAttribute("tabindex", "0")
    divBack.addEventListener('click', flipCard)
    divBack.addEventListener('keypress', function (e) {
        if (e.key === 'Enter') {
            flipCard(e)
        }
    })

    const paragraph1 = document.createElement('p')
    paragraph1.innerText = `${card.name} Meaning:  \r\n${card.meaning_up}`
    divBack.appendChild(paragraph1)

    const paragraph2 = document.createElement('p')
    paragraph2.innerText = `Reverse Meaning:  \r\n${card.meaning_rev}`
    divBack.appendChild(paragraph2)

    const paragraph3 = document.createElement('p')
    paragraph3.innerText = `Image Description: \r\n${card.desc}`
    divBack.appendChild(paragraph3)

    const fragment = document.createDocumentFragment()
    fragment.appendChild(divFront)
    fragment.appendChild(divBack)

    const section = document.querySelector("#drawing")
    section.innerHTML = ""
    section.appendChild(fragment)

    divFront.focus()
}

function flipCard(event) {
    console.log("flipping")
    isFront = isFront ? 0 : 1

    document.querySelector('.back').classList.toggle("hide")
    document.querySelector('.front').classList.toggle("hide")

    console.log(`isFront: ${isFront}`)
    if (event.type == 'keypress') {
        document.querySelector('div:not(.hide)').focus()
    }
}



