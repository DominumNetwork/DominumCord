
export function initUI(){
document.getElementById("app").innerHTML=`
<div id="layout">

<div id="serverList"></div>

<div id="sidebar">
<div id="channelList"></div>
<div id="dmList"></div>
</div>

<div id="chat">
<div id="chatHeader">DominumCord</div>
<div id="messages"></div>
<div id="typing"></div>
<div id="inputBar">
<input id="messageInput" placeholder="Message DominumCord">
<button id="emojiBtn">😀</button>
<button id="uploadBtn">+</button>
</div>
</div>

<div id="memberList"></div>

</div>
`
}
