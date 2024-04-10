module.exports = {
	config: {
		name: "مسؤولين-فقض",
		aliases: ["مسؤولين-المجموعة"],
		version: "1.3",
		author: "NTKhang",
		countDown: 5,
		role: 1,
		description: {
			vi: "bật/tắt chế độ chỉ quản trị của viên nhóm mới có thể sử dụng bot",
			en: "وضع مسؤولين المجموعة فقض"
		},
		category: "المجموعات",
		guide: {
			vi: "   {pn} [on | off]: bật/tắt chế độ chỉ quản trị viên nhóm mới có thể sử dụng bot"
				+ "\n   {pn} noti [on | off]: bật/tắt thông báo khi người dùng không phải là quản trị viên nhóm sử dụng bot",
			en: "   {pn} [تشغيل | ايقاف]: لإيقاف وتشغيل الوضع "
		}
	},

	langs: {
		vi: {
			turnedOn: "Đã bật chế độ chỉ quản trị viên nhóm mới có thể sử dụng bot",
			turnedOff: "Đã tắt chế độ chỉ quản trị viên nhóm mới có thể sử dụng bot",
			turnedOnNoti: "Đã bật thông báo khi người dùng không phải là quản trị viên nhóm sử dụng bot",
			turnedOffNoti: "Đã tắt thông báo khi người dùng không phải là quản trị viên nhóm sử dụng bot",
			syntaxError: "Sai cú pháp, chỉ có thể dùng {pn} on hoặc {pn} off"
		},
		en: {
			turnedOn: "تم تشغيل وضع مسؤولين المجموعة فقض.",
			turnedOff: "تم ايقاف وضع مسؤولين المجموعة فقض ",
			turnedOnNoti: "تم تشغيل الإشعار عندما لا يكون المستخدم مسؤولاً عن روبوت الاستخدام الجماعي",
			turnedOffNoti: "تم إيقاف تشغيل الإشعار عندما لا يكون المستخدم مسؤولاً عن روبوت الاستخدام الجماعي",
			syntaxError: "خطاء ❌,\n\n استخدم {pn} تشغيل او {pn} ايقاف"
		}
	},

	onStart: async function ({ args, message, event, threadsData, getLang }) {
		let isSetNoti = false;
		let value;
		let keySetData = "data.onlyAdminBox";
		let indexGetVal = 0;

		if (args[0] == "noti") {
			isSetNoti = true;
			indexGetVal = 1;
			keySetData = "data.hideNotiMessageOnlyAdminBox";
		}

		if (args[indexGetVal] == "تشغيل")
			value = true;
		else if (args[indexGetVal] == "ايقاف")
			value = false;
		else
			return message.reply(getLang("syntaxError"));

		await threadsData.set(event.threadID, isSetNoti ? !value : value, keySetData);

		if (isSetNoti)
			return message.reply(value ? getLang("turnedOnNoti") : getLang("turnedOffNoti"));
		else
			return message.reply(value ? getLang("turnedOn") : getLang("turnedOff"));
	}
};