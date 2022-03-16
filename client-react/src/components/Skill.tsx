// import PropTypes from "prop-types";
import styled from "styled-components";
import { ISkill, IWilder } from "../interface";

const Skills = styled.li`
  input {
    width: 40%;
  }
`;

interface IProps {
  skill: ISkill;
  wilder?: IWilder;
  isEditing?: boolean;
  setWilder?: Function;
}

// const propTypes = {
//   wilder: {
//     title: PropTypes.string.isRequired,
//     votes: PropTypes.number.isRequired,
//   },
// };

const Skill = ({
  skill,
  wilder,
  isEditing,
  setWilder,
}: IProps): JSX.Element => {
  return (
    <Skills>
      {isEditing ? (
        <>
          <label>City:</label>
          <input
            type="text"
            value={skill.title}
            onChange={(e) =>
              setWilder && setWilder({ ...wilder, title: e.target.value })
            }
          />
        </>
      ) : (
        <p>{skill.title}</p>
      )}
      {isEditing ? (
        <>
          <label>City:</label>
          <input
            type="number"
            value={skill.votes}
            onChange={(e) =>
              setWilder && setWilder({ ...wilder, votes: e.target.value })
            }
          />
        </>
      ) : (
        <span className="votes">{skill.votes}</span>
      )}
    </Skills>
  );
};
// Skill.propTypes = propTypes;

export default Skill;
