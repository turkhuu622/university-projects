const mainMenu = document.querySelector("#main-menu");
const gameScreen = document.querySelector("#game-screen");
const enterName = document.querySelector("#enter-name");
const rules = document.querySelector("#rules");
const board = gameScreen.querySelector("#board");
const canvas = gameScreen.querySelector("canvas");
const ctx = canvas.getContext("2d");
const rounds = gameScreen.querySelector("#rounds");
const currentCard = gameScreen.querySelector("#current-card");
const sidePlatform = gameScreen.querySelector("#side-platform-count");
const centralPlatform = gameScreen.querySelector("#central-platform-count");
const scoreTable = gameScreen.querySelector("#score-sheet table");
const drawCardButton = gameScreen.querySelector("#draw-card-button");
const N = 10, A = 80, B = A / 2, segments = [];
let central = 0, side = 0, isDisabled = false;
const stations = [ 
    {"id":  0, "x": 0, "y": 0, "type": "A", "train": false, "side": "Buda", "district":  0},
    {"id":  1, "x": 2, "y": 0, "type": "B", "train": false, "side": "Buda", "district":  1},
    {"id":  2, "x": 4, "y": 0, "type": "D", "train": false, "side": "Buda", "district":  2},
    {"id":  3, "x": 6, "y": 0, "type": "D", "train": false, "side": "Pest", "district":  2},
    {"id":  4, "x": 7, "y": 0, "type": "B", "train": false, "side": "Pest", "district":  3},
    {"id":  5, "x": 9, "y": 0, "type": "C", "train": false, "side": "Pest", "district":  4},
    {"id":  6, "x": 0, "y": 1, "type": "D", "train": false, "side": "Buda", "district":  1},
    {"id":  7, "x": 1, "y": 1, "type": "B", "train": false, "side": "Buda", "district":  1},
    {"id":  8, "x": 5, "y": 1, "type": "A", "train": false, "side": "Buda", "district":  2},
    {"id":  9, "x": 8, "y": 1, "type": "C", "train": false, "side": "Pest", "district":  3},
    {"id": 10, "x": 9, "y": 1, "type": "A", "train": false, "side": "Pest", "district":  3},
    {"id": 11, "x": 2, "y": 2, "type": "D", "train": false, "side": "Buda", "district":  1},
    {"id": 12, "x": 4, "y": 2, "type": "D", "train": false, "side": "Buda", "district":  2},
    {"id": 13, "x": 5, "y": 2, "type": "D", "train": false, "side": "Buda", "district":  3},
    {"id": 14, "x": 6, "y": 2, "type": "C", "train": false, "side": "Pest", "district":  3},
    {"id": 15, "x": 9, "y": 2, "type": "D", "train": true , "side": "Pest", "district":  4},
    {"id": 16, "x": 0, "y": 3, "type": "C", "train": false, "side": "Buda", "district":  5},
    {"id": 17, "x": 2, "y": 3, "type": "B", "train": false, "side": "Buda", "district":  5},
    {"id": 18, "x": 3, "y": 3, "type": "C", "train": false, "side": "Buda", "district":  6},
    {"id": 19, "x": 7, "y": 3, "type": "A", "train": false, "side": "Pest", "district":  7},
    {"id": 20, "x": 8, "y": 3, "type": "D", "train": false, "side": "Pest", "district":  7},
    {"id": 21, "x": 0, "y": 4, "type": "B", "train": false, "side": "Buda", "district":  5},
    {"id": 22, "x": 3, "y": 4, "type": "A", "train": false, "side": "Buda", "district":  6},
    {"id": 23, "x": 4, "y": 4, "type": "B", "train": false, "side": "Buda", "district":  6},
    {"id": 24, "x": 5, "y": 4, "type": "C", "train": false, "side": "Pest", "district":  6},
    {"id": 25, "x": 6, "y": 4, "type": "A", "train": true , "side": "Pest", "district":  6},
    {"id": 26, "x": 9, "y": 4, "type": "A", "train": false, "side": "Pest", "district":  7},
    {"id": 27, "x": 0, "y": 5, "type": "A", "train": false, "side": "Buda", "district":  5},
    {"id": 28, "x": 2, "y": 5, "type": "C", "train": false, "side": "Buda", "district":  5},
    {"id": 29, "x": 5, "y": 5, "type": "D", "train": false, "side": "Pest", "district":  6},
    {"id": 30, "x": 6, "y": 5, "type": "?", "train": false, "side": "Pest", "district":  6},
    {"id": 31, "x": 9, "y": 5, "type": "B", "train": false, "side": "Pest", "district":  7},
    {"id": 32, "x": 1, "y": 6, "type": "C", "train": false, "side": "Buda", "district":  5},
    {"id": 33, "x": 3, "y": 6, "type": "D", "train": true , "side": "Buda", "district":  6},
    {"id": 34, "x": 6, "y": 6, "type": "B", "train": false, "side": "Pest", "district":  6},
    {"id": 35, "x": 7, "y": 6, "type": "D", "train": false, "side": "Pest", "district":  7},
    {"id": 36, "x": 8, "y": 6, "type": "C", "train": true , "side": "Pest", "district":  7},
    {"id": 37, "x": 0, "y": 7, "type": "B", "train": false, "side": "Buda", "district":  9},
    {"id": 38, "x": 3, "y": 7, "type": "A", "train": false, "side": "Buda", "district": 10},
    {"id": 39, "x": 4, "y": 7, "type": "B", "train": false, "side": "Buda", "district": 10},
    {"id": 40, "x": 6, "y": 7, "type": "B", "train": false, "side": "Pest", "district": 10},
    {"id": 41, "x": 9, "y": 7, "type": "A", "train": false, "side": "Pest", "district": 11},
    {"id": 42, "x": 1, "y": 8, "type": "A", "train": false, "side": "Buda", "district":  9},
    {"id": 43, "x": 2, "y": 8, "type": "B", "train": false, "side": "Buda", "district":  9},
    {"id": 44, "x": 5, "y": 8, "type": "C", "train": false, "side": "Buda", "district": 10},
    {"id": 45, "x": 8, "y": 8, "type": "D", "train": false, "side": "Pest", "district": 11},
    {"id": 46, "x": 0, "y": 9, "type": "D", "train": false, "side": "Buda", "district":  8},
    {"id": 47, "x": 2, "y": 9, "type": "C", "train": false, "side": "Buda", "district":  9},
    {"id": 48, "x": 3, "y": 9, "type": "A", "train": true , "side": "Buda", "district": 10},
    {"id": 49, "x": 6, "y": 9, "type": "D", "train": false, "side": "Buda", "district": 10},
    {"id": 50, "x": 7, "y": 9, "type": "A", "train": false, "side": "Pest", "district": 11},
    {"id": 51, "x": 8, "y": 9, "type": "C", "train": false, "side": "Pest", "district": 11},
    {"id": 52, "x": 9, "y": 9, "type": "B", "train": false, "side": "Pest", "district": 12}
];
const lines = [
    {"id": 0, "name": "M1", "color": "#FFD800", "start": 19},
    {"id": 1, "name": "M2", "color": "#E41F18", "start": 28},
    {"id": 2, "name": "M3", "color": "#005CA5", "start":  3},
    {"id": 3, "name": "M4", "color": "#4CA22F", "start": 39}
];
const trainScores = [0, 1, 2, 4, 6, 8, 11, 14, 17, 21, 25];
const junctionMultiplier = [0, 0, 2, 5, 9];
function createImage(src) {
    const img = document.createElement("img");
    return img.src = src, img;
}
function createBoard() {
    for (let i = 0; i < N; i++) {
        const row = document.createElement("tr");
        for (let j = 0; j < N; j++) {
            const cell = document.createElement("td");
            cell.appendChild(createImage("images/cell.png"));
            row.appendChild(cell);
        }
        board.appendChild(row);
    }
}
function createScoreSheet() {
    for (let i = 0; i < 4; i++) {
        const row = document.createElement("tr");
        for (let j = 0; j < 8; j++) {
            row.appendChild(document.createElement("td"));
        }
        scoreTable.appendChild(row);
    }
    scoreTable.rows[0].cells[0].style.backgroundColor = "transparent";
    scoreTable.rows[1].cells[0].style.backgroundColor = "transparent";
    scoreTable.rows[2].cells[0].style.backgroundColor = "transparent";
    scoreTable.rows[3].cells[0].style.backgroundColor = "transparent";
    scoreTable.rows[0].cells[5].style.backgroundColor = "transparent";
    scoreTable.rows[1].cells[5].style.backgroundColor = "transparent";
    scoreTable.rows[2].cells[5].style.backgroundColor = "transparent";
    scoreTable.rows[0].cells[0].appendChild(createImage("images/score/district.png"));
    scoreTable.rows[1].cells[0].appendChild(createImage("images/score/station.png"));
    scoreTable.rows[2].cells[0].appendChild(createImage("images/score/danube.png"));
    scoreTable.rows[0].cells[5].appendChild(createImage("images/score/junction_2.png"));
    scoreTable.rows[1].cells[5].appendChild(createImage("images/score/junction_3.png"));
    scoreTable.rows[2].cells[5].appendChild(createImage("images/score/junction_4.png"));
    for (const line of lines) {
        const station = stations[line.start];
        rounds.appendChild(createImage(`images/station_${station.type.toLowerCase()}.png`));
    }
    const train = gameScreen.querySelector("#train-score");
    for (let i = 0; i < 2; i++) {
        const row = document.createElement("tr");
        for (let j = 0; j < trainScores.length; j++) {
            const cell = document.createElement("td");
            if (i === 1) cell.innerText = trainScores[j];
            row.appendChild(cell);
        }
        train.appendChild(row);
    }
}
function createStations() {
    for (const station of stations) {
        const input = document.createElement("input");
        input.type = "image";
        if (station.type === "?") input.src = "images/deak_ter.png";
        else input.src = `images/station_${station.type.toLowerCase() + (station.train ? "_train" : "")}.png`;
        const cell = board.rows[station.y].cells[station.x];
        cell.dataset.id = station.id;
        cell.appendChild(input);
    }
    for (const line of lines) {
        const station = stations[line.start];
        board.rows[station.y].cells[station.x].lastChild.src = `images/${line.name.toLowerCase()}_start_station.png`;
    }
}
function startTimer() {
    const start = Date.now();
    return setInterval(() => {
        const totalSeconds = Math.floor((Date.now() - start) / 1000);
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = totalSeconds % 60;
        gameScreen.querySelector("#elapsed-time").innerText = "" + Math.floor(minutes / 10) + (minutes % 10) + ":" + Math.floor(seconds / 10) + (seconds % 10);
    }, 1000);
}
function shuffleArray(a) {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
}
function shuffleCards() {
    const c = [];
    for (let i = 0; i <= 10; i++) c.push(i);
    return shuffleArray(c), c;
}
function getCellCoord(id) {
    return [stations[id].x, stations[id].y];
}
function getCoord(x, y) {
    return [x * A + B, y * A + B];
}
function drawSegmentOnCanvas(c1, c2, color) {
    ctx.beginPath();
    ctx.lineWidth = 15;
    ctx.moveTo(...getCoord(...getCellCoord(c1)));
    ctx.lineTo(...getCoord(...getCellCoord(c2)));
    ctx.strokeStyle = color, ctx.stroke();
}
function renderSegments() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (const {from: f, to: t, line: l} of segments) {
        drawSegmentOnCanvas(f, t, l.color);
    }
}
function disableStations() {
    if (isDisabled) return;
    isDisabled = true;
    for (const station of stations) board.rows[station.y].cells[station.x].lastChild.disabled = true;
}
function enableStations() {
    if (!isDisabled) return;
    isDisabled = false;
    for (const station of stations) board.rows[station.y].cells[station.x].lastChild.disabled = false;
}
function rem(e, s) {
    for (let x; x = e.querySelector(s); x.remove());
}
function renderCard(id) {
    rem(currentCard, "img");
    currentCard.appendChild(createImage(`images/${id === 10 ? "switch_card" : id < 5 ? "side_platform" : "central_platform"}.png`));
    if (id < 10) {
        currentCard.appendChild(createImage(`images/${id % 5 === 4 ? "joker" : "station_" + String.fromCharCode('A'.charCodeAt() + id % 5)}.png`));
    }
    rem(sidePlatform, "img"), rem(centralPlatform, "img");
    if (side > 0) sidePlatform.appendChild(createImage(`images/count/${side}.png`));
    if (central > 0) centralPlatform.appendChild(createImage(`images/count/${central}.png`));
}
function match(card, station) {
    const type = stations[station].type;
    return card % 5 === 4 || type === "?" || type === String.fromCharCode('A'.charCodeAt() + card % 5);
}
function isBetween(x, y, z) {
    if (y > z) [y, z] = [z, y];
    return y < x && x < z;
}
function intersect(ax, ay, bx, by, cx, cy, dx, dy) {
    const sign = (x) => x > 0 ? 1 : x < 0 ? -1 : 0;
    const f = (ax, ay, bx, by, cx, cy) => (ax - bx) * (ay - cy) - (ay - by) * (ax - cx);
    return sign(f(ax, ay, bx, by, cx, cy)) * sign(f(ax, ay, bx, by, dx, dy)) === -1
        && sign(f(cx, cy, dx, dy, ax, ay)) * sign(f(cx, cy, dx, dy, bx, by)) === -1;
}
function checkSegment(from, to) {
    let fx, fy, tx, ty;
    [fx, fy] = getCellCoord(from);
    [tx, ty] = getCellCoord(to);
    if (fx !== tx && fy !== ty && fx - fy !== tx - ty && fx + fy !== tx + ty) return false;
    for (const s of stations) {
        const xb = isBetween(s.x, fx, tx);
        const yb = isBetween(s.y, fy, ty);
        if (fx === tx && s.x === fx && yb) return false;
        if (fy === ty && s.y === fy && xb) return false;
        if (!yb || !xb) continue;
        if (fx - fy === tx - ty && fx - fy === s.x - s.y) return false;
        if (fx + fy === tx + ty && fx + fy === s.x + s.y) return false;
    }
    for (const {from: f, to: t, line: l} of segments) {
        if (from === f && to === t) return false;
        if (from === t && to === f) return false;
        if (intersect(fx, fy, tx, ty, ...getCellCoord(f), ...getCellCoord(t))) return false;
    }
    return true;
}
function disableDrawCardButton() {
    drawCardButton.style.opacity = drawCardButton.nextElementSibling.style.opacity = "0.3";
    drawCardButton.disabled = true;
}
function enableDrawCardButton() {
    drawCardButton.style.opacity = drawCardButton.nextElementSibling.style.opacity = "1";
    drawCardButton.disabled = false;
}
function enterNameKeyControl(e) {
    if (e.code === "Enter") startGame();
}
mainMenu.querySelector("#start-game-button").addEventListener("click", () =>  {
    mainMenu.style.display = "none";
    enterName.style.display = "flex";
});
enterName.querySelector(".back-button").addEventListener("click", () => {
    enterName.querySelector("#enter-name-input").value = "";
    enterName.style.display = "none";
    mainMenu.style.display = "flex";
});
function startGame() {
    const playerName = enterName.querySelector("#enter-name-input").value.trim();
    if (playerName.length === 0) return;
    document.removeEventListener("keypress", enterNameKeyControl);
    enterName.style.display = "none";
    gameScreen.style.display = "block";
    shuffleArray(lines);
    createBoard();
    createScoreSheet();
    createStations();
    const timer = startTimer();
    const playerNameDisplay = gameScreen.querySelector("#player-name");
    playerNameDisplay.innerText = playerName;
    playerNameDisplay.style.fontSize = `${20 / Math.max(10, playerName.length)}em`;
    const lineCount = [];
    let round = -1, card, cardIds, endpoints, other, canSwitch, visited = [], trainCount = 0;
    for (const station of stations) lineCount.push(0);
    const closest = []; {
        const dx = [0, 0, -1, 1];
        const dy = [-1, 1, 0, 0];
        for (let i = 0; i < N; i++) {
            const a = [];
            for (let j = 0; j < N; j++) a.push(-1);
            closest.push(a);
        }
        const q = [];
        for (const station of stations) {
            const x = station.x, y = station.y;
            closest[x][y] = station.id;
            q.push([x, y]);
        }
        for (let i = 0; i < q.length; i++) {
            let x, y;
            [x, y] = q[i];
            for (let j = 0; j < 4; j++) {
                const nx = x + dx[j];
                const ny = y + dy[j];
                if (nx < 0 || nx >= N) continue;
                if (ny < 0 || ny >= N) continue;
                if (closest[nx][ny] !== -1) continue;
                closest[nx][ny] = closest[x][y];
                q.push([nx, ny]);
            }
        }
    }
    function drawCard() {
        if (cardIds[card] !== 10 && (side === 5 || central === 5)) {
            for (const img of currentCard.querySelectorAll("img")) img.style.opacity = "0.3";
            canvas.removeEventListener("mousemove", canvasMouseMove);
            disableStations();
            return;
        }
        renderSegments();
        if (card === -1 || cardIds[card] !== 10) canSwitch = false;
        const id = cardIds[++card];
        other = -1;
        if (id < 5) side = Math.min(side + 1, 5);
        else central = Math.min(central + 1, 5);
        renderCard(id);
        if (id === 10) canSwitch = true, disableStations();
        else enableStations();
        if (cardIds[card] !== 10 && (side === 5 || central === 5)) {
            disableDrawCardButton();
            return;
        }
    }
    const endRoundButton = gameScreen.querySelector("#end-round-button");
    function canvasMouseMove(e) {
        if (other === -1) return;
        const x = Math.floor(Math.min(canvas.width - 1, Math.max(0, e.offsetX)) / A);
        const y = Math.floor(Math.min(canvas.height - 1, Math.max(0, e.offsetY)) / A);
        renderSegments();
        drawSegmentOnCanvas(other, closest[x][y], lines[round].color)
    }
    function gameScreenKeyControl(e) {
        if (e.code === "Space") drawCard();
        else if (e.code === "KeyF") startNextRound();
    }
    document.addEventListener("keypress", gameScreenKeyControl);
    function startNextRound() {
        if (round++ !== -1) {
            const cnt = [];
            for (let i = 0; i < 13; i++) cnt.push(0);
            for (const s of visited) cnt[stations[s].district]++;
            const PK = cnt.filter(x => x > 0).length;
            const PM = Math.max(...cnt);
            let PD = 0;
            for (const {from: f, to: t, line: l} of segments) if (l === lines[round - 1] && stations[f].side !== stations[t].side) PD++;
            scoreTable.rows[0].cells[round].innerText = PK;
            scoreTable.rows[1].cells[round].innerText = PM;
            scoreTable.rows[2].cells[round].innerText = PD;
            scoreTable.rows[3].cells[round].innerText = PK * PM + PD;
        }
        if (round === 4) {
            clearInterval(timer);
            document.removeEventListener("keypress", gameScreenKeyControl);
            for (let i = 0; i < 4; i++) {
                rounds.querySelector(`img:nth-of-type(${i + 1})`).src = `images/${lines[i].name.toLowerCase()}_start_station.png`;
            }
            const junctionCountCount = [0, 0, 0, 0, 0];
            for (let i = 0; i < lineCount.length; i++) junctionCountCount[lineCount[i]]++;
            scoreTable.rows[3].cells[7].innerText = 0;
            for (let i = 2; i <= 4; i++) {
                scoreTable.rows[i - 2].cells[6].innerText = junctionCountCount[i];
                scoreTable.rows[i - 2].cells[7].innerText = junctionCountCount[i] * junctionMultiplier[i];
                scoreTable.rows[3].cells[7].innerText = parseInt(scoreTable.rows[3].cells[7].innerText) + junctionCountCount[i] * junctionMultiplier[i];
            }
            scoreTable.rows[3].cells[5].innerText = 0;
            for (let i = 1; i <= 4; i++) scoreTable.rows[3].cells[5].innerText = parseInt(scoreTable.rows[3].cells[5].innerText) + parseInt(scoreTable.rows[3].cells[i].innerText);
            scoreTable.rows[3].cells[6].innerText = trainScores[trainCount];
            gameScreen.querySelector("#total-score").innerText = parseInt(scoreTable.rows[3].cells[5].innerText) + parseInt(scoreTable.rows[3].cells[6].innerText) + parseInt(scoreTable.rows[3].cells[7].innerText);
            disableStations();
            drawCardButton.disabled = true;
            endRoundButton.disabled = true;
            return;
        }
        canvas.addEventListener("mousemove", canvasMouseMove);
        enableDrawCardButton();
        cardIds = shuffleCards();
        central = side = 0;
        endpoints = [stations[lines[round].start].id];
        visited = [endpoints[0]];
        lineCount[endpoints[0]]++;
        card = other = -1;
        canSwitch = false;
        if (round > 0) rounds.querySelector(`img:nth-of-type(${round})`).src = `images/station_${stations[lines[round - 1].start].type.toLowerCase()}.png`;
        rounds.querySelector(`img:nth-of-type(${round + 1})`).src = `images/${lines[round].name.toLowerCase()}_start_station.png`;
        drawCard();
    } startNextRound();
    drawCardButton.addEventListener("click", drawCard);
    endRoundButton.addEventListener("click", startNextRound);
    board.addEventListener("click", (e) => {
        const cellInput = e.target.closest("input[type='image']");
        if (!cellInput) return;
        const cell = cellInput.closest("td"), id = parseInt(cell.dataset.id);
        if (other === -1) {
            if (!endpoints.includes(id) && (!canSwitch || !visited.includes(id))) return;
            other = id;
        } else if (other === id || !match(cardIds[card], id) || !checkSegment(other, id) || visited.includes(id)) {
            other = -1;
            renderSegments();
        } else {
            lineCount[id]++;
            visited.push(id);
            segments.push({from: other, to: id, line: lines[round]});
            renderSegments();
            if (stations[id].train && trainCount < trainScores.length - 1) { 
                gameScreen.querySelector("#train-score").rows[0].cells[trainCount++].style.backgroundColor = lines[round].color;
            }
            if (endpoints.length > 1) {
                const i = endpoints.indexOf(other);
                if (i !== -1) endpoints.splice(i, 1);
            }
            endpoints.push(id);
            drawCard();
        }
    });
}
enterName.querySelector("#go-button").addEventListener("click", startGame);
document.addEventListener("keypress", enterNameKeyControl);
mainMenu.querySelector("#rules-button").addEventListener("click", () => {
    mainMenu.style.display = "none";
    rules.style.display = "block";
});
rules.querySelector(".back-button").addEventListener("click", () => {
    rules.style.display = "none";
    mainMenu.style.display = "flex";
});