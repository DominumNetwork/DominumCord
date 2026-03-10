
import { initFirebase } from "./core/firebase.js"
import { initUI } from "./ui/layout.js"
import { initAuth } from "./systems/auth.js"
import { initServers } from "./systems/servers.js"
import { initChannels } from "./systems/channels.js"
import { initMessages } from "./systems/messages.js"
import { initTyping } from "./systems/typing.js"

import "./systems/reactions.js"
import "./systems/mentions.js"
import "./systems/dms.js"
import "./systems/roles.js"
import "./systems/invites.js"
import "./systems/notifications.js"
import "./systems/threads.js"
import "./systems/friends.js"
import "./systems/presence.js"
import "./systems/search.js"
import "./systems/uploads.js"
import "./systems/pins.js"
import "./systems/settings.js"
import "./systems/slashCommands.js"
import "./systems/gifs.js"
import "./systems/voice.js"
import "./systems/video.js"
import "./systems/activities.js"
import "./systems/moderation.js"
import "./systems/auditLog.js"
import "./systems/permissions.js"

async function start(){
 await initFirebase()
 initUI()
 initAuth()
 initServers()
 initChannels()
 initMessages()
 initTyping()
 console.log("DominumCord Ultra started")
}

start()