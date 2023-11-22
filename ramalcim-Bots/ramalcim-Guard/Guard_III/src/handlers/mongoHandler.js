const mongoose = require("mongoose");
const ramalcim = require("../../../../../Global/BotSettings/Settings")

mongoose.set('strictQuery', true);
mongoose.connect(ramalcim.DatabaseURL, { useNewUrlParser: true, useUnifiedTopology: true });

mongoose.connection.on("connected", () => {
  console.log("Database bağlantısı tamamlandı!");
});
mongoose.connection.on("error", () => {
  console.error("[HATA] Database bağlantısı kurulamadı!");
});