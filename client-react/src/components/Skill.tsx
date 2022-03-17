import PropTypes from "prop-types";
import styled from "styled-components";

import { ISkill } from "../interface";

const Skills = styled.li`
  input {
    width: 40%;
  }
`;

interface IProps {
  skill: ISkill;
  isEditing?: boolean;
  onChange?: (skill: ISkill) => void; 
}

const propTypes = {
  skill: PropTypes.shape({
    title: PropTypes.string.isRequired,
    votes: PropTypes.number.isRequired,
  }).isRequired,
  isEditing: PropTypes.bool,
  onChange: PropTypes.func,
};



const Skill = ({
  skill,
  isEditing,
  onChange
}: IProps): JSX.Element => {


  return (
    <Skills>
      {isEditing ? (
        <>
          <label>City:</label>
          <input
            type="text"
            value={skill.title}
            onChange={(e) =>{
              skill.title = e.target.value
              onChange && onChange({...skill, title: e.target.value })
            }
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
            onChange={(e) => {
              skill.votes = +e.target.value
              onChange && onChange({...skill, votes: +e.target.value})
            }
            }
          />
        </>
      ) : (
        <span className="votes">{skill.votes}</span>
      )}
    </Skills>
  );
};
Skill.propTypes = propTypes;

export default Skill;
