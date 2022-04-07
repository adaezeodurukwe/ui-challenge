import * as React from "react"

const RatingComponent = (props) => {
  React.useEffect(() => {console.log(props);}, [])
  return (
    <svg
      width={18}
      height={16}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <defs>
        <linearGradient id="grad">
          <stop offset="60%" stopColor="#EBA430" />
          <stop offset="40%" stopColor="#DDD" />
        </linearGradient>
      </defs>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="m9.259.6 2.604 5.061 5.783.808-4.194 3.934.994 5.572-5.187-2.616-5.188 2.616.994-5.572L.87 6.47l5.805-.808L9.259.601Z"
        fill="url(#grad)"
      />
    </svg>
  )
}

export default RatingComponent