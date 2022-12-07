import "./styles.css";

import Bottom from "./components/Bottom";
import OrganizationList from "./components/OrganizationList";
export default function App() {
  return (
    <div className="App">
      <OrganizationList />
      <Bottom />
    </div>
  );
}
