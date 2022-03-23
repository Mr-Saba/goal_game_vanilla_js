document.addEventListener('DOMContentLoaded', () => {
let winnedMoney = ""
let winNotif = document.querySelector(".win")
let errorNotif = document.querySelector(".error")
const parameters = document.querySelector(".parameters")
const navigation = document.querySelector(".navigation")

//history's obj keys
let timeHist, betHist, payoutHist

//audios 
const successAudio = new Audio("assets/successSound.mp3");
const failAudio = new Audio("assets/failSound.mp3");
const clickAudio = new Audio("assets/clickSound.mp3");
const winAudio = new Audio("assets/winSound.mp3");

const buttons = document.querySelectorAll("button")

buttons.forEach(el => {
    el.addEventListener('click', () => {
        clickAudio.currentTime = 0;
        clickAudio.play()
    })
});
//

//bet manipulation
let bet = document.querySelector("#bet")
plus_minus_buttons = document.querySelectorAll(".plus_minus")
const fixedBets = document.getElementsByClassName("amountButtons")[0]
let previousClick = ""

fixedBets.addEventListener('click', (e) => {
    if(e.target?.nodeName == "BUTTON") {
        if(previousClick === e.target.innerText) {
            if(bet.innerText !== "100.00") bet.innerText = parseInt(bet.innerText) + parseInt(e.target.innerText) + ".00"
        } else {
            bet.innerText = parseInt(e.target.innerText) + ".00"
        }
        previousClick = e.target.innerText
    }
    
})

plus_minus_buttons.forEach(el => {
    el.addEventListener("click", (e) => {
        if(e.target.innerText === "+") {
            if(parseFloat(bet.innerText) !== 100) {
                bet.innerText = (parseFloat(bet.innerText) + 0.1).toFixed(2)
            }
        } else {
            if(parseFloat(bet.innerText) !== 0.1) {
                bet.innerText = (parseFloat(bet.innerText) - 0.1).toFixed(2)
            }
        }
    })
})

    // bet validations/boundaries
bet.addEventListener("focusout", () => {
    if(parseFloat(bet.innerText) > 100) bet.innerText = "100.00"
    if(parseFloat(bet.innerText) < 0.1 || isNaN(parseFloat(bet.innerText))) bet.innerText = "0.10"
    bet.innerText = Number.parseFloat(bet.innerText).toFixed(1) + "0"
})
bet.addEventListener("input", (e) => {
    if(isNaN(parseFloat(e.data)) && e.data !== ".") {
        bet.innerText = bet.innerText.replace(e.data, '')
    }
})
//

//toggle board size

const size = document.getElementsByClassName("sizeButtons")[0]
const boards = document.getElementsByClassName("board")


size.addEventListener('click', (e) => {
    if(e.target?.nodeName == "BUTTON") {
        for(i=0; i<boards.length; i++) {
            playButton.classList.remove("active")
            if(e.target.innerText.toLowerCase() === boards[i].id) {
                size.getElementsByTagName("button")[i].classList.add("active")
                boards[i].classList.add("active")
            } else {
                size.getElementsByTagName("button")[i].classList.remove("active")
                boards[i].classList.remove("active")
            }
            
        }
        // if parameters is set as an auto, start choosing flag positions
        if(auto_manual_buttons.children[1].classList.contains("active")) {
            let col = document.querySelector(".board.active").querySelectorAll(".boardColumn")
            chooseFlagPosition(col, 1)
        }
    }
    
})

// 


//increase and decrease bet on win and lose 
const onWin = document.getElementsByClassName("fieldButtons")[0]
const onLoss = document.getElementsByClassName("fieldButtons")[1]
const innerPercent = document.querySelectorAll(".innerPercent")


onWin.addEventListener('click', (e) => {
    e.target.classList.add("active")
    for(j=0; j<boards.length; j++) {
        if(onWin.getElementsByTagName("button")[j] !== e.target) {
            onWin.getElementsByTagName("button")[j].classList.remove("active")
        }
    }
})
onLoss.addEventListener('click', (e) => {
    e.target.classList.add("active")
    for(j=0; j<boards.length; j++) {
        if(onLoss.getElementsByTagName("button")[j] !== e.target) {
            onLoss.getElementsByTagName("button")[j].classList.remove("active")
        }
    }
})


innerPercent.forEach(el => {
    el.addEventListener("input", (e) => {
        if(isNaN(parseFloat(e.data))) {
            el.innerText = el.innerText.replace(e.data, '')
        } else if(el.innerText.length > 3) {
            el.innerText = "999"
        }
        if(el.innerText.length == 0) {
            el.innerText = "0"
        }
    })
})

//auto/manual toggle

const auto_manual_buttons = document.getElementById("auto_manual")
const auto = document.querySelector(".auto")

auto_manual_buttons.addEventListener('click', (e) => {
    if(e.target?.nodeName == "BUTTON") {
        restartGame()

        if(e.target.innerText.toLowerCase() === "auto") {
            auto.classList.add("active")
            startButton.style.display = "none"
            document.querySelectorAll(".multiplier").forEach(el => {
                el.style.visibility = "hidden"
            })
            //start choosing flag positions
            let col = document.querySelector(".board.active").querySelectorAll(".boardColumn")
            chooseFlagPosition(col, 1)
        } else {
            auto.classList.remove("active")
            startButton.style.display = "unset"
            document.querySelectorAll(".multiplier").forEach(el => {
                el.style.visibility = "visible"
                el.classList.remove("active")
            })
            document.querySelector(".arrow")?.remove()
            playButton.classList.remove("active")
            document.querySelector(".board.active").querySelector(".singleMultiplier").style.visibility = "hidden"
        }
        for(i = 0; i<2; i++) {
            if(auto_manual_buttons.children[i].classList.contains("active")) {
                auto_manual_buttons.children[i].classList.remove("active")
            } else {
                auto_manual_buttons.children[i].classList.add("active")
            }
        }
    }
})

//

//sidebar
let sidebar = document.querySelector("#sideMenu")
let sidebarLogo = document.querySelector("#sidebarLogo")

sidebarLogo.addEventListener("click", () => {
    if(!sideMenu.classList.contains("active")) {
        sideMenu.classList.add("active")
    } else {
        sideMenu.classList.remove("active")
    }
})
//

//modals
//how to play
const guideModal =  document.querySelector("#guideModal")
const guideOpenButtons = document.querySelectorAll(".guideButton")
const guideCloseButtons = document.querySelectorAll(".guideModalX")


guideOpenButtons.forEach(el => {
    el.addEventListener("click", () => {
        guideModal.style.display = "unset"
    })
})
guideCloseButtons.forEach(el => {
    console.lo
    el.addEventListener("click", () => {
        guideModal.style.display = "none"
    })
})

//

//bets history
const historyModal =  document.querySelector("#historyModal")
const historyOpenButton = document.querySelector(".historyButton")
const historyCloseButton = document.querySelector(".historyModalX")
const actualDate = document.querySelector(".dateArea div:first-child")
const dateFilterButtons = document.querySelectorAll(".dateFilterButton")
const loadMoreButton =  document.querySelector("#historyModal button")

let d = new Date()

dateFilterButtons.forEach(el => {
    el.addEventListener('click', (e) => {
        if(e.target.innerText.startsWith("Y")) {
            d = new Date(new Date().getTime() - 24*60*60*1000)
            updateActualDate(d)
            e.target.classList.add("active")
        } else if(e.target.innerText.startsWith("T")) {
            d = new Date()
            updateActualDate(d)
            e.target.classList.add("active")
        } else {
            // d = new Date(new Date().getTime() + 24*60*60*1000)
            // updateActualDate(d)
            e.target.classList.add("active")
        }
        for(let i = 0; i<dateFilterButtons.length; i++) {
            if(dateFilterButtons[i] !== e.target) dateFilterButtons[i].classList.remove("active")
        }
        filterHistory()
    })
})

function updateActualDate(d) {
    actualDate.innerText = `${d.getFullYear()} ${d.getMonth() + 1 < 10 ? "0" + (d.getMonth() + 1) : d.getMonth() + 1} ${d.getDate()}`
}


historyOpenButton.addEventListener("click", () => {
    historyModal.style.display = "unset"
    updateActualDate(d)
    filterHistory()
})
historyCloseButton.addEventListener("click", () => {
    historyModal.style.display = "none"
})

loadMoreButton.addEventListener("click", () => {

})

//

//hide modals and sidebar when clicking somewhere else
window.addEventListener("click", (e) => {
    if(sidebar.classList.contains("active") && e.target !== sidebarLogo) {
        let array = []
        let elems = sidebar.getElementsByTagName('*')
        if(array.slice.call(elems).find(item => e.target === item || e.target === sidebar) === undefined) {
            sidebar.classList.remove("active")
        }
    }
    if(guideModal.style.display = "unset" && e.target !== guideOpenButtons[0] && e.target !== guideOpenButtons[1]) {
        let array = []
        let elems = guideModal.getElementsByTagName('*')
        if(array.slice.call(elems).find(item => e.target === item) === undefined) {
            guideModal.style.display = "none"
        }
    }
    if(historyModal.style.display = "unset" && e.target !== historyOpenButton) {
        let array = []
        let elems = historyModal.getElementsByTagName('*')
        if(array.slice.call(elems).find(item => e.target === item) === undefined) {
            historyModal.style.display = "none"
        }
    }
})
//



//sidebar toggles
const volumeToggle = document.querySelector("#volume")
const animToggle = document.querySelector("#animation")

volumeToggle.addEventListener("click", (e) => {
    toggleLogo(e.target)
    if(!successAudio.muted) {
        successAudio.muted = true; winAudio.muted = true; clickAudio.muted = true; failAudio.muted = true
    } else {
        successAudio.muted = false; winAudio.muted = false; clickAudio.muted = false; failAudio.muted = false
    }
})

animToggle.addEventListener("click", (e) => {
    toggleLogo(e.target)
})

//

//start game
let balance = document.querySelector("#balance")
var startButton = document.querySelector("#start")
var cashoutButton = document.querySelector("#cashout")
var randomSelectButton = document.querySelector("#randomSelect")
var playButton = document.querySelector("#play")
var stopButton = document.querySelector("#stop")

const ball = document.createElement('div')
ball.classList.add("ball")
const wreckedBomb = document.createElement('div')
wreckedBomb.classList.add("wreckedBomb")

let flag = false
//start manual
startButton.addEventListener("click", () => {
    errorNotif.classList.remove("active")

    timeHist = new Date()
    betHist = bet.innerText

    // let board = document.querySelector(".board.active")
    let col = document.querySelector(".board.active").querySelectorAll(".boardColumn")
    

    if(parseFloat(balance.innerText) >= parseFloat(bet.innerText)) {
        winNotif.classList.remove("active")

        balance.innerText = (parseFloat(balance.innerText) - parseFloat(bet.innerText)).toFixed(2)
        //reset board 
        if(document.querySelector(".bomb")) {
            restartGame()
        }

        parameters.classList.add("disabled")
        navigation.classList.add("disabled")

        generateBombs("hidden")
        chooseBallPosition(col, 1)
    } else {
        errorNotif.innerText = "Not Enough Funds"
        errorNotif.classList.add("active")
    }
})

cashoutButton.addEventListener("click", () => {
    addBalance()
    showResults()
})

randomSelectButton.addEventListener("click", () => {        
    let col = document.querySelector(".board.active").querySelectorAll(".boardColumn")
    document.querySelectorAll(".boardItem").forEach(el => {
        el.classList.add("passed")
    })

    document.querySelector(".arrow").remove()

    if(document.querySelector(".flag")) {
        document.querySelectorAll(".flag").forEach(el => {
            el.remove()
        })
    }
    //generate flags 
    for(i=0; i<col.length; i++) {
        const flag = document.createElement('div')
        flag.classList.add("flag")
        let rand = Math.floor(Math.random() * (col[i].children.length - 1))
        col[i].getElementsByClassName("boardItem")[rand].appendChild(flag)
        // col[i].querySelector(".multiplier").style.visibility = "hidden"
    }
    if(col[0].querySelector(".flag")) {
        playButton.classList.add("active")
    }

    document.querySelector(".board.active").querySelector(".singleMultiplier").style.visibility = "visible"
})

var interval

//start auto

playButton.addEventListener("click", () => {
    errorNotif.classList.remove("active")
    
    parameters.classList.add("disabled")
    navigation.classList.add("disabled")
    playButton.style.display = "none"
    stopButton.style.display = "unset"
    
    document.querySelector(".arrow")?.remove()
    document.querySelectorAll(".boardItem.active")?.forEach(item => {
        item.classList.remove("active")
    })

    interval = setInterval(function() {
        //if not enough funds
        if(parseFloat(balance.innerText) <= parseFloat(bet.innerText)) {

            errorNotif.innerText = "Not Enough Funds"
            errorNotif.classList.add("active")
            stopButton.style.display = "none"
            playButton.style.display = "unset"
            parameters.classList.remove("disabled")
            navigation.classList.remove("disabled")
            clearInterval(interval)
            return
        }
        //
                   
        timeHist = new Date()
        betHist = bet.innerText
        
        payoutHist = document.querySelector(".board.active").querySelector(".singleMultiplier div").innerText.substring()

        balance.innerText = (parseFloat(balance.innerText) - parseFloat(bet.innerText)).toFixed(2)
        
        let col = document.querySelector(".board.active").querySelectorAll(".boardColumn")
        winNotif.classList.remove("active")
        

        generateBombs("visible")


        
        let a = 0
        col.forEach(el => {
            const wreckedBomb = document.createElement('div')
            wreckedBomb.classList.add("wreckedBomb")
            for(i=0; i < el.querySelectorAll(".boardItem").length; i++) {
                if (
                    el.querySelectorAll(".boardItem")[i].contains(document.querySelectorAll(".flag")[a]) &&
                    el.querySelectorAll(".boardItem")[i].contains(document.querySelectorAll(".bomb")[a])
                    ) {
                        el.querySelectorAll(".boardItem")[i].querySelector(".flag").style.display = "none"
                        el.querySelectorAll(".boardItem")[i].querySelector(".bomb").style.display = "none"
                        el.querySelectorAll(".boardItem")[i].appendChild(wreckedBomb)
                    }
                }
                a++
        })
        if(!document.querySelector(".wreckedBomb")) {
            //win
            winnedMoney = Math.floor((parseFloat(bet.innerText) * parseFloat(document.querySelector(".board.active").querySelector(".singleMultiplier div").innerText.substring(1))) * 100) / 100
            addBalance()
            if(document.querySelector("#onWin").querySelector(".active").innerText.startsWith("I")) {
                if(Number((parseFloat(bet.innerText) +  parseFloat(document.querySelector("#onWin").querySelector(".active").querySelector(".innerPercent").innerText) * parseFloat(bet.innerText) / 100).toFixed(2)) > 100) {
                    clearInterval(interval)
                    stopButton.style.display = "none"
                    playButton.style.display = "unset"
                    parameters.classList.remove("disabled")
                    navigation.classList.remove("disabled")
                    //error message
                    errorNotif.innerText = "Can't Increase Bet Amount Anymore"
                    errorNotif.classList.add("active")
                } else {
                    bet.innerText = (parseFloat(bet.innerText) +  parseFloat(document.querySelector("#onLoss").querySelector(".active").querySelector(".innerPercent").innerText) * parseFloat(bet.innerText) / 100).toFixed(2)    
                }
            } else if(document.querySelector("#onWin").querySelector(".active").innerText.startsWith("D")) {
                if(Number((parseFloat(bet.innerText) -  parseFloat(document.querySelector("#onWin").querySelector(".active").querySelector(".innerPercent").innerText) * parseFloat(bet.innerText) / 100).toFixed(2)) < 0.10) {
                    clearInterval(interval)
                    stopButton.style.display = "none"
                    playButton.style.display = "unset"
                    parameters.classList.remove("disabled")
                    navigation.classList.remove("disabled")
                    //error message
                    errorNotif.innerText = "Can't Decrease Bet Amount Anymore"
                    errorNotif.classList.add("active")
                } else {
                    bet.innerText = (parseFloat(bet.innerText) -  parseFloat(document.querySelector("#onWin").querySelector(".active").querySelector(".innerPercent").innerText) * parseFloat(bet.innerText) / 100).toFixed(2)
                }
            }
        } else {
            failAudio.play()
            if(document.querySelector("#onLoss").querySelector(".active").innerText.startsWith("I")) {
                if(Number((parseFloat(bet.innerText) +  parseFloat(document.querySelector("#onLoss").querySelector(".active").querySelector(".innerPercent").innerText) * parseFloat(bet.innerText) / 100).toFixed(2)) > 100) {
                    clearInterval(interval)
                    stopButton.style.display = "none"
                    playButton.style.display = "unset"
                    parameters.classList.remove("disabled")
                    navigation.classList.remove("disabled")
                    //error message
                    errorNotif.innerText = "Can't Increase Bet Amount Anymore"
                    errorNotif.classList.add("active")
                } else {
                    bet.innerText = (parseFloat(bet.innerText) +  parseFloat(document.querySelector("#onLoss").querySelector(".active").querySelector(".innerPercent").innerText) * parseFloat(bet.innerText) / 100).toFixed(2)
                }
            } else if(document.querySelector("#onLoss").querySelector(".active").innerText.startsWith("D")) {
                if(Number((parseFloat(bet.innerText) -  parseFloat(document.querySelector("#onLoss").querySelector(".active").querySelector(".innerPercent").innerText) * parseFloat(bet.innerText) / 100).toFixed(2)) < 0.10) {
                    clearInterval(interval)
                    stopButton.style.display = "none"
                    playButton.style.display = "unset"
                    parameters.classList.remove("disabled")
                    navigation.classList.remove("disabled")
                    //error message
                    errorNotif.innerText = "Can't Decrease Bet Amount Anymore"
                    errorNotif.classList.add("active")

                } else {
                    bet.innerText = (parseFloat(bet.innerText) -  parseFloat(document.querySelector("#onLoss").querySelector(".active").querySelector(".innerPercent").innerText) * parseFloat(bet.innerText) / 100).toFixed(2)
                }
            }

        }

        pushToHistory()

        winnedMoney = ""

        setTimeout(function() {
            document.querySelectorAll(".flag").forEach(el => {
                el.style.display = "unset"
            })
            document.querySelectorAll(".bomb").forEach(el => {
                el.remove()
            })
            document.querySelectorAll(".wreckedBomb").forEach(el => {
                el.remove()
            })
        }, 1000)
    }, 3000);
})

stopButton.addEventListener("click", () => {
    clearInterval(interval)
    parameters.classList.remove("disabled")
    navigation.classList.remove("disabled")
    stopButton.style.display = "none"
    playButton.style.display = "unset"
})

function toggleLogo(elem) {
    if(elem.getAttribute("src") === "./assets/toggle-off.svg") {
        elem.src = "./assets/toggle-on.svg"
    } else {
        elem.src = "./assets/toggle-off.svg"
    }
}

function chooseBallPosition(col, a) {
    for(i=a-1; i<a; i++) {
        const arrow = document.createElement("img")
        arrow.src = "./assets/arrow-down-short.svg"
        arrow.classList.add("arrow")
        col[i].appendChild(arrow)

        for(j=0;j<col[i].children.length - 1;j++) {
            col[i].children[j].classList.add("active")

            col[a-1].children[j].addEventListener('click', (e) => {
                clickAudio.play()

                payoutHist = col[a-1].children[4].innerText

                if(e.target.contains(document.querySelectorAll(".bomb")[a-1])) {                
                    e.target.querySelector(".bomb").style.opacity = "0"
                    e.target.appendChild(wreckedBomb)
                    
                    failAudio.play() 
                    
                    document.querySelectorAll(".boardItem").forEach(el => {
                        el.classList.add("loss")
                    })
                    showResults()
                    return
                } else {
                    e.target.appendChild(ball)
                    //passed board items
                    document.querySelectorAll(".bomb")[a - 1].style.visibility = "visible"
                    if(a === 1) {
                        startButton.style.display = "none"
                        cashoutButton.style.display = "unset"
                    } 
                    
                    col[i-1].querySelector("img")?.remove()
                    for (let item of col[a-1].children) {
                        item.classList.remove("active")
                        item.classList.add("passed")
                    }
                                        
                    
                    // prev sign (white circle)
                    var parent = ball.parentNode;
                    let prevPositionSign = document.createElement("div")
                    prevPositionSign.classList.add("prevSign")
                    parent.append(prevPositionSign)
                    //

                    //increase cashout money
                    const multiplier = parseFloat(col[i - 1].querySelector(".multiplier").innerText.substring(1))
                    winnedMoney = Math.floor((parseFloat(bet.innerText) * multiplier) * 100) / 100
                    cashoutButton.innerText = `cashout ${winnedMoney}$`
                    successAudio.play()
                    //
                    
                    if(col[a]) {
                        console.log("choose ball position")
                        chooseBallPosition(col, a + 1)
                    } else {
                        console.log("win")
                        addBalance()                            
                        showResults()
                    }
                }
            })
        }
    }

}

function restartGame() {
    document.querySelectorAll(".bomb").forEach(el => {
        el.remove()
    })
    wreckedBomb.remove()
    document.querySelectorAll(".boardItem").forEach(el => {
        el.classList.remove("active")
        el.classList.remove("passed")
        el.classList.remove("loss")
    })
    document.querySelectorAll(".flag").forEach(el => {
        el.remove()
    })
    document.querySelectorAll(".prevSign").forEach(el => {
        el.remove()
    })

    ball.remove()
    
}

function showResults() {
    pushToHistory()

    document.querySelectorAll(".bomb").forEach(el => {
        el.style.visibility = "visible"
    })
    document.querySelectorAll(".boardItem").forEach(el => {
        el.classList.remove("active")
        el.classList.remove("passed")
    })
    document.querySelector(".multiplier.active")?.classList.remove("active")

    document.querySelector(".arrow")?.remove()

    parameters.classList.remove("disabled")
    navigation.classList.remove("disabled")

    cashoutButton.style.display = "none"
    startButton.style.display = "unset"

    winnedMoney = ""

}

function addBalance() {
    winAudio.play()
    winNotif.innerText = `+${winnedMoney} $`
    winNotif.classList.add("active")
    balance.innerText = (parseFloat(balance.innerText) + winnedMoney).toFixed(2)
}

function generateBombs(type) {
    let col = document.querySelector(".board.active").querySelectorAll(".boardColumn")
    for(i=0; i<col.length; i++) {
        const bomb = document.createElement('div')
        bomb.classList.add("bomb")

        bomb.style.visibility = type

        let rand = Math.floor(Math.random() * (col[i].children.length - 1))
        col[i].getElementsByClassName("boardItem")[rand].appendChild(bomb)
    }
}

function chooseFlagPosition(col, a) {
    for(let i=a-1; i<a; i++) {
        const arrow = document.createElement("img")
        arrow.src = "./assets/arrow-down-short.svg"
        arrow.classList.add("arrow")
        col[i].appendChild(arrow)

        if(ball) ball.remove()    
        
        for(j=0;j<col[i].children.length - 1;j++) {            
            col[i].children[j].classList.add("active")

            col[i].children[j].addEventListener('click', (e) => {
                //add flag
                clickAudio.play()
                const flag = document.createElement('div')
                flag.classList.add("flag")
                e.target.appendChild(flag)
                
                // increse multiplier amount
                document.querySelector(".board.active").querySelector(".singleMultiplier div").innerText = col[a-1].querySelector(".multiplier div").innerHTML
                document.querySelector(".board.active").querySelector(".singleMultiplier").style.visibility = "visible"
                document.querySelector(".board.active").querySelector(".singleMultiplier")
                //passed board items
                playButton.classList.add("active")

                col[a-1]?.querySelector("img").remove()

                for (let item of col[a-1].children) {
                    item.classList.remove("active")
                    item.classList.add("passed")
                }
                if(col[a]) {
                    chooseFlagPosition(col, a+1)
                }
            })
        }
    }
}

function pushToHistory() {
    //transform date as it is in game
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul","Aug", "Sep", "Oct", "Nov", "Dec"];

    const d = new Date(timeHist)

    const tranformedDate = `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}, ${d.getHours()}:${d.getMinutes() < 10 ? '0' + d.getMinutes() : d.getMinutes()}`
    
    

    let historyArr = [        
        tranformedDate, //time
        `${betHist} USD`, //bet
        payoutHist, //payout
        `${(winnedMoney - parseFloat(betHist)).toFixed(2)} USD`, //profit
        "https://turbo-next.spribegaming.com/icon-provabyfair.3400ef408d35231db293.svg" //image
    ]

    //create elem

    const trElem = document.createElement("tr")


    for(i=0; i<historyArr.length; i++) {
        const tdElem = document.createElement("td")
        if(i===4) {
            const securityLogo = document.createElement("img")
            securityLogo.src = historyArr[i]
            tdElem.appendChild(securityLogo)
        } else {
            tdElem.innerText = historyArr[i]
        }
        trElem.appendChild(tdElem)
    }

    //profit colors
    if(parseFloat(trElem.children[3].innerText) > 0) {
        trElem.children[3].style.color = "#7ed321"

    }
    
    
    // let allTrTags = document.querySelectorAll("tr")
    
    // if(allTrTags.length > 7){
    //     for(i=7;i<allTrTags.length - 1;i++) {
    //         console.log(i)
    //         allTrTags[i].style.visibility = "hidden"
    //     }
    // }

    // insert in table reversibly
    document.querySelector("table tbody").insertBefore(trElem, document.querySelector("table tr:nth-child(2)"))
    

}

const filterHistory = () => {
    const type = document.querySelector(".dateFilterButton.active").innerText

    let fields = document.querySelectorAll("tr")

    let today = new Date().toDateString()
    let yesterday = new Date(new Date().getTime() - 24*60*60*1000).toDateString()
    
    for(let i=1; i<fields.length;i++) { //neglect manipulation on first field because first field is used as a headline
        // debugger
        let date = new Date(fields[i].querySelector("td").innerHTML).toDateString()
        console.log(date)
        if(type.startsWith("T")) {
            if(date !== today) {
                fields[i].style.visibility = "hidden"
            } else {
                fields[i].style.visibility = "visible"
            }            
        } else if(type.startsWith("Y")) {
            if(date !== yesterday) {
                fields[i].style.visibility = "hidden"
            } else {
                fields[i].style.visibility = "visible"
            }
        } 
        else {
            console.log("range")
        }
    }

}

// call this function when DOM loads because we have to get today's history by default
filterHistory()
})
