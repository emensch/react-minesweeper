import React from "react";
import classnames from "classnames";

import "./styles.scss";

interface IMineNumberProps {
  number: number;
}

export const MineNumber: React.FC<IMineNumberProps> = ({ number }) => (
  <span className={classnames("mine-number", `tile-${number}`)}>{ number }</span>
)