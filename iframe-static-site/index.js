const body = document.body;

const div = document.createElement("div");
div.style.cssText=`
    width: 240px;
    height: 240px;
    background: red;
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const text = document.createElement("span");
text.innerHTML = "Привет! Это iframe!"
text.style.fontSize = "18px";

div.appendChild(text);
body.appendChild(div);