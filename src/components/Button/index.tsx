import React from 'react';

import './styles.css';

function Button({
  title,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button className="button" {...props}>
      {title}
    </button>
  );
}

export default Button;
