import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/home.tsx";
import ProgressLevel from "./pages/progressLevel.tsx";
import QuizPlayground from "./pages/quizPlayground.tsx";
import Layout from "./components/layout.tsx";
import Play from "./components/quizPlayground/play.tsx";
import Profile from "./pages/profile.tsx";
import Leaderboard from "./pages/leaderboard.tsx";
import "./App.css";

const App = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Layout />}>
					<Route index element={<Home />} />
					<Route path="/progresslevel" element={<ProgressLevel />} />
					<Route path="/playground" element={<QuizPlayground />}>
						<Route path="/playground/:quizId" element={<Play />} />
					</Route>
					<Route path="/profile" element={<Profile />} />
					<Route path="/leaderboard" element={<Leaderboard />} />
				</Route>
			</Routes>
		</BrowserRouter>
	);
};

export default App;
