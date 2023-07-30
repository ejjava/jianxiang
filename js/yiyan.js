var quoteContainer = document.getElementById("quote");
        var modalOverlay = document.getElementById("modalOverlay");
        var quoteModal = document.getElementById("quoteModal");
        var authorModal = document.getElementById("authorModal");

        function getRandomSentence() {
            jinrishici.load(function (result) {
                quoteContainer.innerText = result.data.content;
            });
        }

        quoteContainer.onclick = function () {
            jinrishici.load(function (result) {
                quoteModal.innerText = quoteContainer.innerText;
                authorModal.innerText = "作者：" + result.data.origin.author;
                modalOverlay.style.visibility = "visible";
            });
        };

        closeBtn.onclick = function () {
            modalOverlay.style.visibility = "hidden";
        };

        getRandomSentence();

        setInterval(getRandomSentence, 5000); // 自动刷新时间间隔：5秒