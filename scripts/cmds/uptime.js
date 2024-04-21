module.exports = {
  config: {
    name: "ابتايم",
    aliases: ["uptime"],
    role: 0,
    shortDescription: {
      en: "ابتايم سرفر",
      tl: "Ipakita ang uptime ng server",
    },
    longDescription: {
      en: "مدة تشغيل سرفر البوت",
      tl: "Ipapakita ang tagal na gumagana ang server",
    },
    category: "النظام",
    guide: {
      en: "{p}ابتايم",
      tl: "{p}uptime",
    },
  },

  onStart: async function ({ api, message }) {
    const os = require("os");
    const uptime = os.uptime();

    const days = Math.floor(uptime / (3600 * 24));
    const hours = Math.floor((uptime % (3600 * 24)) / 3600);
    const mins = Math.floor((uptime % 3600) / 60);
    const seconds = Math.floor(uptime % 60);

    const system = `وس: ${os.platform()} ${os.release()}`;
    const cores = `كور: ${os.cpus().length}`;
    const arch = `𝗔𝗿𝗰𝗵𝗶𝘁𝗲𝗰𝘁𝘂𝗿𝗲: ${os.arch()}`;
    const totalMemory = `𝗧𝗼𝘁𝗮𝗹 𝗠𝗲𝗺𝗼𝗿𝘆: ${Math.round(os.totalmem() / (1024 * 1024 * 1024))} GB`;
    const freeMemory = `: ${Math.round(os.freemem() / (1024 * 1024 * 1024))} GB`;
    const uptimeString = `وقت التشغيل: ${days} يوم , ${hours} ساعة, ${mins} دقيقة, و  ${seconds} ثانية`;

    const response = `🕒 الوقت: ${uptimeString}\n━━━━━━━━━━━━━\n\n📡 الجهاز:${system}\n🛡 ${cores}\n⚔ البوت نشط🟢\n📊 المستخدم من الرام: ${Math.round(process.memoryUsage().rss / (1024 * 1024))} MB\n💽 مجموع الرام: ${Math.round(os.totalmem() / (1024 * 1024 * 1024))} GB\n💾 رام المستخدم: ${Math.round(os.freemem() / (1024 * 1024 * 1024))} GB\n⏰ وقت التشغيل: ${Math.floor(process.uptime())}\n━━━━━━━━━━━━━`;

    const gifAttachment = await global.utils.getStreamFromURL("https://i.imgur.com/PzkRrlw.gif");

    message.reply({
      body: response,
      attachment: gifAttachment
    });
  },

  onChat: async function({ event, message, getLang }) {
    if (event.body && event.body.toLowerCase() === "uptime") {
      const gifAttachment = await global.utils.getStreamFromURL("https://i.imgur.com/PzkRrlw.gif");

      return message.reply({
        body: "",
        attachment: gifAttachment
      });
    }
  }
};