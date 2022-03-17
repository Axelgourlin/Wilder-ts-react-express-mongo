// @ts-nocheck
import { useState } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import styled from "styled-components";

import Skill from "./Skill";
import MdiPencil from "./styled/MdiPencil";
import avatars from "../assets/avatar.png";

const GroupBtn = styled.div<{}>`
  position: absolute;
  top: 5px;
  right: 5px;
  button {
    margin-right: 5px;
  }
`;

const EditGroup = styled.div<{}>`
  margin-top: 5px;
`;

interface IProps extends IWilder {
  onError: Function;
  getWilders: Function;
}

const propTypes = {
  name: PropTypes.string.isRequired,
  img: PropTypes.string,
  city: PropTypes.string,
  skills: PropTypes.arrayOf(
    PropTypes.shape({ title: PropTypes.string, votes: PropTypes.number })
  ).isRequired,
  onError: PropTypes.func,
  getWilders: PropTypes.func
};

const Wilder = ({
  _id,
  name,
  city,
  skills,
  onError,
  getWilders,
}: IProps): JSX.Element => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [wilder, setWilder] = useState<IWilder>({
    _id: _id,
    name: name,
    city: city,
    skills: skills,
  });


  const updateWilder = async (): Promise<void> => {
    try {
      await axios.patch(`${process.env.REACT_APP_URL_API}/wilders/${_id}`, wilder)
      setIsEditing(false);
    } catch (error) {
      onError(error);
    }
  };

  const removeWilder = async (): Promise<void> => {
    try {
      await axios.delete(`${process.env.REACT_APP_URL_API}/wilders/${_id}`);
      getWilders();
    } catch (error: any) {
      onError(error);
    }
  };

  return (
    <article className="card">
      <img src={avatars} alt="Jane Doe Profile" />
      {isEditing ? (
        <EditGroup>
          <label>Name:</label>
          <input
            type="text"
            value={wilder.name}
            onChange={(e) => setWilder({ ...wilder, name: e.target.value })}
          />
        </EditGroup>
      ) : (
        <h3>{name}</h3>
      )}
      {isEditing ? (
        <EditGroup>
          <label>City:</label>
          <input
            type="text"
            value={wilder.city}
            onChange={(e) => setWilder({ ...wilder, city: e.target.value })}
          />
        </EditGroup>
      ) : (
        <p>{city}</p>
      )}

      <h4>Wild Skills</h4>
      <ul className="skills">
        {skills.map((skill, i) => (
          <Skill
            key={i}
            skill={skill}
            isEditing={isEditing}
            onChange={(skill) => {
              const temp = wilder.skills.slice()
              temp.splice(i, 1, skill)
              setWilder({...wilder, skills: temp}) //TODO: voir pour refacto sans slice (...spread)
            }}
          />
        ))}
      </ul>
      <GroupBtn>
        {isEditing ? (
          <button onClick={updateWilder}>V</button>
        ) : (
          <button onClick={() => setIsEditing(true)}>
            <MdiPencil />
          </button>
        )}
        <button onClick={removeWilder}> X</button>
      </GroupBtn>
    </article>
  );
};
Wilder.propTypes = propTypes;

export default Wilder;
