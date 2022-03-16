import { useEffect, useState } from "react";
import axios from "axios";

import { IError, IWilder } from "./interface";

import Form from "./pages/Form";
import Wilder from "./components/Wilder";

import { Footer } from "./components/styled/Footer";
import { Container } from "./components/styled/Container";
import "./App.css";

function App(): JSX.Element {
  const [wilders, setWilders] = useState<IWilder[]>([]);
  const [hasError, setHasError] = useState<IError>({
    message: "",
    status: false,
  });
  const [showForm, setShowForm] = useState<boolean>(false);

  const getWilders = async (): Promise<void> => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_URL_API}/wilders`
      );
      setWilders(data.result);
    } catch (error: any) {
      setHasError({ message: error.message, status: true });
    }
  };

  useEffect((): void => {
    getWilders();
  }, []);

  return (
    <div className="app">
      <Container>
        <h1>Wilders Book</h1>
        <h2>Wilders</h2>
        <button onClick={() => setShowForm(!showForm)}>
          {showForm ? "Close" : "Open"} Form
        </button>
      </Container>
      <Container>
        {showForm && (
          <Form
            onError={(error: any) =>
              setHasError({ message: error.message, status: true })
            }
            getWilders={() => getWilders()}
          />
        )}
        <section className="card-row">
          {wilders.map((wilder) => (
            <Wilder
              key={wilder._id}
              {...wilder}
              getWilders={() => getWilders()}
              onError={(error: any) =>
                setHasError({ message: error.message, status: true })
              }
            />
          ))}
        </section>
        {hasError.status && (
          <div>
            <h4>Oops il y a eu une erreur !</h4>
            <div>
              <h5>Message d'erreur :</h5>
              <p>{hasError.message}</p>
            </div>
          </div>
        )}
      </Container>
      <Footer>
        <div className="container">
          <p>&copy; 2022 Wild Code School</p>
        </div>
      </Footer>
    </div>
  );
}

export default App;
