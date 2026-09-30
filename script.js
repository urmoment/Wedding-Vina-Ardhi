/* =====================================================
   VINA & ARDHI
   JAVANESE PREMIUM WEDDING
===================================================== */


/* =====================================================
   ELEMENTS
===================================================== */

const opening = document.getElementById("opening");
const openInvitation = document.getElementById("openInvitation");

const musicButton = document.getElementById("musicButton");
const bgMusic = document.getElementById("bgMusic");


/* =====================================================
   OPEN INVITATION
===================================================== */

openInvitation.addEventListener("click", () => {

  opening.classList.add("hide");

  document.body.classList.remove("locked");

  musicButton.classList.add("show");

  /*
    Musik dimulai setelah user menekan tombol.
    Ini membantu menghindari autoplay restriction
    pada browser smartphone.
  */

  bgMusic.volume = 0.45;

  bgMusic.play()
    .then(() => {

      musicButton.classList.add("playing");

      musicButton.innerHTML = "♫";

    })
    .catch(() => {

      /*
        Jika browser menolak audio,
        website tetap berjalan normal.
      */

      musicButton.innerHTML = "♪";

    });

});


/* =====================================================
   MUSIC BUTTON
===================================================== */

musicButton.addEventListener("click", () => {

  if (bgMusic.paused) {

    bgMusic.play()
      .then(() => {

        musicButton.classList.add("playing");

        musicButton.innerHTML = "♫";

      })
      .catch(() => {

        console.log("Musik tidak dapat diputar.");

      });

  } else {

    bgMusic.pause();

    musicButton.classList.remove("playing");

    musicButton.innerHTML = "♪";

  }

});


/* =====================================================
   COUNTDOWN
===================================================== */

const weddingDate = new Date(
  "November 29, 2026 09:00:00 GMT+0700"
).getTime();


function updateCountdown() {

  const now = new Date().getTime();

  const distance = weddingDate - now;


  if (distance <= 0) {

    document.getElementById("days").innerText = "00";
    document.getElementById("hours").innerText = "00";
    document.getElementById("minutes").innerText = "00";
    document.getElementById("seconds").innerText = "00";

    return;

  }


  const days = Math.floor(
    distance / (1000 * 60 * 60 * 24)
  );

  const hours = Math.floor(
    (distance % (1000 * 60 * 60 * 24)) /
    (1000 * 60 * 60)
  );

  const minutes = Math.floor(
    (distance % (1000 * 60 * 60)) /
    (1000 * 60)
  );

  const seconds = Math.floor(
    (distance % (1000 * 60)) /
    1000
  );


  document.getElementById("days").innerText =
    String(days).padStart(2, "0");

  document.getElementById("hours").innerText =
    String(hours).padStart(2, "0");

  document.getElementById("minutes").innerText =
    String(minutes).padStart(2, "0");

  document.getElementById("seconds").innerText =
    String(seconds).padStart(2, "0");

}


updateCountdown();

setInterval(updateCountdown, 1000);


/* =====================================================
   SCROLL REVEAL
===================================================== */

const revealElements =
  document.querySelectorAll(".reveal");


const revealObserver =
  new IntersectionObserver(

    (entries) => {

      entries.forEach((entry) => {

        if (entry.isIntersecting) {

          entry.target.classList.add("active");

          revealObserver.unobserve(entry.target);

        }

      });

    },

    {
      threshold: 0.12
    }

  );


revealElements.forEach((element) => {

  revealObserver.observe(element);

});


/* =====================================================
   COPY BANK ACCOUNT
===================================================== */

const copyButtons =
  document.querySelectorAll(".copy-button");


copyButtons.forEach((button) => {

  button.addEventListener("click", async () => {

    const account =
      button.getAttribute("data-account");

    try {

      await navigator.clipboard.writeText(account);

      const originalText =
        button.innerText;

      button.innerText =
        "BERHASIL DISALIN ✓";

      button.style.background =
        "#435b4b";

      button.style.color =
        "#ffffff";

      button.style.borderColor =
        "#435b4b";


      setTimeout(() => {

        button.innerText =
          originalText;

        button.style.background =
          "";

        button.style.color =
          "";

        button.style.borderColor =
          "";

      }, 2200);

    } catch (error) {

      /*
        Fallback jika clipboard API tidak tersedia.
      */

      const temporaryInput =
        document.createElement("input");

      temporaryInput.value = account;

      document.body.appendChild(
        temporaryInput
      );

      temporaryInput.select();

      document.execCommand("copy");

      temporaryInput.remove();

      button.innerText =
        "BERHASIL DISALIN ✓";


      setTimeout(() => {

        button.innerText =
          "SALIN NOMOR REKENING";

      }, 2200);

    }

  });

});


/* =====================================================
   GALLERY LIGHTBOX
===================================================== */

const galleryImages =
  document.querySelectorAll(".gallery-image");

const lightbox =
  document.getElementById("lightbox");

const lightboxImage =
  document.getElementById("lightboxImage");

const lightboxClose =
  document.getElementById("lightboxClose");


galleryImages.forEach((image) => {

  image.addEventListener("click", () => {

    /*
      Jangan buka lightbox jika gambar belum tersedia.
    */

    if (
      !image.complete ||
      image.naturalWidth === 0
    ) {
      return;
    }


    lightboxImage.src =
      image.src;

    lightbox.classList.add("show");

    document.body.classList.add("locked");

  });

});


/* =====================================================
   CLOSE LIGHTBOX
===================================================== */

function closeLightbox() {

  lightbox.classList.remove("show");

  document.body.classList.remove("locked");

}


lightboxClose.addEventListener(
  "click",
  closeLightbox
);


lightbox.addEventListener(
  "click",
  (event) => {

    if (
      event.target === lightbox
    ) {

      closeLightbox();

    }

  }
);


/* =====================================================
   ESCAPE KEY
===================================================== */

document.addEventListener(
  "keydown",
  (event) => {

    if (
      event.key === "Escape"
    ) {

      closeLightbox();

    }

  }
);


/* =====================================================
   PREVENT BROKEN IMAGE DISPLAY
===================================================== */

document.querySelectorAll("img").forEach((image) => {

  image.addEventListener(
    "error",
    () => {

      if (
        image.classList.contains(
          "gallery-image"
        )
      ) {

        image.style.opacity = "0";

      }

    }
  );

});


/* =====================================================
   INITIAL BODY STATE
===================================================== */

document.body.classList.add("locked");


/* =====================================================
   CONSOLE INFO
===================================================== */

console.log(
  "Vina & Ardhi Wedding Website Loaded ♡"
);
