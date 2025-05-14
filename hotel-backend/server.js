const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();
const db = require("./db");

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.post("/api/login", (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "Vui lòng nhập đầy đủ thông tin." });
    }

    const query = "SELECT * FROM NguoiDung WHERE Email = ? AND Password = ?";

    db.query(query, [email, password], (err, results) => {
        if (err) {
            console.error("Lỗi truy vấn:", err);
            return res.status(500).json({ message: "Lỗi máy chủ" });
        }

        if (results.length === 0) {
            return res.status(401).json({ message: "Email hoặc mật khẩu không đúng." });
        }

        return res.status(200).json({ message: "Đăng nhập thành công", user: results[0] });
    });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server đang chạy ở cổng ${PORT}`);
});