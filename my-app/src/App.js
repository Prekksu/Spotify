import logo from "./logo.svg";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import routes from "./routes/Routes";

function App() {
	return (
		<>
			<Routes>{routes.map((val) => val)}</Routes>
		</>
	);
}

export default App;
