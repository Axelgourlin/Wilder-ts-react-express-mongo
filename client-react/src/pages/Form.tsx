import { useState } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import styled from "styled-components";

import { IError, ISkill } from "../interface";

import Skill from "../components/Skill";


const FormContainer = styled.form<{}>`
  padding: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  .form__groupItem {
    display: flex;
    gap: 10px;
  }
  .form__item {
    width: 8rem;
    display: flex;
    flex-direction: column;
  }
  .form__input {
    border: none;
    border-radius: 3px;
    box-shadow: 0px 0px 2px #000;
    margin-bottom: 5px;
    padding: 4px;
  }
  .form__btnSubmit {
    width: 8rem;
  }
  .form__skills {
    h4 {
      margin: 2px 0;
    }
    p {
      color: #757575;
      line-height: 1.5;
    }
    .skills {
      gap: 10px;
    }
  }
`;
interface IProps {
  onError: (error: IError) => void;
  getWilders: () => void;
}

const propTypes = {
  onError: PropTypes.func,
  getWilders: PropTypes.func
};

const Form = ({ onError, getWilders }: IProps): JSX.Element => {
  const [name, setName] = useState<string>("Test");
  const [city, setCity] = useState<string>("TestCity");
  const [skill, setSkill] = useState<ISkill>({ title: "Test", votes: 0 });
  const [skills, setSkills] = useState<ISkill[]>([]);

  const submitForm = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();
    try {
      const inputWildersData = { name: name, city: city, skills: skills };

      const res = await axios.post(`${process.env.REACT_APP_URL_API}/wilders`, {
        ...inputWildersData,
      });
      console.log("🚀 ~ submitForm ~ res", res);

      setName("");
      setCity("");
      setSkills([]);
      getWilders();
    } catch (error: any) {
      onError({ message: error, status: true });
    }
  };

  const addSkill = (): void => {
    setSkills([...skills, skill]);
    setSkill({ title: "Test", votes: 0 });
  };

  return (
    <FormContainer className="form" onSubmit={submitForm}>
      <div className="form__groupItem">
        <div className="form__item">
          <label htmlFor="name" className="form__label">
            Name:
          </label>
          <input
            type="text"
            name="name"
            className="form__input"
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
        </div>
        <div className="form__item">
          <label htmlFor="city">City:</label>
          <input
            type="text"
            name="city"
            className="form__input"
            onChange={(e) => setCity(e.target.value)}
            value={city}
          />
        </div>

        <div className="form__item">
          <label className="form__label">Skills:</label>
          <input
            type="text"
            placeholder="Title.."
            className="form__input"
            onChange={(e) => setSkill({ ...skill, title: e.target.value })}
            value={skill.title}
          />
          <input
            type="number"
            placeholder="Votes.."
            className="form__input"
            onChange={(e) => setSkill({ ...skill, votes: +e.target.value })}
            value={skill.votes} //TODO: Refacto skill comme liveco ( add and change)
          />
          <button
            onClick={(e) => {
              e.preventDefault();
              addSkill();
            }}
          >
            Add skill
          </button>
        </div>
      </div>

      {skills.length >= 1 && (
        <div className="form__skills">
          <h4>Skills :</h4>
          <ul className="skills">
            {skills.map((skill, i) => (
              <Skill key={i} skill={skill} />
            ))}
          </ul>
        </div>
      )}
      <button type="submit" className="form__btnSubmit">
        Submit
      </button>
    </FormContainer>
  );
};

Form.propTypes = propTypes;


export default Form;
