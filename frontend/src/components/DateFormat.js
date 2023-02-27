import React from "react";

const DateFormatter = ({ date }) => {
          const [year, month, day] = date.split('T')[0].split('-');
          const time_part = date.split('T')[1].split('.')[0];

          return (
                <span>
                    {`${year}/${month}/${day} at ${time_part}`}
                </span>
            )
}


export default DateFormatter;