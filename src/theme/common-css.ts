import { css } from "@emotion/react";
import { Colors } from "./colors";

export const container = css`
  margin: 5px auto;
  width: 100%;
  max-width: 1400px;
  min-height: 81vh;
`;

export const title = css`
  font-size: 1.5rem;
  color: ${Colors.grey700};
  margin-bottom: 1rem;
`;

export const section = css`
  margin-bottom: 6rem;
`;

export const contactDescription = css`
  font-size: 1rem;
  color: ${Colors.grey700};
  margin-bottom: 2rem;
`;