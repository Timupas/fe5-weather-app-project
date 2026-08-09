import { useState } from "react";
import { Header } from "./components/Header/Header";
import { Hero } from "./components/Hero/Hero";
import { Modal } from "./components/Modal/Modal";

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");

  const handleModalToggle = () => {
    setIsModalOpen((prevState) => !prevState);
  };

  const createName = (username) => {
    setName(username);
  };

  const createLocation = (locate) => {
    setLocation(locate);
  };

  return (
    <>
      <Header handleModalToggle={handleModalToggle} name={name} />

      <main>
        <Hero createLocation={createLocation} />
      </main>

      {isModalOpen && (
        <Modal handleModalToggle={handleModalToggle} createName={createName} />
      )}
    </>
  );
}

export default App;