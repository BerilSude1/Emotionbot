//metin animasyonlarını decode et (emotionbot)
function decodeText() {
    var text = document.getElementsByClassName('decode-text')[0];
    var state = [];

    //child elementlerin durumlarını sınıfla
    for (var i = 0, j = text.children.length; i < j; i++) {
        text.children[i].classList.remove('state-1', 'state-2', 'state-3');
        state[i] = i;
    }

    var shuffled = shuffle(state);

    //animasyon başlat
    for (var i = 0, j = shuffled.length; i < j; i++) {
        var child = text.children[shuffled[i]];
        classes = child.classList;
        var state1Time = Math.round(Math.random() * (2000 - 300)) + 50;
        if (classes.contains('text-animation')) {
            setTimeout(firstStages.bind(null, child), state1Time);
        }
    }
}

//animasyon
function firstStages(child) {
    if (child.classList.contains('state-2')) {
        child.classList.add('state-3');
    } else if (child.classList.contains('state-1')) {
        child.classList.add('state-2')
    } else if (!child.classList.contains('state-1')) {
        child.classList.add('state-1');
        setTimeout(secondStages.bind(null, child), 100);
    }
}

//ikinci animasyon
function secondStages(child) {
    if (child.classList.contains('state-1')) {
        child.classList.add('state-2')
        setTimeout(thirdStages.bind(null, child), 100);
    } else if (!child.classList.contains('state-1')) {
        child.classList.add('state-1')
    }
}

//üçüncü animasyon
function thirdStages(child) {
    if (child.classList.contains('state-2')) {
        child.classList.add('state-3')
    }
}

function shuffle(array) {
    var currentIndex = array.length,
        temporaryValue, randomIndex;
    while (0 !== currentIndex) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}

//başlat: animasyon (emotionbot)
decodeText();
setInterval(function () { decodeText(); }, 6000);

// beş tane arka plan dizisi
const backgrounds = [
    "url('static/images/background1.gif')",
    "url('static/images/background2.gif')",
    "url('static/images/background3.gif')",
    "url('static/images/background4.gif')",
    "url('static/images/background5.jpg')",
];

// sayfa yüklendiğinde rastgele bir arka plan seçmek için oluşturulan fonksiyon
function setRandomBackground() {
    const randomIndex = Math.floor(Math.random() * backgrounds.length);
    document.body.style.backgroundImage = backgrounds[randomIndex];
}

// arka planları sırayla değiştirmek için
let currentIndex = 0;
function rotateBackground() {
    if (!currentEmotion) { // Eğer kullanıcı bir duygu girmediyse, rastgele arka plan değişsin
        document.body.style.backgroundImage = backgrounds[currentIndex];
        currentIndex = (currentIndex + 1) % backgrounds.length; // Sırayı döndür
    }
}

// rastgele bir arka plan ayarla: sayfa yüklenince
setRandomBackground();

// her 3.5 saniyede bir arka planın değişmesi için
let backgroundInterval = setInterval(rotateBackground, 3500);

// duygulara ait görseller
const images = {
    Happy: [
        'static/images/happy1.jpg',
        'static/images/happy2.jpg',
        'static/images/happy3.gif',
        'static/images/happy4.gif',
        'static/images/happy5.gif'
    ],
    Sad: [
        'static/images/sad1.jpg',
        'static/images/sad2.jpg',
        'static/images/sad3.jpg',
        'static/images/sad4.gif',
        'static/images/sad5.jpg'
    ],
    Neutral: [
        'static/images/neutral1.gif',
        'static/images/neutral2.jpg',
        'static/images/neutral3.jpg',
        'static/images/neutral4.gif',
        'static/images/neutral5.gif'
    ]
};

let currentEmotion = ''; // başlangıçta duygu yok
let currentImageIndex = 0;

// "Önceki Fotoğraf" butonu: butona tıklandığında arka plan görselini değiştir
document.getElementById('prev-image').addEventListener('click', () => {
    if (currentEmotion) {
        currentImageIndex = (currentImageIndex - 1 + images[currentEmotion].length) % images[currentEmotion].length;
        updateBackgroundImage();
    }
});

// "Sonraki Fotoğraf" butonu: butona tıklandığında arka plan görselini değiştir
document.getElementById('next-image').addEventListener('click', () => {
    if (currentEmotion) {
        currentImageIndex = (currentImageIndex + 1) % images[currentEmotion].length;
        updateBackgroundImage();
    }
});

// duyguya ait görseli (arka plan) güncelle
function updateBackgroundImage() {
    if (currentEmotion) {
        document.body.style.backgroundImage = `url(${images[currentEmotion][currentImageIndex]})`;
    }
}

// kullanıcı mesajını girdikten sonra, duyguya göre arka plan seçimi ve güncelleme
document.getElementById('user-input').addEventListener('keypress', function (e) {
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        let userInput = e.target.value.trim();
        if (userInput) {
            displayMessage(userInput, 'user');
            fetch('/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ message: userInput })
            }).then(response => response.json()).then(data => {
                displayMessage(data.reply, 'bot');
                document.body.style.backgroundColor = data.color;
                currentEmotion = data.reply.split(' ')[0]; // Duyguyu belirlemek için basit bir yöntem
                currentImageIndex = 0; // Görselin ilkine başla
                updateBackgroundImage();
                displayPlaylist(data.playlist_url);

                // duygu girildikten sonra random arka plan değişiminin dursun
                clearInterval(backgroundInterval);
            }).catch(error => {
                console.error('Error:', error);
            });
            e.target.value = '';
        }
    }
});

// mesajları ekrana yaz
function displayMessage(message, sender) {
    let messageElement = document.createElement('div');
    messageElement.classList.add('message', sender);
    messageElement.textContent = message;
    document.getElementById('messages').appendChild(messageElement);
}

// playlist URL'siyle iframe gösterme
function displayPlaylist(url) {
    let playlistContainer = document.getElementById('playlist-container');
    playlistContainer.innerHTML = `<iframe style="border-radius:12px" src="${url}" 
    width="100%" height="352" frameborder="0" allow="autoplay; clipboard-write; 
    encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>`;
}

