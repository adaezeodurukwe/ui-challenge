import * as React from "react";

const Star = (props) => {
  return (
    <svg
      width={18}
      height={16}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <defs>
        <linearGradient id={props.gradid}>
          <stop
            offset={`${props.fill}%`}
            style={{ stopColor: "#EBA430", stopOpacity: 1 }}
          />
          <stop
            offset={`${100 - props.fill}%`}
            style={{ stopColor: "#DDDDDD", stopOpacity: 1 }}
          />
        </linearGradient>
      </defs>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="m9.259.6 2.604 5.061 5.783.808-4.194 3.934.994 5.572-5.187-2.616-5.188 2.616.994-5.572L.87 6.47l5.805-.808L9.259.601Z"
        fill={`url(#${props.gradid})`}
      />
    </svg>
  );
};

const RatingComponent = ({ book }) => {
  return (
    <div>
      {Array(5)
        .fill()
        .map((value, index) => {
          const whole = parseInt(book.rating);
          const remainder = parseInt(book.rating.toString().split(".")[1]);

          return (
            <Star
              gradid={`${Math.random()}`}
              key={index}
              fill={index + 1 <= whole ? 100 : remainder * 10}
            />
          );
        })}
    </div>
  );
};

export default RatingComponent;
