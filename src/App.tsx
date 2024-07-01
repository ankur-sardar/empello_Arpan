import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/home.tsx";
import Layout from "./components/layout.tsx";
import "./App.css";

const App = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Layout />}>
					<Route index element={<Home />} />
				</Route>
			</Routes>
		</BrowserRouter>
	);
};

export default App;
