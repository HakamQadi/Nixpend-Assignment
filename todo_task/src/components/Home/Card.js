import React, { useContext } from 'react';
import { dataContext } from '../../context/DataProvider';

const Card = (props) => {
    // const { data } = useContext(dataContext);
    // console.log("card ", data)

    const text = props.text
    const desc = props.desc
    // console.log(text)
    return (
        <div style={{
            backgroundColor: '#fff',
            borderRadius: '8px',
            padding: '10px',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
            marginBottom: '10px',
            width: "20rem"
        }}>
            <h5 style={{
                fontSize: '18px',
                marginBottom: '8px',
            }}>{text}</h5>
            <p style={{
                fontSize: '14px',
                color: '#555',
            }}>{desc}.</p>
        </div>
    );
}

export default Card;




// import React from 'react';

// const Card = ({ text, desc }) => {
//   return (
//     <div style={cardContainerStyle}>
//       <h5 style={cardTitleStyle}>{text}</h5>
//       <p style={cardDescStyle}>{desc}.</p>
//     </div>
//   );
// };

// const cardContainerStyle = {
//   boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
//   width: '20rem',
// };

// const cardTitleStyle = {
//   fontSize: '18px',
//   marginBottom: '8px',
// };

// const cardDescStyle = {
//   fontSize: '14px',
//   color: '#555',
// };

// export default Card;
