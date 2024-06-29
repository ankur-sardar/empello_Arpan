"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const express_1 = tslib_1.__importDefault(require("express"));
const dotenv_1 = tslib_1.__importDefault(require("dotenv"));
const cors_1 = tslib_1.__importDefault(require("cors"));
const routes_1 = tslib_1.__importDefault(require("./routes"));
const cookie_parser_1 = tslib_1.__importDefault(require("cookie-parser"));
const path_1 = tslib_1.__importDefault(require("path"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use((0, cookie_parser_1.default)());
const port = process.env.PORT_SERVER || 5080;
if (process.env.NODE_ENV === "production") {
    const __dirname = path_1.default.resolve();
    app.use(express_1.default.static(path_1.default.join(__dirname, "../../dist")));
    app.get("*", (req, res) => res.sendFile(path_1.default.resolve(__dirname, "dist", "index.html")));
}
else {
    app.get("/", (req, res) => res.send("Server is ready"));
}
app.use("/api", routes_1.default);
app.listen(port, () => {
    console.log(`Server has started listening on port no ${port}`);
});
