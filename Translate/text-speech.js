const fromText = document.querySelector(".from-text");
const toText = document.querySelector(".to-text");
const selectTag = document.querySelectorAll("select");
const translatebtn = document.querySelector(".bn");
const vol = document.querySelectorAll(".b");

selectTag.forEach((tag, id) => {
    for (const country_code in countries) {
        let selected = "";
        if (id === 0 && country_code === "en") {
            selected = "selected";
        }
        if (id === 1 && country_code === "fr") {
            selected = "selected";
        }
        tag.insertAdjacentHTML(
            "beforeend",
            `<option value="${country_code}" ${selected}>${countries[country_code]}</option>`
        );
    }
});

translatebtn.addEventListener("click", () => {
    const fromLang = selectTag[0].value;
    const toLang = selectTag[1].value;
    const text = fromText.value;
    if (!text) {
        alert("Please enter text to translate.");
        return;
    }
    toText.value = "Translating...";
    const apiUrl = `https://api.mymemory.translated.net/get?q=${text}&langpair=${fromLang}|${toLang}`;
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            toText.value = data.responseData.translatedText;
        })
        .catch(error => {
            toText.value = "Error translating text.";
        });
});

vol.forEach((btn, index) => {
    btn.addEventListener("click", () => {
        const text = index === 0 ? fromText.value : toText.value;
        if (!text) {
            alert("No text available for speech.");
            return;
        }
        const lang = index === 0 ? selectTag[0].value : selectTag[1].value;
        const url = `https://api.text-to-speech.com/synthesize?text=${text}&lang=${lang}&key=YOUR_API_KEY`;
        fetch(url)
            .then(response => response.blob())
            .then(blob => {
                const audio = new Audio(URL.createObjectURL(blob));
                audio.play();
            })
            .catch(error => {
                alert("Error generating speech.");
            });
    });
});
