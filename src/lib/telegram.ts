// Gửi thông tin lead lên Telegram
export async function sendLeadToTelegram(lead: any) {
  const botToken = "8368329411:AAG5BHXUw36yPk8uT6bvD0XD1Dprb3Au-GY";
  const chatId = "-1003592254550";
  const message = `\n🔥 NEW LEAD\n\n👤 Họ tên: ${lead.full_name}\n📞 Điện thoại: ${lead.phone}\n📧 Email: ${lead.email}\n🏢 Công ty: ${lead.company || "Không có"}\n🛠 Dịch vụ: ${lead.service?.name || "Chưa chọn"}\n🌍 Nguồn: ${lead.source}\n\n📝 Nội dung:\n${lead.message || "Không có"}\n\n--------------------------\n🕒 Thời gian: ${new Date().toLocaleString("vi-VN")}\n`;

  const url = `https://api.telegram.org/bot${botToken}/sendMessage`;
  const payload = {
    chat_id: chatId,
    text: message,
    parse_mode: "Markdown",
  };
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    throw new Error("Failed to send Telegram message");
  }
  return await res.json();
}
