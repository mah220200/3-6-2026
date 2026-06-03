const screens = Array.from(document.querySelectorAll(".screen"));
const letterScreen = document.querySelector(".screen-letter");
const letter = document.querySelector(".letter");
const envelope = document.querySelector(".envelope");
const button = document.querySelector(".next-button");
const confetti = document.querySelector(".confetti");
const giftGallery = document.querySelector(".gift-gallery");
const giftPhotos = [
  "gift-photo-1.png",
  "gift-photo-2.png",
  "gift-photo-3.png",
  "gift-photo-4.png",
  "gift-photo-5.png",
  "gift-photo-6.png",
  "gift-photo-7.png"
];

let phase = 0;
let locked = false;
let visibleGiftCount = 0;

function restartAnimation(element, className) {
  if (!element) {
    return;
  }

  element.classList.remove(className);
  void element.offsetWidth;
  element.classList.add(className);
}

function showScreen(index) {
  screens.forEach((screen, screenIndex) => {
    screen.classList.toggle("is-active", screenIndex === index);
    screen.classList.remove("is-leaving", "is-opening");
  });
}

function setPhase(nextPhase) {
  phase = nextPhase;
  button.disabled = false;
  document.body.classList.toggle("show-confetti", false);

  if (phase === 0) {
    showScreen(0);
    letterScreen.classList.remove("letter-raised");
    letter.classList.remove("letter-play");
    envelope.classList.remove("envelope-play");
    confetti.replaceChildren();
    clearGiftPhotos();
    button.textContent = "Ti\u1ebfp t\u1ee5c";
  }

  if (phase === 1) {
    showScreen(0);
    letterScreen.classList.add("letter-raised");
    restartAnimation(letter, "letter-play");
    restartAnimation(envelope, "envelope-play");
    button.textContent = "Ti\u1ebfp t\u1ee5c";
  }

  if (phase === 2) {
    showScreen(1);
    restartAnimation(document.querySelector(".box-closed"), "box-play");
    button.textContent = "M\u1edf qu\u00e0";
  }

  if (phase === 3) {
    showScreen(2);
    clearGiftPhotos();
    restartAnimation(document.querySelector(".box-open"), "open-box-play");
    button.textContent = "Ti\u1ebfp t\u1ee5c";
  }
}

function goToBox() {
  locked = true;
  button.disabled = true;
  letterScreen.classList.add("is-leaving");

  setTimeout(() => {
    setPhase(2);
    locked = false;
  }, 520);
}

function openGift() {
  locked = true;
  button.disabled = true;
  screens[1].classList.add("is-opening");

  setTimeout(() => {
    setPhase(3);
    locked = false;
  }, 1050);
}

function clearGiftPhotos() {
  visibleGiftCount = 0;
  giftGallery.replaceChildren();
  giftGallery.dataset.count = "0";
}

function addGiftPhoto() {
  if (visibleGiftCount >= giftPhotos.length) {
    setPhase(0);
    return;
  }

  visibleGiftCount += 1;
  const image = document.createElement("img");
  image.className = `gift-photo gift-photo-${visibleGiftCount}`;
  image.src = giftPhotos[visibleGiftCount - 1];
  image.alt = `Anh bat ngo ${visibleGiftCount}`;
  giftGallery.appendChild(image);
  giftGallery.dataset.count = String(visibleGiftCount);

  if (visibleGiftCount === giftPhotos.length) {
    button.textContent = "Ho\u00e0n th\u00e0nh";
    makeConfetti();
    document.body.classList.add("show-confetti");
  }
}

function makeConfetti() {
  confetti.replaceChildren();

  const colors = ["#ed5d7f", "#f8d12f", "#69c3d0", "#7dd09c", "#9f7ccf", "#e97651"];
  const shapes = ["0", "50%", "0 50% 50% 50%"];

  for (let i = 0; i < 120; i += 1) {
    const piece = document.createElement("i");
    piece.className = "confetti-piece";
    piece.style.left = `${Math.random() * 100}%`;
    piece.style.background = colors[i % colors.length];
    piece.style.borderRadius = shapes[i % shapes.length];
    piece.style.width = `${5 + Math.random() * 6}px`;
    piece.style.height = `${5 + Math.random() * 8}px`;
    piece.style.setProperty("--delay", `${Math.random() * 1.35}s`);
    piece.style.setProperty("--fall", `${3.4 + Math.random() * 2.4}s`);
    piece.style.setProperty("--drift", `${-120 + Math.random() * 240}px`);
    piece.style.setProperty("--spin", `${360 + Math.random() * 580}deg`);
    confetti.appendChild(piece);
  }
}

button.addEventListener("click", () => {
  if (locked) {
    return;
  }

  if (phase === 0) {
    setPhase(1);
  } else if (phase === 1) {
    goToBox();
  } else if (phase === 2) {
    openGift();
  } else {
    addGiftPhoto();
  }
});

setPhase(0);
