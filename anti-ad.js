const { Channel } = require("discord.js")

module.exports = (client) => {
    const isInvite = async (guild, code) => {
      return await new Promise((resolve) => {
        guild.fetchInvites().then((invites) => {
          for (const invite of invites) {
            if (code === invite[0]) {
              resolve(true)
              return
            }
          }
  
          resolve(false)
        })
      })
    }
  
    client.on('message', async (message) => {
      const { guild, member, content } = message
  
      // discord.gg/23RAN4
  
      const code = content.split('discord.gg/')[1]
      if (content.includes('discord.gg/')) {
        const isOurInvite = await isInvite(guild, code)
        if (!isOurInvite) {
          message.delete()
          message.reply("Oi! Please don't advertise other discord servers here!")
          .then(msg => {
            msg.delete({ timeout: 5000 })
          })
        }
      }
    })
  }